import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from './Colors';
import { FoodItem } from '../types/FoodItem';
import { useEventLog } from '../hooks/useEventLog';

export const GeneralLog = (props: Props) => {
  const { foodEvents, setFoodEvents, refreshListOfEvents } = useEventLog();
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => refreshListOfEvents}
        style={styles.addItemButton}>
        <Text>Refresh</Text>
      </Pressable>
      <FlatList
        data={foodEvents}
        renderItem={({ item }) => (
          <View style={styles.foodEvent}>
            <View style={styles.foodEventTextContainer}>
              <Text style={styles.eventText}>{item.name}</Text>
            </View>
            <View style={styles.addItemButton}>
              <Text style={styles.homeButtonText}>{item.timestamp}</Text>
            </View>
          </View>
        )}
      />
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
