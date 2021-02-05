import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from './Colors';
import { FoodItem } from '../types/FoodItem';
import { useEventLog } from '../hooks/useEventLog';
import { FoodEventTile } from './FoodEventTile';

export const GeneralLog = (props: Props) => {
  const {
    foodEvents,
    setFoodEvents,
    refreshListOfEvents,
    deleteFoodEvent,
  } = useEventLog();
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
          <Pressable
            onPress={() => {}}
            onLongPress={() => {
              deleteFoodEvent(item);
            }}
            style={styles.addItemButton}>
            <FoodEventTile foodEvent={item} isSelected={false} />
          </Pressable>
        )}
        keyExtractor={(item, index) => index.toString()}
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
