import React from 'react';
import { View, Alert, StyleSheet, Text, Pressable } from 'react-native';
interface IProps {
  buttonText: string[];
}

import { Colors } from './Colors';

export const HomeScreen = () => {
  const buttonTexts = ['View General Log', 'Add New Item', 'Record Food Event'];
  return (
    <View style={styles.homeScreen}>
      {buttonTexts.map((buttonText, i) => {
        return (
          <Pressable
            key={i}
            onPress={() => Alert.alert(`${buttonText} was pressed`)}
            style={styles.homeButton}>
            <Text style={styles.homeButtonText}>{buttonText}</Text>
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
