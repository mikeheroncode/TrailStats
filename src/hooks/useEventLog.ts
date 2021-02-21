import { useState, useEffect } from 'react';
import { useDatabase } from '../context/DatabaseContext';
import { FoodEvent } from '../types/FoodEvent';
import { UnifiedEventLogItem } from '../types/UnifiedEventLogItem';

export function useEventLog() {
  const [foodEvents, setFoodEvents] = useState<FoodEvent[]>([]);
  const database = useDatabase();
  const [eventLogItems, setEventLogItems] = useState<UnifiedEventLogItem[]>([]);

  useEffect(() => {
    getAllEventsFromLog();
  }, []);

  function refreshListOfEvents() {
    return database.getFoodEvents().then(setFoodEvents);
  }

  function deleteFoodEvent(event: FoodEvent): Promise<void> {
    return database.deleteFoodEvent(event).then(refreshListOfEvents);
  }

  async function getAllEventsFromLog() {
    return database.getAllUnifiedEventLogItems().then(setEventLogItems);
  }
  return {
    foodEvents,
    setFoodEvents,
    refreshListOfEvents,
    deleteFoodEvent,
    getAllEventsFromLog,
    eventLogItems,
  };
}
