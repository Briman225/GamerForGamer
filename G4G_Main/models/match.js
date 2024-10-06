// Load environment variables
require('dotenv').config();

const db = require('../config/database');

// Get all matches
const getAllMatches = (callback) => {
  const sql = 'SELECT * FROM matches';
  db.query(sql, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Add a new match
const createMatch = (matchData, callback) => {
  const { user_id_a, user_id_b } = matchData;
  const sql = 'INSERT INTO matches (user_id_a, user_id_b) VALUES (?, ?)';
  db.query(sql, [user_id_a, user_id_b], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, { match_id: result.insertId, ...matchData });
  });
};

// Update a match by ID
const updateMatch = (id, matchData, callback) => {
  const { user_id_a, user_id_b } = matchData;
  const sql = 'UPDATE matches SET user_id_a = ?, user_id_b = ? WHERE match_id = ?';
  db.query(sql, [user_id_a, user_id_b, id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Delete a match by ID
const deleteMatch = (id, callback) => {
  const sql = 'DELETE FROM matches WHERE match_id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Export functions for use in other files
module.exports = {
  getAllMatches,
  createMatch,
  updateMatch,
  deleteMatch
};
