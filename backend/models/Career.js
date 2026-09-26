const mongoose = require('mongoose');

const jobListingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    department: { type: String },
    type: { type: String, enum: ['Full-time', 'Part-time', 'Contract'], default: 'Full-time' },
    description: { type: String, trim: true }, // full job description shown on "Read More"
    isOpen: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const careerApplicationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    positionOfInterest: { type: String, required: true },
    cvFileUrl: { type: String, required: true },
    cvFileName: { type: String },
    message: { type: String, trim: true },
    status: {
      type: String,
      enum: ['New', 'Reviewed', 'Shortlisted', 'Rejected', 'Hired'],
      default: 'New',
    },
  },
  { timestamps: true }
);

const JobListing = mongoose.model('JobListing', jobListingSchema);
const CareerApplication = mongoose.model('CareerApplication', careerApplicationSchema);

module.exports = { JobListing, CareerApplication };