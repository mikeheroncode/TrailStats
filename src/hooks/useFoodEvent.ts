import { FoodItem } from '../types/FoodItem';
import { useDatabase } from '../context/DatabaseContext';

export function useFoodEvent() {
  const database = useDatabase();

  async function logFoodEvent(foodItem: FoodItem): Promise<void> {
    const eventId = await database.logEvent('Ate Food');
    console.log('HERE WE ARE LOGGING A FOOD EVENT');
    return database.logFoodEvent(
      eventId,
      foodItem.food_id,
      `Ate ${foodItem.name}`,
    );
  }

  return {
    logFoodEvent,
  };
}
