// Load environment variables
require('dotenv').config();

const db = require('../config/database');

// Get all games
const getAllGames = (callback) => {
  const sql = 'SELECT * FROM games';
  db.query(sql, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

const getGameById = (game_id, callback) => {
	const sql = 'SELECT * FROM games WHERE game_id = ?';
	db.query(sql, [game_id], (err, results) => {
		if (err) {
			console.error('Error fetching game:', err);
			return callback(err, null);
		}
		callback(null, results);
	});
};

// Add a new game
const createGame = (gameData, callback) => {
	const { game_title } = gameData;
	const sql = 'INSERT INTO games (game_title) VALUES (?)';
	db.query(sql, [game_title], (err, result) => {
	  if (err) {
		console.error('Error creating game:', err); // Log the actual error for debugging
		return callback(err, null);
	  }
	  callback(null, { game_id: result.insertId, ...gameData });
	});
  };  

// Update a game by ID
const updateGame = (id, gameData, callback) => {
	const { game_title } = gameData;
	const sql = 'UPDATE games SET game_title = ? WHERE game_id = ?';
	db.query(sql, [game_title, id], (err, result) => {
	  if (err) {
		return callback(err, null);
	  }
	  callback(null, result);
	});
  };

// Delete a game by ID
const deleteGame = (id, callback) => {
  const sql = 'DELETE FROM games WHERE game_id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Export functions for use in other files
module.exports = {
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame
};
