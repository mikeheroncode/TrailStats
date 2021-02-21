import { Location } from './Location';

export interface Event {
  event_id: number;
  name: Text;
  isSingleEvent: boolean;
  startTimestamp: number;
  endTimestamp?: number;
  startLocation?: Location;
  endLocation?: Location;
}

export const defaultEvent: Event = {
  event_id: 0,
  name: '',
  startTimestamp: 0,
  isSingleEvent: false,
};
