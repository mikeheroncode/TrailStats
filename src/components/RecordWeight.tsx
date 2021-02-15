import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Switch,
  TextInput,
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
import { useLocationSettings } from '../context/LocationSettingsContext';
import { useWeightEvent } from '../hooks/useWeightEvents';

export const RecordWeight = (props: Props) => {
  const { lastWeightEvent, addWeightEvent } = useWeightEvent();
  const [lastWeight, setlastWeight] = useState<number>(lastWeightEvent.weight);
  const recordWeightEvent = () => {
    addWeightEvent('Recorded Weight', lastWeight);
  };
  return (
    <View style={styles.homeScreen}>
      <View style={styles.sliderUIContainer}>
        <View style={styles.currentWeightTextContainer}>
          <Text style={styles.locationSettingsText}>Current Weight</Text>
          <TextInput
            style={styles.currentWeightTextInput}
            value={String(lastWeight)}
            onChangeText={(newValue) => {
              setlastWeight(parseInt(newValue, 10));
            }}
            keyboardType={'numeric'}
          />
        </View>
        <Slider
          style={{ width: 300, height: 60 }}
          minimumValue={130}
          maximumValue={200}
          onValueChange={setlastWeight}
          value={lastWeight}
          step={0.5}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />
      </View>
      <Pressable
        style={styles.saveSettingsButton}
        onPress={() => {
          recordWeightEvent();
        }}>
        <Text style={styles.locationSettingsText}>Record Weight</Text>
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
    marginVertical: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sliderUIContainer: {
    marginVertical: 30,
  },
  currentWeightTextContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  locationSettingsText: {
    color: Colors.white,
    fontSize: 25,
    marginRight: 25,
  },
  saveSettingsButton: {
    width: '40%',
    backgroundColor: Colors.blue,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  editItemForm: {
    backgroundColor: Colors.purple,
    width: '85%',
    padding: 10,
    margin: 10,
  },
  editItemLabels: {
    color: Colors.white,
    fontSize: 20,
  },
  currentWeightTextInput: {
    backgroundColor: Colors.purpleLight,
    height: 40,
    width: 60,
    borderColor: 'gray',
    borderWidth: 1,
    color: Colors.white,
    marginTop: 5,
  },
});
