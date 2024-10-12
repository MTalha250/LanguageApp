import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import LoginStackNavigation from './loginStackNavigation';
import Feather from 'react-native-vector-icons/Feather';
import HomeStackNavigation from './homeStackNavigation';
import ActivityStackNavigation from './activityStackNavigation';
import NotificationStackNavigation from './notificationsStackNavigation';
const Tab = createBottomTabNavigator();

const RootNavigator = () => {
  //   const {user, setUser} = useAuthStore();

  //   async function checkTokenAndLogin() {
  //     const token = await AsyncStorage.getItem('token');
  //     if (token) {
  //       const res = await loginBack();
  //       // console.log(res);
  //       setUser(res.user);
  //     }
  //   }

  //   useEffect(() => {
  //     checkTokenAndLogin();
  //   }, []);

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
          component={HomeStackNavigation}
          options={{
            tabBarIcon: ({color}) => (
              <Feather name="home" size={25} color={color} />
            ),
            headerShown: false,
          }}
        />

        <Tab.Screen
          name={'Notifications'}
          component={NotificationStackNavigation}
          options={{
            tabBarIcon: ({color}) => (
              <Feather name="bell" size={30} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name={'Activity'}
          component={ActivityStackNavigation}
          options={{
            tabBarIcon: ({color}) => (
              <Feather name="activity" size={30} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name={'Account'}
          component={LoginStackNavigation}
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
