import { FoodItem } from '../types/FoodItem';
import { useDatabase } from '../context/DatabaseContext';
import { useLocation } from './useLocation';
import { EventTable } from '../types/EventLog';
import { useEvent } from './useEvent';

export function useFoodEvent() {
  const database = useDatabase();
  const { addCurrentLocation } = useLocation();
  const { getCurrentEventId } = useEvent();

  async function logFoodEvent(foodItem: FoodItem): Promise<void> {
    const eventId = await getCurrentEventId('Ate Food');
    return database
      .addFoodEvent(eventId, foodItem.food_id ?? 0, `Ate ${foodItem.name}`)
      .then((primaryKey) => {
        addCurrentLocation(primaryKey, EventTable.foodItem);
      });
  }

  return {
    logFoodEvent,
  };
}
