INSERT INTO FoodItems ( name, calories, fat, protein, carbs, sugar, fiber, size) 
VALUES ('Tuna', 150, 10, 17, 5, 1, 2, 1), ('Potato', 200, 5, 3, 5, 0, 8, 1), ('Tortilla', 100, 1, 1, 5, 0, 2, 1), 
('Olive Oil', 100, 10, 17, 5, 1, 2, 1), ('Snickers', 150, 10, 17, 5, 1, 2, 1), ('Fruit Snacks', 150, 10, 17, 5, 1, 2, 1);

INSERT INTO EventLog ( name ) VALUES ( 'Initial Weight' );
INSERT INTO WeightEvent ( event_id, description, weight ) VALUES ( 1, 'Initial Weight', 185 );
INSERT INTO LocationSettings ( includeLocation, enableHighAccuracy, maxTimeout, maxAge ) VALUES ( 1, 1, 60000, 60000 );
