const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    contact: { type: String, required: true, trim: true }, // email OR WhatsApp number
    channel: { type: String, enum: ['email', 'whatsapp'], required: true },
    source: { type: String, default: 'newsletter' }, // e.g. 'newsletter' or 'register-interest:A Level'
  },
  { timestamps: true }
);

module.exports = mongoose.model('Subscriber', subscriberSchema);
