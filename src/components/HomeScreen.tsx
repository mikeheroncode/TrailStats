import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

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
    { text: 'Home Screen', route: 'Home' },
    { text: 'View General Log', route: 'Log' },
    { text: 'Add New Item', route: 'EditItems' },
  ];
  return (
    <View style={styles.homeScreen}>
      {buttonTexts.map((buttonText, i) => {
        return (
          <Pressable
            key={i}
            onPress={() => props.navigation.navigate('EditItems')}
            style={styles.homeButton}>
            <Text style={styles.homeButtonText}>{buttonText.text}</Text>
          </Pressable>
        );
      })}
      <Text>Hey this is a test</Text>
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
