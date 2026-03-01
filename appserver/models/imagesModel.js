const pool = require('../config/database.js');

class Model{

    async getAll(){
        try{
            const result = await pool.query(
                'SELECT * FROM images'
            );
            return result.rows;
        }catch(error){
            console.error('Error fetching all images', error);
        }
    }

    async getByTrailId(value) {
        try{
            const result = await pool.query(
                'SELECT * FROM images WHERE trail_id = $1',
                [value]
            );
            return result.rows;
        }catch(error){
            console.error('Error fetching images by trail_id', error);
        }
    }
}
module.exports = new Model();