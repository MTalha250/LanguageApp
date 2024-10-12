import React from 'react';
import {
  View,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LoginScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="w-full h-60 rounded-b-3xl overflow-hidden">
        <Image
          source={require('../../../assets/login.jpg')}
          className="w-full h-full object-cover"
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute top-5 left-5 bg-white p-2 rounded-full">
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View className="flex-1 px-6 py-4">
        <Text className="text-2xl text-gray-800 mb-5">Welcome Back</Text>
        <Text className="text-gray-600 mb-1">Email</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-3 mb-3 text-base"
          placeholder="Enter an email address"
          keyboardType="email-address"
        />
        <Text className="text-gray-600 mb-1">Password</Text>
        <View className="flex-row items-center border border-gray-300 rounded-lg px-3 mb-4">
          <TextInput
            className="flex-1 text-base"
            placeholder="Password"
            secureTextEntry
          />
          <TouchableOpacity>
            <Icon name="visibility-off" size={24} color="gray" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text className="text-blue-500 underline mb-4">Forgot Password</Text>
        </TouchableOpacity>
        <Button className="bg-green-400 rounded-lg py-2" onPress={() => {}}>
          <Text className="text-base">Log in</Text>
        </Button>
        <View className="flex-row items-center my-2">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="mx-3 text-base text-gray-600">or</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>
        <Button
          className="border border-gray-300 rounded-lg py-2 mb-2"
          icon="google"
          mode="outlined"
          onPress={() => {}}>
          Continue with Google
        </Button>
        <Text className="text-center text-gray-600 text-sm">
          By continuing, you agree to XYZ’s Terms and Privacy Policy.
        </Text>
        <TouchableOpacity
          onPress={() =>
            //@ts-ignore
            navigation.navigate('SignUpScreen')
          }>
          <Text className="text-center text-base">
            Don't have an account? <Text className="underline">Join now</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
