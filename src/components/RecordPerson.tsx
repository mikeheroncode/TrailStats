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
import { PersonEvent, gender, hikeLength, shelter } from '../types/PersonEvent';
import { GenderDropdown } from './GenderDropdown';
import { HikeLengthDropdown } from './HikeLengthDropdown';
import { ShelterDropdown } from './ShelterDropdown';
import { ScrollView } from 'react-native-gesture-handler';
import { usePersonEvent } from '../hooks/usePersonEvent';

export const RecordPerson = () => {
  const { addPersonEvent, getLastPersonEvent } = usePersonEvent();
  const [currentGender, setCurrentGender] = useState<gender>(gender.male);
  const [currentHikeLength, setCurrentHikeLength] = useState<hikeLength>(
    hikeLength.thru,
  );
  const [currentShelter, setCurrentShelter] = useState<shelter>(shelter.tent);
  const [talkedTo, setTalkedTo] = useState<boolean>(false);
  const [wasWithLastPerson, setWasWithLastPerson] = useState<boolean>(false);
  const [age, setAge] = useState<number>(25);
  const [packWeight, setPackWeight] = useState<number>(25);
  const [trailName, setTrailName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const recordPersonEvent = () => {
    if (talkedTo) {
      addPersonEvent(
        age,
        currentGender,
        trailName,
        currentHikeLength,
        packWeight,
        currentShelter,
        description,
        wasWithLastPerson,
      );
    } else {
      addPersonEvent(
        age,
        currentGender,
        null,
        null,
        null,
        null,
        description,
        wasWithLastPerson,
      );
    }
  };
  return (
    <View style={styles.homeScreen}>
      <ScrollView style={styles.scroll}>
        <View style={styles.switchUIContainer}>
          <Text style={styles.locationSettingsText}>
            Group With Previous Person
          </Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={wasWithLastPerson ? '#f5dd4b' : '#f4f3f4'}
            onValueChange={setWasWithLastPerson}
            value={wasWithLastPerson}
            style={{ transform: [{ scaleX: 1.75 }, { scaleY: 1.5 }] }}
          />
        </View>
        <View style={styles.sliderUIContainer}>
          <View style={styles.currentWeightTextContainer}>
            <Text style={styles.locationSettingsText}>Age</Text>
            <TextInput
              style={styles.numberTextInput}
              value={String(age === Number.NaN ? '' : age)}
              onChangeText={(newValue) => {
                setAge(parseInt(newValue, 10));
              }}
              keyboardType={'numeric'}
              selectTextOnFocus={true}
            />
          </View>
        </View>
        <View style={styles.sliderUIContainer}>
          <Text style={styles.locationSettingsText}>Gender</Text>
          <GenderDropdown onSelectedValue={setCurrentGender} />
        </View>
        <View style={styles.switchUIContainer}>
          <Text style={styles.locationSettingsText}>Talked to Person</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={talkedTo ? '#f5dd4b' : '#f4f3f4'}
            onValueChange={setTalkedTo}
            value={talkedTo}
            style={{ transform: [{ scaleX: 1.75 }, { scaleY: 1.5 }] }}
          />
        </View>
        <View style={talkedTo ? { display: 'flex' } : { display: 'none' }}>
          <View style={styles.sliderUIContainer}>
            <View style={styles.currentWeightTextContainer}>
              <Text style={styles.locationSettingsText}>Trail Name</Text>
              <TextInput
                style={styles.smallTextInput}
                value={trailName}
                onChangeText={(newValue) => {
                  setTrailName(newValue);
                }}
                selectTextOnFocus={true}
              />
            </View>
          </View>
          <View style={styles.sliderUIContainer}>
            <Text style={styles.locationSettingsText}>Hike Length</Text>
            <HikeLengthDropdown
              selectedValue={currentHikeLength}
              onSelectedValue={setCurrentHikeLength}
            />
          </View>
          <View style={styles.sliderUIContainer}>
            <Text style={styles.locationSettingsText}>Shelter</Text>
            <ShelterDropdown
              selectedValue={currentShelter}
              onSelectedValue={setCurrentShelter}
            />
          </View>
          <View style={styles.sliderUIContainer}>
            <View style={styles.currentWeightTextContainer}>
              <Text style={styles.locationSettingsText}>Pack Weight</Text>
              <TextInput
                style={styles.numberTextInput}
                value={String(packWeight == Number.NaN ? '' : packWeight)}
                onChangeText={(newValue) => {
                  setPackWeight(parseInt(newValue, 10));
                }}
                keyboardType={'numeric'}
                selectTextOnFocus={true}
              />
            </View>
          </View>
          <TextInput
            multiline={true}
            numberOfLines={4}
            onChangeText={(text) => setDescription(text)}
            value={description}
          />
        </View>
        <Pressable
          style={styles.saveSettingsButton}
          onPress={() => {
            recordPersonEvent();
          }}>
          <Text style={styles.locationSettingsText}>Record Person</Text>
        </Pressable>
      </ScrollView>
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
  scroll: {
    backgroundColor: Colors.green,
    marginHorizontal: 5,
    flex: 1,
  },
  switchUIContainer: {
    marginVertical: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sliderUIContainer: {
    marginVertical: 15,
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
    width: '60%',
    backgroundColor: Colors.blue,
    alignItems: 'center',
    padding: 15,
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
  numberTextInput: {
    backgroundColor: Colors.purpleLight,
    height: 40,
    width: 60,
    borderColor: 'gray',
    borderWidth: 1,
    color: Colors.white,
    marginTop: 5,
  },
  smallTextInput: {
    backgroundColor: Colors.purpleLight,
    height: 40,
    width: 170,
    borderColor: 'gray',
    borderWidth: 1,
    color: Colors.white,
    marginTop: 5,
  },
});
