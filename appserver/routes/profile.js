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

router.get('/', profileView); //get profile page
router.get('/status', getStatus); //get session status
router.get('/register', registerView); //get register page
router.get('/login', loginView); //get login page
router.get('/logout', logoutUser); //end the session of the user

router.post('/register', registerUser); //register new user
router.post('/login', loginUser); //login user

module.exports = router;