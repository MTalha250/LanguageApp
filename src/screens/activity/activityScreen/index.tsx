import React from 'react';
import {View, ScrollView, TouchableOpacity, SafeAreaView} from 'react-native';
import {Text, Button, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ActivityScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4 border-b border-gray-200">
        <Text className="text-xl text-center font-bold">Activity Logs</Text>
      </View>
      <View className="px-6 py-4">
        <Button
          mode="contained"
          icon="calendar"
          className="bg-blue-500 text-white rounded-lg">
          04-10-24
        </Button>
      </View>
      <ScrollView className="px-6 py-4">
        <Text className="text-lg font-semibold mb-2">Oct 04</Text>
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="mb-4 rounded-lg">
            <View className="p-4 flex-row items-center bg-gray-100 rounded-lg">
              <TouchableOpacity className="mr-4">
                <Icon name="play-arrow" size={30} color="blue" />
              </TouchableOpacity>
              <View className="flex-1 flex-row justify-between items-center">
                <View className="bg-gray-300 h-6 w-full rounded-lg" />
              </View>
              <View className="ml-4">
                <Text className="text-xs text-gray-500">10:23</Text>
                <Text className="text-xs text-gray-500">11:39 PM</Text>
              </View>
            </View>
          </Card>
        ))}

        <Text className="text-lg font-semibold mb-2">Oct 03</Text>
        {[...Array(2)].map((_, index) => (
          <Card key={index} className="mb-4 rounded-lg">
            <View className="p-4 flex-row items-center bg-gray-100 rounded-lg">
              <TouchableOpacity className="mr-4">
                <Icon name="play-arrow" size={30} color="blue" />
              </TouchableOpacity>
              <View className="flex-1 flex-row justify-between items-center">
                <View className="bg-gray-300 h-6 w-full rounded-lg" />
              </View>
              <View className="ml-4">
                <Text className="text-xs text-gray-500">10:23</Text>
                <Text className="text-xs text-gray-500">11:39 PM</Text>
              </View>
            </View>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ActivityScreen;
