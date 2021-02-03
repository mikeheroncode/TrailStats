import { useState, useEffect } from 'react';
import { Meal } from '../types/Meal';
import { useDatabase } from '../context/DatabaseContext';
import { FoodItem } from '../types/FoodItem';

// Hook for managing and accessing fooditems (CRUD)
export function useMeals() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<Meal>();
  const database = useDatabase();

  useEffect(() => {
    refreshListOfMeals();
  }, []);

  function refreshListOfMeals() {
    // Query all fooditems from the DB, then store them as state
    return database.getAllMeals().then(setMeals);
  }

  function addMeal(name: string, ingredients: number[]): Promise<void> {
    return database.addMeal(name, ingredients).then(refreshListOfMeals);
  }

  function deleteMeal(mealToDelete: Meal): Promise<void> {
    if (mealToDelete !== undefined) {
      return database.deleteMeal(mealToDelete).then(refreshListOfMeals);
    }
    // otherwise:
    return Promise.reject(Error('Could not delete an undefined meal'));
  }

  async function selectMeal(meal: Meal) {
    setSelectedMeal(meal);
  }

  return {
    meals,
    selectMeal,
    addMeal,
    deleteMeal,
    selectedMeal,
  };
}
