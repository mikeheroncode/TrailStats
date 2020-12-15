import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './src/components/HomeScreen';
import { GeneralLog } from './src/components/GeneralLog';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="GeneralLog" component={GeneralLog} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
