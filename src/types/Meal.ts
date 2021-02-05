import { FoodItem } from './FoodItem';

export interface Meal {
  meal_id: number;
  name: string;
  ingredients: FoodItem[];
}
