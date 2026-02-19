const model = require('../models/usersModel');
const bcrypt = require('bcrypt'); //required to hash user passwords
const passport = require('passport');

const registerView = (req, res) => {
    res.render('../views/register.pug');
}

const loginView = (req, res) => {
    res.render('../views/login.pug');
}

const registerUser = async (req, res) => {
    const {username, email, password, confirmedPassword} = req.body;

    //check if all fields are filled in
    if(!username || !email || !password || !confirmedPassword){ 
        return res.render('../views/register.pug', {message: 'Please fill in all the fields'});
    }

    //check if email is already in use
    if((await model.getByAttribute('email', email)).length > 0){ 
        return res.render('../views/register.pug', {message: 'Email is already exists'});
    } 

    
    //check if username is already in use
    if((await model.getByAttribute('username', username)).length > 0){ 
        return res.render('../views/register.pug', {message: 'Username already exists'});
    } 

    //check if password is valid -> number of symbols, lower and upper case, etc.
    if(!(password.length >= 8)){
        return res.render('../views/register.pug', {message: 'Password must be atleast 8 characters long'});
    }

    //check if confirmed password matches password
    if(password != confirmedPassword){
        return res.render('../views/register.pug', {message: 'Confirmed password has to match the password'});
    }

    //hash password
    bcrypt.genSalt(10, (err, salt) =>
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;

            let hashedPassword = hash;
            
            //create new user in database
            model.save({username, email, hashedPassword});

            //redirect user to start page
            return res.render('../views/login.pug');
        })
    );    
}

const logoutUser = async(req, res, next) => {
    req.logout((err) => {
    if(err){
      return next(err);
    }
    res.redirect('/');
  });
}

const loginUser = async (req, res, next) => {
    console.log(req.body);
    const {emailUsername, password} = await req.body;

    //check if fields are filled in
    if(!emailUsername || !password){
        return res.render('../views/login.pug', {message: 'Please fill in the fields'});
    }

    passport.authenticate('local', (err, user, info) => {
    
        if (err) {
            return res.render('../views/login.pug', {message: '505 Internal Server Error'});
        }

        if (!user) {
            return res.render('../views/login.pug', {message: info.message});
        }

        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Could not log in user' });
            }
            return res.redirect('/');
        });
    })(req, res, next); // <--- IMPORTANT: This executes the middleware
}

module.exports = {
    registerView,
    loginView,
    logoutUser,
    registerUser,
    loginUser
};