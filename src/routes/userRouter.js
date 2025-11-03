const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, updatePassword } = require('../controllers/userController');
const authenticateToken = require('../middleware/authvalidate');

router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);
router.put('/profile/password', authenticateToken, updatePassword);

module.exports = router;