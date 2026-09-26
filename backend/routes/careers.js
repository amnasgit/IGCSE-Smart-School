const express = require('express');
const {
  getJobListings,
  getJobListingById,
  createJobListing,
  updateJobListing,
  deleteJobListing,
  submitApplication,
  getApplications,
  updateApplicationStatus,
} = require('../controllers/careerController');
const { protect, authorize } = require('../middleware/auth');
const uploadCV = require('../middleware/upload');

const router = express.Router();

// Job listings
router.get('/listings', getJobListings); 
router.get('/listings/:id', getJobListingById);
router.post('/listings', protect, authorize('super_admin', 'hr_manager'), createJobListing);
router.patch('/listings/:id', protect, authorize('super_admin', 'hr_manager'), updateJobListing);
router.delete('/listings/:id', protect, authorize('super_admin', 'hr_manager'), deleteJobListing);

// Applications (with CV upload)
router.post('/applications', uploadCV.single('cv'), submitApplication); // public
router.get('/applications', protect, authorize('super_admin', 'hr_manager'), getApplications);
router.patch('/applications/:id/status', protect, authorize('super_admin', 'hr_manager'), updateApplicationStatus);

module.exports = router;
