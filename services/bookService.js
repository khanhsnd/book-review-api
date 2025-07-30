const books = require("../data/books");
const reviews = require("../data/reviews");

class BookService {
  async getAllBooks() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(books);
      }, 100);
    });
  }

  async getBooksByISBN(isbn) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const book = books.find((b) => b.isbn === isbn);
        resolve(book || null);
      }, 100);
    });
  }

  async getBooksByAuthor(author) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredBooks = books.filter((b) =>
          b.author.toLowerCase().includes(author.toLowerCase())
        );
        resolve(filteredBooks);
      }, 100);
    });
  }

  async getBooksByTitle(title) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredBooks = books.filter((b) =>
          b.title.toLowerCase().includes(title.toLowerCase())
        );
        resolve(filteredBooks);
      }, 100);
    });
  }

  async getBookById(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const book = books.find((b) => b.id === parseInt(id));
        resolve(book || null);
      }, 100);
    });
  }

  async getBookReviews(bookId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const bookReviews = reviews.filter(
          (r) => r.bookId === parseInt(bookId)
        );
        resolve(bookReviews);
      }, 100);
    });
  }

  async addBookReview(reviewData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newReview = {
          id: reviews.length + 1,
          ...reviewData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        reviews.push(newReview);
        resolve(newReview);
      }, 100);
    });
  }

  async updateBookReview(reviewId, userId, updateData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const reviewIndex = reviews.findIndex(
          (r) => r.id === parseInt(reviewId)
        );

        if (reviewIndex === -1) {
          reject(new Error("Review not found"));
          return;
        }

        const review = reviews[reviewIndex];
        if (review.userId !== userId) {
          reject(new Error("Unauthorized to modify this review"));
          return;
        }

        const updatedReview = {
          ...review,
          ...updateData,
          updatedAt: new Date().toISOString(),
        };

        reviews[reviewIndex] = updatedReview;
        resolve(updatedReview);
      }, 100);
    });
  }

  async deleteBookReview(reviewId, userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const reviewIndex = reviews.findIndex(
          (r) => r.id === parseInt(reviewId)
        );

        if (reviewIndex === -1) {
          reject(new Error("Review not found"));
          return;
        }

        const review = reviews[reviewIndex];
        if (review.userId !== userId) {
          reject(new Error("Unauthorized to delete this review"));
          return;
        }

        const deletedReview = reviews.splice(reviewIndex, 1)[0];
        resolve(deletedReview);
      }, 100);
    });
  }
}

module.exports = new BookService();
