const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const users = require('../data/users');
const config = require('../config');

class UserService {
  async registerUser(userData) {
    return new Promise(async (resolve, reject) => {
      try {
        const existingUser = users.find(u => 
          u.email === userData.email || u.username === userData.username
        );

        if (existingUser) {
          reject(new Error('User already exists with this email or username'));
          return;
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        
        const newUser = {
          id: users.length + 1,
          username: userData.username,
          email: userData.email,
          password: hashedPassword,
          createdAt: new Date().toISOString()
        };

        users.push(newUser);
        
        const { password, ...userWithoutPassword } = newUser;
        resolve(userWithoutPassword);
      } catch (error) {
        reject(error);
      }
    });
  }

  async loginUser(credentials) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = users.find(u => 
          u.email === credentials.email || u.username === credentials.email
        );

        if (!user) {
          reject(new Error('Invalid credentials'));
          return;
        }

        const isValidPassword = await bcrypt.compare(credentials.password, user.password);
        
        if (!isValidPassword) {
          reject(new Error('Invalid credentials'));
          return;
        }

        const token = jwt.sign(
          { userId: user.id, username: user.username, email: user.email },
          config.jwtSecret,
          { expiresIn: '24h' }
        );

        const { password, ...userWithoutPassword } = user;
        resolve({ user: userWithoutPassword, token });
      } catch (error) {
        reject(error);
      }
    });
  }

  async getUserById(userId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = users.find(u => u.id === parseInt(userId));
        if (user) {
          const { password, ...userWithoutPassword } = user;
          resolve(userWithoutPassword);
        } else {
          resolve(null);
        }
      }, 100);
    });
  }

  generateSessionId() {
    return uuidv4();
  }
}

module.exports = new UserService(); 