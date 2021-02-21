import React, { useContext, Dispatch, SetStateAction, useState } from 'react';
import { Event } from '../types/Event';

interface EventContextState {
  currentEvent: Event;
  eventInProgress: boolean;
}

type EventContextValue = {
  eventState: EventContextState;
  setEventState: Dispatch<SetStateAction<EventContextState>>;
};

const EventContext = React.createContext<EventContextValue | undefined>(
  undefined,
);

export const EventProvider: React.FunctionComponent = function (props) {
  const defaultEvent: Event = {
    event_id: 0,
    name: '',
    isSingleEvent: false,
    startTimestamp: 0,
    endTimestamp: 0,
  };
  const [eventState, setEventState] = useState({
    currentEvent: defaultEvent,
    eventInProgress: false,
  });
  return (
    <EventContext.Provider
      value={{
        eventState,
        setEventState,
      }}
      {...props}
    />
  );
};

export function useEventContext(): EventContextValue {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEventContext must be used within a EventProvider');
  }
  return context;
}
