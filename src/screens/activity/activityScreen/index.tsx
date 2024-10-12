import React from 'react';
import {View, ScrollView, TouchableOpacity, SafeAreaView} from 'react-native';
import {Text, Button, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useAuthStore from '../../../store/authStore';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {format} from "date-fns";

const ActivityScreen = () => {
  const {user} = useAuthStore();
  const [recordings, setRecordings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRecordings();
  }, []);

  const fetchRecordings = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(
        'http://192.168.0.101:4000/v1/recordings/mine',
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );
      setRecordings(response.data.recordings);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching recordings:', error);
      setError('Failed to fetch recordings. Please try again.');
      setIsLoading(false);
    }
  };

  const convertDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}m ${seconds}s`;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4 border-b border-gray-200">
        <Text className="text-xl text-center font-bold text-black">Activity Logs</Text>
      </View>

      <ScrollView className="px-6 py-4">
        {recordings.map((rec: any, index) => (
          <Card key={rec._id} className="mb-4 rounded-lg">
            <View className="p-4 flex-row items-center bg-gray-100 rounded-lg">
              <TouchableOpacity className="mr-4">
                <Icon name="play-arrow" size={30} color="blue" />
              </TouchableOpacity>
              <View className="flex-1 flex-row justify-between items-center">
                <View className="bg-gray-300 h-6 w-full rounded-lg" />
              </View>
              <View className="ml-4">
                <Text className="text-xs text-gray-500">{convertDuration(rec.duration)}</Text>
                <Text className="text-xs text-gray-500">{format(new Date(rec.createdAt), "MMM dd, yyyy")}</Text>
              </View>
            </View>
          </Card>
        ))}
        <Text> </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ActivityScreen;
