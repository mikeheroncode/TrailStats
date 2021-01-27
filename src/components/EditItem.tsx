import {
  createMaterialTopTabNavigator,
  MaterialTopTabScreenProps,
} from '@react-navigation/material-top-tabs';
import { RouteProp } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { EditItemTabParamList } from '../types/EditItemTabParamList';
import { FoodItem } from '../types/FoodItem';
import { Meal } from '../types/Meal';
import { Colors } from './Colors';
import { EditFoodItem } from './EditFoodItem';
import { FoodItemList } from './FoodItemList';
import { useFoodItems } from '../hooks/useFoodItems';
import FoodItemContext from '../context/FoodItemContext';

const EditItemsTab = createMaterialTopTabNavigator<EditItemTabParamList>();

type FoodItemListRouteProp = RouteProp<EditItemTabParamList, 'FoodItems'>;

type FoodItemListNavigationProp = MaterialTopTabScreenProps<
  EditItemTabParamList,
  'FoodItems'
>;

type Props = {
  route: FoodItemListRouteProp;
  navigation: FoodItemListNavigationProp;
};

export const EditItem = ({ route, navigation }: Props) => {
  const {
    foodItems,
    selectedFoodItem,
    addFoodItem,
    deleteFoodItem,
    selectFoodItem,
  } = useFoodItems();
  console.log('edit item');
  console.log(foodItems);
  return (
    <FoodItemContext.Provider value={foodItems}>
      <EditItemsTab.Navigator initialRouteName="FoodItems">
        <EditItemsTab.Screen
          name="FoodItems"
          component={FoodItemList}
          initialParams={{
            foodItems: foodItems,
            selectedFoodItem: selectedFoodItem,
          }}
        />
        <EditItemsTab.Screen name="EditFoodItem" component={EditFoodItem} />
      </EditItemsTab.Navigator>
    </FoodItemContext.Provider>
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
