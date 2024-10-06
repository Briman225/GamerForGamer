const db = require('../config/database');

// Get all conversations
const getAllConversations = (callback) => {
	const sql = 'SELECT * FROM conversations';
	
	db.query(sql, (err, results) => {
	  if (err) {
		console.error('Error fetching conversations:', err);
		return callback(err, null);
	  }
  
	  // Check if the fields are strings or objects, and parse only if necessary
	  results.forEach(conversation => {
		// If participants or messages are strings, parse them
		if (typeof conversation.participants === 'string') {
		  conversation.participants = JSON.parse(conversation.participants);
		}
  
		if (typeof conversation.messages === 'string') {
		  conversation.messages = JSON.parse(conversation.messages);
		}
	  });
  
	  callback(null, results); // Send the parsed results
	});
  };
  
// Get a specific conversation by ID
const getConversationById = (conversationId, callback) => {
  const sql = 'SELECT * FROM conversations WHERE conversation_id = ?';
  db.query(sql, [conversationId], (err, results) => {
    if (err) {
      console.error('Error fetching conversation:', err);
      return callback(err, null);
    }
    if (results.length === 0) {
      return callback(null, null); // No conversation found
    }
    const conversation = results[0];
    conversation.participants = JSON.parse(conversation.participants);
    conversation.messages = JSON.parse(conversation.messages);
    callback(null, conversation);
  });
};

// Create a new conversation
const createConversation = (conversationData, callback) => {
  const { participants, messages } = conversationData;
  const sql = 'INSERT INTO conversations (participants, messages) VALUES (?, ?)';
  db.query(sql, [JSON.stringify(participants), JSON.stringify(messages)], (err, result) => {
    if (err) {
      console.error('Error creating conversation:', err);
      return callback(err, null);
    }
    callback(null, { conversation_id: result.insertId, ...conversationData });
  });
};

// Update an existing conversation's messages by ID
const updateMessagesInConversation = (conversationId, newMessages, callback) => {
  const sql = 'UPDATE conversations SET messages = ? WHERE conversation_id = ?';
  db.query(sql, [JSON.stringify(newMessages), conversationId], (err, result) => {
    if (err) {
      console.error('Error updating messages:', err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Delete a conversation by ID
const deleteConversation = (conversationId, callback) => {
  const sql = 'DELETE FROM conversations WHERE conversation_id = ?';
  db.query(sql, [conversationId], (err, result) => {
    if (err) {
      console.error('Error deleting conversation:', err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Export functions for use in other files
module.exports = {
  getAllConversations,
  getConversationById,
  createConversation,
  updateMessagesInConversation,
  deleteConversation
};
