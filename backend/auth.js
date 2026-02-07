    const passport = require('passport');
const expressSession = require('express-session');
const LocalStrategy = require('passport-local');

module.exports = function(app){
    passport.serializeUser((user, done) => done(null, user.username));
    passport.deserializeUser((id, done) => {
        const user = {
            username:'admin'
        };
        done(null, user);
    });

    passport.use(
        new LocalStrategy((username, password, done) => {
            if(username === 'admin' && password === 'test'){
                done(null, {
                    username: 'Admin'
                });
            }else {
                done(null, false)
            }
        }) 
    );

    app.use(
        expressSession({
            secret: process.env.AUTH_SECRET,
            resave: false,
            saveUninitialized: false,
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());
}