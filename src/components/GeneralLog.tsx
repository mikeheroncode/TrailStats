import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from './Colors';
import { FoodItem } from '../types/FoodItem';

export const GeneralLog = (props: Props) => {
  return (
    <View style={styles.homeScreen}>
      <Text style={styles.homeButtonText}>{'HI'}</Text>
      <Text style={styles.homeButtonText}>{'YEP'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  homeScreen: {
    backgroundColor: Colors.green,
    flex: 1,
    alignItems: 'center',
  },
  buttonTextContainer: {},
  homeButtonText: {
    color: Colors.white,
    fontSize: 20,
  },
});
