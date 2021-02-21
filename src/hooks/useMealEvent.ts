import { Meal } from '../types/Meal';
import { useDatabase } from '../context/DatabaseContext';
import { MealEvent } from '../types/MealEvent';
import { useEvent } from './useEvent';

export function useMealEvent() {
  const database = useDatabase();
  const { getCurrentEventId } = useEvent();

  async function logMealEvent(foodItem: Meal): Promise<void> {
    const eventId = await getCurrentEventId('Ate Meal');
    console.log('HERE WE ARE LOGGING A FOOD EVENT');
    return database.logMealEvent(
      eventId,
      foodItem.food_id,
      `Ate ${foodItem.name}`,
    );
  }

  return {
    logMealEvent,
  };
}
