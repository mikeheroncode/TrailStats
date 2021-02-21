import { useState, useEffect, useContext } from 'react';
import { useDatabase } from '../context/DatabaseContext';
import { useEventContext } from '../context/EventContext';
import { defaultEvent, Event } from '../types/Event';
import { EventTable } from '../types/EventLog';
import { useLocation } from './useLocation';

export function useEvent() {
  const eventStateContextValue = useEventContext();
  const database = useDatabase();

  const { addCurrentLocation } = useLocation();

  useEffect(() => {
    getDefaultEvent();
  }, []);

  function getDefaultEvent() {
    return defaultEvent;
  }
  function startEvent(eventName: string, startTime: number) {
    return database
      .startEvent(eventName, startTime, false)
      .then((newId) => {
        eventStateContextValue.setEventState({
          currentEvent: {
            event_id: newId,
            name: eventName,
            startTimestamp: startTime,
            isSingleEvent: false,
          },
          eventInProgress: true,
        });
        console.log(newId);
        console.log(
          JSON.stringify(eventStateContextValue.eventState.currentEvent),
        );
        return newId;
      })
      .then((newId) => addCurrentLocation(newId, EventTable.genericEventStart));
  }
  function endEvent(eventName: string, startTime: number, endTime: number) {
    eventStateContextValue.setEventState({
      currentEvent: {
        ...eventStateContextValue.eventState.currentEvent,
        name: eventName,
        startTimestamp: startTime,
        endTimestamp: endTime,
      },
      eventInProgress: true,
    });

    return database
      .updateEvent(
        eventStateContextValue.eventState.currentEvent.event_id,
        eventName,
        startTime,
        endTime,
      )
      .then(() =>
        addCurrentLocation(
          eventStateContextValue.eventState.currentEvent.event_id,
          EventTable.genericEventEnd,
        ),
      );
  }

  function updateEvent(eventName: string, startTime: number, endTime: number) {
    eventStateContextValue.setEventState({
      currentEvent: {
        ...eventStateContextValue.eventState.currentEvent,
        name: eventName,
        startTimestamp: startTime,
        endTimestamp: endTime,
      },
      eventInProgress: true,
    });

    return database.updateEvent(
      eventStateContextValue.eventState.currentEvent.event_id,
      eventName,
      startTime,
      endTime,
    );
  }

  async function newEvent(): Promise<void> {
    eventStateContextValue.setEventState({
      currentEvent: defaultEvent,
      eventInProgress: false,
    });
  }

  async function getCurrentEventId(singleEventName: string): Promise<number> {
    return eventStateContextValue.eventState.eventInProgress
      ? eventStateContextValue.eventState.currentEvent.event_id
      : await database.logEvent(singleEventName);
  }

  return {
    startEvent,
    endEvent,
    getCurrentEventId,
    updateEvent,
    newEvent,
  };
}
