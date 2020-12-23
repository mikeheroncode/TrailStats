import 'react-native-gesture-handler';
import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './src/components/HomeScreen';
import { GeneralLog } from './src/components/GeneralLog';
import { EditItems } from './src/components/EditItems';

import SQLite from 'react-native-sqlite-storage';
import { RootStackParamList } from './src/types/RootStackParamList';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  useEffect(() => {
    SQLite.DEBUG(true);
    SQLite.enablePromise(true);

    SQLite.openDatabase({
      name: 'TestDatabase',
      location: 'default',
    }).then((db) => {
      console.log('Database open!');
      console.log(db);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="EditItems" component={EditItems} />
        <Stack.Screen name="Log" component={GeneralLog} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
