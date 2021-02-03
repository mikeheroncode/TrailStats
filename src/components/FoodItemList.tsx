import React, { useContext, useState } from 'react';
import { FlatList, Modal, Pressable, TextInput } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from './Colors';
import { EditFoodItem } from './EditFoodItem';
import { RouteProp } from '@react-navigation/native';
import { EditItemTabParamList } from '../types/EditItemTabParamList';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import FoodItemContext from '../context/FoodItemContext';
import { FoodItemTile } from './FoodItemTile';
import { useFoodEvent } from '../hooks/useFoodEvent';
import { useMeals } from '../hooks/useMeals';
import { TouchableHighlight } from 'react-native';

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
  const [modalVisible, setModalVisible] = useState(false);
  const [newMealName, setNewMealName] = useState('New Meal');
  const { addMeal } = useMeals();

  const createNewMeal = () => {
    addMeal(newMealName, selectedFoodItems);
    setModalVisible(false);
    setSelectedFoodItems([]);
  };
  return (
    <View style={styles.editItemScreen}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {}}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Meal Name</Text>
            <TextInput
              style={styles.editItemFormTextInput}
              value={newMealName}
              onChangeText={(text) => setNewMealName(text)}
              selectTextOnFocus={true}
            />
            <View style={styles.modalButtonsContainer}>
              <Pressable
                style={styles.modalButton}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={styles.modalButton}
                onPress={() => {
                  createNewMeal();
                }}>
                <Text style={styles.textStyle}>Create</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <FlatList
        data={contextFoodItems}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              selectedFoodItems.includes(item.food_id)
                ? setSelectedFoodItems(
                    selectedFoodItems.filter((id) => item.food_id !== id),
                  )
                : setSelectedFoodItems([...selectedFoodItems, item.food_id])
            }
            onLongPress={() => logFoodEvent(item)}
            style={
              selectedFoodItems.includes(item.food_id)
                ? styles.selectedAddItemButton
                : styles.addItemButton
            }>
            <FoodItemTile
              foodItem={item}
              isSelected={selectedFoodItems.includes(item.food_id)}
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
