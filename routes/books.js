const express = require('express');
const router = express.Router();
const bookService = require('../services/bookService');
const { authenticateJWT, optionalAuth } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
    res.json({
      success: true,
      data: books,
      message: 'Books retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving books',
      error: error.message
    });
  }
});

router.get('/isbn/:isbn', async (req, res) => {
  try {
    const book = await bookService.getBooksByISBN(req.params.isbn);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    res.json({
      success: true,
      data: book,
      message: 'Book retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving book',
      error: error.message
    });
  }
});

router.get('/author/:author', async (req, res) => {
  try {
    const books = await bookService.getBooksByAuthor(req.params.author);
    res.json({
      success: true,
      data: books,
      message: `Books by ${req.params.author} retrieved successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving books by author',
      error: error.message
    });
  }
});

router.get('/title/:title', async (req, res) => {
  try {
    const books = await bookService.getBooksByTitle(req.params.title);
    res.json({
      success: true,
      data: books,
      message: `Books with title containing "${req.params.title}" retrieved successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving books by title',
      error: error.message
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const book = await bookService.getBookById(req.params.id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    res.json({
      success: true,
      data: book,
      message: 'Book retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving book',
      error: error.message
    });
  }
});

router.get('/:id/reviews', optionalAuth, async (req, res) => {
  try {
    const reviews = await bookService.getBookReviews(req.params.id);
    res.json({
      success: true,
      data: reviews,
      message: 'Book reviews retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving book reviews',
      error: error.message
    });
  }
});

router.post('/:id/reviews', authenticateJWT, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    if (!rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Rating and comment are required'
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    const book = await bookService.getBookById(req.params.id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    const reviewData = {
      bookId: parseInt(req.params.id),
      userId: req.user.userId,
      rating: parseInt(rating),
      comment
    };

    const newReview = await bookService.addBookReview(reviewData);
    res.status(201).json({
      success: true,
      data: newReview,
      message: 'Review added successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding review',
      error: error.message
    });
  }
});

router.put('/reviews/:reviewId', authenticateJWT, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    if (!rating && !comment) {
      return res.status(400).json({
        success: false,
        message: 'At least one field (rating or comment) is required'
      });
    }

    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    const updateData = {};
    if (rating) updateData.rating = parseInt(rating);
    if (comment) updateData.comment = comment;

    const updatedReview = await bookService.updateBookReview(
      req.params.reviewId,
      req.user.userId,
      updateData
    );

    res.json({
      success: true,
      data: updatedReview,
      message: 'Review updated successfully'
    });
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
    if (error.message.includes('Unauthorized')) {
      return res.status(403).json({
        success: false,
        message: error.message
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error updating review',
      error: error.message
    });
  }
});

router.delete('/reviews/:reviewId', authenticateJWT, async (req, res) => {
  try {
    const deletedReview = await bookService.deleteBookReview(
      req.params.reviewId,
      req.user.userId
    );

    res.json({
      success: true,
      data: deletedReview,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
    if (error.message.includes('Unauthorized')) {
      return res.status(403).json({
        success: false,
        message: error.message
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error deleting review',
      error: error.message
    });
  }
});

module.exports = router; 