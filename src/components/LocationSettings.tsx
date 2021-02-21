import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Switch,
  TextInput,
  ToastAndroid,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDatabase } from '../context/DatabaseContext';
import Geolocation from 'react-native-geolocation-service';
import Slider from '@react-native-community/slider';
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  route: HomeScreenRouteProp;
  navigation: HomeScreenNavigationProp;
};

import { Colors } from './Colors';
import { RootStackParamList } from '../types/RootStackParamList';
import { useLocation } from '../hooks/useLocation';

export const LocationSettings = (props: Props) => {
  const { locationSettings, setLocationSettings, addTest } = useLocation();
  const [includeLocationEnabled, setIncludeLocationEnabled] = useState(
    locationSettings.includeLocation,
  );
  const [highAccuracyEnabled, setHighAccuracyEnabled] = useState(
    locationSettings.enableHighAccuracy,
  );
  const includeLocationToggleSwitch = () =>
    setIncludeLocationEnabled((previousState) => !previousState);
  const highAccuracyEnabledToggleSwitch = () =>
    setHighAccuracyEnabled((previousState) => !previousState);

  const [eventName, setEventName] = useState<string>('');

  const locationTest = () => {
    console.log(`LOCATION SETTINGS: ${JSON.stringify(locationSettings)}`);
    addTest(eventName);
    ToastAndroid.show('FINISHED LOCATIONTEST', ToastAndroid.SHORT);
  };
  /*
    setLocationSettings({
              ...locationSettings,
              maxTimeout: newValue,
            });*/
  return (
    <View style={styles.homeScreen}>
      <View style={styles.switchUIContainer}>
        <Text style={styles.labelText}>Location For Events</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={includeLocationEnabled ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={includeLocationToggleSwitch}
          value={includeLocationEnabled}
          style={{ transform: [{ scaleX: 1.75 }, { scaleY: 1.5 }] }}
        />
      </View>
      <View style={styles.switchUIContainer}>
        <Text style={styles.labelText}>Enable High Accuracy</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={highAccuracyEnabled ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={highAccuracyEnabledToggleSwitch}
          value={highAccuracyEnabled}
          style={{ transform: [{ scaleX: 1.75 }, { scaleY: 1.5 }] }}
        />
      </View>
      <View style={styles.sliderUIContainer}>
        <View style={styles.currentWeightTextContainer}>
          <Text style={styles.labelText}>Maximum Timeout</Text>

          <TextInput
            style={styles.smallTextInput}
            value={String(locationSettings.maxTimeout)}
            onChangeText={(newValue) => {
              setLocationSettings({
                includeLocation: locationSettings.includeLocation,
                enableHighAccuracy: locationSettings.enableHighAccuracy,
                maxTimeout: parseInt(newValue, 10),
                maxAge: locationSettings.maxAge,
              });
            }}
            keyboardType={'numeric'}
          />
        </View>
        <Slider
          style={{ width: 300, height: 60 }}
          minimumValue={0}
          maximumValue={1000000}
          step={1000}
          onValueChange={(newValue) => {}}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />
      </View>
      <View style={styles.sliderUIContainer}>
        <Text style={styles.labelText}>Maximum Age</Text>
        <Slider
          style={{ width: 300, height: 80 }}
          minimumValue={0}
          maximumValue={1000000}
          step={1000}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />
      </View>
      <Pressable style={styles.saveSettingsButton} onPress={() => {}}>
        <Text style={styles.labelText}>Create</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  homeScreen: {
    backgroundColor: Colors.green,
    flex: 1,
    paddingTop: 25,
    alignItems: 'center',
  },
  homeButtonText: {
    color: Colors.white,
    fontSize: 20,
  },
  switchUIContainer: {
    marginVertical: 20,
    display: 'flex',
    flexDirection: 'row',
  },
  sliderUIContainer: {
    marginVertical: 20,
  },
  labelText: {
    color: Colors.white,
    fontSize: 25,
    marginRight: 25,
  },
  saveSettingsButton: {
    width: '60%',
    backgroundColor: Colors.blue,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  currentWeightTextContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  smallTextInput: {
    backgroundColor: Colors.purpleLight,
    height: 40,
    width: 60,
    borderColor: 'gray',
    borderWidth: 1,
    color: Colors.white,
    marginTop: 5,
  },
});
