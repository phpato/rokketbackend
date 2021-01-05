var express = require('express');
var router = express.Router();
const Book = require('../models/item')

const getBooks = async (req, res, next) => {
  try {
      const books = await Book.find({}, "author title description");
      res.json({ status: true, books });
  } catch (error) {
      return res.status(500).json({ message: error });
  }
}

const saveBook = async (req, res, next) => {
    try {
        const body = req.body;
        let book = new Book({
          author: body.author,
          title: body.title,
          description: body.description
        });
        const bookSaved = await book.save();
        if (!bookSaved) return res.status(401).json({ status: false, message: "Can't save book." });
        res.json({ status: true, bookSaved });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const deleteBook = async (req, res, next) => {
  try {
      const id = req.params.id;
      const bookDeleted = await Book.findByIdAndRemove(id);
      if (!bookDeleted) return res.status(401).json({ status: false, message: "Book not found." });
      res.json({ status: true, bookDeleted });
  } catch (error) {
      return res.status(500).json({ message: error });
  }
}

router.post('/', async (req, res, next) => {
  saveBook(req, res, next);
})

router.get('/', function (req, res, next) {
  getBooks(req, res, next);
})

router.delete('/:id', function (req, res, next) {
  deleteBook(req, res, next)
})

module.exports = router;