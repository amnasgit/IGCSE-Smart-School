const express = require('express');
const { login, getMe, createUser, getUsers, updateUser } = require('../controllers/authController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/users', protect, authorize('super_admin'), getUsers);
router.post('/users', protect, authorize('super_admin'), createUser);
router.patch('/users/:id', protect, authorize('super_admin'), updateUser);

module.exports = router;
