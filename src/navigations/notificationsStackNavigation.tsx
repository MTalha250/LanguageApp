import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NotificationsScreen from '../screens/notifications/notificationScreen';

const Stack = createStackNavigator();

const NotificationStackNavigation = ({navigation}: {navigation: any}) => {
  return (
    <Stack.Navigator
      initialRouteName="NotificationsScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={'NotificationsScreen'}
        component={NotificationsScreen}
      />
    </Stack.Navigator>
  );
};

export default NotificationStackNavigation;
