const pool = require('../config/database.js');

class Model{

    async getAll() {
        try{
            const result = await pool.query('SELECT * FROM reviews');
            return result.rows;
        }catch(error){
            console.error('Error fetching reviews', error);
        }
    }
}
module.exports = new Model();