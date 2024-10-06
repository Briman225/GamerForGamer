// Load environment variables
require('dotenv').config();

const db = require('../config/database');

// Get all selections
const getAllSelections = (callback) => {
  const sql = 'SELECT * FROM selections';
  db.query(sql, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

const getSelectionById = (selection_id, callback) => {
	const sql = 'SELECT * FROM selections WHERE selection_id = ?';
	db.query(sql, [selection_id], (err, results) => {
		if (err) {
			console.error('Error fetching selection:', err);
			return callback(err, null);
		}
		callback(null, results);
	});
};

// Add a new selection
const createSelection = (selectionData, callback) => {
	const { user_id, game_id } = selectionData;
	
	// Ensure user_id and game_id are provided
	if (!user_id || !game_id) {
	  return callback(new Error('user_id and game_id are required'), null);
	}
  
	const sql = 'INSERT INTO selections (user_id, game_id) VALUES (?, ?)';
	db.query(sql, [user_id, game_id], (err, result) => {
	  if (err) {
		console.error('Error creating selection:', err);
		return callback(err, null);
	  }
	  callback(null, { selection_id: result.insertId, ...selectionData });
	});
  };

// Update a selection by ID
const updateSelection = (id, selectionData, callback) => {
  const { user_id, game_id } = selectionData;
  const sql = 'UPDATE selections SET user_id = ?, game_id = ? WHERE selection_id = ?';
  db.query(sql, [user_id, game_id, id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Delete a selection by ID
const deleteSelection = (id, callback) => {
  const sql = 'DELETE FROM selections WHERE selection_id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Export functions for use in other files
module.exports = {
  getAllSelections,
  getSelectionById,
  createSelection,
  updateSelection,
  deleteSelection
};
