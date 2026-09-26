const express = require('express');
const { subscribe, getSubscribers } = require('../controllers/subscriberController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', subscribe); // public
router.get('/', protect, authorize('super_admin', 'content_editor'), getSubscribers);

module.exports = router;
