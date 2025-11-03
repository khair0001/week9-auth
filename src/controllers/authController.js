const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../config/db");
const { oauth2Client, authorizationUrl } = require("../config/googleAuth");
const { google } = require('googleapis');

const generateToken = (userId, email) => {
  return jwt.sign({ id: userId, email }, process.env.JWT_SECRET, {
    expiresIn: "1m",
  });
};

const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "email dan password harus diisi"
            });
        }

        const [existingUsers] = await db.query(
            "SELECT id FROM users WHERE email = ?",
            [email]
        );

        if (existingUsers.length > 0) {
            return res.status(409).json({
                success: false,
                message: "email sudah terdaftar"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.query(
            "INSERT INTO users (email, password) VALUES (?, ?)",
            [email, hashedPassword]
        );

        const token = generateToken(result.insertId, email);

        res.status(201).json({
            success: true,
            message: "register berhasil",
            user: {
                id: result.insertId,
                email: email
            },
            token: token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "error",
            error: error.message
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "email dan password harus diisi"
            });
        }

        const [results] = await db.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );
        const user = results[0];

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = generateToken(user.id, user.email);

        res.json({
            success: true,
            message: "Login berhasil",
            user: {
                id: user.id,
                email: user.email
            },
            token: token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "error",
            error: error.message
        });
    }
};

const googleAuth = (req, res) => {
    res.redirect(authorizationUrl);
};

const googleCallback = async (req, res) => {
    const { code } = req.query;

    try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        const oauth2 = google.oauth2({
            auth: oauth2Client,
            version: 'v2'
        });

        const { data } = await oauth2.userinfo.get();

        if (!data.email || !data.name) {
            return res.status(400).json({
                success: false,
                message: 'Tidak dapat mengambil data dari Google'
            });
        }

        const [existingUsers] = await db.query(
            "SELECT id FROM users WHERE email = ?",
            [data.email]
        );

        let userId;
        if (existingUsers.length === 0) {
            const [result] = await db.query(
                "INSERT INTO users (name, email, profile_picture, is_google_auth) VALUES (?, ?, ?, ?)",
                [data.name, data.email, data.picture || null, 1]
            );
            userId = result.insertId;
        } else {
            userId = existingUsers[0].id;
        }

        const token = generateToken(userId, data.email);
        
        const [user] = await db.query(
            "SELECT id, email, name, profile_picture FROM users WHERE id = ?",
            [userId]
        );

        res.json({
            success: true,
            message: "Login dengan Google berhasil",
            user: {
                id: user[0].id,
                email: user[0].email,
                name: user[0].name,
                profile_picture: user[0].profile_picture
            },
            token: token
        });

    } catch (error) {
        console.error('Google auth error:', error);
        res.redirect(`http://localhost:3000/auth/error?message=${encodeURIComponent(error.message)}`);
    }
};

module.exports = {
    register,
    login,
    googleAuth,
    googleCallback
};