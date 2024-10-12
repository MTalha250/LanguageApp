import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import LoginStackNavigation from './loginStackNavigation';
import Feather from 'react-native-vector-icons/Feather';
import HomeStackNavigation from './homeStackNavigation';
import ActivityStackNavigation from './activityStackNavigation';
import NotificationStackNavigation from './notificationsStackNavigation';
import useAuthStore from '../store/authStore';

const Tab = createBottomTabNavigator();

const RootNavigator = () => {

  const {user} = useAuthStore();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#1C6EAB',
          tabBarStyle: {
            paddingBottom: 7,
            height: 60,
          },
        }}>
        <Tab.Screen
          name={'Home'}
          component={user ? HomeStackNavigation : LoginStackNavigation}
          options={{
            tabBarIcon: ({color}) => (
              <Feather name="home" size={25} color={color} />
            ),
            headerShown: false,
          }}
        />

        <Tab.Screen
          name={'Activity'}
          component={user? ActivityStackNavigation : LoginStackNavigation}
          options={{
            tabBarIcon: ({color}) => (
              <Feather name="activity" size={30} color={color} />
            ),
            headerShown: false,
          }}
        />

        <Tab.Screen
          name={'Notifications'}
          component={user? NotificationStackNavigation : LoginStackNavigation}
          options={{
            tabBarIcon: ({color}) => (
              <Feather name="bell" size={30} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name={'Account'}
          component={user? LoginStackNavigation : LoginStackNavigation}
          options={{
            tabBarIcon: ({color}) => (
              <Feather name="user" size={30} color={color} />
            ),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
