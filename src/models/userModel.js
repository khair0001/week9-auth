const db = require('../config/db');

const getUserProfile = async (userId) => {
    try {
        const [rows] = await db.query(
            'SELECT id, email FROM users WHERE id = ?',
            [userId]
        );
        return rows[0];
    } catch (error) {
        console.error('Error in getUserProfile model:', error.message);
        throw new Error(`Database query failed: ${error.message}`);
    }
};

const updateUserProfile = async (userId, profileData) => {
    try {
        const { email, name } = profileData;
        
        if (email) {
            const [existing] = await db.query(
                'SELECT id FROM users WHERE email = ? AND id != ?',
                [email, userId]
            );
            
            if (existing.length > 0) {
                throw new Error('Email sudah digunakan oleh pengguna lain');
            }
        }

        const fieldsToUpdate = [];
        const values = [];
        
        if (email) {
            fieldsToUpdate.push('email = ?');
            values.push(email);
        }
        
        if (name) {
            fieldsToUpdate.push('name = ?');
            values.push(name);
        }
        
        if (fieldsToUpdate.length === 0) {
            return false;
        }

        const query = `UPDATE users SET ${fieldsToUpdate.join(', ')} WHERE id = ?`;
        values.push(userId);

        const [result] = await db.query(query, values);
        
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error in updateUserProfile model:', error.message);
        throw error;
    }
};

const updatePassword = async (userId, hashedPassword) => {
    try {
        const [result] = await db.query(
            'UPDATE users SET password = ? WHERE id = ?',
            [hashedPassword, userId]
        );
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error in updatePassword model:', error.message);
        throw error;
    }
};

module.exports = {
    getUserProfile,
    updateUserProfile,
    updatePassword
};
