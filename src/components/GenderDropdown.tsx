import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import RNPickerSelect, { Item, PickerStyle } from 'react-native-picker-select';
import { PersonEvent, gender, hikeLength, shelter } from '../types/PersonEvent';

interface Props {
  onSelectedValue: React.Dispatch<React.SetStateAction<gender>>;
}

export const GenderDropdown = (props: Props) => {
  return (
    <RNPickerSelect
      onValueChange={(value) => props.onSelectedValue(value)}
      items={[
        { label: 'Male', value: gender.male },
        { label: 'Female', value: gender.female },
        { label: 'Nonconforming', value: gender.nonconforming },
      ]}
      style={styles.inputAndroid as PickerStyle}
    />
  );
};
const styles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'white',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
