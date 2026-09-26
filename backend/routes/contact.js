const express = require('express');
const { submitContact, getContacts, updateContact } = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', submitContact); // public
router.get('/', protect, authorize('super_admin', 'content_editor'), getContacts);
router.patch('/:id', protect, authorize('super_admin', 'content_editor'), updateContact);

module.exports = router;
