const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const { authenticateSession } = require('../middleware/auth');

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username, email, and password are required'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    const newUser = await userService.registerUser({ username, email, password });
    
    res.status(201).json({
      success: true,
      data: newUser,
      message: 'User registered successfully'
    });
  } catch (error) {
    if (error.message.includes('already exists')) {
      return res.status(409).json({
        success: false,
        message: error.message
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: error.message
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const result = await userService.loginUser({ email, password });
    
    res.json({
      success: true,
      data: result,
      message: 'Login successful'
    });
  } catch (error) {
    if (error.message.includes('Invalid credentials')) {
      return res.status(401).json({
        success: false,
        message: error.message
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error during login',
      error: error.message
    });
  }
});

router.post('/login/session', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const result = await userService.loginUser({ email, password });
    
    req.session.userId = result.user.id;
    req.session.username = result.user.username;
    req.session.email = result.user.email;
    
    res.json({
      success: true,
      data: { user: result.user },
      message: 'Session login successful'
    });
  } catch (error) {
    if (error.message.includes('Invalid credentials')) {
      return res.status(401).json({
        success: false,
        message: error.message
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error during session login',
      error: error.message
    });
  }
});

router.post('/logout/session', authenticateSession, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error logging out'
      });
    }
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  });
});

router.get('/profile', authenticateSession, async (req, res) => {
  try {
    const user = await userService.getUserById(req.session.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: user,
      message: 'Profile retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving profile',
      error: error.message
    });
  }
});

module.exports = router; 