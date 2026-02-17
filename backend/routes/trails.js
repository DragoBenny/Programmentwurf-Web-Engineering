const express = require('express');
const router = express.Router();

const {
  trailListView,
  trailView
} = require('../controller/trailsController');

router.get('/', trailListView);
router.get('/:trailId', trailView);

module.exports = router;