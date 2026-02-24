const model = require('../models/usersModel');
const bcrypt = require('bcrypt'); //required to hash user passwords
const passport = require('passport');


const getStatus = async (req, res) => {
    if(req.isAuthenticated()){
        const username = (await model.getByAttribute('id', req.user.id))[0].username;
        res.send({loggedIn: true, username: username});
    }else{
        res.send({loggedIn: false, username: 'Anmelden'});
    }
}

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
        return res.render('../views/register.pug', {message: 'Bitte alle Felder ausfüllen'});
    }

    //check if email is already in use
    if((await model.getByAttribute('email', email)).length > 0){ 
        return res.render('../views/register.pug', {message: 'E-Mail existiert bereits'});
    } 

    
    //check if username is already in use
    if((await model.getByAttribute('username', username)).length > 0){ 
        return res.render('../views/register.pug', {message: 'Username existiert bereits'});
    } 

    //check if password is valid -> number of symbols, lower and upper case, etc.
    if(!(password.length >= 8)){
        return res.render('../views/register.pug', {message: 'Passwort muss mindestens 8 Zeichen lang sein'});
    }

    //check if confirmed password matches password
    if(password != confirmedPassword){
        return res.render('../views/register.pug', {message: 'Das bestätigte Passwort muss dem Passwort entsprechen'});
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
    const {emailUsername, password} = await req.body;

    //check if fields are filled in
    if(!emailUsername || !password){
        return res.render('../views/login.pug', {message: 'Bitte alle Felder ausfüllen'});
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
    })(req, res, next); 
}

module.exports = {
    getStatus,
    registerView,
    loginView,
    logoutUser,
    registerUser,
    loginUser
};