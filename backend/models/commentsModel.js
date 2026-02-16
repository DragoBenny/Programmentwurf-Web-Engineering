const pool = require('../config/database.js');

class Model{

    async getByTrailId(value) {
        try{
            const result = await pool.query(
                'SELECT * FROM comments WHERE trail_id = $1',
                [value]
            );
            return result.rows;
        }catch(error){
            console.error('Error fetching comments by trail_id', error);
        }
    }
}
module.exports = new Model();