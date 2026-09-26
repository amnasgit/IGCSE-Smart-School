require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const app = express();

connectDB();

// ======================================================
// CORE MIDDLEWARE
// ======================================================

app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true,
  })
);

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'))
);

// ======================================================
// RATE LIMITER FOR PUBLIC FORMS
// ======================================================

const formLimiter = rateLimit({
  // 15 minutes
  windowMs: 15 * 60 * 1000,

  // Allow 60 requests from the same IP
  // within the 15-minute window.
  max: 60,

  // Do not count CORS preflight requests
  skip: (req) => req.method === 'OPTIONS',

  // Send standard RateLimit headers
  standardHeaders: true,

  // Disable old X-RateLimit-* headers
  legacyHeaders: false,

  message: {
    success: false,
    message: 'Too many requests, please try again later',
  },
});

// Apply limiter only to form submission endpoints
app.use('/api/admissions', formLimiter);
app.use('/api/contact', formLimiter);
app.use('/api/careers/applications', formLimiter);
app.use('/api/feedback', formLimiter);
app.use('/api/subscribers', formLimiter);

// ======================================================
// CHAT RATE LIMITER
// ======================================================

const chatLimiter = rateLimit({
  // 1 minute
  windowMs: 60 * 1000,

  // 40 chat requests per minute
  max: 40,

  // Do not count CORS preflight requests
  skip: (req) => req.method === 'OPTIONS',

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message: 'Too many chat requests, please slow down',
  },
});

app.use('/api/chat/visitor', chatLimiter);

// ======================================================
// ROUTES
// ======================================================

app.use('/api/auth', require('./routes/auth'));

app.use('/api/programs', require('./routes/programs'));

app.use('/api/faqs', require('./routes/faqs'));

app.use('/api/admissions', require('./routes/admissions'));

app.use('/api/contact', require('./routes/contact'));

app.use('/api/careers', require('./routes/careers'));

app.use('/api/feedback', require('./routes/feedback'));

app.use('/api/subscribers', require('./routes/subscribers'));

app.use('/api/chat', require('./routes/chat'));

// ======================================================
// HEALTH CHECK
// ======================================================

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
  });
});

// ======================================================
// 404 FOR UNMATCHED API ROUTES
// ======================================================

app.use('/api', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// ======================================================
// ERROR HANDLER
// ======================================================

app.use(errorHandler);

// ======================================================
// START SERVER
// ======================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});