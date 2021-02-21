import { useState, useEffect, useContext } from 'react';
import { useDatabase } from '../context/DatabaseContext';
import { useLocationSettingsContext } from '../context/LocationSettingsContext';
import { LocationSettings } from '../types/LocationSettings';

import Geolocation from 'react-native-geolocation-service';
import { EventTable } from '../types/EventLog';

export function useLocation() {
  const {
    locationSettings,
    setLocationSettings,
  } = useLocationSettingsContext();
  const database = useDatabase();

  useEffect(() => {
    getDefaultLocationSettings();
  }, []);

  async function addCurrentLocation(
    primaryKey: number,
    tableToUpdate: EventTable,
  ): Promise<void> {
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
        return database
          .addLocation(
            accuracy,
            altitude,
            heading,
            latitude,
            longitude,
            speed,
            position.timestamp,
          )
          .then((location_id) => {
            database.addEventLocation(primaryKey, location_id, tableToUpdate);
          });
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: locationSettings.enableHighAccuracy,
        timeout: locationSettings.maxTimeout,
        maximumAge: locationSettings.maxAge,
      },
    );
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
    setLocationSettings,
    updateDefaultLocationSettings,
    addCurrentLocation,
  };
}
