import { FoodItem } from './FoodItem';

export interface Meal {
  id: number;
  name: string;
  ingredients: FoodItem[];
}
