import { FoodItem } from './FoodItem';

export type EditItemTabParamList = {
  FoodItems: { foodItems: FoodItem[]; itemSelected: boolean };
  EditFoodItem: { foodItem: FoodItem; createNewItem: boolean } | undefined;
};

/*export type EditItemTabParamList = {
  Meals: { meals: Meal[] };
  AllItems: { foodItems: FoodItem[]; meals: Meal[] };
  FoodItems: { foodItems: FoodItem[] };
  EditFoodItem: { foodItem: FoodItem } | null;
};*/
