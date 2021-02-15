import { useState, useEffect, useContext } from 'react';
import { useDatabase } from '../context/DatabaseContext';
import { WeightEvent } from '../types/WeightEvent';
import { useLocation } from './useLocation';

// Hook for managing and accessing fooditems (CRUD)
export function useWeightEvent() {
  const [lastWeightEvent, setLastWeightEvent] = useState<WeightEvent>({
    weightEvent_id: 0,
    event_id: 0,
    description: '',
    weight: 0,
    timestamp: 0,
  } as WeightEvent);

  const { addCurrentLocation } = useLocation();

  const database = useDatabase();

  useEffect(() => {
    getLastWeightEvent();
  }, []);

  function getLastWeightEvent() {
    return database.getLastWeightEvent().then(setLastWeightEvent);
  }

  async function addWeightEvent(
    location_id: number | null,
    description: string,
    weight: number,
  ): Promise<void> {
    const eventId = await database.logEvent('Recorded Weight');
    const locationId = addCurrentLocation()
      .then((id) => id)
      .catch((error) => null);
    return database
      .addWeightEvent(eventId, locationId, description, weight)
      .then(getLastWeightEvent);
  }

  return {
    lastWeightEvent,
    addWeightEvent,
  };
}
