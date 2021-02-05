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
import FoodItemContext from '../context/AllFoodContext';
import { MealList } from './MealList';
import { AllFoodProvider } from '../context/AllFoodContext';

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
  return (
    <AllFoodProvider>
      <EditItemsTab.Navigator initialRouteName="FoodItems">
        <EditItemsTab.Screen name="FoodItems" component={FoodItemList} />
        <EditItemsTab.Screen
          name="Meals"
          component={MealList}
          initialParams={{
            meals: [],
          }}
        />
        <EditItemsTab.Screen name="EditFoodItem" component={EditFoodItem} />
      </EditItemsTab.Navigator>
    </AllFoodProvider>
  );
};
