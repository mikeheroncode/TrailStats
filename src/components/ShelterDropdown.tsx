import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { shelter } from '../types/PersonEvent';

interface Props {
  selectedValue: shelter;
  onSelectedValue: React.Dispatch<React.SetStateAction<shelter>>;
}

export const ShelterDropdown = (props: Props) => {
  return (
    <RNPickerSelect
      onValueChange={(value) => props.onSelectedValue(value)}
      items={[
        { label: 'Tent', value: shelter.tent },
        { label: 'Hammock', value: shelter.hammock },
        { label: 'Tarp', value: shelter.tarp },
      ]}
    />
  );
};
