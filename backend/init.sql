CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) DEFAULT NULL,
    email VARCHAR(255) DEFAULT NULL,
    pass VARCHAR(255) DEFAULT NULL,
    active bool DEFAULT true
);

CREATE TABLE IF NOT EXISTS routes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(75) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    length_km DECIMAL(5,2) NOT NULL,
    difficulty VARCHAR(50) NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
);

CREATE TABLE IF NOT EXISTS waypoints (
    route_id INTEGER NOT NULL REFERENCES routes(id) ON DELETE CASCADE,
    latitude DECIMAL(10,8) NOT NULL,
    longitude DECIMAL(11,8) NOT NULL,
    sequence_order INTEGER NOT NULL,
    UNIQUE(route_id, sequence_order)
);

/* Beispiel Daten(route_id, latitude, longitude, sequence_order):
(1, 12.345678, 9.876543, 1), --Start
(1, 12.345679, 9.876544, 2),
(1, 12.345680, 9.876545, 3), --Ziel
*/
