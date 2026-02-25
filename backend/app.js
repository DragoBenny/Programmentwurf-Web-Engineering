const express = require('express');
const path = require('path');
const home = require('./routes/home.js');
const profile = require('./routes/profile.js');
const trails = require('./routes/trails.js');
const bcrypt = require('bcrypt');
const passport = require('passport');
const expressSession = require('express-session');
const auth = require('./config/auth.js');
const flash = require('flash');

const app = express();
const port = 3000;

auth(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('./public'));
app.set('view engine', 'pug');

app.use(
  expressSession({
    secret: process.env.AUTH_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})

app.get('/', (req, res) => {res.sendFile(path.join(__dirname, 'index.html'))});

app.use('/home', home);
app.use('/profile', profile);
app.use('/trails', trails);

module.exports = app;