import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, SafeAreaView, RefreshControl, TouchableOpacity } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { format } from 'date-fns';

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNotifications = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(
        'https://totstrackerserver.fly.dev/v1/users/me/notifications',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotifications(response.data.notifications); 
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchNotifications().finally(() => setRefreshing(false));
  }, []);

  const markAsRead = async (notificationId:any) => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.post(
        `https://totstrackerserver.fly.dev/v1/users/notifications/${notificationId}/read`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchNotifications();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const renderNotification = (notification:any) => {
    const isRecordingCompleted = notification.type === 'RECORDING_COMPLETED';
    const iconName = isRecordingCompleted ? 'checkmark-circle-outline' : 'bulb-outline';
    const bgColor = notification.read ? 'bg-gray-50' : 'bg-blue-50';

    return (
      <TouchableOpacity
        key={notification._id}
        onPress={() => markAsRead(notification._id)}
        className="mb-3"
      >
        <Surface className={`rounded-xl ${bgColor}`} elevation={1}>
          <View className="py-4 px-5 flex-row items-start">
            <View className="bg-white rounded-full p-2">
              <Icon name={iconName} size={24} 
                    color={isRecordingCompleted ? '#10B981' : '#F59E0B'} />
            </View>
            <View className="ml-4 flex-1">
              <Text className="font-bold text-gray-900 mb-1">
                {isRecordingCompleted ? 'Recording Processing Completed' : 'New Word Learned!'}
              </Text>
              <Text className="text-gray-600 text-sm">
                {notification.message}
                {notification.metadata.wordCount && 
                  ` (${notification.metadata.wordCount} words processed)`}
                {notification.metadata.word && 
                  ` The new word is: "${notification.metadata.word}"`}
              </Text>
              <Text className="text-xs text-gray-400 mt-2">
                {format(new Date(notification.createdAt), 'MMM d, h:mm a')}
              </Text>
            </View>
          </View>
        </Surface>
      </TouchableOpacity>
    );
  };

  const groupNotificationsByDate = (notifications:any) => {
    const groups:any = {};
    notifications.forEach((notification:any) => {
      const date:any = format(new Date(notification.createdAt), 'yyyy-MM-dd');
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(notification);
    });
    return groups;
  };

  const getDateHeader = (date:any) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const yesterday = format(new Date(Date.now() - 86400000), 'yyyy-MM-dd');
    
    switch (date) {
      case today:
        return 'Today';
      case yesterday:
        return 'Yesterday';
      default:
        return format(new Date(date), 'MMMM d');
    }
  };

  const groupedNotifications = groupNotificationsByDate(notifications);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="p-4 border-b border-gray-100 bg-white">
        <Text className="text-xl font-semibold text-center text-gray-900">
          Notifications
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="px-4 py-2">
          {isLoading ? (
            <Text className="text-center py-4 text-gray-500">Loading...</Text>
          ) : notifications.length === 0 ? (
            <View className="py-8 items-center">
              <Icon name="notifications-off-outline" size={48} color="#9CA3AF" />
              <Text className="text-gray-500 mt-4">No notifications yet</Text>
            </View>
          ) : (
            Object.entries(groupedNotifications).map(([date, notifications]:[any, any]) => (
              <View key={date} className="mb-4">
                <Text className="text-sm font-medium text-gray-500 mb-2 px-1">
                  {getDateHeader(date)}
                </Text>
                {notifications.map(renderNotification)}
              </View>
            ))
          )}
        </View>
        <View className="h-4" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationsScreen;