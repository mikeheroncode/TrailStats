import React, { useState } from 'react';
import { FlatList, Pressable } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from './Colors';
import { RouteProp } from '@react-navigation/native';
import { EditItemTabParamList } from '../types/EditItemTabParamList';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import { useMealEvent } from '../hooks/useMealEvent';
import { MealTile } from './MealTile';
import { useFoodItems } from '../hooks/useFoodItems';

type FoodItemListRouteProp = RouteProp<EditItemTabParamList, 'FoodItems'>;

type FoodItemListNavigationProp = MaterialTopTabNavigationProp<
  EditItemTabParamList,
  'FoodItems'
>;

type Props = {
  route: FoodItemListRouteProp;
  navigation: FoodItemListNavigationProp;
};

export const MealList = ({ route, navigation }: Props) => {
  const { logMealEvent } = useMealEvent();
  const [selectedFoodItems, setSelectedFoodItems] = useState<number[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const { meals } = useFoodItems();
  console.log(meals);
  console.log('MEALS^^^^');
  return (
    <View style={styles.editItemScreen}>
      <FlatList
        data={meals}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              selectedFoodItems.includes(item.meal_id)
                ? setSelectedFoodItems(
                    selectedFoodItems.filter((id) => item.meal_id !== id),
                  )
                : setSelectedFoodItems([...selectedFoodItems, item.meal_id])
            }
            onLongPress={() => logMealEvent(item)}
            style={
              selectedFoodItems.includes(item.meal_id)
                ? styles.selectedAddItemButton
                : styles.addMealButton
            }>
            <MealTile
              meal={item}
              isSelected={selectedFoodItems.includes(item.meal_id)}
            />
          </Pressable>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Pressable
        onPress={() => {
          setModalVisible(true);
        }}
        style={
          selectedFoodItems.length > 1
            ? styles.addMealButton
            : { display: 'none' }
        }>
        <Text style={styles.addMealButtonText}> Add Meal </Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  editItemScreen: {
    backgroundColor: Colors.green,
    flex: 1,
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
  addMealButton: {
    width: '40%',
    backgroundColor: Colors.blue,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  addMealButtonText: {
    color: Colors.white,
    fontSize: 20,
  },
  selectedAddItemButton: {
    width: '90%',
    marginTop: 5,
    backgroundColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 5,
    textAlign: 'center',
  },
  editItemFormTextInput: {
    backgroundColor: Colors.purpleLight,
    height: 40,
    width: 200,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    color: Colors.white,
    marginTop: 5,
  },
  modalButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  modalButton: {
    backgroundColor: '#F194FF',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    margin: 10,
    marginBottom: 5,
  },
});
