import React from 'react';
import {View, SafeAreaView, Image} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-[#279AF1] relative">
        <View className="w-full justify-center items-center p-5">
          <Image
            source={require('../../../assets/welcomeImage.png')}
            className="w-full h-[40vh] object-contain"
          />
        </View>
        <View className="absolute bottom-0 w-full left-0 bg-white rounded-t-2xl p-6">
          <Text className="text-4xl text-blue-900 font-bold">
            Track Your Child's Progress
          </Text>
          <Text className="text-lg text-gray-500 mt-3">
            Watch their vocabulary grow with real-time insights.
          </Text>
          <View className="mt-5">
            <Button
              className="w-full py-2 bg-green-400 rounded-xl"
              onPress={() => {
                // @ts-ignore
                navigation.navigate('SignUpScreen');
              }}>
              <Text className="text-lg">Create an Account</Text>
            </Button>
            <Button
              className="w-full py-2 bg-black rounded-xl mt-3"
              onPress={() => {
                // @ts-ignore
                navigation.navigate('LoginScreen');
              }}>
              <Text className="text-lg text-white">Login</Text>
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
