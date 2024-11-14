import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Text, Surface, TextInput, ActivityIndicator, Portal, Dialog } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import useAuthStore from '../../store/authStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError } from 'axios';
import { format, parseISO } from 'date-fns';

interface User {
  _id: string;
  name: string | null;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
  systemUID?: string;
}

interface EditedFields {
  name: string;
  email: string;
}

interface MenuItemProps {
  icon: string;
  title: string;
  onPress: () => void;
  subtitle?: string;
  rightText?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ 
  icon, 
  title, 
  subtitle, 
  onPress, 
  rightText 
}) => (
  <TouchableOpacity 
    onPress={onPress}
    className="mb-3"
  >
    <Surface className="rounded-xl bg-white" elevation={0}>
      <View className="p-4 flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          <View className="bg-gray-50 rounded-full p-2 mr-4">
            <Icon name={icon} size={20} color="#374151" />
          </View>
          <View className="flex-1">
            <Text className="font-medium text-gray-900">{title}</Text>
            {subtitle && (
              <Text className="text-sm text-gray-500">{subtitle}</Text>
            )}
          </View>
        </View>
        {rightText ? (
          <Text className="text-sm text-gray-500">{rightText}</Text>
        ) : (
          <Icon name="chevron-forward" size={20} color="#9CA3AF" />
        )}
      </View>
    </Surface>
  </TouchableOpacity>
);

const ProfileScreen: React.FC = () => {
  const { user, setUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState<boolean>(false);
  const [editedFields, setEditedFields] = useState<EditedFields>({
    name: user?.user?.name || '',
    email: user?.user?.email || '',
  });

  const [error, setError] = useState<string>('');

  const handleEditProfile = async (): Promise<void> => {
    if (isEditing) {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      console.log('Token:', token);
      try {
        const response = await axios.put<{ user: User }>(
          'https://totstrackerserver.fly.dev/v1/users/profile',
          editedFields,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(response.data);
        setIsEditing(false);
        setError('');
      } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        setError(axiosError.response?.data?.message || 'Failed to update profile');
      }
      setLoading(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      setUser(null);
      setShowLogoutDialog(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const getInitials = (name: string | null): string => {
    return name
      ?.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase() || '?';
  };

  const formatMemberSince = (date: string | undefined): string => {
    if (!date) return 'N/A';
    try {
      const parsedDate = parseISO(date);
      return format(parsedDate, 'MMMM yyyy');
    } catch {
      return 'N/A';
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView>
        {/* Profile Header */}
        <View className="bg-white px-4 pt-6 pb-8">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-xl font-semibold text-gray-900">Profile</Text>
            {loading ? (
              <ActivityIndicator size={20} color="#3B82F6" />
            ) : (
              <TouchableOpacity 
                onPress={handleEditProfile}
                className="bg-gray-50 rounded-full p-2"
              >
                <Icon 
                  name={isEditing ? "checkmark" : "create-outline"} 
                  size={20} 
                  color="#374151" 
                />
              </TouchableOpacity>
            )}
          </View>

          <View className="items-center">
            <View className="w-24 h-24 rounded-full bg-blue-100 items-center justify-center mb-4">
              <Text className="text-2xl font-semibold text-blue-600">
                {getInitials(user?.name)}
              </Text>
            </View>
            
            {isEditing ? (
              <View className="w-full space-y-4">
                <TextInput
                  mode="outlined"
                  label="Name"
                  value={editedFields.name}
                  onChangeText={(text: string) => 
                    setEditedFields(prev => ({...prev, name: text}))}
                  className="bg-white text-black"
                  outlineColor="#E5E7EB"
                  activeOutlineColor="#3B82F6"
                  textColor='black'
                />
                <TextInput
                  mode="outlined"
                  label="Email"
                  value={editedFields.email}
                  onChangeText={(text: string) => 
                    setEditedFields(prev => ({...prev, email: text}))}
                  className="bg-white"
                  outlineColor="#E5E7EB"
                  activeOutlineColor="#3B82F6"
                  disabled
                  textColor='gray'
                />
                {error && (
                  <Text className="text-red-500 text-sm text-center">{error}</Text>
                )}
              </View>
            ) : (
              <View className="items-center">
                <Text className="text-xl font-semibold text-gray-900 mb-1">
                  {user?.user?.name || 'User'}
                </Text>
                <Text className="text-gray-500 mb-2">{user?.user?.email}</Text>
                <View className="flex-row items-center">
                  <Icon name="shield-checkmark" size={16} color="#10B981" />
                  <Text className="text-sm text-gray-500 ml-1">
                    {user?.role === 'admin' ? 'Admin Account' : 'Verified Account'}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>

        {/* Account Settings */}
        <View className="px-4 py-6">
          <Text className="text-sm font-medium text-gray-500 mb-3 px-1">
            ACCOUNT SETTINGS
          </Text>
          
          <MenuItem
            icon="time-outline"
            title="Member Since"
            rightText={formatMemberSince(user?.user?.createdAt)}
            onPress={() => {}}
          />
          
          <MenuItem
            icon="log-out-outline"
            title="Logout"
            onPress={() => setShowLogoutDialog(true)}
          />
        </View>
      </ScrollView>

      {/* Logout Dialog */}
      <Portal>
        <Dialog
          visible={showLogoutDialog}
          onDismiss={() => setShowLogoutDialog(false)}
        >
          <Dialog.Title>Confirm Logout</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to logout?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <TouchableOpacity
              onPress={() => setShowLogoutDialog(false)}
              className="px-4 py-2"
            >
              <Text className="text-gray-600">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleLogout}
              className="px-4 py-2"
            >
              <Text className="text-red-500">Logout</Text>
            </TouchableOpacity>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

export default ProfileScreen;