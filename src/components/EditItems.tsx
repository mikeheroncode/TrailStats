import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { FoodItem } from '../types/FoodItem';
import { Meal } from '../types/Meal';
import { Colors } from './Colors';
import { EditFoodItem } from './EditFoodItem';

interface IProps {
  buttonText: string[];
}

interface IState {
  meals: Meal[];
  foodItems: FoodItem[];
}

export class EditItems extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      meals: [],
      foodItems: [],
    };
  }

  handleTagDisplayToggle = (e: any) => {};

  handleVariableSelectChange = (e: any) => {};

  render() {
    return <EditFoodItem createNewItem={true} foodItem={null} />;
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
