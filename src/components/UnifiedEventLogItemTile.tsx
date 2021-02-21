import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from './Colors';
import { UnifiedEventLogItem } from '../types/UnifiedEventLogItem';

interface Props {
  unifiedEvent: UnifiedEventLogItem;
  isSelected: boolean;
}

export const UnifiedEventLogItemTile = (props: Props) => {
  const { unifiedEvent, isSelected } = props;
  return (
    <View style={styles.foodEvent}>
      <View style={styles.foodEventTextContainer}>
        <Text style={styles.eventText}>{unifiedEvent.name}</Text>
      </View>
      <View style={styles.addItemButton}>
        <Text
          style={styles.eventText}>{`Event Id: ${unifiedEvent.event_id}`}</Text>
      </View>
      <View style={styles.addItemButton}>
        <Text style={styles.eventText}>
          {new Date(unifiedEvent.startTimestamp).toLocaleString()}
        </Text>
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
