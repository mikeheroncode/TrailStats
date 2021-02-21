import { Location } from './Location';

export interface FoodEvent {
  foodEvent_id: number;
  event_id: number;
  food_id: number;
  name: string;
  timestamp: number;
  location?: Location;
}
