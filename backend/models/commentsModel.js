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

    async save(comment) {
        try{
            const query = await pool.query(
                'INSERT INTO comments (author, content) VALUES ($1, $2)',
                [comment.auhor, comment.content]
            ); 
        }catch(error){
            console.error('Error creating comment', error);
        }
    }
}
module.exports = new Model();