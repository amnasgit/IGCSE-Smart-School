const express = require('express');
const {
  submitAdmission,
  getAdmissions,
  getAdmissionById,
  updateAdmissionStatus,
} = require('../controllers/admissionController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', submitAdmission); // public
router.get('/', protect, authorize('super_admin', 'admissions_officer'), getAdmissions);
router.get('/:id', protect, authorize('super_admin', 'admissions_officer'), getAdmissionById);
router.patch('/:id/status', protect, authorize('super_admin', 'admissions_officer'), updateAdmissionStatus);

module.exports = router;
