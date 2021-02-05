import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from './Colors';
import { Meal } from '../types/Meal';

type Props = {
  meal: Meal;
  isSelected: boolean;
};

export const MealTile = (props: Props) => {
  const { meal, isSelected } = props;
  return (
    <View
      style={
        isSelected ? styles.buttonTextContainer : styles.buttonTextContainer
      }>
      <Text style={styles.homeButtonText}>{meal.name}</Text>
      <Text style={styles.homeButtonText}>{meal.meal_id}</Text>
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
