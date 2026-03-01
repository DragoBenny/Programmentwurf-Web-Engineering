const express = require('express');
const router = express.Router();

const {
  getPopularTrails,
  trailListView,
  trailView,
  createComment
} = require('../controller/trailsController');

router.get('/', trailListView); //get page that renders list of all trails
router.get('/popular', getPopularTrails); //get popular trails
router.get('/:trailId', trailView); //get page that renders indiviual trail

router.post('/comment', createComment); //create comment

module.exports = router;