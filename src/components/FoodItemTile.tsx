import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from './Colors';
import { FoodItem } from '../types/FoodItem';

type Props = {
  foodItem: FoodItem;
  isSelected: boolean;
};

export const FoodItemTile = (props: Props) => {
  const { foodItem, isSelected } = props;
  return (
    <View
      style={
        isSelected ? styles.buttonTextContainer : styles.buttonTextContainer
      }>
      <Text style={styles.homeButtonText}>{foodItem.name}</Text>
      <Text style={styles.homeButtonText}>{foodItem.calories}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonTextContainer: {},
  homeButtonText: {
    color: Colors.white,
    fontSize: 20,
  },
});
