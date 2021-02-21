import { useState, useEffect, useContext } from 'react';
import { useDatabase } from '../context/DatabaseContext';
import { CampEvent } from '../types/CampEvent';
import { EventTable } from '../types/EventLog';
import { useEvent } from './useEvent';
import { useLocation } from './useLocation';

export function useCampEvent() {
  const defaultCampEvent = {
    campEvent_id: 0,
    event_id: 0,
    startedBreakAt: 0,
    madeCampAt: 0,
    ateDinnerAt: 0,
    wentToSleepAt: 0,
    setAlarmFor: 0,
    gotUpAt: 0,
    leftCampAt: 0,
    description: '',
  } as CampEvent;
  const [lastCampEvent, setLastCampEvent] = useState<CampEvent>(
    defaultCampEvent,
  );

  const { addCurrentLocation } = useLocation();
  const { getCurrentEventId } = useEvent();

  const database = useDatabase();

  function getLastCampEvent(): Promise<CampEvent> {
    database.getLastCampEvent().then(setLastCampEvent);
    console.log(lastCampEvent);

    return Promise.resolve(lastCampEvent);
  }

  function updateLastCampEvent(): Promise<void> {
    return database.getLastCampEvent().then(setLastCampEvent);
  }

  async function addCampEvent(
    madeCampAt: number | null,
    ateDinnerAt: number | null,
    wentToSleepAt: number | null,
    setAlarmFor: number | null,
    gotUpAt: number | null,
    leftCampAt: number | null,
    description: string,
  ): Promise<void> {
    const eventId = await getCurrentEventId('Recorded Camp Event');

    return database
      .addCampEvent(
        eventId,
        madeCampAt,
        ateDinnerAt,
        wentToSleepAt,
        setAlarmFor,
        gotUpAt,
        leftCampAt,
        description,
      )
      .then((primaryKey) => {
        addCurrentLocation(primaryKey, EventTable.camp);
      })
      .then(updateLastCampEvent);
  }

  async function updateCampEvent(
    campEvent_id: number,
    madeCampAt: number | null,
    ateDinnerAt: number | null,
    wentToSleepAt: number | null,
    setAlarmFor: number | null,
    gotUpAt: number | null,
    leftCampAt: number | null,
    description: string | null,
  ): Promise<void> {
    return database
      .updateCampEvent(
        campEvent_id,
        madeCampAt,
        ateDinnerAt,
        wentToSleepAt,
        setAlarmFor,
        gotUpAt,
        leftCampAt,
        description,
      )
      .then(updateLastCampEvent);
  }

  return {
    addCampEvent,
    updateCampEvent,
    defaultCampEvent,
    getLastCampEvent,
  };
}
