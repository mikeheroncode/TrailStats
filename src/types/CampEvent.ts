import { Location } from './Location';

export type CampEvent = {
  campEvent_id: number;
  event_id: number;
  madeCampAt: number;
  ateDinnerAt: number;
  wentToSleepAt: number;
  setAlarmFor: number;
  gotUpAt: number;
  leftCampAt: number;
  description: string;
  location?: Location;
};

export const defaultCampEvent = {
  campEvent_id: 0,
  event_id: 0,
  startedBreakAt: 0,
  madeCampAt: 0,
  ateDinnerAt: 0,
  wentToSleepAt: 0,
  setAlarmFor: 0,
  gotUpAt: 0,
  leftCampAt: 0,
  description: '',
} as CampEvent;
