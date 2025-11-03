const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const validateBook = require('../middleware/bookValidate');
const authenticateToken = require('../middleware/authvalidate');

router.get('/', authenticateToken, bookController.getAllBooks);

router.get('/:id', authenticateToken, bookController.getBookById);

router.post('/', authenticateToken, validateBook, bookController.createBook);

router.put('/:id', authenticateToken, validateBook, bookController.updateBook);

router.delete('/:id', authenticateToken, bookController.deleteBook);

module.exports = router;
