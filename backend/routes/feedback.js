const express = require('express');
const { submitFeedback, getFeedback } = require('../controllers/feedbackController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', submitFeedback); // public
router.get('/', protect, authorize('super_admin', 'content_editor'), getFeedback);

module.exports = router;
