import { Location } from '../types/Location';

export interface WeightEvent {
  weightEvent_id: number;
  event_id: number;
  description: string;
  weight: number;
  timestamp: number;
  location?: Location;
}
