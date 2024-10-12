import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [step, setStep] = useState(1);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="w-full h-60 rounded-b-3xl overflow-hidden">
        <Image
          source={require('../../../assets/signup.png')}
          className="w-full h-full object-cover"
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute top-5 left-5 bg-white p-2 rounded-full">
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {step == 1 ? (
        <View className="flex-1 px-6 py-4">
          <Text className="text-2xl text-gray-800 mb-5">
            Create a New Account
          </Text>

          <Text className="text-gray-600 mb-1">Email</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 mb-4 text-base"
            placeholder="Enter an email address"
            keyboardType="email-address"
          />

          <Button
            className="w-full py-2 bg-green-400 rounded-lg"
            onPress={() => {
              setStep(2);
            }}>
            <Text className="text-base">Get Started</Text>
          </Button>

          <View className="flex-row items-center my-5">
            <View className="flex-1 h-px bg-gray-300" />
            <Text className="mx-3 text-base text-gray-500">or</Text>
            <View className="flex-1 h-px bg-gray-300" />
          </View>

          <Button
            className="w-full py-2 border border-gray-300 rounded-lg flex-row items-center justify-center"
            icon="google"
            mode="outlined"
            onPress={() => {}}>
            <Text className="text-base">Continue with Google</Text>
          </Button>

          <Text className="text-center text-gray-600 text-sm mt-5">
            By continuing, you agree to XYZ’s Terms and Privacy Policy.
          </Text>

          <TouchableOpacity
            onPress={() => {
              // @ts-ignore
              navigation.navigate('LoginScreen');
            }}>
            <Text className="text-center text-base text-gray-800">
              Don't have an account?{' '}
              <Text className="underline text-black">Join now</Text>
            </Text>
          </TouchableOpacity>
        </View>
      ) : step == 2 ? (
        <View className="flex-1 px-6 py-4">
          <Text className="text-2xl text-gray-800 mb-5">
            Enter Your Details
          </Text>

          {/* Email Input */}
          <Text className="text-gray-600 mb-1">Email</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 mb-4 text-base"
            placeholder="Enter an email address"
            keyboardType="email-address"
          />

          {/* Full Name Input */}
          <Text className="text-gray-600 mb-1">Enter your full name</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 mb-4 text-base"
            placeholder="Enter your full name"
          />

          {/* Password Input */}
          <Text className="text-gray-600 mb-1">Password</Text>
          <View className="relative">
            <TextInput
              className="border border-gray-300 rounded-lg p-3 mb-2 text-base"
              placeholder="Enter a password"
              secureTextEntry={true}
            />
            <TouchableOpacity className="absolute right-3 top-3">
              <Icon name="visibility-off" size={24} color="gray" />
            </TouchableOpacity>
          </View>

          {/* Password Strength Indicator */}
          <View className="flex-row mb-4">
            <View className="flex-1 h-1 bg-green-400 mr-1" />
            <View className="flex-1 h-1 bg-green-400 mr-1" />
            <View className="flex-1 h-1 bg-green-400 mr-1" />
            <View className="flex-1 h-1 bg-gray-200" />
          </View>

          {/* Continue Button */}
          <Button
            className="w-full py-2 bg-green-400 rounded-lg"
            onPress={() => {}}>
            <Text className="text-base text-white">Continue</Text>
          </Button>

          {/* Terms and Privacy Policy */}
          <Text className="text-center text-gray-600 text-sm mt-5">
            By continuing, you agree to XYZ’s Terms and Privacy Policy.
          </Text>

          {/* Login Link */}
          <TouchableOpacity
            onPress={() => {
              // @ts-ignore
              navigation.navigate('LoginScreen');
            }}>
            <Text className="text-center text-base text-gray-800">
              Already have an account?{' '}
              <Text className="underline text-black">Log in now</Text>
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default SignUpScreen;
