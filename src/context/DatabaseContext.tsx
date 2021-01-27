import React, { useContext } from 'react';
import { Database, sqliteDatabase } from '../database/Database';
const DatabaseContext = React.createContext<Database | undefined>(undefined);

export const DatabaseProvider: React.FunctionComponent = function (props) {
  return <DatabaseContext.Provider value={sqliteDatabase} {...props} />;
};

export function useDatabase(): Database {
  const database = useContext(DatabaseContext);
  if (database === undefined) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return database;
}
