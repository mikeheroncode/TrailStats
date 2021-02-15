import React, { useState } from 'react';
import RNPickerSelect, { Item } from 'react-native-picker-select';
import { PersonEvent, gender, hikeLength, shelter } from '../types/PersonEvent';

interface Props {
  selectedValue: hikeLength;
  onSelectedValue: React.Dispatch<React.SetStateAction<hikeLength>>;
}

export const HikeLengthDropdown = (props: Props) => {
  return (
    <RNPickerSelect
      onValueChange={(value) => props.onSelectedValue(value)}
      items={[
        { label: 'Day', value: hikeLength.day },
        { label: 'Weekend', value: hikeLength.weekend },
        { label: 'Section', value: hikeLength.section },
        { label: 'Thru', value: hikeLength.thru },
      ]}
    />
  );
};
