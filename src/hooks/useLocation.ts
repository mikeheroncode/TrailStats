import { useState, useEffect, useContext } from 'react';
import { useDatabase } from '../context/DatabaseContext';
import { useLocationSettingsContext } from '../context/LocationSettingsContext';
import { LocationSettings } from '../types/LocationSettings';

import Geolocation from 'react-native-geolocation-service';

// Hook for managing and accessing fooditems (CRUD)
export function useLocation() {
  const {
    locationSettings,
    setLocationSettings,
  } = useLocationSettingsContext();
  const database = useDatabase();

  useEffect(() => {
    getDefaultLocationSettings();
  }, []);

  function addCurrentLocation(): Promise<number> {
    if (!locationSettings.includeLocation) {
      return Promise.reject(Error('Location is disabled'));
    }
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(`GOT POSITION ${position}`);
        const {
          accuracy,
          altitude,
          heading,
          latitude,
          longitude,
          speed,
        } = position.coords;
        const location_id = database.addLocation(
          accuracy,
          altitude,
          heading,
          latitude,
          longitude,
          speed,
          position.timestamp,
        );
        return location_id;
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
        return Promise.reject(Error('Location error'));
      },
      {
        enableHighAccuracy: locationSettings.enableHighAccuracy,
        timeout: locationSettings.maxTimeout,
        maximumAge: locationSettings.maxAge,
      },
    );
    return Promise.reject(Error('Location error'));
  }

  function getDefaultLocationSettings() {
    return database.getDefaultLocationSettings().then(setLocationSettings);
  }

  function updateDefaultLocationSettings(
    newLocationSettings: LocationSettings,
  ): Promise<void> {
    return database
      .updateDefaultLocationSettings(newLocationSettings)
      .then(getDefaultLocationSettings);
  }

  return {
    locationSettings,
    updateDefaultLocationSettings,
    addCurrentLocation,
  };
}
