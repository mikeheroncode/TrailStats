import { useState, useEffect, useContext } from 'react';
import { FoodItem, PendingFoodItem } from '../types/FoodItem';
import { useDatabase } from '../context/DatabaseContext';
import { Meal } from '../types/Meal';
import { useFood } from '../context/AllFoodContext';

export function useFoodItems() {
  const { foodItems, setFoodItems, meals, setMeals } = useFood();
  const database = useDatabase();

  useEffect(() => {
    refreshListOfFoodItems();
    refreshListOfMeals();
  }, []);

  function refreshListOfFoodItems() {
    return database.getAllFoodItems().then(setFoodItems);
  }

  function refreshListOfMeals() {
    return database.getAllMeals().then(setMeals);
  }

  function addFoodItem(foodItem: PendingFoodItem): Promise<void> {
    return database.addFoodItem(foodItem).then(refreshListOfFoodItems);
  }

  function deleteFoodItem(foodItemToDelete: FoodItem): Promise<void> {
    if (foodItemToDelete !== undefined) {
      return database
        .deleteFoodItem(foodItemToDelete.food_id)
        .then(refreshListOfFoodItems);
    }
    // otherwise:
    return Promise.reject(Error('Could not delete an undefined foodItem'));
  }

  function deleteMeal(mealToDelete: Meal): Promise<void> {
    if (mealToDelete !== undefined) {
      return database.deleteMeal(mealToDelete.meal_id).then(refreshListOfMeals);
    }
    // otherwise:
    return Promise.reject(Error('Could not delete an undefined foodItem'));
  }

  function addMeal(name: string, ingredients: number[]): Promise<void> {
    return database.addMeal(name, ingredients).then(refreshListOfMeals);
  }

  return {
    foodItems,
    addFoodItem,
    deleteFoodItem,
    addMeal,
    meals,
    setMeals,
    deleteMeal,
  };
}
