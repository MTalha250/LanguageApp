import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ActivityScreen from '../screens/activity/activityScreen';

const Stack = createStackNavigator();

const ActivityStackNavigation = ({navigation}: {navigation: any}) => {
  return (
    <Stack.Navigator
      initialRouteName="ActivityScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={'ActivityScreen'} component={ActivityScreen} />
    </Stack.Navigator>
  );
};

export default ActivityStackNavigation;
