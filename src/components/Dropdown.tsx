import React, { useState } from 'react';
import RNPickerSelect, { Item } from 'react-native-picker-select';
import { PersonEvent, gender, hikeLength, shelter } from '../types/PersonEvent';

interface Props {
  enumType: typeof gender | typeof hikeLength | typeof shelter;
  selectedValue: gender | hikeLength | shelter;
  onSelectedValue: React.Dispatch<
    React.SetStateAction<gender | hikeLength | shelter>
  >;
}

export const Dropdown = (props: Props) => {
  if (props.enumType === gender) {
    return (
      <RNPickerSelect
        onValueChange={(value) => props.onSelectedValue(value)}
        items={[
          { label: 'Male', value: gender.male },
          { label: 'Female', value: gender.female },
          { label: 'Nonconforming', value: gender.nonconforming },
        ]}
      />
    );
  }
  if (props.enumType === hikeLength) {
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
  }
  if (props.enumType === shelter) {
    return (
      <RNPickerSelect
        onValueChange={(value) => props.onSelectedValue(value)}
        items={[
          { label: 'Day', value: shelter.tent },
          { label: 'Weekend', value: shelter.hammock },
          { label: 'Section', value: shelter.tarp },
        ]}
      />
    );
  }
};
