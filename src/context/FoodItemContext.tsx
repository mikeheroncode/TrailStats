import React from 'react';
import { FoodItem } from '../types/FoodItem';

const FoodItemContext = React.createContext<FoodItem[]>([]);
export default FoodItemContext;
/* export const FoodItemProvider: React.FunctionComponent = function (props) {
  return <FoodItemContext.Provider value={sqliteDatabase} {...props} />;
};
*/
