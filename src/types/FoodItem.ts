export interface FoodItem {
  food_id: number;
  name: string;
  calories: number;
  fat: number;
  protein: number;
  carbs: number;
  sugar: number;
  fiber: number;
  size: number;
  addedAt?: number;
}

export interface PendingFoodItem {
  name: string;
  calories: number;
  fat: number;
  protein: number;
  carbs: number;
  sugar: number;
  fiber: number;
  size: number;
}

export const defaultPendingFoodItem = {
  name: '',
  calories: 0,
  fat: 0,
  protein: 0,
  carbs: 0,
  sugar: 0,
  fiber: 0,
  size: 0,
};
