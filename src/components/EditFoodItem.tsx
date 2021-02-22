import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';

import { Colors } from './Colors';
import {
  defaultPendingFoodItem,
  FoodItem,
  PendingFoodItem,
} from '../types/FoodItem';
import { EditItemTabParamList } from '../types/EditItemTabParamList';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import { RouteProp } from '@react-navigation/native';
import { useFoodItems } from '../hooks/useFoodItems';

type FoodItemListRouteProp = RouteProp<EditItemTabParamList, 'EditFoodItem'>;

type FoodItemListNavigationProp = MaterialTopTabNavigationProp<
  EditItemTabParamList,
  'EditFoodItem'
>;

type Props = {
  route: FoodItemListRouteProp;
  navigation: FoodItemListNavigationProp;
};

export const EditFoodItem = ({ route, navigation }: Props) => {
  const { foodItem, createNewItem } = route.params ?? {
    foodItem: null,
    createNewItem: true,
  };
  const { name, calories, fat, protein, carbs, sugar, fiber, size } =
    foodItem ?? defaultPendingFoodItem;
  const pendingFoodItem: PendingFoodItem = {
    name,
    calories,
    fat,
    protein,
    carbs,
    sugar,
    fiber,
    size,
  };
  const [foodItemForm, setFoodItemForm] = useState(
    foodItem ?? defaultPendingFoodItem,
  );

  const { addFoodItem } = useFoodItems();

  const addNewFoodItem = () => {
    const newFoodItem: PendingFoodItem = {
      name: foodItemForm.name,
      calories: foodItemForm.calories,
      fat: foodItemForm.fat,
      protein: foodItemForm.protein,
      carbs: foodItemForm.carbs,
      sugar: foodItemForm.sugar,
      fiber: foodItemForm.fiber,
      size: foodItemForm.size,
    };
    addFoodItem(newFoodItem);
  };

  return (
    <View style={styles.editItemScreen}>
      <ScrollView style={styles.editItemForm}>
        <Text style={styles.editItemLabels}>Name</Text>
        <TextInput
          style={styles.editItemFormTextInput}
          selectTextOnFocus={true}
          value={String(foodItemForm.name ?? '')}
          onChangeText={(newValue) => {
            setFoodItemForm({ ...foodItemForm, name: newValue });
          }}
        />
        <Text style={styles.editItemLabels}>Calories</Text>
        <TextInput
          style={styles.editItemFormTextInput}
          selectTextOnFocus={true}
          value={
            isNaN(foodItemForm.calories) ? '' : String(foodItemForm.calories)
          }
          onChangeText={(newValue) => {
            const newValueInt = parseInt(newValue, 10);
            setFoodItemForm({ ...foodItemForm, calories: newValueInt });
          }}
          keyboardType={'numeric'}
        />
        <Text style={styles.editItemLabels}>Fat</Text>
        <TextInput
          style={styles.editItemFormTextInput}
          selectTextOnFocus={true}
          value={isNaN(foodItemForm.fat) ? '' : String(foodItemForm.fat)}
          onChangeText={(newValue) => {
            const newValueInt = parseInt(newValue, 10);
            setFoodItemForm({ ...foodItemForm, fat: newValueInt });
          }}
          keyboardType={'numeric'}
        />
        <Text style={styles.editItemLabels}>Protien</Text>
        <TextInput
          style={styles.editItemFormTextInput}
          selectTextOnFocus={true}
          value={
            isNaN(foodItemForm.protein) ? '' : String(foodItemForm.protein)
          }
          onChangeText={(newValue) => {
            const newValueInt = parseInt(newValue, 10);
            setFoodItemForm({ ...foodItemForm, protein: newValueInt });
          }}
          keyboardType={'numeric'}
        />
        <Text style={styles.editItemLabels}>Carbs</Text>
        <TextInput
          style={styles.editItemFormTextInput}
          selectTextOnFocus={true}
          value={isNaN(foodItemForm.carbs) ? '' : String(foodItemForm.carbs)}
          onChangeText={(newValue) => {
            const newValueInt = parseInt(newValue, 10);
            setFoodItemForm({ ...foodItemForm, carbs: newValueInt });
          }}
          keyboardType={'numeric'}
        />
        <Text style={styles.editItemLabels}>Sugar</Text>
        <TextInput
          style={styles.editItemFormTextInput}
          selectTextOnFocus={true}
          value={isNaN(foodItemForm.sugar) ? '' : String(foodItemForm.sugar)}
          onChangeText={(newValue) => {
            const newValueInt = parseInt(newValue, 10);
            setFoodItemForm({ ...foodItemForm, sugar: newValueInt });
          }}
          keyboardType={'numeric'}
        />
        <Text style={styles.editItemLabels}>Fiber</Text>
        <TextInput
          style={styles.editItemFormTextInput}
          selectTextOnFocus={true}
          value={isNaN(foodItemForm.fiber) ? '' : String(foodItemForm.fiber)}
          onChangeText={(newValue) => {
            const newValueInt = parseInt(newValue, 10);
            setFoodItemForm({ ...foodItemForm, fiber: newValueInt });
          }}
          keyboardType={'numeric'}
        />
        <Text style={styles.editItemLabels}>Size</Text>
        <TextInput
          style={styles.editItemFormTextInput}
          selectTextOnFocus={true}
          value={isNaN(foodItemForm.size) ? '' : String(foodItemForm.size)}
          onChangeText={(newValue) => {
            const newValueInt = parseInt(newValue, 10);
            setFoodItemForm({ ...foodItemForm, size: newValueInt });
          }}
          keyboardType={'numeric'}
        />
        <Pressable
          onPress={() => addNewFoodItem()}
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? 'rgb(210, 230, 255)'
                : Colors.purpleLight,
            },
            styles.addItemButton,
          ]}>
          <Text style={styles.homeButtonText}>{'Add Item'}</Text>
        </Pressable>
      </ScrollView>
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
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  homeButtonText: {
    color: Colors.white,
    fontSize: 20,
  },
});
