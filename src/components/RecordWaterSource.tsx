import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Switch,
  TextInput,
} from 'react-native';
import Slider from '@react-native-community/slider';

import { Colors } from './Colors';
import { useWaterSource } from '../hooks/useWaterSource';

export const RecordWaterSource = () => {
  const { addWaterSource } = useWaterSource();
  const [flow, setFlow] = useState<number>(50);
  const [accessibility, setAccessibility] = useState<number>(50);
  const [description, setDescription] = useState<string>('');
  const recordWaterSource = () => {
    addWaterSource(flow, accessibility, 'Added Water Source');
  };
  return (
    <View style={styles.homeScreen}>
      <View style={styles.sliderUIContainer}>
        <View style={styles.currentWeightTextContainer}>
          <Text style={styles.locationSettingsText}>Flow of Water</Text>
          <TextInput
            style={styles.currentWeightTextInput}
            value={String(flow)}
            onChangeText={(newValue) => {
              setFlow(parseInt(newValue, 10));
            }}
            keyboardType={'numeric'}
          />
        </View>
        <Slider
          style={{ width: 300, height: 60 }}
          minimumValue={1}
          maximumValue={100}
          onValueChange={setFlow}
          value={flow}
          step={1}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />
      </View>
      <View style={styles.sliderUIContainer}>
        <View style={styles.currentWeightTextContainer}>
          <Text style={styles.locationSettingsText}>
            Accessibility from trail
          </Text>
          <TextInput
            style={styles.currentWeightTextInput}
            value={String(accessibility)}
            onChangeText={(newValue) => {
              setAccessibility(parseInt(newValue, 10));
            }}
            keyboardType={'numeric'}
          />
        </View>
        <Slider
          style={{ width: 300, height: 60 }}
          minimumValue={1}
          maximumValue={100}
          onValueChange={setAccessibility}
          value={accessibility}
          step={1}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />
      </View>
      <TextInput
        multiline={true}
        numberOfLines={4}
        onChangeText={(text) => setDescription(text)}
        value={description}
      />
      <Pressable
        style={styles.saveSettingsButton}
        onPress={() => {
          recordWaterSource();
        }}>
        <Text style={styles.locationSettingsText}>Record Water Source</Text>
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
