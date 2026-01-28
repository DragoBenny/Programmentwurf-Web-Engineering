const express = require("express");
const router = express.Router();

const {
  loginUser
} = require("../controller/users");

router.get("/", (req, res) => {
  if(res.send("bup")){
    return 0;
  }
  res.status(500);
});

router.get("/login", loginUser);

module.exports = router;