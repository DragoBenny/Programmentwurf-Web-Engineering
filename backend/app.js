const express = require('express');
const profile = require('./routes/profile.js');
const bcrypt = require('bcrypt');
const passport = require('passport');
const expressSession = require('express-session');
const auth = require('./auth.js');

auth(passport);

const app = express();

app.use(
  expressSession({
      secret: process.env.AUTH_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('./public'));
app.set('view engine', 'pug');

const port = 3000;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})

app.get('/', (req, res) => {
  if(res.send("If you can see this, the server is running!")){
    return 0;
  }
  console.log("error loading");
});

app.use('/profile', profile);

app.post('/login', 
  passport.authenticate('local',
    {
      successRedirect: '/',
      failureRedirect: '/profile'
    }
  )
)

module.exports = app;