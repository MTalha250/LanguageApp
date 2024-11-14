import {View} from 'react-native';
import React from 'react';
import RootNavigator from './src/navigations/rootNavigator';
import {LogBox} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useEffect} from 'react';
import useAuthStore from './src/store/authStore';

const App = () => {
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state.',
  ]);

  const {user, setUser} = useAuthStore();

  async function checkTokenAndLogin() {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const res = await loginBack(token);
      console.log(res);
      setUser(res);
    }
  }

  async function loginBack(token: any) {
    try {
      console.log('token', token);
      const res = await axios.get('https://totstrackerserver.fly.dev/v1/users/login/back', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error:any) {
      console.log(error.response.data);
    }
  }

  useEffect(() => {
    checkTokenAndLogin();
  }, []);

  return (
    <PaperProvider>
      <View style={{height: '100%'}}>
        <RootNavigator />
      </View>
    </PaperProvider>
  );
};

export default App;
