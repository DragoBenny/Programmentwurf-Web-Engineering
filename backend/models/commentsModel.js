const pool = require('../config/database.js');

class Model{

    async getByTrailId(value) {
        try{
            const result = await pool.query(
                "SELECT comments.id, comments.content, TO_CHAR(comments.post_date, 'YYYY-MM-DD') as day_date, users.username FROM comments JOIN users ON comments.user_id = users.id WHERE trail_id = $1",
                [value]
            );
            return result.rows;
        }catch(error){
            console.error('Error fetching comments by trail_id', error);
        }
    }

    async getByUserId(value) {
        try{
            const result = await pool.query(
                "SELECT comments.id, comments.content, TO_CHAR(comments.post_date, 'YYYY-MM-DD') as day_date, users.username FROM comments JOIN users ON comments.user_id = users.id WHERE user_id = $1",
                [value]
            );
            return result.rows;
        }catch(error){
            console.error('Error fetching comments by user_id', error);
        }
    }

    async save(comment) {
        try{
            const query = await pool.query(
                'INSERT INTO comments (content, trail_id, user_id) VALUES ($1, $2, $3)',
                [comment.content, comment.trail_id, comment.user_id]
            ); 
        }catch(error){
            console.error('Error creating comment', error);
        }
    }
}
module.exports = new Model();