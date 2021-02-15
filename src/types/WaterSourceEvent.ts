import { Location } from '../types/Location';

export interface WaterSourceEvent {
  waterSourceEvent_id: number;
  event_id: number;
  flow: number;
  accessibility: number;
  description: string;
  timestamp: number;
  location?: Location;
}
