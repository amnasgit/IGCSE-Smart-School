const express = require('express');
const {
  getPrograms,
  getProgramBySlug,
  createProgram,
  updateProgram,
  deleteProgram,
} = require('../controllers/programController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', getPrograms); // public
router.get('/:slug', getProgramBySlug); // public
router.post('/', protect, authorize('super_admin', 'content_editor'), createProgram);
router.patch('/:id', protect, authorize('super_admin', 'content_editor'), updateProgram);
router.delete('/:id', protect, authorize('super_admin', 'content_editor'), deleteProgram);

module.exports = router;
