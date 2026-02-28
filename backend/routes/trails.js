const express = require('express');
const router = express.Router();

const {
  getPopularTrails,
  trailListView,
  trailView,
  createComment
} = require('../controller/trailsController');

router.get('/', trailListView);
router.get('/popular', getPopularTrails);
router.get('/:trailId', trailView);
router.post('/comment', createComment);

module.exports = router;