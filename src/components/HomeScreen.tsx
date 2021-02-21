import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDatabase } from '../context/DatabaseContext';
import Geolocation from 'react-native-geolocation-service';
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  route: HomeScreenRouteProp;
  navigation: HomeScreenNavigationProp;
};

import { Colors } from './Colors';
import { RootStackParamList } from '../types/RootStackParamList';

export const HomeScreen = (props: Props) => {
  const buttonTexts = [
    { text: 'Record Event', route: 'RecordEvent' as keyof RootStackParamList },
    { text: 'View General Log', route: 'Log' as keyof RootStackParamList },
    { text: 'Add New Item', route: 'EditItem' as keyof RootStackParamList },
    {
      text: 'Record Weight',
      route: 'RecordWeight' as keyof RootStackParamList,
    },
    {
      text: 'Record Water Source',
      route: 'RecordWaterSource' as keyof RootStackParamList,
    },
    {
      text: 'Record Person',
      route: 'RecordPerson' as keyof RootStackParamList,
    },
    {
      text: 'Record Camp Event',
      route: 'RecordCampEvent' as keyof RootStackParamList,
    },
    {
      text: 'Location Settings',
      route: 'LocationSettings' as keyof RootStackParamList,
    },
  ];
  const getLocation = () => {
    if (true) {
      Geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    }
  };
  return (
    <View style={styles.homeScreen}>
      {buttonTexts.map((buttonText, i) => {
        return (
          <Pressable
            key={i}
            onPress={() => props.navigation.navigate(buttonText.route)}
            style={styles.homeButton}>
            <Text style={styles.homeButtonText}>{buttonText.text}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  homeScreen: {
    backgroundColor: Colors.green,
    flex: 1,
    alignItems: 'center',
  },
  homeButton: {
    width: '75%',
    height: 70,
    margin: 10,
    backgroundColor: Colors.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeButtonText: {
    color: Colors.white,
    fontSize: 20,
  },
});
