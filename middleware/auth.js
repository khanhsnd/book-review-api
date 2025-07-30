const jwt = require('jsonwebtoken');
const config = require('../config');

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ message: 'Access token required' });
  }

  const token = authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Invalid token format' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

const authenticateSession = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Session authentication required' });
  }
  next();
};

const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    if (token) {
      try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded;
      } catch (error) {
        req.user = null;
      }
    }
  }
  next();
};

module.exports = {
  authenticateJWT,
  authenticateSession,
  optionalAuth
}; 