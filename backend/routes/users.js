const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("C O C K   I N J U R E D");
});

module.exports = router;