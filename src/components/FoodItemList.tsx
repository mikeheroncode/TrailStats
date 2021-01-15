import React from 'react';
import { Pressable } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from './Colors';
import { EditFoodItem } from './EditFoodItem';
import { RouteProp } from '@react-navigation/native';
import { EditItemTabParamList } from '../types/EditItemTabParamList';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';

type FoodItemListRouteProp = RouteProp<EditItemTabParamList, 'FoodItems'>;

type FoodItemListNavigationProp = MaterialTopTabScreenProps<
  EditItemTabParamList,
  'FoodItems'
>;

type Props = {
  route: FoodItemListRouteProp;
  navigation: FoodItemListNavigationProp;
};

export const FoodItemList = ({ route, navigation }: Props) => {
  const { foodItems, itemSelected } = route.params;
  return (
    <>
      <View>
        {foodItems.map((foodItem, i) => {
          return (
            <Pressable key={i} onPress={() => {}} style={styles.addItemButton}>
              <Text
                style={
                  itemSelected ? styles.homeButtonText : styles.homeButtonText
                }>
                {foodItem.name}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <EditFoodItem createNewItem={true} foodItem={null} />
    </>
  );
};
const styles = StyleSheet.create({
  editItemScreen: {
    backgroundColor: Colors.green,
    flex: 1,
    alignItems: 'center',
    fontSize: 20,
  },
  editItemForm: {
    backgroundColor: Colors.purple,
    width: '85%',
    padding: 10,
    margin: 10,
  },
  editItemLabels: {
    color: Colors.white,
    fontSize: 20,
  },
  editItemFormTextInput: {
    backgroundColor: Colors.purpleLight,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    color: Colors.white,
    marginTop: 5,
  },
  addItemButton: {
    width: '65%',
    height: 50,
    marginTop: 20,
    backgroundColor: Colors.purpleLight,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  homeButtonText: {
    color: Colors.white,
    fontSize: 20,
  },
});
