const Program = require('../models/Program');

const getPrograms = async (req, res, next) => {
  try {
    const filter = req.query.all === 'true' ? {} : { isPublished: true };
    const programs = await Program.find(filter).sort({ order: 1 });
    res.json({ success: true, data: programs });
  } catch (err) {
    next(err);
  }
};

const getProgramBySlug = async (req, res, next) => {
  try {
    const program = await Program.findOne({ slug: req.params.slug });
    if (!program) return res.status(404).json({ success: false, message: 'Program not found' });
    res.json({ success: true, data: program });
  } catch (err) {
    next(err);
  }
};

const createProgram = async (req, res, next) => {
  try {
    const program = await Program.create(req.body);
    res.status(201).json({ success: true, data: program });
  } catch (err) {
    next(err);
  }
};

const updateProgram = async (req, res, next) => {
  try {
    const program = await Program.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!program) return res.status(404).json({ success: false, message: 'Program not found' });
    res.json({ success: true, data: program });
  } catch (err) {
    next(err);
  }
};

const deleteProgram = async (req, res, next) => {
  try {
    await Program.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Program removed' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getPrograms, getProgramBySlug, createProgram, updateProgram, deleteProgram };
