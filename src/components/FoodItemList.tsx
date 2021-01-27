import React, { useContext, useState } from 'react';
import { Pressable } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from './Colors';
import { EditFoodItem } from './EditFoodItem';
import { RouteProp } from '@react-navigation/native';
import { EditItemTabParamList } from '../types/EditItemTabParamList';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import FoodItemContext from '../context/FoodItemContext';
import { FoodItemTile } from './FoodItemTile';
import { useFoodEvent } from '../hooks/useFoodEvent';

type FoodItemListRouteProp = RouteProp<EditItemTabParamList, 'FoodItems'>;

type FoodItemListNavigationProp = MaterialTopTabNavigationProp<
  EditItemTabParamList,
  'FoodItems'
>;

type Props = {
  route: FoodItemListRouteProp;
  navigation: FoodItemListNavigationProp;
};

export const FoodItemList = ({ route, navigation }: Props) => {
  const contextFoodItems = useContext(FoodItemContext);
  const { logFoodEvent } = useFoodEvent();
  const [selectedFoodItems, setSelectedFoodItems] = useState<number[]>([]);
  return (
    <View style={styles.editItemScreen}>
      {contextFoodItems.map((foodItem, i) => {
        return (
          <Pressable
            key={i}
            onPress={() =>
              selectedFoodItems.includes(foodItem.food_id)
                ? setSelectedFoodItems(
                    selectedFoodItems.filter((id) => foodItem.food_id !== id),
                  )
                : setSelectedFoodItems([...selectedFoodItems, foodItem.food_id])
            }
            onLongPress={() => logFoodEvent(foodItem)}
            style={
              selectedFoodItems.includes(foodItem.food_id)
                ? styles.selectedAddItemButton
                : styles.addItemButton
            }>
            <FoodItemTile
              foodItem={foodItem}
              isSelected={selectedFoodItems.includes(foodItem.food_id)}
            />
          </Pressable>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  editItemScreen: {
    backgroundColor: Colors.green,
    flex: 1,
    alignItems: 'center',
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
  selectedAddItemButton: {
    width: '90%',
    marginTop: 5,
    backgroundColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

/*
<Pressable
            key={i}
            onPress={() =>
              navigation.navigate('EditFoodItem', {
                foodItem: foodItem,
                createNewItem: false,
              })
            }
            style={styles.addItemButton}>
            <FoodItemTile
              foodItem={foodItem}
              isSelected={
                selectedFoodItem &&
                selectedFoodItem.food_id === foodItem.food_id
              }
            />
          </Pressable>*/
