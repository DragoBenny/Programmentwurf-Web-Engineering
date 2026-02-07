const model = require('../models/users');
const bcrypt = require('bcrypt'); //required to hash user passwords

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

const loginUser = async (req, res) => {
    console.log(req.body);
    const {emailUsername, password} = req.body;
    let attribute; //log in with either email or username

    //check if fields are filled in
    if(!emailUsername || !password){
        return res.render('../views/login.pug', {message: 'Please fill in the fields'});
    } 

    //check if email or username exists
    if((await model.getByAttribute("email", emailUsername)).length > 0) {
        attribute = "email";
    }
    else if((await model.getByAttribute("username", emailUsername)).length > 0){
        attribute = "username";
    }
    else{
        res.render('../views/login.pug', {message: 'Email or Username incorrect'});
        return;
    }

    //check if password is correct
    bcrypt.compare(password, (await model.getByAttribute(attribute, emailUsername))[0].pass, (err) => {
        if(err){
            res.render('../views/login.pug', {message: 'Password incorrect'});
        }
        else {
            res.render('../views/login.pug', {message: 'User logged in'});
            //redirect to start page while creating session
        } 
    })
}

module.exports = {
    registerView,
    loginView,
    registerUser,
    loginUser
};