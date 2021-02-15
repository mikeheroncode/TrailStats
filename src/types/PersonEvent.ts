import { Location } from '../types/Location';

export interface PersonEvent {
  personEvent_id: number;
  event_id: number;
  age: number;
  gender: gender;
  trailName?: string;
  hikeLength?: hikeLength;
  packWeight?: number;
  shelter?: shelter;
  description?: string;
  timestamp: number;
  location?: Location;
}

export enum gender {
  male = 1,
  female = 2,
  nonconforming = 3,
}

export enum hikeLength {
  day = 1,
  weekend = 2,
  section = 3,
  thru = 4,
}

export enum shelter {
  tent = 1,
  hammock = 2,
  tarp = 3,
}
