const passport = require('passport');
const expressSession = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const model = require('./models/users.js'); 

function initialize(passport){
    console.log("initizilaiadsijd");
    const authenticateUser = (emailUsername, password, done) => {
        console.log("authenticating");
        const user = await(model.getByAttribute('email', email))[0];
        if(user != null){
            done(null, user);
        }
        done(null, false);
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
    passport.deserializeUser((id, done) => {
        const user = model.getByAttribute("id", id);
        return done(null, user[0]);
    });
} 

module.exports = initialize;