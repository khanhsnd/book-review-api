const express = require('express');
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const config = require('./config');

const bookRoutes = require('./routes/books');
const authRoutes = require('./routes/auth');
const externalRoutes = require('./routes/external');

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  }
});

app.use(helmet());
app.use(cors());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: config.nodeEnv === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/external', externalRoutes);

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Book Review API is running',
    version: '1.0.0',
    endpoints: {
      books: '/api/books',
      auth: '/api/auth',
      external: '/api/external'
    }
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: config.nodeEnv === 'development' ? error.message : 'Something went wrong'
  });
});

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`🚀 Book Review API server running on port ${PORT}`);
  console.log(`📚 API Documentation available at http://localhost:${PORT}`);
  console.log(`🔐 Authentication endpoints at http://localhost:${PORT}/api/auth`);
  console.log(`📖 Book endpoints at http://localhost:${PORT}/api/books`);
  console.log(`🌐 External endpoints at http://localhost:${PORT}/api/external`);
});

module.exports = app; 