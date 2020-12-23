import React from 'react';
import { Alert, Pressable, TextInput } from 'react-native';
import { View, StyleSheet, Text } from 'react-native';
import { FoodItem } from '../types/FoodItem';
import { Meal } from '../types/Meal';
import { Colors } from './Colors';

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
    return (
      <View style={this.styles.editItemScreen}>
        <View style={this.styles.editItemForm}>
          <Text style={this.styles.editItemLabels}>Name</Text>
          <TextInput style={this.styles.editItemFormTextInput} />
          <Text style={this.styles.editItemLabels}>Calories</Text>
          <TextInput style={this.styles.editItemFormTextInput} />
          <Text style={this.styles.editItemLabels}>Fat</Text>
          <TextInput style={this.styles.editItemFormTextInput} />
          <Text style={this.styles.editItemLabels}>Protien</Text>
          <TextInput style={this.styles.editItemFormTextInput} />
          <Text style={this.styles.editItemLabels}>Carbs</Text>
          <TextInput style={this.styles.editItemFormTextInput} />
          <Text style={this.styles.editItemLabels}>Sugar</Text>
          <TextInput style={this.styles.editItemFormTextInput} />
          <Text style={this.styles.editItemLabels}>Fiber</Text>
          <TextInput style={this.styles.editItemFormTextInput} />
          <Pressable
            onPress={() => Alert.alert('Item Added')}
            style={this.styles.addItemButton}>
            <Text style={this.styles.homeButtonText}>{'Add Item'}</Text>
          </Pressable>
        </View>
      </View>
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
