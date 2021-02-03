import SQLite from 'react-native-sqlite-storage';
import { DatabaseInitialization } from './DatabaseInitialization';
import { Meal } from '../types/Meal';
import { FoodItem } from '../types/FoodItem';
import { AppState, AppStateStatus } from 'react-native';
import { EventLog } from '../types/EventLog';
import { FoodEvent } from '../types/FoodEvent';

export interface Database {
  // Create
  addMeal(name: string, ingredients: number[]): Promise<void>;
  addFoodItem(foodItem: FoodItem): Promise<void>;
  deleteFoodItem(foodItem: FoodItem): Promise<void>;
  logEvent(eventName: string): Promise<number>;
  logFoodEvent(
    eventId: number,
    food_id: number,
    eventName: string,
  ): Promise<void>;
  deleteFoodEvent(event: FoodEvent): Promise<void>;
  //getAllEvents(): Promise<EventLog>;
  getFoodEvents(): Promise<FoodEvent[]>;
  // Read
  getAllMeals(): Promise<Meal[]>;
  getAllFoodItems(): Promise<FoodItem[]>;
  //getFoodItemsFromMeal(meal: Meal): Promise<FoodItem[]>;
  // Update
  updateFoodItem(foodItem: FoodItem): Promise<void>;
  // Delete
  deleteMeal(meal: Meal): Promise<void>;
}

let databaseInstance: SQLite.SQLiteDatabase | undefined;

async function addMeal(name: string, ingredients: number[]): Promise<void> {
  return getDatabase()
    .then((db) => db.executeSql('INSERT INTO Meals (name) VALUES (?);', [name]))
    .then(([results]) => {
      const { insertId } = results;
      console.log(
        `[db] Added meal with title: "${name}"! InsertId: ${insertId}`,
      );
      ingredients.forEach((foodItemId: number) => {
        addIngredient(insertId, foodItemId);
      });
    });
}

async function addIngredient(
  meal_id: number,
  food_id: number,
): Promise<number> {
  return getDatabase()
    .then((db) =>
      db.executeSql(
        'INSERT INTO Ingredients (meal_id, food_id) VALUES (?, ?);',
        [meal_id, food_id],
      ),
    )
    .then(([results]) => {
      const { insertId } = results;
      console.log(
        `[db] Added ingredient with meal_id: "${meal_id}"! InsertId: ${insertId}`,
      );
      return insertId;
    });
}

async function logEvent(eventName: string): Promise<number> {
  return getDatabase()
    .then((db) =>
      db.executeSql('INSERT INTO EventLog (name) VALUES (?);', [eventName]),
    )
    .then(([results]) => {
      const { insertId } = results;
      console.log(
        `[db] Added event with name: "${eventName}"! InsertId: ${insertId}`,
      );
      return insertId;
    });
}

async function logFoodEvent(
  eventId: number,
  food_id: number,
  eventName: string,
): Promise<void> {
  return getDatabase()
    .then((db) =>
      db.executeSql(
        'INSERT INTO FoodEvent (event_id, food_id, name) VALUES (?, ?, ?);',
        [eventId, food_id, eventName],
      ),
    )
    .then(([results]) => {
      const { insertId } = results;
      console.log(
        `[db] Added event with name: "${eventName}"! InsertId: ${insertId}`,
      );
    });
}

async function getFoodEvents(): Promise<FoodEvent[]> {
  console.log('[db] Fetching foodItems from the db...');
  return getDatabase()
    .then((db) =>
      db.executeSql(
        'SELECT * FROM EventLog INNER JOIN FoodEvent ON EventLog.event_id = FoodEvent.event_id ORDER BY event_id ASC, timestamp DESC;',
      ),
    )
    .then(([results]) => {
      if (results === undefined) {
        return [];
      }
      const count = results.rows.length;
      const events: FoodEvent[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const { foodEvent_id, event_id, food_id, name, timestamp } = row;
        console.log(`[db] FoodItem: ${name}, id: ${food_id}`);
        events.push({
          foodEvent_id,
          event_id,
          food_id,
          name,
          timestamp,
        });
      }
      return events;
    });
}

async function deleteFoodEvent(foodEvent: FoodEvent): Promise<void> {
  console.log(
    `[db] Deleting foodEvent: "${foodEvent.name}" with id: ${foodEvent.foodEvent_id}`,
  );
  return getDatabase()
    .then((db) => {
      return db
        .executeSql('DELETE FROM FoodEvent WHERE foodEvent_id = ?;', [
          foodEvent.foodEvent_id,
        ])
        .then(() => db);
    })
    .then((db) =>
      db.executeSql('DELETE FROM FoodEvent WHERE foodEvent_id = ?;', [
        foodEvent.foodEvent_id,
      ]),
    )
    .then(() => {
      console.log(`[db] Deleted foodEvent: "${foodEvent.name}"!`);
    });
}

async function getAllFoodItems(): Promise<FoodItem[]> {
  console.log('[db] Fetching foodItems from the db...');
  return getDatabase()
    .then((db) =>
      // Get all the food, ordered by newest food first
      db.executeSql('SELECT * FROM FoodItems ORDER BY food_id DESC;'),
    )
    .then(([results]) => {
      if (results === undefined) {
        return [];
      }
      const count = results.rows.length;
      const items: FoodItem[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {
          name,
          food_id,
          calories,
          fat,
          protein,
          carbs,
          sugar,
          fiber,
          addedAt,
        } = row;
        console.log(`[db] FoodItem: ${name}, id: ${food_id}`);
        items.push({
          name,
          food_id,
          calories,
          fat,
          protein,
          carbs,
          sugar,
          fiber,
          addedAt,
        });
      }
      return items;
    });
}

async function getAllMeals(): Promise<Meal[]> {
  console.log('[db] Fetching food from the db...');
  return getDatabase()
    .then((db) =>
      // Get all the food, ordered by newest food first
      db.executeSql('SELECT * FROM Meals ORDER BY meal_id DESC;'),
    )
    .then(([results]) => {
      if (results === undefined) {
        return [];
      }
      const count = results.rows.length;
      const meals: Meal[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const { name, id } = row;
        console.log(`[db] Food title: ${name}, id: ${id}`);
        //meals.push({ id, name });
      }
      return meals;
    });
}

async function addFoodItem(foodItem: FoodItem): Promise<void> {
  if (foodItem === undefined) {
    return Promise.reject(Error('Could not add undefined Food Item.'));
  }
  return getDatabase()
    .then((db) =>
      db.executeSql(
        'INSERT INTO FoodItem( name, calories, fat, protein, carbs, sugar, fiber ) VALUES (?, ?, ?, ?, ?, ?, ?);',
        [
          foodItem.name,
          foodItem.calories,
          foodItem.fat,
          foodItem.protein,
          foodItem.carbs,
          foodItem.sugar,
          foodItem.fiber,
        ],
      ),
    )
    .then(([results]) => {
      console.log(
        `[db] FoodItem with "${foodItem.name}" created successfully with id: ${results.insertId}`,
      );
    });
}

async function deleteFoodItem(foodItem: FoodItem): Promise<void> {
  console.log(
    `[db] Deleting foodItem: "${foodItem.name}" with id: ${foodItem.id}`,
  );
  return getDatabase()
    .then((db) => {
      return db
        .executeSql('DELETE FROM FoodItem WHERE food_id = ?;', [foodItem.id])
        .then(() => db);
    })
    .then((db) =>
      db.executeSql('DELETE FROM FoodItem WHERE food_id = ?;', [foodItem.id]),
    )
    .then(() => {
      console.log(`[db] Deleted foodItem: "${foodItem.name}"!`);
    });
}

async function updateFoodItem(foodItem: FoodItem): Promise<void> {
  return getDatabase()
    .then((db) =>
      db.executeSql(
        'UPDATE FoodItem SET text = ?, done = ? WHERE item_id = ?;',
        [foodItem.name, foodItem.id],
      ),
    )
    .then(([results]) => {
      console.log(`[db] Food item with id: ${foodItem.id} updated.`);
      console.log(results);
    });
}

async function deleteMeal(meal: Meal): Promise<void> {
  console.log(`[db] Deleting food titled: "${meal.name}" with id: ${meal.id}`);
  return getDatabase()
    .then((db) => {
      // Delete food items first, then delete the food itself
      return db
        .executeSql('DELETE FROM FoodItem WHERE food_id = ?;', [meal.id])
        .then(() => db);
    })
    .then((db) =>
      db.executeSql('DELETE FROM Food WHERE food_id = ?;', [meal.id]),
    )
    .then(() => {
      console.log(`[db] Deleted food titled: "${meal.name}"!`);
    });
}

// "Private" helpers

async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (databaseInstance !== undefined) {
    return Promise.resolve(databaseInstance);
  }
  // otherwise: open the database first
  return open();
}

// Open a connection to the database
async function open(): Promise<SQLite.SQLiteDatabase> {
  SQLite.DEBUG(true);
  SQLite.enablePromise(true);

  if (databaseInstance) {
    console.log(
      '[db] Database is already open: returning the existing instance',
    );
    return databaseInstance;
  }

  // Otherwise, create a new instance

  const db = await SQLite.openDatabase(
    {
      name: 'test',
      location: 'default',
      createFromLocation: '~www/data/test.db',
    },
    () => {},
    (error) => {
      console.log('error while opening DB: ' + error);
    },
  );
  console.log('Should have local DB');

  // Perform any database initialization or updates, if needed
  //const databaseInitialization = new DatabaseInitialization();
  //await databaseInitialization.updateDatabaseTables(db);
  databaseInstance = db;
  return db;
}

// Close the connection to the database
async function close(): Promise<void> {
  if (databaseInstance === undefined) {
    console.log("[db] No need to close DB again - it's already closed");
    return;
  }
  const status = await databaseInstance.close();
  console.log('[db] Database closed.');
  console.log(status);
  databaseInstance = undefined;
}

let appState = 'active';
console.log('[db] Adding listener to handle app state changes');
AppState.addEventListener('change', handleAppStateChange);

// Handle the app going from foreground to background, and vice versa.
function handleAppStateChange(nextAppState: AppStateStatus) {
  if (appState === 'active' && nextAppState.match(/inactive|background/)) {
    // App has moved from the foreground into the background (or become inactive)
    console.log('[db] App has gone to the background - closing DB connection.');
    close();
  }
  appState = nextAppState;
}

// Export the functions which fulfill the Database interface contract
export const sqliteDatabase: Database = {
  addMeal,
  addFoodItem,
  deleteFoodItem,
  getAllMeals,
  getAllFoodItems,
  updateFoodItem,
  deleteMeal,
  logEvent,
  logFoodEvent,
  getFoodEvents,
  deleteFoodEvent,
};
