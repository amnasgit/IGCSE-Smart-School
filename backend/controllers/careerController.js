const { JobListing, CareerApplication } = require('../models/Career');
const sendEmail = require('../utils/sendEmail');

// ---- Job Listings ----

const getJobListings = async (req, res, next) => {
  try {
    const listings = await JobListing.find({ isOpen: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: listings });
  } catch (err) {
    next(err);
  }
};

const getJobListingById = async (req, res) => {
  try {
    const job = await JobListing.findOne({
      _id: req.params.id,
      isOpen: true,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job listing not found.',
      });
    }

    return res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    console.error('Get job listing error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to fetch job listing.',
    });
  }
};

const createJobListing = async (req, res, next) => {
  try {
    const listing = await JobListing.create(req.body);
    res.status(201).json({ success: true, data: listing });
  } catch (err) {
    next(err);
  }
};

const updateJobListing = async (req, res, next) => {
  try {
    const listing = await JobListing.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!listing) return res.status(404).json({ success: false, message: 'Job listing not found' });
    res.json({ success: true, data: listing });
  } catch (err) {
    next(err);
  }
};

const deleteJobListing = async (req, res, next) => {
  try {
    await JobListing.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Job listing removed' });
  } catch (err) {
    next(err);
  }
};

// ---- CV / Career Applications ----

const submitApplication = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'CV file is required (PDF/DOC/DOCX, max 5MB)' });
    }

    const application = await CareerApplication.create({
      ...req.body,
      cvFileUrl: `/uploads/cv/${req.file.filename}`,
      cvFileName: req.file.originalname,
    });

    if (process.env.HR_NOTIFY_EMAIL) {
      sendEmail({
        to: process.env.HR_NOTIFY_EMAIL,
        subject: `New career application: ${application.positionOfInterest}`,
        html: `<p>${application.name} applied for ${application.positionOfInterest}.</p><p>Review the CV in the admin panel.</p>`,
      });
    }

    res.status(201).json({ success: true, message: 'Application submitted successfully', data: application });
  } catch (err) {
    next(err);
  }
};

const getApplications = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const applications = await CareerApplication.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await CareerApplication.countDocuments(filter);

    res.json({ success: true, data: applications, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};

const updateApplicationStatus = async (req, res, next) => {
  try {
    const application = await CareerApplication.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!application) return res.status(404).json({ success: false, message: 'Application not found' });
    res.json({ success: true, data: application });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getJobListings,
  getJobListingById,
  createJobListing,
  updateJobListing,
  deleteJobListing,
  submitApplication,
  getApplications,
  updateApplicationStatus,
};
