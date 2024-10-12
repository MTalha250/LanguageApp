import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/onboarding/loginScreen';
import SignUpScreen from '../screens/onboarding/signUpScreen';
import WelcomeScreen from '../screens/onboarding/welcomeScreen';

const Stack = createStackNavigator();

const LoginStackNavigation = ({navigation}: {navigation: any}) => {
  return (
    <Stack.Navigator
      initialRouteName="WelcomeScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={'WelcomeScreen'} component={WelcomeScreen} />
      <Stack.Screen name={'LoginScreen'} component={LoginScreen} />
      <Stack.Screen name={'SignUpScreen'} component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default LoginStackNavigation;
