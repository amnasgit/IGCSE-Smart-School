const Contact = require('../models/Contact');
const sendEmail = require('../utils/sendEmail');
const verifyRecaptcha = require('../utils/verifyRecaptcha');

const submitContact = async (req, res, next) => {
  try {
    const { recaptchaToken, consentGiven } = req.body;
    if (!consentGiven) {
      return res.status(400).json({ success: false, message: 'Consent is required to submit this form' });
    }
    if (!(await verifyRecaptcha(recaptchaToken))) {
      return res.status(400).json({ success: false, message: 'reCAPTCHA verification failed' });
    }

    const contact = await Contact.create(req.body);

    if (process.env.CONTACT_NOTIFY_EMAIL) {
      sendEmail({
        to: process.env.CONTACT_NOTIFY_EMAIL,
        subject: `New contact message: ${contact.subject}`,
        html: `<p>From: ${contact.name} (${contact.email})</p><p>${contact.message}</p>`,
      });
    }

    res.status(201).json({ success: true, message: 'Message sent successfully', data: contact });
  } catch (err) {
    next(err);
  }
};

const getContacts = async (req, res, next) => {
  try {
    const { resolved, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (resolved !== undefined) filter.isResolved = resolved === 'true';

    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Contact.countDocuments(filter);

    res.json({ success: true, data: contacts, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!contact) return res.status(404).json({ success: false, message: 'Message not found' });
    res.json({ success: true, data: contact });
  } catch (err) {
    next(err);
  }
};

module.exports = { submitContact, getContacts, updateContact };
