import React, { useContext, useState } from 'react';
import { LocationSettings } from '../types/LocationSettings';

interface LocationSettingsState {
  locationSettings: LocationSettings;
  setLocationSettings: React.Dispatch<React.SetStateAction<LocationSettings>>;
}

const LocationSettingsContext = React.createContext<
  LocationSettingsState | undefined
>(undefined);

export const LocationSettingsProvider: React.FunctionComponent = function (
  props,
) {
  const defaultLocationSettings: LocationSettings = {
    includeLocation: true,
    enableHighAccuracy: true,
    maxTimeout: 15000,
    maxAge: 3600 * 60,
  };
  const [locationSettings, setlocationSettings] = useState<LocationSettings>(
    defaultLocationSettings,
  );
  return (
    <LocationSettingsContext.Provider
      value={{
        locationSettings: locationSettings,
        setLocationSettings: setlocationSettings,
      }}
      {...props}
    />
  );
};

export function useLocationSettingsContext(): LocationSettingsState {
  const context = useContext(LocationSettingsContext);
  if (context === undefined) {
    throw new Error('useFood must be used within a LocationSettingsProvider');
  }
  return context;
}
