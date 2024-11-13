import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, SafeAreaView } from 'react-native';
import { Text, Avatar, Button, Card, ActivityIndicator } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuthStore from '../../../store/authStore';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const { user } = useAuthStore();
  const [recordings, setRecordings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRecordings();
  }, []);

  const fetchRecordings = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get('https://totstrackerserver.fly.dev/v1/recordings/mine', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRecordings(response.data.recordings);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching recordings:', error);
      setError('Failed to fetch recordings. Please try again.');
      setIsLoading(false);
    }
  };

  const totalWords = recordings.reduce((sum, recording:any) => {
    const wordCount = typeof recording?.wordCount === 'number' ? recording.wordCount : 0;
    return sum + wordCount;
  }, 0);

  const uniqueWords = [...new Set(recordings.flatMap((recording:any) => recording?.uniqueWords || []))];

  const chartData = {
    labels: recordings.map((_, index) => `Day ${index + 1}`),
    datasets: [{
      data: recordings.map((recording:any) => {
        const wordCount = typeof recording?.wordCount === 'number' ? recording.wordCount : 0;
        return wordCount;
      }).filter(count => !isNaN(count) && isFinite(count))
    }]
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#279AF1" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">{error}</Text>
        <Button onPress={fetchRecordings}>Retry</Button>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row justify-between items-center px-6 py-3 border-b border-gray-200">
        <Text className="text-lg font-bold text-black ">Home</Text>
        <Icon 
        onPress={() => {
          //@ts-ignore
          navigation.navigate('Notifications');
        }}
        name="bell" size={24} color="black" />
      </View>
      <ScrollView className="px-6 py-4">
        <View>
          <Text className="text-xl font-semibold text-black">Welcome, {user?.name}</Text>
          <Text className="text-gray-600">Discover new words your child is learning.</Text>
        </View>
        <Card className="m-4 rounded-lg mx-0">
          <View className="p-4 flex-row items-center justify-between bg-[#279AF1] rounded-lg">
            <View>
              <Text className="text-2xl text-white">Word Count</Text>
              <Text className="text-4xl text-white">{totalWords}</Text>
            </View>
            <Image source={require('../../../assets/home1.png')} className="w-28 h-28" resizeMode="contain" />
          </View>
        </Card>
        <Card className="mx-4 rounded-lg mx-0">
          <View className="p-4 flex-row items-center justify-between bg-[#6EEB83] rounded-lg">
            <View>
              <Text className="text-2xl w-2/3 text-gray-800">Unique Words Learnt</Text>
              <Text className="text-4xl text-gray-800">{uniqueWords.length}</Text>
            </View>
            <Image source={require('../../../assets/home2.png')} className="w-28 h-28" resizeMode="cover" />
          </View>
        </Card>
        <Card className="m-4 rounded-lg mx-0">
          <View className="p-4 bg-blue-50 rounded-lg">
            <View className="flex-row justify-between items-center">
              <Text className="text-xl w-1/2 text-gray-800">Learning Journey</Text>
              <Button mode="text" onPress={() => {}}>
                <Text className="text-black">Details</Text>
              </Button>
            </View>
            {chartData.datasets[0].data.length > 0 ? (
              <LineChart
                data={chartData}
                width={300}
                height={200}
                chartConfig={{
                  backgroundColor: '#ffffff',
                  backgroundGradientFrom: '#ffffff',
                  backgroundGradientTo: '#ffffff',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(39, 154, 241, ${opacity})`,
                  style: {
                    borderRadius: 16
                  }
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16
                }}
              />
            ) : (
              <Text className="text-center text-gray-500 my-4">No data available for chart</Text>
            )}
            <Text className="text-right text-sm text-gray-800 mt-2">
              avg {(totalWords / (recordings.length || 1)).toFixed(1)} words
            </Text>
          </View>
        </Card>
      <Text> </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;