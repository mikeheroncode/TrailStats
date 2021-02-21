import { useState, useEffect } from 'react';
import { useDatabase } from '../context/DatabaseContext';
import { FoodEvent } from '../types/FoodEvent';

export function useEventLog() {
  const [foodEvents, setFoodEvents] = useState<FoodEvent[]>([]);
  const database = useDatabase();

  useEffect(() => {
    refreshListOfEvents();
  }, []);

  function refreshListOfEvents() {
    return database.getFoodEvents().then(setFoodEvents);
  }

  function deleteFoodEvent(event: FoodEvent): Promise<void> {
    return database.deleteFoodEvent(event).then(refreshListOfEvents);
  }
  return {
    foodEvents,
    setFoodEvents,
    refreshListOfEvents,
    deleteFoodEvent,
  };
}
