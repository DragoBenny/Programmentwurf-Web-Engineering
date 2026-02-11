const express = require("express");
const router = express.Router();
const passport = require('passport');

const {
  registerView,
  loginView, 
  registerUser,
  loginUser
} = require('../controller/profile');

router.get('/', (req, res) => { //testing purposes
  res.send("bup");
});

router.get('/bup', loginUser);

router.get('/register', registerView);
router.get('/login', loginView);
router.post('/register', registerUser); //register user with username and password
router.post('/login', loginUser); //login with username, email, password and confirmed password

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if(err){
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;