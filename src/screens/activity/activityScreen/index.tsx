import React from 'react';
import { View, ScrollView, SafeAreaView, RefreshControl } from 'react-native';
import { Text, Card, Surface } from 'react-native-paper';
import useAuthStore from '../../../store/authStore';
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { format } from "date-fns";

const ActivityScreen = () => {
  const { user } = useAuthStore();
  const [recordings, setRecordings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const fetchRecordings = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(
        'https://totstrackerserver.fly.dev/v1/recordings/mine',
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setRecordings(response.data.recordings.sort((a:any, b:any) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching recordings:', error);
      setError('Failed to fetch recordings. Please try again.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecordings();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchRecordings().finally(() => setRefreshing(false));
  }, []);

  const convertDuration = (duration:any) => {
    const minutes = Math.floor(duration / 60);
    const seconds = (duration % 60).toFixed(0).padStart(2, '0');
    return `${minutes}.${seconds} mins`;
  };

  const StatRow = ({ label, value, color = '#000000' }:{
    label: string, value: string, color?: string
  }) => (
    <View className="flex-row justify-between py-1">
      <Text className="text-gray-600 text-sm">{label}</Text>
      <Text style={{ color }} className="text-sm font-medium">{value}</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="p-4 border-b border-gray-100 bg-white">
        <Text className="text-xl text-center font-semibold text-gray-900">
          Activity Logs
        </Text>
      </View>
      
      <ScrollView 
        className="px-4"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="py-2">
          {isLoading ? (
            <Text className="text-center py-4 text-gray-500">Loading...</Text>
          ) : error ? (
            <Text className="text-center py-4 text-red-500">{error}</Text>
          ) : (
            recordings.map((recording:any) => (
              <Surface
                key={recording._id}
                className="mb-3 rounded-2xl bg-white"
                elevation={1}
              >
                <View className="p-4">
                  <View className="flex-row justify-between items-start mb-4">
                    <View>
                      <Text className="text-lg font-medium text-gray-900 mb-1">
                        Recording{recording.childname ? ` - ${recording.childname}` : ''}
                      </Text>
                      <Text className="text-sm text-gray-500">
                        {format(new Date(recording.createdAt), "MMM dd, yyyy, h:mm a")}
                      </Text>
                    </View>
                    <View className="items-end">
                      <Text className="text-blue-600 text-base font-medium">
                        {convertDuration(recording.duration)}
                      </Text>
                      <Text className="text-xs text-gray-500">Duration</Text>
                    </View>
                  </View>

                  <StatRow 
                    label="Word Count" 
                    value={recording.wordCount || '0'} 
                  />
                  <StatRow 
                    label="Unique Words" 
                    value={recording.uniqueWords?.length || '0'} 
                  />
                  <StatRow 
                    label="Processing Status" 
                    value={recording.processingStatus?.charAt(0).toUpperCase() + 
                           recording.processingStatus?.slice(1) || 'Pending'}
                    color={recording.processingStatus === 'completed' ? '#22C55E' : '#6B7280'}
                  />

                  {recording.processingError && (
                    <Text className="mt-2 text-xs text-red-500">
                      {recording.processingError}
                    </Text>
                  )}
                </View>
              </Surface>
            ))
          )}
        </View>
        <View className="h-4" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ActivityScreen;