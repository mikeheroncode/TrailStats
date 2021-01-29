import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from './Colors';
import { FoodItem } from '../types/FoodItem';
import { useEventLog } from '../hooks/useEventLog';
import { FoodEvent } from '../types/FoodEvent';

interface Props {
  foodEvent: FoodEvent;
  isSelected: boolean;
}

export const FoodEventTile = (props: Props) => {
  const { foodEvent, isSelected } = props;
  return (
    <View style={styles.foodEvent}>
      <View style={styles.foodEventTextContainer}>
        <Text style={styles.eventText}>{foodEvent.name}</Text>
      </View>
      <View style={styles.addItemButton}>
        <Text style={styles.eventText}>{foodEvent.timestamp}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  homeScreen: {
    backgroundColor: Colors.green,
    flex: 1,
    alignItems: 'center',
  },
  container: {
    backgroundColor: Colors.green,
    flex: 1,
    paddingTop: 22,
  },
  foodEvent: {
    margin: 5,
    backgroundColor: Colors.purpleLight,
  },
  foodEventTextContainer: {
    marginLeft: 50,
  },
  eventText: {
    color: Colors.white,
    fontSize: 20,
  },
  addItemButton: {
    width: '90%',
    marginTop: 5,
    backgroundColor: Colors.purpleLight,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
