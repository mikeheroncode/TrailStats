import { useState, useEffect } from 'react';
import { FoodItem } from '../types/FoodItem';
import { useDatabase } from '../context/DatabaseContext';

// Hook for managing and accessing fooditems (CRUD)
export function useFoodItems() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [selectedFoodItem, setSelectedFoodItem] = useState<FoodItem>();
  const database = useDatabase();

  useEffect(() => {
    refreshListOfFoodItems();
  }, []);

  function refreshListOfFoodItems() {
    // Query all fooditems from the DB, then store them as state
    return database.getAllFoodItems().then(setFoodItems);
  }

  function addFoodItem(foodItem: FoodItem): Promise<void> {
    return database.addFoodItem(foodItem).then(refreshListOfFoodItems);
  }

  function deleteFoodItem(foodItemToDelete: FoodItem): Promise<void> {
    if (foodItemToDelete !== undefined) {
      return database
        .deleteFoodItem(foodItemToDelete)
        .then(refreshListOfFoodItems);
    }
    // otherwise:
    return Promise.reject(Error('Could not delete an undefined foodItem'));
  }

  async function selectFoodItem(foodItem: FoodItem) {
    setSelectedFoodItem(foodItem);
  }

  function addMeal(name: string, ingredients: number[]): Promise<void> {
    return database.addMeal(name, ingredients);
  }

  return {
    foodItems,
    selectFoodItem,
    addFoodItem,
    deleteFoodItem,
    selectedFoodItem,
    addMeal,
  };
}
