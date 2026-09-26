const express = require('express');
const { getFaqs, createFaq, updateFaq, deleteFaq } = require('../controllers/faqController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', getFaqs); // public
router.post('/', protect, authorize('super_admin', 'content_editor'), createFaq);
router.patch('/:id', protect, authorize('super_admin', 'content_editor'), updateFaq);
router.delete('/:id', protect, authorize('super_admin', 'content_editor'), deleteFaq);

module.exports = router;
