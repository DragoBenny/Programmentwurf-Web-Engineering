CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) DEFAULT NULL,
    email VARCHAR(255) DEFAULT NULL,
    pass VARCHAR(255) DEFAULT NULL,
    active bool DEFAULT true
);

CREATE TABLE IF NOT EXISTS trails (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) DEFAULT NULL,
    coords float8[] DEFAULT NULL,
    zoom INTEGER DEFAULT NULL,
    gpx VARCHAR(255) DEFAULT NULL,
    info JSON DEFAULT NULL,
    description VARCHAR(255) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS images (
    id SERIAL PRIMARY KEY,
    trail_id INTEGER,
        CONSTRAINT fk_trails FOREIGN KEY(trail_id) REFERENCES trails(id),
    source VARCHAR(255) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    trail_id INTEGER,
        CONSTRAINT fk_trails FOREIGN KEY(trail_id) REFERENCES trails(id),
    author VARCHAR(255) DEFAULT NULL,
    date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    content VARCHAR(255) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    author VARCHAR(255) DEFAULT NULL,
    content VARCHAR(255) DEFAULT NULL
);

INSERT INTO trails (name, coords, zoom, gpx, description) VALUES 
('Rundgang um den Campus',
ARRAY[47.66583, 9.44690],
35,
'campus.gpx',
'Kurz Rungang um den Campus');
