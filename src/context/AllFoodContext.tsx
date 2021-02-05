import React, { useContext, useState } from 'react';
import { AllFood } from '../types/AllFood';
import { FoodItem } from '../types/FoodItem';
import { Meal } from '../types/Meal';

const AllFoodContext = React.createContext<AllFood | undefined>(undefined);

export const AllFoodProvider: React.FunctionComponent = function (props) {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  return (
    <AllFoodContext.Provider
      value={{ foodItems, setFoodItems, meals, setMeals }}
      {...props}
    />
  );
};

export function useFood(): AllFood {
  const context = useContext(AllFoodContext);
  if (context === undefined) {
    throw new Error('useFood must be used within a AllFoodProvider');
  }
  return context;
}
