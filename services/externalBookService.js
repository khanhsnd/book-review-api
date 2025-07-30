const axios = require('axios');

class ExternalBookService {
  async getAllBooksAsync() {
    try {
      const response = await axios.get('http://localhost:3000/api/books');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch all books: ${error.message}`);
    }
  }

  searchByISBNPromise(isbn) {
    return new Promise((resolve, reject) => {
      axios.get(`http://localhost:3000/api/books/isbn/${isbn}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(new Error(`Failed to search by ISBN: ${error.message}`));
        });
    });
  }

  async searchByAuthorAsync(author) {
    try {
      const response = await axios.get(`http://localhost:3000/api/books/author/${encodeURIComponent(author)}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to search by author: ${error.message}`);
    }
  }

  searchByTitlePromise(title) {
    return new Promise((resolve, reject) => {
      axios.get(`http://localhost:3000/api/books/title/${encodeURIComponent(title)}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(new Error(`Failed to search by title: ${error.message}`));
        });
    });
  }

  async getAllBooksWithCallback(callback) {
    try {
      const response = await axios.get('http://localhost:3000/api/books');
      callback(null, response.data);
    } catch (error) {
      callback(new Error(`Failed to fetch all books: ${error.message}`), null);
    }
  }
}

module.exports = new ExternalBookService(); 