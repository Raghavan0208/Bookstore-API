const Book = require('../models/book');
const getAllBooks = async (req, res) => {
  try {
    const { limit, offset } = req.pagination;
    const allBooks = await Book.find().skip(offset).limit(limit);
    const totalBookCount = await Book.countDocuments();
    if (allBooks.length > 0) {
      res.status(200).json({
        status: 'SUCCESS',
        meta: {
          totalItems: totalBookCount,
          totalPages: Math.ceil(totalBookCount / limit),
          currentPage: Math.ceil(offset / limit) + 1,
        },
        data: allBooks,
      });
    } else {
      res.status(200).json({
        status: 'SUCCESS',
        data: [],
        message: 'Please add some books',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'FAILURE',
      message: 'Something went wrong',
    });
  }
};

const getSingleBook = async (req, res) => {
  try {
    const singleBook = await Book.findById(req.params.id);
    if (singleBook) {
      res.status(200).json({
        status: 'SUCCESS',
        data: singleBook,
      });
    }
    res.status(404).json({
      status: 'FAILURE',
      message: `Book with ${req.params.id} not available`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'FAILURE',
      message: 'Something went wrong',
    });
  }
};

const addNewBook = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    if (newBook) {
      res.status(201).json({
        status: 'SUCCESS',
        message: 'Book added successfully',
        data: newBook,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'FAILURE',
      message: 'Something went wrong',
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const bookToUpdate = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!bookToUpdate) {
      return res.status(404).json({
        status: 'FAILURE',
        message: `Book with id ${req.params.id} not available`,
      });
    }
    res.status(200).json({
      status: 'SUCCESS',
      data: bookToUpdate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'FAILURE',
      message: 'Something went wrong',
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const bookToDelete = await Book.findByIdAndDelete(req.params.id);
    if (!bookToDelete) {
      res.status(404).json({
        status: 'FAILURE',
        message: `Book with ${req.params.id} not available`,
      });
    }
    res.status(200).json({
      status: 'SUCCESS',
      message: `Succesfully deleted book with id ${req.params.id}`,
      data: bookToDelete,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'FAILURE',
      message: 'Something went wrong',
    });
  }
};

module.exports = {
  getAllBooks,
  getSingleBook,
  addNewBook,
  updateBook,
  deleteBook,
};
