const express = require("express");
const controller = require("../controller/users.js");
const router = express.Router();

router.get("/", (req, res) => {
  if(res.send("bup")){
    return 0;
  }
  res.status(500);
});

module.exports = router;