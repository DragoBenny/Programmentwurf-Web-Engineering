const pg = require('pg');

const poolConfig = {
    host: 'localhost',
    port: '5432',
    user: 'postgres',
    password: 'postgres',
    database: 'hiking-db',
    max: 20,
    idleTimeoutMillis: 3000,
    connectionTimeoutMillis: 2000,
};

module.exports = new pg.Pool(poolConfig);