// Centralized error handler - keep this as the LAST middleware registered in server.js
const errorHandler = (err, req, res, next) => {
  console.error(err.stack || err.message);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ success: false, message: err.message });
  }
  if (err.code === 11000) {
    return res.status(409).json({ success: false, message: 'Duplicate record already exists' });
  }
  if (err.message && err.message.includes('Only PDF, DOC')) {
    return res.status(400).json({ success: false, message: err.message });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server error, please try again later',
  });
};

module.exports = errorHandler;
