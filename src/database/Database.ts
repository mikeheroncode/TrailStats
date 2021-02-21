import SQLite from 'react-native-sqlite-storage';
import { Meal } from '../types/Meal';
import { FoodItem, PendingFoodItem } from '../types/FoodItem';
import { AppState, AppStateStatus } from 'react-native';
import { EventLog, EventTable } from '../types/EventLog';
import { FoodEvent } from '../types/FoodEvent';
import { LocationSettings } from '../types/LocationSettings';
import { WeightEvent } from '../types/WeightEvent';
import { WaterSourceEvent } from '../types/WaterSourceEvent';
import { PersonEvent } from '../types/PersonEvent';
import { Location } from '../types/Location';
import { CampEvent, defaultCampEvent } from '../types/CampEvent';
import { UnifiedEventLogItem } from '../types/UnifiedEventLogItem';

export interface Database {
  // Create
  addMeal(name: string, ingredients: number[]): Promise<void>;
  addFoodItem(foodItem: PendingFoodItem): Promise<void>;
  deleteFoodItem(foodItem: FoodItem): Promise<void>;
  logEvent(eventName: string): Promise<number>;
  startEvent(
    eventName: string,
    startTime: number,
    isSingleEvent: boolean,
  ): Promise<number>;
  endEvent(
    event_id: number,
    eventName: string,
    startTime: number,
  ): Promise<void>;
  updateEvent(
    event_id: number,
    eventName: string,
    startTime: number,
    endTime: number | null,
  ): Promise<void>;
  addGenericEventLocation(
    event_id: number,
    location_id: number | null,
    isStart: boolean,
  ): Promise<void>;
  addFoodEvent(
    eventId: number,
    food_id: number,
    eventName: string,
  ): Promise<number>;
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
  getDefaultLocationSettings(): Promise<LocationSettings>;
  updateDefaultLocationSettings(
    newLocationSettings: LocationSettings,
  ): Promise<void>;
  addWeightEvent(
    event_id: number,
    description: string,
    weight: number,
  ): Promise<number>;
  addLocation(
    accuracy: number,
    altitude: number | null,
    heading: number | null,
    latitude: number,
    longitude: number,
    speed: number | null,
    timestamp: number,
  ): Promise<number>;
  getAllWeightEvents(): Promise<WeightEvent[]>;
  getLastWeightEvent(): Promise<WeightEvent>;
  addWaterSourceEvent(
    event_id: number,
    flow: number,
    accessibility: number,
    description: string | null,
  ): Promise<number>;
  addWaterSourceEvent(
    event_id: number,
    flow: number,
    accessibility: number,
    description: string | null,
  ): Promise<number>;
  getAllWaterSourceEvents(): Promise<WaterSourceEvent[]>;
  addPersonEvent(
    event_id: number,
    age: number,
    gender: number,
    trailName: string | null,
    hikeLength: number | null,
    packWeight: number | null,
    shelter: number | null,
    description: string | null,
  ): Promise<number>;
  getAllPersonEvents(): Promise<PersonEvent[]>;
  getLastPersonEvent(): Promise<PersonEvent>;
  addCampEvent(
    event_id: number,
    madeCampAt: number | null,
    ateDinnerAt: number | null,
    wentToSleepAt: number | null,
    setAlarmFor: number | null,
    gotUpAt: number | null,
    leftCampAt: number | null,
    description: string | null,
  ): Promise<number>;
  updateCampEvent(
    campEvent_id: number,
    madeCampAt: number | null,
    ateDinnerAt: number | null,
    wentToSleepAt: number | null,
    setAlarmFor: number | null,
    gotUpAt: number | null,
    leftCampAt: number | null,
    description: string | null,
  ): Promise<void>;
  getAllCampEvents(): Promise<CampEvent[]>;
  getLastCampEvent(): Promise<CampEvent>;
  addEventLocation(
    primaryKey: number,
    location_id: number | null,
    tableToUpdate: EventTable,
  ): Promise<void>;
  getAllUnifiedEventLogItems(): Promise<UnifiedEventLogItem[]>;
  deleteEventFromLog(event_id: number): Promise<void>;
  deleteEntityEventFromLog(entity_id: number, tableName: string): Promise<void>;
}

let databaseInstance: SQLite.SQLiteDatabase | undefined;

async function addMeal(name: string, ingredients: number[]): Promise<void> {
  return getDatabase()
    .then((db) => db.executeSql('INSERT INTO Meal (name) VALUES (?);', [name]))
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
        'INSERT INTO Ingredient (meal_id, food_id) VALUES (?, ?);',
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
  const insertTime = new Date();
  return getDatabase()
    .then((db) =>
      db.executeSql(
        'INSERT INTO EventLog (name, start_timestamp, end_timestamp) VALUES (?, ?, ?);',
        [eventName, +insertTime, +insertTime],
      ),
    )
    .then(([results]) => {
      const { insertId } = results;
      console.log(
        `[db] Added event with name: "${eventName}"! InsertId: ${insertId}`,
      );
      return insertId;
    });
}
async function startEvent(
  eventName: string,
  startTime: number,
  isSingleEvent: boolean,
): Promise<number> {
  return getDatabase()
    .then((db) =>
      db.executeSql(
        'INSERT INTO EventLog (name, start_timestamp, isSingleEvent) VALUES (?, ?, ?);',
        [eventName, startTime, isSingleEvent],
      ),
    )
    .then(([results]) => {
      const { insertId } = results;
      console.log(
        `[db] Added event with name: "${eventName}"! InsertId: ${insertId}`,
      );
      return insertId;
    });
}

async function endEvent(
  event_id: number,
  eventName: string,
  endTime: number,
): Promise<void> {
  return getDatabase()
    .then((db) =>
      db.executeSql(
        'UPDATE EventLog SET name = ?, end_timestamp = ? where event_id=?;',
        [eventName, endTime, event_id],
      ),
    )
    .then(([results]) => {
      const { insertId } = results;
      console.log(
        `[db] Added event with name: "${eventName}"! InsertId: ${insertId}`,
      );
    });
}

async function updateEvent(
  event_id: number,
  eventName: string,
  startTime: number,
  endTime: number,
): Promise<void> {
  return getDatabase()
    .then((db) =>
      db.executeSql(
        'UPDATE EventLog SET name = ?, start_timestamp = ?, end_timestamp = ? WHERE event_id = ?;',
        [eventName, startTime, endTime, event_id],
      ),
    )
    .then(([results]) => {
      console.log(
        `[db] Added event with name: "${eventName}"! InsertId: ${event_id}`,
      );
    });
}

async function addFoodEvent(
  eventId: number,
  food_id: number,
  eventName: string,
): Promise<number> {
  return getDatabase()
    .then((db) =>
      db.executeSql(
        'INSERT INTO FoodEvent (event_id, food_id, name) VALUES (?, ?, ?);',
        [eventId, food_id, eventName],
      ),
    )
    .then(([results]) => {
      return results.insertId;
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
      db.executeSql('SELECT * FROM FoodItem ORDER BY food_id DESC;'),
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
          size,
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
          size,
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
      db.executeSql('SELECT * FROM Meal ORDER BY meal_id DESC;'),
    )
    .then(([results]) => {
      if (results === undefined) {
        return [];
      }
      const count = results.rows.length;
      const meals: Meal[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const { name, meal_id } = row;
        console.log(`[db] Food title: ${name}, id: ${meal_id}`);
        const ingredients = [] as FoodItem[];
        meals.push({ meal_id, name, ingredients });
      }
      return meals;
    });
}

async function addFoodItem(foodItem: PendingFoodItem): Promise<void> {
  if (foodItem === undefined) {
    return Promise.reject(Error('Could not add undefined Food Item.'));
  }
  return getDatabase()
    .then((db) =>
      db.executeSql(
        'INSERT INTO FoodItem( name, calories, fat, protein, carbs, sugar, fiber, size ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
        [
          foodItem.name,
          foodItem.calories,
          foodItem.fat,
          foodItem.protein,
          foodItem.carbs,
          foodItem.sugar,
          foodItem.fiber,
          foodItem.size,
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

async function getDefaultLocationSettings(): Promise<LocationSettings> {
  console.log('[db] Fetching locationSettings from the db...');
  const defaultLocationSettings: LocationSettings = {
    includeLocation: true,
    enableHighAccuracy: true,
    maxTimeout: 15000,
    maxAge: 3600 * 60,
  };
  return getDatabase()
    .then((db) =>
      // Get all the food, ordered by newest food first
      db.executeSql(
        'SELECT * FROM LocationSettings ORDER BY locationSettings_id DESC LIMIT 1;',
      ),
    )
    .then(([results]) => {
      if (results === undefined) {
        return defaultLocationSettings;
      }
      const row = results.rows.item(0);
      if (row === undefined) {
        return defaultLocationSettings;
      }
      const { includeLocation, enableHighAccuracy, maxTimeout, maxAge } = row;
      return {
        includeLocation: includeLocation === 1,
        enableHighAccuracy: enableHighAccuracy === 1,
        maxTimeout: maxTimeout,
        maxAge: maxAge,
      } as LocationSettings;
    });
}

async function updateDefaultLocationSettings(
  newLocationSettings: LocationSettings,
): Promise<void> {
  if (newLocationSettings === undefined) {
    return Promise.reject(Error('Could not add undefined Food Item.'));
  }
  return getDatabase()
    .then((db) =>
      db.executeSql(
        'INSERT INTO LocationSettings( includeLocation, enableHighAccuracy, maxTimeout, maxAge ) VALUES (?, ?, ?, ?);',
        [
          newLocationSettings.includeLocation,
          newLocationSettings.enableHighAccuracy,
          newLocationSettings.maxTimeout,
          newLocationSettings.maxAge,
        ],
      ),
    )
    .then(([results]) => {
      console.log(
        `[db] Created successfully LocationSettings: ${results.insertId}`,
      );
    });
}

async function addWeightEvent(
  event_id: number,
  description: string,
  weight: number,
): Promise<number> {
  return getDatabase()
    .then((db) =>
      db.executeSql(
        'INSERT INTO WeightEvent( event_id, description, weight) VALUES (?, ?, ?);',
        [event_id, description, weight],
      ),
    )
    .then(([results]) => {
      return results.insertId;
    });
}

async function getAllWeightEvents(): Promise<WeightEvent[]> {
  console.log('[db] Fetching food from the db...');
  return getDatabase()
    .then((db) =>
      // Get all the food, ordered by newest food first
      db.executeSql('SELECT * FROM WeightEvent ORDER BY weightEvent_id DESC;'),
    )
    .then(([results]) => {
      if (results === undefined) {
        return [];
      }
      const count = results.rows.length;
      const weightEvents: WeightEvent[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {
          weightEvent_id,
          event_id,
          description,
          weight,
          timestamp,
          location,
        } = row;
        console.log(
          `[db] WEightEvent title: ${description}, id: ${weightEvent_id}`,
        );
        weightEvents.push({
          weightEvent_id,
          event_id,
          description,
          weight,
          timestamp,
          location,
        });
      }
      return weightEvents;
    });
}

async function getLastWeightEvent(): Promise<WeightEvent> {
  console.log('[db] Fetching food from the db...');
  return getDatabase()
    .then((db) =>
      // Get all the food, ordered by newest food first
      db.executeSql(
        'SELECT * FROM WeightEvent Left JOIN Location ON WeightEvent.location_id = Location.location_id ORDER BY weightEvent_id DESC LIMIT 1;',
      ),
    )
    .then(([results]) => {
      const defaultWeightEvent: WeightEvent = {
        weightEvent_id: 0,
        event_id: 0,
        description: '',
        weight: 185,
        timestamp: 0,
      };
      if (results === undefined) {
        return Promise.reject(Error('Location error'));
      }
      const row = results.rows.item(0);
      if (row === undefined) {
        return defaultWeightEvent;
      }
      console.log('ROW BELOW');
      console.log(row);
      const {
        weightEvent_id,
        event_id,
        description,
        weight,
        timestamp,
        location,
      } = row;
      console.log('Location');
      console.log(location);
      return {
        weightEvent_id,
        event_id,
        description,
        weight,
        timestamp,
        location,
      } as WeightEvent;
    });
}

async function addLocation(
  accuracy: number,
  altitude: number | null,
  heading: number,
  latitude: number,
  longitude: number,
  speed: number,
  timestamp: number,
): Promise<number> {
  return getDatabase()
    .then((db) =>
      db.executeSql(
        'INSERT INTO Location( accuracy, altitude, heading, latitude, longitude, speed, location_timestamp ) VALUES (?, ?, ?, ?, ?, ?, ?);',
        [accuracy, altitude, heading, latitude, longitude, speed, timestamp],
      ),
    )
    .then(([results]) => {
      console.log(
        `[db] Location created successfully with id: ${results.insertId}`,
      );
      return results.insertId;
    });
}

async function addWaterSourceEvent(
  event_id: number,
  flow: number,
  accessibility: number,
  description: string | null,
): Promise<number> {
  return getDatabase()
    .then((db) =>
      db.executeSql(
        'INSERT INTO WaterSourceEvent( event_id, flow, accessibility, description) VALUES (?, ?, ?, ?);',
        [event_id, flow, accessibility, description],
      ),
    )
    .then(([results]) => {
      return results.insertId;
    });
}

async function getAllWaterSourceEvents(): Promise<WaterSourceEvent[]> {
  console.log('[db] Fetching watersources from the db...');
  return getDatabase()
    .then((db) =>
      // Get all the food, ordered by newest food first
      db.executeSql(
        'SELECT * FROM WaterSourceEvent as wse Left JOIN Location as l ON WaterSourceEvent.location_id = Location.location_id ORDER BY waterSourceEvent_id DESC;',
      ),
    )
    .then(([results]) => {
      if (results === undefined) {
        return [];
      }
      const count = results.rows.length;
      const waterSourceEvents: WaterSourceEvent[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {
          waterSourceEvent_id,
          event_id,
          location_id,
          flow,
          accessibility,
          description,
          timestamp,
          accuracy,
          altitude,
          heading,
          latitude,
          longitude,
          speed,
          location_timestamp,
        } = row;
        console.log(
          `[db] WaterSource title: ${description}, id: ${waterSourceEvent_id}`,
        );
        const waterSourceEvent: WaterSourceEvent = {
          waterSourceEvent_id: waterSourceEvent_id,
          event_id: event_id,
          flow: flow,
          accessibility: accessibility,
          description: description,
          timestamp: timestamp,
        };
        if (location_id) {
          waterSourceEvent.location = {
            location_id,
            accuracy,
            altitude,
            heading,
            latitude,
            longitude,
            speed,
            location_timestamp,
          };
        }
        waterSourceEvents.push(waterSourceEvent);
      }
      return waterSourceEvents;
    });
}
async function addPersonEvent(
  event_id: number,
  age: number,
  gender: number,
  trailName: string | null,
  hikeLength: number | null,
  packWeight: number | null,
  shelter: number | null,
  description: string | null,
): Promise<number> {
  return getDatabase()
    .then((db) =>
      db.executeSql(
        'INSERT INTO PersonEvent( event_id, age, gender, trailName, hikeLength, packWeight, shelter, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
        [
          event_id,
          age,
          gender,
          trailName,
          hikeLength,
          packWeight,
          shelter,
          description,
        ],
      ),
    )
    .then(([results]) => {
      return results.insertId;
    });
}

async function getAllPersonEvents(): Promise<PersonEvent[]> {
  console.log('[db] Fetching watersources from the db...');
  return getDatabase()
    .then((db) =>
      // Get all the food, ordered by newest food first
      db.executeSql(
        'SELECT * FROM PersonEvent Left JOIN Location ON PersonEvent.location_id = Location.location_id ORDER BY personEvent_id DESC;',
      ),
    )
    .then(([results]) => {
      if (results === undefined) {
        return [];
      }
      const count = results.rows.length;
      const personEvents: PersonEvent[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {
          personEvent_id,
          event_id,
          location_id,
          age,
          gender,
          trailName,
          hikeLength,
          packWeight,
          shelter,
          description,
          timestamp,
          accuracy,
          altitude,
          heading,
          latitude,
          longitude,
          speed,
          location_timestamp,
        } = row;
        console.log(
          `[db] PersonEvent title: ${description}, id: ${personEvent_id}`,
        );
        const personEvent: PersonEvent = {
          personEvent_id: personEvent_id,
          event_id: event_id,
          age: age,
          gender: gender,
          timestamp: timestamp,
        };
        if (location_id) {
          personEvent.location = {
            location_id,
            accuracy,
            altitude,
            heading,
            latitude,
            longitude,
            speed,
            location_timestamp,
          };
        }
        if (trailName) {
          personEvent.trailName = trailName;
        }
        if (hikeLength) {
          personEvent.hikeLength = hikeLength;
        }
        if (packWeight) {
          personEvent.packWeight = packWeight;
        }
        if (shelter) {
          personEvent.shelter = shelter;
        }
        if (description) {
          personEvent.description = description;
        }
        personEvents.push(personEvent);
      }
      return personEvents;
    });
}

async function getLastPersonEvent(): Promise<PersonEvent> {
  console.log('[db] Fetching watersources from the db...');
  const defaultPersonEvent = {
    personEvent_id: 0,
    event_id: 0,
    age: 0,
    gender: 0,
    timestamp: 0,
  } as PersonEvent;
  return getDatabase()
    .then((db) =>
      // Get all the food, ordered by newest food first
      db.executeSql(
        'SELECT * FROM PersonEvent Left JOIN Location ON PersonEvent.location_id = Location.location_id ORDER BY personEvent_id DESC LIMIT 1;',
      ),
    )
    .then(([results]) => {
      if (results === undefined) {
        return defaultPersonEvent;
      }
      const row = results.rows.item(0);
      if (row === undefined) {
        return defaultPersonEvent;
      }
      const {
        personEvent_id,
        event_id,
        location_id,
        age,
        gender,
        trailName,
        hikeLength,
        packWeight,
        shelter,
        description,
        timestamp,
        accuracy,
        altitude,
        heading,
        latitude,
        longitude,
        speed,
        location_timestamp,
      } = row;

      const personEvent: PersonEvent = {
        personEvent_id: personEvent_id as number,
        event_id: event_id,
        age: age,
        gender: gender,
        timestamp: timestamp,
      };
      if (location_id) {
        const location: Location = {
          location_id: location_id,
          accuracy: accuracy,
          altitude: altitude,
          heading: heading,
          latitude: latitude,
          longitude: longitude,
          speed: speed,
          location_timestamp: location_timestamp,
        };
        personEvent.location = location;
      }
      if (trailName) {
        personEvent.trailName = trailName;
      }
      if (hikeLength) {
        personEvent.hikeLength = hikeLength;
      }
      if (packWeight) {
        personEvent.packWeight = packWeight;
      }
      if (shelter) {
        personEvent.shelter = shelter;
      }
      if (description) {
        personEvent.description = description;
      }
      console.log(
        `[db] PersonEvent title: id: ${personEvent_id} : ${JSON.stringify(
          personEvent,
        )}`,
      );
      return personEvent;
    });
}

async function addCampEvent(
  event_id: number,
  madeCampAt: number | null,
  ateDinnerAt: number | null,
  wentToSleepAt: number | null,
  setAlarmFor: number | null,
  gotUpAt: number | null,
  leftCampAt: number | null,
  description: string | null,
): Promise<number> {
  return getDatabase()
    .then((db) =>
      db.executeSql(
        'INSERT INTO CampEvent( event_id, madeCampAt, ateDinnerAt, wentToSleepAt, setAlarmFor, gotUpAt, leftCampAt, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
        [
          event_id,
          madeCampAt,
          ateDinnerAt,
          wentToSleepAt,
          setAlarmFor,
          gotUpAt,
          leftCampAt,
          description,
        ],
      ),
    )
    .then(([results]) => {
      return results.insertId;
    });
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
  return getDatabase()
    .then((db) =>
      db.executeSql(
        'UPDATE CampEvent SET madeCampAt = ?, ateDinnerAt = ?, wentToSleepAt = ?, setAlarmFor = ?, gotUpAt = ?, leftCampAt = ?, description = ? where campEvent_id = ?;',
        [
          madeCampAt,
          ateDinnerAt,
          wentToSleepAt,
          setAlarmFor,
          gotUpAt,
          leftCampAt,
          description,
          campEvent_id,
        ],
      ),
    )
    .then(([results]) => {
      console.log(`[db] CampEvent Updated: ${results.rowsAffected}`);
    });
}

async function getAllCampEvents(): Promise<CampEvent[]> {
  console.log('[db] Fetching watersources from the db...');
  return getDatabase()
    .then((db) =>
      // Get all the food, ordered by newest food first
      db.executeSql(
        'SELECT * FROM CampEvent Left JOIN Location ON CampEvent.location_id = Location.location_id ORDER BY campEvent_id DESC;',
      ),
    )
    .then(([results]) => {
      if (results === undefined) {
        return [];
      }
      const count = results.rows.length;
      const campEvents: CampEvent[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {
          campEvent_id,
          event_id,
          location_id,
          madeCampAt,
          ateDinnerAt,
          wentToSleepAt,
          setAlarmFor,
          gotUpAt,
          leftCampAt,
          description,
          accuracy,
          altitude,
          heading,
          latitude,
          longitude,
          speed,
          location_timestamp,
        } = row;
        console.log(
          `[db] CampEvent title: ${description}, id: ${campEvent_id}`,
        );
        const campEvent: CampEvent = {
          campEvent_id: campEvent_id,
          event_id: event_id,
          madeCampAt: madeCampAt,
          ateDinnerAt: ateDinnerAt,
          wentToSleepAt: wentToSleepAt,
          setAlarmFor: setAlarmFor,
          gotUpAt: gotUpAt,
          leftCampAt: leftCampAt,
          description: description,
        };
        if (location_id) {
          campEvent.location = {
            location_id,
            accuracy,
            altitude,
            heading,
            latitude,
            longitude,
            speed,
            location_timestamp,
          };
        }

        campEvents.push(campEvent);
      }
      return campEvents;
    });
}

async function getLastCampEvent(): Promise<CampEvent> {
  console.log('[db] Fetching watersources from the db...');
  return getDatabase()
    .then((db) =>
      // Get all the food, ordered by newest food first
      db.executeSql(
        'SELECT * FROM CampEvent Left JOIN Location ON CampEvent.location_id = Location.location_id ORDER BY campEvent_id DESC LIMIT 1;',
      ),
    )
    .then(([results]) => {
      if (results === undefined) {
        return {} as CampEvent;
      }
      const row = results.rows.item(0);
      if (row === undefined) {
        return defaultCampEvent;
      }
      const {
        campEvent_id,
        event_id,
        location_id,
        madeCampAt,
        ateDinnerAt,
        wentToSleepAt,
        setAlarmFor,
        gotUpAt,
        leftCampAt,
        description,
        accuracy,
        altitude,
        heading,
        latitude,
        longitude,
        speed,
        location_timestamp,
      } = row;
      console.log(`[db] CampEvent title: ${description}, id: ${campEvent_id}`);
      const campEvent: CampEvent = {
        campEvent_id: campEvent_id,
        event_id: event_id,
        madeCampAt: madeCampAt,
        ateDinnerAt: ateDinnerAt,
        wentToSleepAt: wentToSleepAt,
        setAlarmFor: setAlarmFor,
        gotUpAt: gotUpAt,
        leftCampAt: leftCampAt,
        description: description,
      };
      if (location_id) {
        campEvent.location = {
          location_id,
          accuracy,
          altitude,
          heading,
          latitude,
          longitude,
          speed,
          location_timestamp,
        };
      }

      return campEvent;
    });
}

async function addTest(
  location_id: number,
  description: string,
  startedLocation: number,
  gotLocation: number,
): Promise<number> {
  return getDatabase()
    .then((db) =>
      db.executeSql(
        'INSERT INTO LocationTest( location_id, description, startedLocation, gotLocation) VALUES (?, ?, ?, ?);',
        [location_id, description, startedLocation, gotLocation],
      ),
    )
    .then(([results]) => {
      console.log(
        `[db] LocationTest created successfully with id: ${results.insertId}`,
      );
      return results.insertId;
    });
}

function addEventLocation(
  primaryKey: number,
  location_id: number | null,
  tableToUpdate: EventTable,
): Promise<void> {
  let sql =
    'UPDATE [tableName]Event SET location_id=? where [primaryKeyName]Event_id = ?';
  let tableName: string;
  switch (tableToUpdate) {
    case EventTable.foodItem:
      tableName = 'food';
      break;
    case EventTable.meal:
      tableName = 'meal';
      break;
    case EventTable.camp:
      tableName = 'camp';
      break;
    case EventTable.person:
      tableName = 'person';
      break;
    case EventTable.weight:
      tableName = 'weight';
      break;
    case EventTable.waterSource:
      tableName = 'waterSource';
      break;
    case EventTable.genericEventStart:
      return addGenericEventLocation(primaryKey, location_id, true);
    case EventTable.genericEventEnd:
      return addGenericEventLocation(primaryKey, location_id, false);
    default:
      console.log(tableToUpdate);
      return Promise.reject(
        Error(`Can't add location_id to EventTable: ${EventTable}`),
      );
  }
  sql = sql.replace(
    '[tableName]',
    tableName.charAt(0).toUpperCase() + tableName.slice(1),
  );
  sql = sql.replace('[primaryKeyName]', tableName);
  return getDatabase()
    .then((db) => db.executeSql(sql, [location_id, primaryKey]))
    .then(([results]) => {
      console.log(
        `[db] Add location_id ${location_id}, to table ${tableName} with PK: ${primaryKey}`,
      );
    });
}

function addGenericEventLocation(
  event_id: number,
  location_id: number | null,
  isStart: boolean,
): Promise<void> {
  const columnForLocationId = isStart ? 'start_location_id' : 'end_location_id';
  let sql = `UPDATE EventLog SET ${columnForLocationId}=? where event_id=?`;
  return getDatabase()
    .then((db) => db.executeSql(sql, [location_id, event_id]))
    .then(([results]) => {
      console.log(
        `[db] Add ${columnForLocationId}: ${location_id}, to table EventLog with PK: ${event_id}`,
      );
    });
}

function getAllUnifiedEventLogItems(): Promise<UnifiedEventLogItem[]> {
  console.log('[db] Fetching food from the db...');
  return getDatabase()
    .then((db) =>
      db.executeSql(
        "SELECT * FROM UnifiedEventLog WHERE start_timestamp >= ((strftime('%s', 'now') - (60 * 60 * 24 * 10)) * 1000)  ORDER BY event_id DESC;",
      ),
    )
    .then(([results]) => {
      if (results === undefined) {
        return [];
      }

      const count = results.rows.length;
      const unifiedEventLogItems: UnifiedEventLogItem[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {
          event_class,
          id,
          event_id,
          name,
          start_timestamp,
          end_timestamp,
          isSingleEvent,
        } = row;
        console.log(JSON.stringify(row));
        console.log(`[db] Event Log Item title: ${name}, id: ${event_id}`);
        unifiedEventLogItems.push({
          eventClass: event_class,
          entity_id: id,
          event_id: event_id,
          name: name,
          startTimestamp: start_timestamp,
          endTimestamp: end_timestamp,
          isSingleEvent: isSingleEvent,
        });
      }
      return unifiedEventLogItems;
    });
}

function deleteEntityEventFromLog(
  entity_id: number,
  tableName: string,
): Promise<void> {
  const primaryKey = tableName.charAt(0).toLowerCase() + tableName.slice(1);
  const entityEventDeleteSql = `DELETE FROM ${tableName}Event where ${primaryKey}Event_id = ?;`;
  return getDatabase()
    .then((db) => db.executeSql(entityEventDeleteSql, [entity_id]))
    .then(([results]) => {
      console.log(`[db] Deleted from ${tableName} PK: ${entity_id}`);
    });
}

function deleteEventFromLog(event_id: number): Promise<void> {
  const entityEventDeleteSql = 'DELETE FROM EventLog where event_id = ?;';
  return getDatabase()
    .then((db) => db.executeSql(entityEventDeleteSql, [event_id]))
    .then(([results]) => {
      console.log(`[db] Deleted from EventLog PK: ${event_id}`);
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
  startEvent,
  endEvent,
  updateEvent,
  addFoodEvent,
  getFoodEvents,
  deleteFoodEvent,
  getDefaultLocationSettings,
  updateDefaultLocationSettings,
  addWeightEvent,
  addLocation,
  getAllWeightEvents,
  getLastWeightEvent,
  addWaterSourceEvent,
  getAllWaterSourceEvents,
  addPersonEvent,
  getAllPersonEvents,
  getLastPersonEvent,
  addCampEvent,
  getAllCampEvents,
  getLastCampEvent,
  updateCampEvent,
  addEventLocation,
  addGenericEventLocation,
  getAllUnifiedEventLogItems,
  deleteEventFromLog,
  deleteEntityEventFromLog,
};
