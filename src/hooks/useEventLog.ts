import { useState, useEffect } from 'react';
import { FoodItem } from '../types/FoodItem';
import { useDatabase } from '../context/DatabaseContext';
import { FoodEvent } from '../types/FoodEvent';

// Hook for managing and accessing fooditems (CRUD)
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
