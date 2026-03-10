const express = require('express');
const authenticate = require('../middlewares/auth-middleware');
const paginationMiddleware = require('../middlewares/pagination-middleware');
const {
  getAllBooks,
  getSingleBook,
  addNewBook,
  updateBook,
  deleteBook,
} = require('../controller/book-controller');
// create express router
const router = express.Router();

// all routes that are related to books only
router.get('/books', authenticate, paginationMiddleware, getAllBooks);
router.get('/books/:id', authenticate, getSingleBook);
router.post('/books', authenticate, addNewBook);
router.put('/books/:id', authenticate, updateBook);
router.delete('/books/:id', authenticate, deleteBook);

module.exports = router;
