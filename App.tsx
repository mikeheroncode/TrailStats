import 'react-native-gesture-handler';
import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { HomeScreen } from './src/components/HomeScreen';
import { GeneralLog } from './src/components/GeneralLog';
import { EditItems } from './src/components/EditItems';

import SQLite from 'react-native-sqlite-storage';
import { RootStackParamList } from './src/types/RootStackParamList';

const Tab = createMaterialTopTabNavigator<RootStackParamList>();

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
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="EditItems" component={EditItems} />
        <Tab.Screen name="Log" component={GeneralLog} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
