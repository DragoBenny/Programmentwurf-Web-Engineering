const pool = require('../config/database.js');

class Model{

    async getByTrailId(value) {
        try{
            const result = await pool.query(
                "SELECT id, author, content, TO_CHAR(post_date, 'YYYY-MM-DD') as day_date FROM comments WHERE trail_id = $1",
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
                'INSERT INTO comments (author, content, trail_id) VALUES ($1, $2, $3)',
                [comment.author, comment.content, comment.trail_id]
            ); 
        }catch(error){
            console.error('Error creating comment', error);
        }
    }
}
module.exports = new Model();