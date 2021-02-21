import { FoodEvent } from './FoodEvent';
import { MealEvent } from './MealEvent';

export interface EventLog {
  event_id: number;
  name: string;
  timestamp: number;
  isSingleEvent: boolean;
  foodEvents: FoodEvent[];
  mealEvents: MealEvent[];
}

export enum EventTable {
  foodItem = 1,
  meal = 2,
  weight = 3,
  camp = 4,
  person = 5,
  waterSource = 6,
  genericEventStart = 7,
  genericEventEnd = 8,
}
