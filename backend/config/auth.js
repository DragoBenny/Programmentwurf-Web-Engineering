const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const model = require('../models/users.js'); 

function initialize(passport){
    const authenticateUser = async (emailUsername, password, done) => {
        console.log("Strategy is running!");
        try{
            console.log("authenticating: ", emailUsername);

            let user;
            const byEmail = (await model.getByAttribute('email', emailUsername))[0];
            const byUsername = (await model.getByAttribute('username', emailUsername))[0];

            if(byEmail) user = byEmail;
            else if(byUsername) user = byUsername;
            else return done(null, false, {message: 'Email oder Username incorrect'});

            const isMatch = await bcrypt.compare(password, user.pass);
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Password incorrect' });
            }

        }catch(err){
            console.log("error in Strategy");
            return done(err);
        }
    }

    passport.use(
        new LocalStrategy(
            {
                usernameField: 'emailUsername',
                passwordField: 'password'
            },
            authenticateUser
        )
    );

    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser(async (id, done) => {
        const user = await model.getByAttribute('id', id);
        return done(null, user[0]);
    });
} 

module.exports = initialize;