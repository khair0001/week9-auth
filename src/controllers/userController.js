const db = require('../config/db');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await userModel.getUserProfile(userId);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('Error in getProfile controller:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, email } = req.body;

        // Validate at least one field is provided
        if (!name && !email) {
            return res.status(400).json({
                success: false,
                message: 'At least one field (name or email) is required'
            });
        }

        // Prepare update data
        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;

        const isUpdated = await userModel.updateUserProfile(userId, updateData);
        
        if (!isUpdated) {
            return res.status(404).json({
                success: false,
                message: 'User not found or no changes made'
            });
        }

        const updatedUser = await userModel.getUserProfile(userId);

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: updatedUser
        });
    } catch (error) {
        console.error('Error in updateProfile controller:', error);
        
        if (error.message.includes('Email sudah digunakan')) {
            return res.status(409).json({
                success: false,
                message: error.message
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const updatePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Current password and new password are required'
            });
        }

        // Dapatkan password saat ini dari database
        const [users] = await db.query(
            "SELECT password FROM users WHERE id = ?",
            [userId]
        );

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const user = users[0];

        // Verifikasi password saat ini
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Current password is incorrect'
            });
        }

        // Hash password baru
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update password
        const isUpdated = await userModel.updatePassword(userId, hashedPassword);

        if (!isUpdated) {
            throw new Error('Failed to update password');
        }

        res.status(200).json({
            success: true,
            message: 'Password updated successfully'
        });

    } catch (error) {
        console.error('Error in updatePassword:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

module.exports = {
    getProfile,
    updateProfile,
    updatePassword
};
