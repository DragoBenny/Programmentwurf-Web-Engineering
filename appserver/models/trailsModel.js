const pool = require('../config/database.js');

class Model{
    async getAll() {
        try{
            const result = await pool.query('SELECT DISTINCT ON (trails.id) trails.id, trails.name, trails.description, images.source as image_source FROM trails JOIN images ON images.trail_id = trails.id');
            return result.rows;
        }catch(error){
            console.error('Error fetching all trails', error);
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

    async getPopular(){
        try{
            const result = await pool.query(
                'SELECT DISTINCT ON (trails.id) trails.id, trails.name, trails.description, images.source as image_source FROM trails JOIN images ON images.trail_id = trails.id WHERE trails.is_popular = true',
            );
            return result.rows;
        }catch(error){
            console.error('Error fetching popular trails', error);
        }
    }
}
module.exports = new Model();