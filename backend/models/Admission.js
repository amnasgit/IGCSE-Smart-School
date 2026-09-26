const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema(
  {
    studentFullName: { type: String, required: true, trim: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other', 'Prefer not to say'], required: true },
    studentEmail: { type: String, trim: true, lowercase: true },
    studentPhone: { type: String, trim: true },
    fatherName: { type: String, trim: true },
    fatherEmail: { type: String, trim: true, lowercase: true },
    fatherPhone: { type: String, trim: true },
    motherName: { type: String, trim: true },
    motherEmail: { type: String, trim: true, lowercase: true },
    motherPhone: { type: String, trim: true },
    programOfInterest: {
      type: String,
      enum: ['IGCSE Express Path', 'IGCSE Global Path', 'IGCSE National Path', 'IGCSE Foundation Rise'],
      required: true,
    },
    preferredIntakeDate: { type: Date },
    currentSchool: { type: String, trim: true },
    message: { type: String, trim: true },
    consentGiven: { type: Boolean, required: true },
    status: {
      type: String,
      enum: ['New', 'Under Review', 'Interview Scheduled', 'Enrolled', 'Rejected'],
      default: 'New',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Admission', admissionSchema);