import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';

type Props = {
  createNewItem: boolean;
  foodItem: FoodItem | null;
};

import { Colors } from './Colors';
import { FoodItem } from '../types/FoodItem';

export const EditFoodItem = (props: Props) => {
  return (
    <View style={styles.editItemScreen}>
      <View style={styles.editItemForm}>
        <Text style={styles.editItemLabels}>Name</Text>
        <TextInput
          style={styles.editItemFormTextInput}
          value={props.createNewItem ? '' : String(props.foodItem?.name ?? '')}
        />
        <Text style={styles.editItemLabels}>Calories</Text>
        <TextInput
          style={styles.editItemFormTextInput}
          value={props.createNewItem ? '' : String(props.foodItem?.name ?? '')}
          keyboardType={'numeric'}
        />
        <Text style={styles.editItemLabels}>Fat</Text>
        <TextInput
          style={styles.editItemFormTextInput}
          value={props.createNewItem ? '' : String(props.foodItem?.name ?? '')}
          keyboardType={'numeric'}
        />
        <Text style={styles.editItemLabels}>Protien</Text>
        <TextInput
          style={styles.editItemFormTextInput}
          value={props.createNewItem ? '' : String(props.foodItem?.name ?? '')}
          keyboardType={'numeric'}
        />
        <Text style={styles.editItemLabels}>Carbs</Text>
        <TextInput
          style={styles.editItemFormTextInput}
          value={props.createNewItem ? '' : String(props.foodItem?.name ?? '')}
          keyboardType={'numeric'}
        />
        <Text style={styles.editItemLabels}>Sugar</Text>
        <TextInput
          style={styles.editItemFormTextInput}
          value={props.createNewItem ? '' : String(props.foodItem?.name ?? '')}
          keyboardType={'numeric'}
        />
        <Text style={styles.editItemLabels}>Fiber</Text>
        <TextInput
          style={styles.editItemFormTextInput}
          value={props.createNewItem ? '' : String(props.foodItem?.name ?? '')}
          keyboardType={'numeric'}
        />
        <Pressable
          onPress={() => Alert.alert('Item Added')}
          style={styles.addItemButton}>
          <Text style={styles.homeButtonText}>{'Add Item'}</Text>
        </Pressable>
      </View>
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
