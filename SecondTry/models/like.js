// Load environment variables
require('dotenv').config();
const db = require('../config/database');
const match = require('./match.js');
// Add a like (user likes another user)
const addLike = (likeData, callback) => {
  const { user_id, liked_user_id } = likeData;

  // Ensure both user_id and liked_user_id are provided
  if (!user_id || !liked_user_id) {
    return callback(new Error('user_id and liked_user_id are required'), null);
  }

  const sql = 'INSERT INTO user_likes (user_id, liked_user_id) VALUES (?, ?)';
  db.query(sql, [user_id, liked_user_id], (err, result) => {
    if (err) {
      console.error('Error adding like:', err);
      return callback(err, null);
    }
    callback(null, { like_id: result.insertId, ...likeData });
  });
};

// Remove a like (user unlikes another user)
const removeLike = (user_id, liked_user_id, callback) => {
  const sql = 'DELETE FROM user_likes WHERE user_id = ? AND liked_user_id = ?';
  db.query(sql, [user_id, liked_user_id], (err, result) => {
    if (err) {
      console.error('Error removing like:', err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Get all users that a specific user has liked
const getLikesByUser = (user_id, callback) => {
  const sql = 'SELECT liked_user_id FROM user_likes WHERE user_id = ?';
  db.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error('Error fetching likes:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Get all users who liked a specific user
const getUsersWhoLiked = (user_id, callback) => {
  const sql = 'SELECT user_id FROM user_likes WHERE liked_user_id = ?';
  db.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error('Error fetching users who liked:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Check for mutual likes (match)
const checkMutualLike = (user_id, liked_user_id, callback) => {
	const sql = `
	  SELECT ul1.user_id, ul1.liked_user_id 
	  FROM user_likes ul1
	  JOIN user_likes ul2 
		ON ul1.user_id = ul2.liked_user_id 
		AND ul1.liked_user_id = ul2.user_id
	  WHERE ul1.user_id = ? AND ul1.liked_user_id = ?
	`;
	db.query(sql, [user_id, liked_user_id], (err, results) => {
	  if (err) {
		console.error('Error checking mutual like:', err);
		return callback(err, null);
	  }
  
	  if (results.length > 0) {
		// Mutual like exists, now create a match
		match.createMatch({ user_id_a: user_id, user_id_b: liked_user_id }, (err, result) => {
		  if (err) {
			console.error('Error creating match:', err);
			return callback(err, null);
		  }
		  callback(null, { isMutual: true, match: result });
		});
	  } else {
		callback(null, { isMutual: false });
	  }
	});
  };

// Export the functions
module.exports = {
  addLike,
  removeLike,
  getLikesByUser,
  getUsersWhoLiked,
  checkMutualLike
};
