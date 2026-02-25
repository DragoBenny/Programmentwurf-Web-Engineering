const express = require('express');
const router = express.Router();
const passport = require('passport');

const {
  profileView,
  getStatus,
  registerView,
  loginView,
  logoutUser, 
  registerUser,
  loginUser
} = require('../controller/profileController');

router.get('/', profileView);
router.get('/status', getStatus);
router.get('/register', registerView);
router.get('/login', loginView);
router.get('/logout', logoutUser); //end the session of the user
router.post('/register', registerUser); //register user with username and password
router.post('/login', loginUser); //login with username, email, password and confirmed password

module.exports = router;