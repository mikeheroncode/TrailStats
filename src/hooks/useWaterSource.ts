import { useDatabase } from '../context/DatabaseContext';
import { useLocation } from './useLocation';

// Hook for managing and accessing fooditems (CRUD)
export function useWaterSource() {
  const { addCurrentLocation } = useLocation();

  const database = useDatabase();

  async function addWaterSource(
    flow: number,
    accessibility: number,
    description: string,
  ): Promise<void> {
    const eventId = await database.logEvent('Recorded Weight');
    const locationId = await addCurrentLocation()
      .then((id) => id)
      .catch((error) => null);
    return database.addWaterSourceEvent(
      eventId,
      locationId,
      flow,
      accessibility,
      description,
    );
  }

  return {
    addWaterSource,
  };
}
