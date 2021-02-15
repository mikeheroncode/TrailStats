import { useState, useEffect, useContext } from 'react';
import { useDatabase } from '../context/DatabaseContext';
import { gender, hikeLength, PersonEvent, shelter } from '../types/PersonEvent';
import { useLocation } from './useLocation';

// Hook for managing and accessing fooditems (CRUD)
export function usePersonEvent() {
  const [lastPersonEvent, setPersonEvent] = useState<PersonEvent>();

  const { addCurrentLocation } = useLocation();

  const database = useDatabase();

  useEffect(() => {
    getLastPersonEvent();
  }, []);

  function getLastPersonEvent() {
    return database.getLastPersonEvent().then(setPersonEvent);
  }

  async function addPersonEvent(
    age: number,
    thisGender: number,
    trailName: string | null,
    thisHikeLength: number | null,
    packWeight: number | null,
    thisShelter: number | null,
    description: string,
    withLastPerson: boolean,
  ): Promise<void> {
    withLastPerson = lastPersonEvent === undefined ? false : withLastPerson;
    const eventId = withLastPerson
      ? lastPersonEvent!.event_id
      : await database.logEvent('Recorded Weight');
    const locationId = withLastPerson
      ? lastPersonEvent!.location!.location_id
      : await addCurrentLocation()
          .then((id) => id)
          .catch((error) => null);

    return database
      .addPersonEvent(
        eventId,
        locationId,
        age,
        thisGender,
        trailName,
        thisHikeLength,
        packWeight,
        thisShelter,
        description,
      )
      .then(getLastPersonEvent);
  }

  return {
    addPersonEvent,
    getLastPersonEvent,
  };
}
