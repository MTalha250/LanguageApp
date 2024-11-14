import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import {Button, Text, HelperText} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [keyboardStatus, setKeyboardStatus] = useState(false);

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

  const handleRegister = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);
    try {
      setError('');
      const res = await axios.post(
        'https://totstrackerserver.fly.dev/v1/users/register',
        {
          name: 'user',
          email,
          password,
        },
      );
      //@ts-ignore
      navigation.navigate('LoginScreen');
    } catch (error: any) {
      setError(
        error.response?.data?.message || 'An error occurred. Please try again.',
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
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    return true;
  };

  const checkPasswordStrength = (pass: any) => {
    let strength = 0;
    if (pass.length > 7) strength++;
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
    if (pass.match(/[0-9]/)) strength++;
    if (pass.match(/[^a-zA-Z\d]/)) strength++;
    setPasswordStrength(strength);
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
              source={require('../../../assets/signup.png')}
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
              Create Account
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
                  placeholder="Create a strong password"
                  placeholderTextColor="gray"
                  value={password}
                  onChangeText={text => {
                    setPassword(text);
                    checkPasswordStrength(text);
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
              {password && (
                <HelperText 
                className={`text-xs ml-[-10px] mt-2 ${passwordStrength < 3 ? passwordStrength < 2 ? 'text-red-500' : 'text-yellow-500' : 'text-green-500'}`}
                type={passwordStrength > 2 ? 'info' : 'error'}>
                  {passwordStrength < 2 && 'Weak password'}
                  {passwordStrength === 2 && 'Moderate password'}
                  {passwordStrength > 2 && 'Strong password'}
                </HelperText>
              )}
              <View className="flex-row mt-2">
                {[...Array(4)].map((_, index) => (
                  <View
                    key={index}
                    className={`flex-1 h-1 ${
                      index < passwordStrength ? 'bg-green-500' : 'bg-gray-300'
                    } ${index < 3 ? 'mr-1' : ''} rounded-full`}
                  />
                ))}
              </View>
            </View>
            {error ? (
              <HelperText type="error" className="mb-2 text-red-500 mt-[-10px] ml-[-10px]">
                {error}
              </HelperText>
            ) : null}
            <Button
              mode="contained"
              className="bg-green-500 py-2 rounded-lg"
              onPress={handleRegister}
              loading={isLoading}
              disabled={isLoading}>
            <Text className="text-white">Sign Up</Text>
            </Button>
            <Text className="text-center text-gray-600 text-xs mt-6">
              By continuing, you agree to TotsTracker's Terms of Service and
              Privacy Policy.
            </Text>
            <TouchableOpacity
              //@ts-ignore
              onPress={() => navigation.navigate('LoginScreen')}
              className="mt-6">
              <Text className="text-center text-base text-gray-800">
                Already have an account?{' '}
                <Text className="font-semibold text-green-600">Log in</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
