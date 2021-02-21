import { useState, useEffect, useContext } from 'react';
import { useDatabase } from '../context/DatabaseContext';
import { EventTable } from '../types/EventLog';
import { WeightEvent } from '../types/WeightEvent';
import { useEvent } from './useEvent';
import { useLocation } from './useLocation';

export function useWeightEvent() {
  const [lastWeightEvent, setLastWeightEvent] = useState<WeightEvent>({
    weightEvent_id: 0,
    event_id: 0,
    description: '',
    weight: 0,
    timestamp: 0,
  } as WeightEvent);

  const { addCurrentLocation } = useLocation();
  const { getCurrentEventId } = useEvent();
  const database = useDatabase();

  useEffect(() => {
    getLastWeightEvent();
  }, []);

  function getLastWeightEvent() {
    return database.getLastWeightEvent().then(setLastWeightEvent);
  }

  async function addWeightEvent(
    description: string,
    weight: number,
  ): Promise<void> {
    const eventId = await getCurrentEventId('Recorded Weight');
    return database
      .addWeightEvent(eventId, description, weight)
      .then((primaryKey) => {
        addCurrentLocation(primaryKey, EventTable.weight);
      })
      .then(getLastWeightEvent);
  }

  return {
    lastWeightEvent,
    addWeightEvent,
  };
}
