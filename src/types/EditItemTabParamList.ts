import { FoodItem } from './FoodItem';
import { Meal } from './Meal';

export type EditItemTabParamList = {
  FoodItems: undefined;
  Meals: { meals: Meal[] | undefined };
  EditFoodItem: { foodItem: FoodItem; createNewItem: boolean } | undefined;
};

/*export type EditItemTabParamList = {
  Meals: { meals: Meal[] };
  AllItems: { foodItems: FoodItem[]; meals: Meal[] };
  FoodItems: { foodItems: FoodItem[] };
  EditFoodItem: { foodItem: FoodItem } | null;
};*/
