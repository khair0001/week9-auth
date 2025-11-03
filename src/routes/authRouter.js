const express = require('express');
const router = express.Router();
const { register, login, googleAuth, googleCallback } = require('../controllers/authController');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Google Auth routes
router.get('/google', googleAuth);
router.get('/google/callback', googleCallback);

module.exports = router;