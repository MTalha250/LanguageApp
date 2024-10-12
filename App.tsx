import {View} from 'react-native';
import React from 'react';
import RootNavigator from './src/navigations/rootNavigator';
import {LogBox} from 'react-native';
import {PaperProvider} from 'react-native-paper';

const App = () => {
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state.',
  ]);

  return (
    <PaperProvider>
      <View style={{height: '100%'}}>
        <RootNavigator />
      </View>
    </PaperProvider>
  );
};

export default App;
