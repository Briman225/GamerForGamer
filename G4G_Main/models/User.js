// Load environment variables
require('dotenv').config();

const db = require('../config/database');

// Get all users
const getAllUsers = (callback) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Add a new user
const createUser = (userData, callback) => {
  const { username, pass, first_name, last_name, age, zip_code } = userData;
  const sql = 'INSERT INTO users (username, pass, first_name, last_name, age, zip_code) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [username, pass, first_name, last_name, age, zip_code], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, { user_id: result.insertId, ...userData });
  });
};

// Update a user by ID
const updateUser = (id, userData, callback) => {
  const { username, pass, first_name, last_name, age, zip_code } = userData;
  const sql = 'UPDATE users SET username = ?, pass = ?, first_name = ?, last_name = ?, age = ?, zip_code = ? WHERE user_id = ?';
  db.query(sql, [username, pass, first_name, last_name, age, zip_code, id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Delete a user by ID
const deleteUser = (id, callback) => {
  const sql = 'DELETE FROM users WHERE user_id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Export functions for use in other files
module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
};
