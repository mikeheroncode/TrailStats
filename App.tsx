import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
import { EditItem } from './src/components/EditItem';
import { GeneralLog } from './src/components/GeneralLog';
import { HomeScreen } from './src/components/HomeScreen';
import { LocationSettings } from './src/components/LocationSettings';
import { RecordCampEvent } from './src/components/RecordCampEvent';
import { RecordEvent } from './src/components/RecordEvent';
import { RecordPerson } from './src/components/RecordPerson';
import { RecordWaterSource } from './src/components/RecordWaterSource';
import { RecordWeight } from './src/components/RecordWeight';
import { DatabaseProvider } from './src/context/DatabaseContext';
import { LocationSettingsProvider } from './src/context/LocationSettingsContext';
import { EventProvider } from './src/context/EventContext';
import { RootStackParamList } from './src/types/RootStackParamList';

const Tab = createMaterialTopTabNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <DatabaseProvider>
        <LocationSettingsProvider>
          <EventProvider>
            <Tab.Navigator
              initialRouteName="Home"
              swipeEnabled={true}
              tabBarOptions={{ style: { display: 'none' } }}>
              <Tab.Screen name="Home" component={HomeScreen} />
              <Tab.Screen name="RecordEvent" component={RecordEvent} />
              <Tab.Screen name="EditItem" component={EditItem} />
              <Tab.Screen name="Log" component={GeneralLog} />
              <Tab.Screen name="RecordWeight" component={RecordWeight} />
              <Tab.Screen
                name="LocationSettings"
                component={LocationSettings}
              />
              <Tab.Screen
                name="RecordWaterSource"
                component={RecordWaterSource}
              />
              <Tab.Screen name="RecordPerson" component={RecordPerson} />
              <Tab.Screen name="RecordCampEvent" component={RecordCampEvent} />
            </Tab.Navigator>
          </EventProvider>
        </LocationSettingsProvider>
      </DatabaseProvider>
    </NavigationContainer>
  );
};

export default App;
