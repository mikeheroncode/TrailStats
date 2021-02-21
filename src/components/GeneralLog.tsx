import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from './Colors';
import { useEventLog } from '../hooks/useEventLog';
import { FoodEventTile } from './FoodEventTile';
import { UnifiedEventLogItemTile } from './UnifiedEventLogItemTile';

export const GeneralLog = (props: Props) => {
  const {
    foodEvents,
    setFoodEvents,
    refreshListOfEvents,
    deleteFoodEvent,
    getAllEventsFromLog,
    eventLogItems,
    deleteEvent,
  } = useEventLog();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => getAllEventsFromLog()}
        style={styles.addItemButton}>
        <Text>Refresh</Text>
      </Pressable>
      <FlatList
        data={eventLogItems}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {}}
            onLongPress={() => {
              deleteEvent(item);
            }}
            style={styles.addItemButton}>
            <UnifiedEventLogItemTile unifiedEvent={item} isSelected={false} />
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
