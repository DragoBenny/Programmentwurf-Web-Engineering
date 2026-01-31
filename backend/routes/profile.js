const express = require("express");
const router = express.Router();

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


module.exports = router;