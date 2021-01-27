import 'react-native-gesture-handler';
import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { HomeScreen } from './src/components/HomeScreen';
import { GeneralLog } from './src/components/GeneralLog';
import { EditItem } from './src/components/EditItem';
import { DatabaseProvider } from './src/context/DatabaseContext';

import SQLite from 'react-native-sqlite-storage';
import { RootStackParamList } from './src/types/RootStackParamList';

const Tab = createMaterialTopTabNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <DatabaseProvider>
        <Tab.Navigator
          initialRouteName="Home"
          swipeEnabled={true}
          tabBarOptions={{ style: { display: 'none' } }}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="EditItem" component={EditItem} />
          <Tab.Screen name="Log" component={GeneralLog} />
        </Tab.Navigator>
      </DatabaseProvider>
    </NavigationContainer>
  );
};

export default App;
