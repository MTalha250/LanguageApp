import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Keyboard,
} from 'react-native';
import {Button, Text, HelperText} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useAuthStore from '../../../store/authStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const {setUser} = useAuthStore();

  const fadeAnim = new Animated.Value(1);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleLogin = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);
    try {
      setError('');
      const response = await axios.post(
        'https://totstrackerserver.vercel.app/v1/users/login',
        {email, password},
      );
      await AsyncStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      //@ts-ignore
      navigation.navigate('Home');
    } catch (error: any) {
      setError(
        error.response?.data?.message || 'Login failed. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const validateInputs = () => {
    if (!email) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email address');
      return false;
    }
    if (!password) {
      setError('Password is required');
      return false;
    }
    return true;
  };

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <SafeAreaView className="flex-1 bg-white">
        <ScrollView className="flex-1">
          <Animated.View
            style={{opacity: fadeAnim}}
            className="w-full h-60 rounded-b-3xl overflow-hidden">
            <Image
              source={require('../../../assets/login.jpg')}
              className="w-full h-full object-cover"
            />
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="absolute top-5 left-5 bg-white p-2 rounded-full shadow-md">
              <Icon name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          </Animated.View>
          <View className="flex-1 px-6 py-4">
            <Text className="text-3xl font-bold text-gray-800 mb-6">
              Welcome Back
            </Text>
            <View className="mb-4">
              <Text className="text-gray-700 mb-2 font-medium">Email</Text>
              <TextInput
                className="border border-gray-300 rounded-lg text-black p-3 text-base bg-gray-50"
                placeholder="Enter your email address"
                placeholderTextColor="gray"
                keyboardType="email-address"
                value={email}
                onChangeText={text => {
                  setEmail(text);
                  setError('');
                }}
                autoCapitalize="none"
              />
            </View>
            <View className="mb-4">
              <Text className="text-gray-700 mb-2 font-medium">Password</Text>
              <View className="relative">
                <TextInput
                  className="border border-gray-300 rounded-lg text-black p-3 text-base bg-gray-50"
                  placeholder="Enter your password"
                  placeholderTextColor="gray"
                  value={password}
                  onChangeText={text => {
                    setPassword(text);
                    setError('');
                  }}
                  secureTextEntry={!passwordVisible}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  className="absolute right-3 top-3"
                  onPress={togglePasswordVisibility}>
                  <Icon
                    name={passwordVisible ? 'visibility' : 'visibility-off'}
                    size={24}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                /* Handle forgot password */
              }}>
              <Text className="text-blue-500 mb-4">Forgot Password?</Text>
            </TouchableOpacity>
            {error ? (
              <HelperText type="error" className="mb-4 text-red-500 ml-[-10px] mt-[-10px]">
                {error}
              </HelperText>
            ) : null}
            <Button
              mode="contained"
              className="bg-green-500 py-2 rounded-lg"
              onPress={handleLogin}
              loading={isLoading}
              disabled={isLoading}>
              Log In
            </Button>
            
            <Text className="text-center text-gray-600 mt-4 text-xs">
              By continuing, you agree to TotsTracker's Terms of Service and
              Privacy Policy.
            </Text>
            <TouchableOpacity
              //@ts-ignore
              onPress={() => navigation.navigate('SignUpScreen')}
              className="mt-2">
              <Text className="text-center text-base text-gray-800">
                Don't have an account?{' '}
                <Text className="font-semibold text-green-600">Join now</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
