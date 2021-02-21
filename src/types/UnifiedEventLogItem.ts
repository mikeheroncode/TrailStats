export interface UnifiedEventLogItem {
  eventClass: string;
  event_id: number;
  entity_id: number;
  name: Text;
  startTimestamp: number;
  endTimestamp?: number;
  isSingleEvent: boolean;
}
