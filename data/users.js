const bcrypt = require('bcryptjs');

const users = [
  {
    id: 1,
    username: "john_doe",
    email: "john@example.com",
    password: bcrypt.hashSync("password123", 10),
    createdAt: "2023-01-01T00:00:00Z"
  },
  {
    id: 2,
    username: "jane_smith",
    email: "jane@example.com",
    password: bcrypt.hashSync("password123", 10),
    createdAt: "2023-01-15T00:00:00Z"
  },
  {
    id: 3,
    username: "bob_wilson",
    email: "bob@example.com",
    password: bcrypt.hashSync("password123", 10),
    createdAt: "2023-02-01T00:00:00Z"
  }
];

module.exports = users; 