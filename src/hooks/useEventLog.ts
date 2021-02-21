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

  async function deleteEvent(logItemToDelete: UnifiedEventLogItem) {
    return database
      .deleteEntityEventFromLog(
        logItemToDelete.entity_id,
        logItemToDelete.eventClass,
      )
      .then(() => {
        if (logItemToDelete.isSingleEvent) {
          return database.deleteEventFromLog(logItemToDelete.event_id);
        }
      })
      .then(getAllEventsFromLog);
  }
  return {
    foodEvents,
    setFoodEvents,
    refreshListOfEvents,
    deleteFoodEvent,
    getAllEventsFromLog,
    eventLogItems,
    deleteEvent,
  };
}
