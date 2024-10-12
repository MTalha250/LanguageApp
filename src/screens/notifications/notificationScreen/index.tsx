import React from 'react';
import {View, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import {Text, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const NotificationsScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4 border-b border-gray-200">
        <Text className="text-xl font-bold text-center">Notifications</Text>
      </View>

      <ScrollView className="px-6 py-4">
        <Text className="text-lg font-semibold mb-2">Today</Text>
        <Card className="mb-2 rounded-lg bg-blue-100">
          <View className="py-4 px-6 flex-row items-center">
            <Icon name="chatbubble-outline" size={26} color="black" />
            <View className="ml-4">
              <Text className="font-bold">New Word Learned!</Text>
              <Text className="text-gray-600">
                Your child just learned a new word: Papa! Keep up the great
                progress.
              </Text>
            </View>
          </View>
        </Card>

        <Card className="mb-2 rounded-lg bg-gray-100">
          <View className="py-4 px-6 flex-row items-center">
            <Icon name="clipboard-outline" size={26} color="black" />
            <View className="ml-4">
              <Text className="font-bold">Weekly Progress Report</Text>
              <Text className="text-gray-600">
                Your child has learned 5 new words this week! Check out their
                vocabulary milestones.
              </Text>
            </View>
          </View>
        </Card>

        <Card className="mb-2 rounded-lg bg-gray-100">
          <View className="py-4 px-6 flex-row items-center">
            <Icon name="clipboard-outline" size={26} color="black" />
            <View className="ml-4">
              <Text className="font-bold">Weekly Progress Report</Text>
              <Text className="text-gray-600">
                Your child has learned 5 new words this week! Check out their
                vocabulary milestones.
              </Text>
            </View>
          </View>
        </Card>

        <Card className="mb-2 rounded-lg bg-gray-100">
          <View className="py-4 px-6 flex-row items-center">
            <Icon name="chatbubble-outline" size={26} color="black" />
            <View className="ml-4">
              <Text className="font-bold">New Word Learned!</Text>
              <Text className="text-gray-600">
                Your child just learned a new word: Papa! Keep up the great
                progress.
              </Text>
            </View>
          </View>
        </Card>
        <Text className="text-lg font-semibold mb-2">Yesterday</Text>
        <Card className="mb-2 rounded-lg bg-gray-100">
          <View className="py-4 px-6 flex-row items-center">
            <Icon name="chatbubble-outline" size={26} color="black" />
            <View className="ml-4">
              <Text className="font-bold">New Word Learned!</Text>
              <Text className="text-gray-600">
                Your child just learned a new word: Papa! Keep up the great
                progress.
              </Text>
            </View>
          </View>
        </Card>

        <Card className="mb-2 rounded-lg bg-gray-100">
          <View className="py-4 px-6 flex-row items-center">
            <Icon name="clipboard-outline" size={26} color="black" />
            <View className="ml-4">
              <Text className="font-bold">Weekly Progress Report</Text>
              <Text className="text-gray-600">
                Your child has learned 5 new words this week! Check out their
                vocabulary milestones.
              </Text>
            </View>
          </View>
        </Card>

        <Card className="mb-2 rounded-lg bg-gray-100">
          <View className="py-4 px-6 flex-row items-center">
            <Icon name="clipboard-outline" size={26} color="black" />
            <View className="ml-4">
              <Text className="font-bold">Weekly Progress Report</Text>
              <Text className="text-gray-600">
                Your child has learned 5 new words this week! Check out their
                vocabulary milestones.
              </Text>
            </View>
          </View>
        </Card>

        <Card className="mb-2 rounded-lg bg-gray-100">
          <View className="py-4 px-6 flex-row items-center">
            <Icon name="chatbubble-outline" size={26} color="black" />
            <View className="ml-4">
              <Text className="font-bold">New Word Learned!</Text>
              <Text className="text-gray-600">
                Your child just learned a new word: Papa! Keep up the great
                progress.
              </Text>
            </View>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationsScreen;
