import { FoodItem } from './FoodItem';
import { Meal } from './Meal';

export interface AllFood {
  foodItems: FoodItem[];
  setFoodItems: React.Dispatch<React.SetStateAction<FoodItem[]>>;
  meals: Meal[];
  setMeals: React.Dispatch<React.SetStateAction<Meal[]>>;
}
