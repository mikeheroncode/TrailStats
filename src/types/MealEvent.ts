import { Location } from './Location';

export interface MealEvent {
  mealEvent_id: number;
  event_id: number;
  meal_id: number;
  name: string;
  timestamp: number;
  location: Location | null;
}
