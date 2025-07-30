# Book Review API

A comprehensive RESTful API for managing book reviews and ratings with JWT and Session authentication.

## Features

- **Book Management**: Retrieve, search, and manage book information
- **Review System**: Add, modify, and delete book reviews
- **Authentication**: JWT and Session-based authentication
- **User Management**: User registration and login
- **Async Operations**: Promise and async/await implementations
- **Security**: Rate limiting, CORS, and security headers

## Project Structure

```
book-review-api/
├── config.js                 # Configuration settings
├── server.js                 # Main server file
├── package.json              # Dependencies and scripts
├── data/                     # Sample data
│   ├── books.js             # Book data
│   ├── reviews.js           # Review data
│   └── users.js             # User data
├── middleware/               # Authentication middleware
│   └── auth.js              # JWT and session auth
├── routes/                   # API routes
│   ├── books.js             # Book endpoints
│   ├── auth.js              # Authentication endpoints
│   └── external.js          # External API endpoints
├── services/                 # Business logic
│   ├── bookService.js       # Book operations
│   ├── userService.js       # User operations
│   └── externalBookService.js # External API calls
└── utils/                    # Utilities
    └── axiosClient.js       # Axios configuration
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
   or for development:
   ```bash
   npm run dev
   ```

## API Endpoints

### General Users (No Authentication Required)

#### Task 1: Get All Books
- **GET** `/api/books`
- Returns list of all available books

#### Task 2: Get Book by ISBN
- **GET** `/api/books/isbn/:isbn`
- Returns book details by ISBN

#### Task 3: Get Books by Author
- **GET** `/api/books/author/:author`
- Returns books by specific author

#### Task 4: Get Books by Title
- **GET** `/api/books/title/:title`
- Returns books matching title

#### Task 5: Get Book Reviews
- **GET** `/api/books/:id/reviews`
- Returns reviews for a specific book

### Authentication

#### Task 6: Register New User
- **POST** `/api/auth/register`
- Body: `{ "username": "string", "email": "string", "password": "string" }`

#### Task 7: Login User (JWT)
- **POST** `/api/auth/login`
- Body: `{ "email": "string", "password": "string" }`
- Returns JWT token

#### Task 7: Login User (Session)
- **POST** `/api/auth/login/session`
- Body: `{ "email": "string", "password": "string" }`
- Creates session

### Registered Users (JWT Authentication Required)

#### Task 8: Add/Modify Book Review
- **POST** `/api/books/:id/reviews`
- **PUT** `/api/books/reviews/:reviewId`
- Headers: `Authorization: Bearer <jwt_token>`
- Body: `{ "rating": number, "comment": "string" }`

#### Task 9: Delete Book Review
- **DELETE** `/api/books/reviews/:reviewId`
- Headers: `Authorization: Bearer <jwt_token>`

### Node.js Methods with Async/Await and Promises

#### Task 10: Get All Books (Async Callback)
- **GET** `/api/external/books/callback`
- Uses async callback function

#### Task 11: Search by ISBN (Promise)
- **GET** `/api/external/books/isbn/:isbn/promise`
- Uses Promise-based approach

#### Task 12: Search by Author (Async/Await)
- **GET** `/api/external/books/author/:author/async`
- Uses async/await function

#### Task 13: Search by Title (Promise)
- **GET** `/api/external/books/title/:title/promise`
- Uses Promise-based approach

## Sample Data

### Pre-loaded Books
- Harry Potter series (7 books)
- Classic literature (To Kill a Mockingbird, The Great Gatsby, 1984)
- Modern fiction (The Alchemist, John Green novels)

### Sample Users
- `john@example.com` / `password123`
- `jane@example.com` / `password123`
- `bob@example.com` / `password123`

## Testing with Postman

### 1. General User Tasks (No Auth Required)

**Task 1: Get All Books**
```
GET http://localhost:3000/api/books
```

**Task 2: Get Book by ISBN**
```
GET http://localhost:3000/api/books/isbn/978-0-7475-3269-9
```

**Task 3: Get Books by Author**
```
GET http://localhost:3000/api/books/author/J.K. Rowling
```

**Task 4: Get Books by Title**
```
GET http://localhost:3000/api/books/title/Harry Potter
```

**Task 5: Get Book Reviews**
```
GET http://localhost:3000/api/books/1/reviews
```

### 2. Authentication Tasks

**Task 6: Register New User**
```
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "password123"
}
```

**Task 7: Login User**
```
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### 3. Registered User Tasks (Require JWT Token)

**Task 8: Add Book Review**
```
POST http://localhost:3000/api/books/1/reviews
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "rating": 5,
  "comment": "Excellent book! Highly recommended."
}
```

**Task 9: Delete Book Review**
```
DELETE http://localhost:3000/api/books/reviews/1
Authorization: Bearer <jwt_token>
```

### 4. Node.js Methods Tasks

**Task 10: Get All Books (Async Callback)**
```
GET http://localhost:3000/api/external/books/callback
```

**Task 11: Search by ISBN (Promise)**
```
GET http://localhost:3000/api/external/books/isbn/978-0-7475-3269-9/promise
```

**Task 12: Search by Author (Async/Await)**
```
GET http://localhost:3000/api/external/books/author/J.K. Rowling/async
```

**Task 13: Search by Title (Promise)**
```
GET http://localhost:3000/api/external/books/title/Harry Potter/promise
```

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Session Authentication**: Alternative session-based auth
- **Password Hashing**: bcrypt for secure password storage
- **Rate Limiting**: Prevents abuse with request limits
- **CORS**: Cross-origin resource sharing configuration
- **Helmet**: Security headers for protection
- **Input Validation**: Request validation and sanitization

## Error Handling

The API returns consistent error responses:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message (development only)"
}
```

## Development

- **Environment**: Node.js with Express.js
- **Authentication**: JWT and Session-based
- **Async Operations**: Promises and async/await
- **HTTP Client**: Axios for external API calls
- **Security**: bcrypt, helmet, rate limiting

## License

MIT License