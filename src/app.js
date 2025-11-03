require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Import routes
const bookRouter = require('./routes/bookRouter');
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');

// Import middleware
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');
const log = require('./middleware/log');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(log);

// Routes
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to Books API',
        endpoints: {
            register: 'POST /auth/register',
            login: 'POST /auth/login',
            
            googleAuth: 'GET /auth/google',
            getProfile: 'GET /users/profile',
            updateProfile: 'PUT /users/profile',
            updatePassword: 'PUT /users/profile/password',
            getAllBooks: 'GET /books',
            getBookById: 'GET /books/:id',
            createBook: 'POST /books',
            updateBook: 'PUT /books/:id',
            deleteBook: 'DELETE /books/:id'
        }
    });
});

// API Routes
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/books', bookRouter);

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
