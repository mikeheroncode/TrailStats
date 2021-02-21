import { useState, useEffect, useContext } from 'react';
import { useDatabase } from '../context/DatabaseContext';
import { EventTable } from '../types/EventLog';
import { gender, hikeLength, PersonEvent, shelter } from '../types/PersonEvent';
import { useEvent } from './useEvent';
import { useLocation } from './useLocation';

export function usePersonEvent() {
  const [lastPersonEvent, setPersonEvent] = useState<PersonEvent>();

  const { addCurrentLocation } = useLocation();
  const { getCurrentEventId } = useEvent();
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
    console.log(`LAST PERSON: ${JSON.stringify(lastPersonEvent)}`);
    withLastPerson = lastPersonEvent === undefined ? false : withLastPerson;
    const eventId = withLastPerson
      ? lastPersonEvent!.event_id
      : await getCurrentEventId('Recorded Person Event');
    const lastPersonLocationId =
      !withLastPerson || !lastPersonEvent || !lastPersonEvent.location
        ? null
        : lastPersonEvent!.location!.location_id;

    return database
      .addPersonEvent(
        eventId,
        age,
        thisGender,
        trailName,
        thisHikeLength,
        packWeight,
        thisShelter,
        description,
      )
      .then((primaryKey) => {
        console.log(`LAST PERSON ${JSON.stringify(lastPersonEvent)}`);
        !withLastPerson
          ? addCurrentLocation(primaryKey, EventTable.person)
          : database.addEventLocation(
              primaryKey,
              lastPersonLocationId,
              EventTable.person,
            );
      })
      .then(getLastPersonEvent);
  }

  return {
    addPersonEvent,
    getLastPersonEvent,
  };
}
