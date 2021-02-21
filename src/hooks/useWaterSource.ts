import { useDatabase } from '../context/DatabaseContext';
import { EventTable } from '../types/EventLog';
import { useEvent } from './useEvent';
import { useLocation } from './useLocation';

export function useWaterSource() {
  const { addCurrentLocation } = useLocation();
  const { getCurrentEventId } = useEvent();
  const database = useDatabase();

  async function addWaterSource(
    flow: number,
    accessibility: number,
    description: string,
  ): Promise<void> {
    const eventId = await getCurrentEventId('Water Source');
    return database
      .addWaterSourceEvent(eventId, flow, accessibility, description)
      .then((primaryKey) => {
        addCurrentLocation(primaryKey, EventTable.waterSource);
      });
  }

  return {
    addWaterSource,
  };
}
