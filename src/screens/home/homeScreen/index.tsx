import React from 'react';
import {View, ScrollView, Image, SafeAreaView} from 'react-native';
import {Text, Avatar, Button, Card} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
        <Text className="text-lg font-bold">Home</Text>
        <Avatar.Image
          size={40}
          source={require('../../../assets/Avatar.jpg')}
        />
      </View>

      <ScrollView className="px-6 py-4">
        <View>
          <Text className="text-xl font-semibold">Welcome, Sarah</Text>
          <Text className="text-gray-600">
            Discover new words your child is learning.
          </Text>
        </View>

        <Card className="m-4 rounded-lg mx-0">
          <View className="p-4 flex-row items-center justify-between bg-[#279AF1] rounded-lg">
            <View>
              <Text className="text-2xl text-white">Word Count</Text>
              <Text className="text-4xl text-white">25</Text>
            </View>
            <Image
              source={require('../../../assets/home1.png')}
              className="w-28 h-28"
              resizeMode="contain"
            />
          </View>
        </Card>
        <Card className="m-4 rounded-lg mx-0">
          <View className="p-4 flex-row items-center justify-between bg-[#6EEB83] rounded-lg">
            <View>
              <Text className="text-2xl w-2/3 text-gray-800">
                Actual Words Learnt
              </Text>
            </View>
            <Image
              source={require('../../../assets/home2.png')}
              className="w-28 h-28"
              resizeMode="cover"
            />
          </View>
        </Card>
        <Card className="m-4 rounded-lg mx-0">
          <View className="p-4 bg-blue-50 rounded-lg">
            <View className="flex-row justify-between items-center">
              <Text className="text-xl w-1/2 text-gray-800">
                Language Development Journey
              </Text>
              <Button mode="text" onPress={() => {}}>
                Details
              </Button>
            </View>
            <View className="h-40 bg-white mt-4 rounded-lg">
              <Text className="text-center text-gray-600 mt-12">
                Graph showing words progression
              </Text>
            </View>
            <Text className="text-right text-sm text-gray-800 mt-2">
              avg 3 words
            </Text>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
