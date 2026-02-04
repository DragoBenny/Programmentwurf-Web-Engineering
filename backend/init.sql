CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) DEFAULT NULL,
    email VARCHAR(255) DEFAULT NULL,
    pass VARCHAR(255) DEFAULT NULL,
    active bool DEFAULT true
);

   INSERT INTO users (username, email, pass) VALUES 
('Andy84', 'Andy@gmail.com', 'password');
