import {
  createMaterialTopTabNavigator,
  MaterialTopTabScreenProps,
} from '@react-navigation/material-top-tabs';
import { RouteProp } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { EditItemTabParamList } from '../types/EditItemTabParamList';
import { FoodItem } from '../types/FoodItem';
import { Meal } from '../types/Meal';
import { Colors } from './Colors';
import { EditFoodItem } from './EditFoodItem';
import { FoodItemList } from './FoodItemList';

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

interface IState {
  meals: Meal[];
  foodItems: FoodItem[];
  itemSelected: boolean;
}

export class EditItems extends React.Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      meals: [],
      foodItems: [],
      itemSelected: false,
    };
  }

  handleTagDisplayToggle = () => {};

  handleVariableSelectChange = () => {};

  render() {
    return (
      <EditItemsTab.Navigator initialRouteName="FoodItems">
        <EditItemsTab.Screen
          name="FoodItems"
          component={FoodItemList}
          initialParams={{
            foodItems: this.state.foodItems,
            itemSelected: this.state.itemSelected,
          }}
        />
        <EditItemsTab.Screen name="EditFoodItem" component={EditFoodItem} />
      </EditItemsTab.Navigator>
    );
  }
  styles = StyleSheet.create({
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
}
