const pool = require('../config/database.js');

class Model{

    async getAll() {
        try{
            const result = await pool.query('SELECT * FROM users');
            return result.rows;
        }catch(error){
            console.error('Error fetching users', error);
        }
    }
 
    async getByAttribute(attribute, value) {
        try{
            const result = await pool.query(
                `SELECT * FROM users WHERE "${attribute}" = $1`,
                [value]
            );
            return result.rows;
        }catch(error){
            console.error('Error fetching users by attribute', error);
        }
    }

    async save(user) {
        try{
            const query = await pool.query(
                'INSERT INTO users (email, username, pass) VALUES ($1, $2, $3)',
                [user.email, user.username, user.hashedPassword]
            ); 
        }catch(error){
            console.error('Error creating user', error);
        }
    }
}
module.exports = new Model();