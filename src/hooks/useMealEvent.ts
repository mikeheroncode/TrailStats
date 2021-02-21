import { Meal } from '../types/Meal';
import { useDatabase } from '../context/DatabaseContext';
import { MealEvent } from '../types/MealEvent';
import { useEvent } from './useEvent';
import { useLocation } from './useLocation';
import { EventTable } from '../types/EventLog';

export function useMealEvent() {
  const database = useDatabase();
  const { addCurrentLocation } = useLocation();
  const { getCurrentEventId } = useEvent();

  async function addMealEvent(meal: Meal): Promise<void> {
    const eventId = await getCurrentEventId('Ate Meal');
    console.log('HERE WE ARE LOGGING A FOOD EVENT');
    return database
      .addMealEvent(eventId, meal.meal_id, `Ate ${meal.name}`)
      .then((primaryKey) => {
        addCurrentLocation(primaryKey, EventTable.foodItem);
      });
  }

  return {
    addMealEvent,
  };
}
