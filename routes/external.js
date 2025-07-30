const express = require('express');
const router = express.Router();
const externalBookService = require('../services/externalBookService');

router.get('/books/async', async (req, res) => {
  try {
    const result = await externalBookService.getAllBooksAsync();
    res.json({
      success: true,
      data: result,
      message: 'Books retrieved using async/await function'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving books with async/await',
      error: error.message
    });
  }
});

router.get('/books/callback', (req, res) => {
  externalBookService.getAllBooksWithCallback((error, result) => {
    if (error) {
      return res.status(500).json({
        success: false,
        message: 'Error retrieving books with callback',
        error: error.message
      });
    }
    res.json({
      success: true,
      data: result,
      message: 'Books retrieved using async callback function'
    });
  });
});

router.get('/books/isbn/:isbn/promise', (req, res) => {
  externalBookService.searchByISBNPromise(req.params.isbn)
    .then(result => {
      res.json({
        success: true,
        data: result,
        message: 'Book retrieved using Promise'
      });
    })
    .catch(error => {
      res.status(500).json({
        success: false,
        message: 'Error retrieving book with Promise',
        error: error.message
      });
    });
});

router.get('/books/author/:author/async', async (req, res) => {
  try {
    const result = await externalBookService.searchByAuthorAsync(req.params.author);
    res.json({
      success: true,
      data: result,
      message: 'Books retrieved by author using async/await'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving books by author with async/await',
      error: error.message
    });
  }
});

router.get('/books/title/:title/promise', (req, res) => {
  externalBookService.searchByTitlePromise(req.params.title)
    .then(result => {
      res.json({
        success: true,
        data: result,
        message: 'Books retrieved by title using Promise'
      });
    })
    .catch(error => {
      res.status(500).json({
        success: false,
        message: 'Error retrieving books by title with Promise',
        error: error.message
      });
    });
});

module.exports = router; 