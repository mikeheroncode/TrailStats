import SQLite from 'react-native-sqlite-storage';

export class DatabaseInitialization {
  public updateDatabaseTables(database: SQLite.SQLiteDatabase): Promise<void> {
    let dbVersion: number = 0;
    console.log('Beginning database updates...');

    return database
      .transaction(this.createTables)
      .then(() => {
        return this.getDatabaseVersion(database);
      })
      .then((version) => {
        dbVersion = version;
        console.log('Current database version is: ' + dbVersion);

        // Perform DB updates based on this version

        // This is included as an example of how you make database schema changes once the app has been shipped
        if (dbVersion < 1) {
          // Uncomment the next line, and the referenced function below, to enable this
          // return database.transaction(this.preVersion1Inserts);
        }
        // otherwise,
        return;
      })
      .then(() => {
        if (dbVersion < 2) {
          // Uncomment the next line, and the referenced function below, to enable this
          // return database.transaction(this.preVersion2Inserts);
        }
        // otherwise,
        return;
      });
  }

  // Perform initial setup of the database tables
  private createTables(transaction: SQLite.Transaction) {
    console.log("Hey we're building up some tables");
    // DANGER! For dev only
    const dropAllTables = false;
    if (dropAllTables) {
      transaction.executeSql('DROP TABLE IF EXISTS Gear;');
      transaction.executeSql('DROP TABLE IF EXISTS FoodItem;');
      transaction.executeSql('DROP TABLE IF EXISTS Meals;');
      transaction.executeSql('DROP TABLE IF EXISTS Ingredients;');
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
        addedAt Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FoodItem(
        food_id INTEGER PRIMARY KEY NOT NULL,
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
        meal_id INTEGER PRIMARY KEY NOT NULL,
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
      CREATE TABLE IF NOT EXISTS Ingredients(
        ingredient_id INTEGER PRIMARY KEY NOT NULL,
        meal_id INTERGER NOT NULL,
        food_id INTERGER NOT NULL,
        FOREIGN KEY ( meal_id ) REFERENCES Meals ( meal_id ),
        FOREIGN KEY ( food_id ) REFERENCES FoodItem ( food_id )
      );
    `);

    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS EventLog(
        event_id INTEGER PRIMARY KEY NOT NULL,
        name TEXT,
        timestamp Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FoodEvent(
        foodEvent_id INTEGER PRIMARY KEY NOT NULL,
        event_id INTEGER NOT NULL,
        food_id INTEGER NOT NULL,
        name TEXT,
        FOREIGN KEY ( food_id ) REFERENCES Food ( item_id )
        FOREIGN KEY ( event_id ) REFERENCES EventLog ( event_id )
      );
    `);

    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS MovementEvent(
        movementEvent_id INTEGER PRIMARY KEY NOT NULL,
        event_id INTEGER NOT NULL,
        name TEXT,
        FOREIGN KEY ( event_id ) REFERENCES EventLog ( event_id )
      );
    `);

    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS WeightEvent(
        weightEvent_id INTEGER PRIMARY KEY NOT NULL,
        event_id INTEGER NOT NULL,
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

  // Get the version of the database, as specified in the Version table
  private getDatabaseVersion(database: SQLite.SQLiteDatabase): Promise<number> {
    // Select the highest version number from the version table
    return database
      .executeSql('SELECT version FROM Version ORDER BY version DESC LIMIT 1;')
      .then(([results]) => {
        if (results.rows && results.rows.length > 0) {
          const version = results.rows.item(0).version;
          return version;
        } else {
          return 0;
        }
      })
      .catch((error) => {
        console.log(`No version set. Returning 0. Details: ${error}`);
        return 0;
      });
  }

  // Once the app has shipped, use the following functions as a template for updating the database:
  /*
    // This function should be called when the version of the db is < 1
    private preVersion1Inserts(transaction: SQLite.Transaction) {
        console.log("Running pre-version 1 DB inserts");
        // Make schema changes
        transaction.executeSql("ALTER TABLE ...");
        // Lastly, update the database version
        transaction.executeSql("INSERT INTO Version (version) VALUES (1);");
    }
    // This function should be called when the version of the db is < 2
    private preVersion2Inserts(transaction: SQLite.Transaction) {
        console.log("Running pre-version 2 DB inserts");

        // Make schema changes
        transaction.executeSql("ALTER TABLE ...");
        // Lastly, update the database version
        transaction.executeSql("INSERT INTO Version (version) VALUES (2);");
    }
    */
}
