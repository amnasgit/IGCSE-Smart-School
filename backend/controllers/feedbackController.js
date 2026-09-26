const Feedback = require('../models/Feedback');

const submitFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.create(req.body);
    res.status(201).json({ success: true, message: 'Thank you for your feedback', data: feedback });
  } catch (err) {
    next(err);
  }
};

const getFeedback = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const feedback = await Feedback.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Feedback.countDocuments();
    res.json({ success: true, data: feedback, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};

module.exports = { submitFeedback, getFeedback };
