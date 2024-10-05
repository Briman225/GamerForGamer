// Load environment variables
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const user = require('./models/user'); // Import user-related functions

// Create an instance of Express
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// API Routes

// GET all users
app.get('/users', (req, res) => {
  user.getAllUsers((err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to fetch users' });
    }
    res.json(results);
  });
});

// POST a new user
app.post('/users', (req, res) => {
  user.createUser(req.body, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to create user' });
    }
    res.status(201).json(result);
  });
});

// PUT (update) a user by ID
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  user.updateUser(id, req.body, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to update user' });
    }
    res.json({ message: 'User updated successfully' });
  });
});

// DELETE a user by ID
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  user.deleteUser(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to delete user' });
    }
    res.json({ message: 'User deleted successfully' });
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
