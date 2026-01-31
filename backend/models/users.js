const mariadb = require('mariadb');

class Model{
    #connection = null;

    async connect(){
        if (this.#connection = null) return this.#connection;

        this.#connection = await mariadb.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'mariadb',
            database: 'hiking'
        });
        await this.#connection.connect();

        return this.#connection;
    }

    async getAll() {
        const connection = await this.connect();
        const query = 'SELECT * FROM Users';
        const [data] = await connection.query(query);
        return data;
    }
    async getById(id) {}
    async save(user) {}
}

module.exports = new Model();