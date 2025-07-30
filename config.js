require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
  sessionSecret: process.env.SESSION_SECRET || 'your-super-secret-session-key-change-in-production',
  nodeEnv: process.env.NODE_ENV || 'development'
}; 