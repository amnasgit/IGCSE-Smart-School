const FAQ = require('../models/FAQ');

const getFaqs = async (req, res, next) => {
  try {
    const filter = req.query.all === 'true' ? {} : { isPublished: true };
    if (req.query.category) filter.category = req.query.category;
    const faqs = await FAQ.find(filter).sort({ category: 1, order: 1 });
    res.json({ success: true, data: faqs });
  } catch (err) {
    next(err);
  }
};

const createFaq = async (req, res, next) => {
  try {
    const faq = await FAQ.create(req.body);
    res.status(201).json({ success: true, data: faq });
  } catch (err) {
    next(err);
  }
};

const updateFaq = async (req, res, next) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!faq) return res.status(404).json({ success: false, message: 'FAQ not found' });
    res.json({ success: true, data: faq });
  } catch (err) {
    next(err);
  }
};

const deleteFaq = async (req, res, next) => {
  try {
    await FAQ.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'FAQ removed' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getFaqs, createFaq, updateFaq, deleteFaq };
