import SQLite from 'react-native-sqlite-storage';

export class DatabaseInitialization {
  private createTables(transaction: SQLite.Transaction) {
    const dropAllTables = false;
    if (dropAllTables) {
      transaction.executeSql('DROP TABLE IF EXISTS Gear;');
      transaction.executeSql('DROP TABLE IF EXISTS Food;');
      transaction.executeSql('DROP TABLE IF EXISTS EventLog;');
      transaction.executeSql('DROP TABLE IF EXISTS FoodEvent;');
      transaction.executeSql('DROP TABLE IF EXISTS MovementEvent;');
      transaction.executeSql('DROP TABLE IF EXISTS WeightEvent;');
      transaction.executeSql('DROP TABLE IF EXISTS Version;');
    }

    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS Gear(
        item_id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        weight REAL NOT NULL,
        price REAL NOT NULL,
        link TEXT,
        purchasedFrom TEXT,
        addedAt Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      );
    `);

    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FoodItem(
        item_id INTEGER PRIMARY KEY NOT NULL,
        name TEXT,
        calories INTEGER NOT NULL,
        fat INTEGER NOT NULL,
        protein INTEGER NOT NULL,
        sugar INTEGER NOT NULL,
        fiber INTEGER,
        addedAt Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS Meals(
        item_id INTEGER PRIMARY KEY NOT NULL,
        name TEXT,
        calories INTEGER NOT NULL,
        fat INTEGER NOT NULL,
        protein INTEGER NOT NULL,
        sugar INTEGER NOT NULL,
        fiber INTEGER,
        addedAt Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ( list_id ) REFERENCES List ( list_id )
      );
    `);

    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS EventLog(
        event_id INTEGER PRIMARY KEY NOT NULL,
        name TEXT,
        timestamp Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      );
    `);

    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FoodEvent(
        foodEvent_id INTEGER PRIMARY KEY NOT NULL,
        name TEXT,
        FOREIGN KEY ( food_id ) REFERENCES Food ( item_id )
        FOREIGN KEY ( event_id ) REFERENCES EventLog ( event_id )
      );
    `);

    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS MovementEvent(
        movementEvent_id INTEGER PRIMARY KEY NOT NULL,
        name TEXT,
        FOREIGN KEY ( event_id ) REFERENCES EventLog ( event_id )
      );
    `);

    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS WeightEvent(
        weightEvent_id INTEGER PRIMARY KEY NOT NULL,
        name TEXT,
        FOREIGN KEY ( event_id ) REFERENCES EventLog ( event_id )
      );
    `);

    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS Version(
        version_id INTEGER PRIMARY KEY NOT NULL,
        version INTEGER
      );
    `);
  }
}
