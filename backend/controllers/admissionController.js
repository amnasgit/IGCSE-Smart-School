const Admission = require('../models/Admission');
const sendEmail = require('../utils/sendEmail');
const verifyRecaptcha = require('../utils/verifyRecaptcha');

// @route POST /api/admissions  (public)
const submitAdmission = async (req, res, next) => {
  try {
    const { recaptchaToken, consentGiven } = req.body;

    if (!consentGiven) {
      return res.status(400).json({ success: false, message: 'You must accept the Privacy Policy to apply' });
    }
    const humanVerified = await verifyRecaptcha(recaptchaToken);
    if (!humanVerified) {
      return res.status(400).json({ success: false, message: 'reCAPTCHA verification failed' });
    }

    const admission = await Admission.create(req.body);

    if (admission.studentEmail) {
      sendEmail({
        to: admission.studentEmail,
        subject: 'We received your application - IGCSE Smart School',
        html: `<p>Hi ${admission.studentFullName},</p><p>Thank you for applying to IGCSE Smart School for the ${admission.programOfInterest} program. Our admissions team will review your application and contact you soon.</p>`,
      });
    }
    if (process.env.ADMISSIONS_NOTIFY_EMAIL) {
      sendEmail({
        to: process.env.ADMISSIONS_NOTIFY_EMAIL,
        subject: `New admission application: ${admission.studentFullName}`,
        html: `<p>A new admission application was submitted for ${admission.programOfInterest}.</p><p>Review it in the admin panel.</p>`,
      });
    }

    res.status(201).json({ success: true, message: 'Application submitted successfully', data: admission });
  } catch (err) {
    next(err);
  }
};

// @route GET /api/admissions  (admin: super_admin, admissions_officer)
const getAdmissions = async (req, res, next) => {
  try {
    const { status, program, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (program) filter.programOfInterest = program;

    const admissions = await Admission.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Admission.countDocuments(filter);

    res.json({ success: true, data: admissions, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};

// @route GET /api/admissions/:id
const getAdmissionById = async (req, res, next) => {
  try {
    const admission = await Admission.findById(req.params.id);
    if (!admission) return res.status(404).json({ success: false, message: 'Application not found' });
    res.json({ success: true, data: admission });
  } catch (err) {
    next(err);
  }
};

// @route PATCH /api/admissions/:id/status
const updateAdmissionStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const admission = await Admission.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
    if (!admission) return res.status(404).json({ success: false, message: 'Application not found' });
    res.json({ success: true, data: admission });
  } catch (err) {
    next(err);
  }
};

module.exports = { submitAdmission, getAdmissions, getAdmissionById, updateAdmissionStatus };
