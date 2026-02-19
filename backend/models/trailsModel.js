const pool = require('../config/database.js');

class Model{

    async getAll() {
        try{
            const result = await pool.query('SELECT * FROM trails');
            return result.rows;
        }catch(error){
            console.error('Error fetching trails', error);
        }
    }
 
    async getById(value) {
        try{
            const result = await pool.query(
                'SELECT * FROM trails WHERE id = $1',
                [value]
            );
            return result.rows;
        }catch(error){
            console.error('Error fetching trails by id', error);
        }
    }
}
module.exports = new Model();