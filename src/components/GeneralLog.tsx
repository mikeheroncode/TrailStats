import React from 'react';
import { Text, View } from 'react-native';
interface IProps {
  logItems: string[];
}

export const GeneralLog = (props: IProps) => {
  return (
    <View>
      {props.logItems.map((logItem) => {
        return (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>{logItem}</Text>
          </View>
        );
      })}
    </View>
  );
};
