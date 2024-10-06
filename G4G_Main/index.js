// Load environment variables
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const user = require('./models/user'); // Import user-related functions
const game = require('./models/game');
const match = require('./models/match')
const conversation = require('./models/conversation');
const mysql = require('mysql2');

const db = mysql.createPool({
  host: process.env.DB_HOST,      // Use environment variable
  user: process.env.DB_USER,      // Use environment variable
  password: process.env.DB_PASSWORD,  // Use environment variable
  database: process.env.DB_NAME,  // Use environment variable
  port: process.env.DB_PORT || 3306,  // Use default port if not specified in .env
});
const selection = require('./models/selection');
const like = require('./models/like'); // Make sure to import like-related functions


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

// GET a user by ID
app.get('/user/:id', (req, res) => {
	const { id } = req.params;
	user.getUserById(id, (err, result) => {
	  if (err) {
		return res.status(500).json({ error: 'Unable to fetch user' });
	  }
	  if (!result) {
		return res.status(404).json({ error: 'User not found' });
	  }
	  res.json(result);
	});
  });

  app.get('/login', async (req, res) => {
	// incoming: login, password
	// outgoing: id, error
	console.log('yippie');
	let error = '';
	const { username, pass } = req.body;
	const login = 'SELECT * FROM users WHERE username = ?';

	db.query(login, [username], (err, results) => {
		if (err) {
		  console.error('Error executing query:', err);
		  return res.status(500).json({ error: 'Internal Server Error' });
		}
	
		if (results.length > 0 && results[0].pass == pass) {
		  res.json(results[0]); // Return the first user found
		} else {
		  res.status(404).json({ error: 'User not found' });
		}
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

// GET all games
app.get('/games', (req, res) => {
	game.getAllGames((err, results) => {
	  if (err) {
		return res.status(500).json({ error: 'Unable to fetch games' });
	  }
	  res.json(results);
	});
  });

// GET a game by ID
app.get('/game/:id', (req, res) => {
	const { id } = req.params;
	game.getGameById(id, (err, result) => {
	  if (err) {
		return res.status(500).json({ error: 'Unable to fetch game' });
	  }
	  if (!result) {
		return res.status(404).json({ error: 'Game not found' });
	  }
	  res.json(result);
	});
  });

// POST a new game
app.post('/games', (req, res) => {
	game.createGame(req.body, (err, result) => {
	  if (err) {
		return res.status(500).json({ error: 'Unable to create game' });
	  }
	  res.status(201).json(result);
	});
  });
  
  // PUT (update) a game by ID
  app.put('/games/:id', (req, res) => {
	const { id } = req.params;
	game.updateGame(id, req.body, (err, result) => {
	  if (err) {
		return res.status(500).json({ error: 'Unable to update game' });
	  }
	  res.json({ message: 'Game updated successfully' });
	});
  });
  
  // DELETE a game by ID
  app.delete('/games/:id', (req, res) => {
	const { id } = req.params;
	game.deleteGame(id, (err, result) => {
	  if (err) {
		return res.status(500).json({ error: 'Unable to delete game' });
	  }
	  res.json({ message: 'Game deleted successfully' });
	});
  });

  // GET all conversations
  app.get('/conversation', (req, res) => {
	conversation.getAllConversations((err, results) => {
	  if (err) {
		return res.status(500).json({ error: 'Unable to fetch conversations' });
	  }
	  res.json(results);
	});
  });
  
  // GET a conversation by ID
  app.get('/conversation/:id', (req, res) => {
	const { id } = req.params;
	conversation.getConversationById(id, (err, result) => {
	  if (err) {
		return res.status(500).json({ error: 'Unable to fetch conversation' });
	  }
	  if (!result) {
		return res.status(404).json({ error: 'Conversation not found' });
	  }
	  res.json(result);
	});
  });
  
  // POST a new conversation
  app.post('/conversation', (req, res) => {
	conversation.createConversation(req.body, (err, result) => {
	  if (err) {
		return res.status(500).json({ error: 'Unable to create conversation' });
	  }
	  res.status(201).json(result);
	});
  });
  
  // PUT (update messages) in an existing conversation
  app.put('/conversation/:id/messages', (req, res) => {
	const { id } = req.params;
	const newMessages = req.body.messages;
	conversation.updateMessagesInConversation(id, newMessages, (err, result) => {
	  if (err) {
		return res.status(500).json({ error: 'Unable to update messages' });
	  }
	  res.json({ message: 'Messages updated successfully' });
	});
  });
  
  // DELETE a conversation by ID
  app.delete('/conversation/:id', (req, res) => {
	const { id } = req.params;
	conversation.deleteConversation(id, (err, result) => {
	  if (err) {
		return res.status(500).json({ error: 'Unable to delete conversation' });
	  }
	  res.json({ message: 'Conversation deleted successfully' });
	});
  });
  
  // GET all matches
  app.get('/match', (req, res) => {
	match.getAllMatches((err, results) => {
	  if (err) {
		return res.status(500).json({ error: 'Unable to fetch matches' });
	  }
	  res.json(results);
	});
  });
  
  // GET a match by ID
  app.get('/match/:id', (req, res) => {
	const { id } = req.params;
	match.getMatchById(id, (err, result) => {
	  if (err) {
		return res.status(500).json({ error: 'Unable to fetch match' });
	  }
	  if (!result) {
		return res.status(404).json({ error: 'Match not found' });
	  }
	  res.json(result);
	});
  });
  
  // POST a new match
  app.post('/match', (req, res) => {
	match.createMatch(req.body, (err, result) => {
	  if (err) {
		return res.status(500).json({ error: 'Unable to create match' });
	  }
	  res.status(201).json(result);
	});
  });
  
  // PUT (update) a match by ID
  app.put('/match/:id', (req, res) => {
	const { id } = req.params;
	match.updateMatch(id, req.body, (err, result) => {
	  if (err) {
		return res.status(500).json({ error: 'Unable to update match' });
	  }
	  res.json({ message: 'Match updated successfully' });
	});
  });
  
  // DELETE a match by ID
  app.delete('/match/:id', (req, res) => {
	const { id } = req.params;
	match.deleteMatch(id, (err, result) => {
	  if (err) {
		return res.status(500).json({ error: 'Unable to delete match' });
	  }
	  res.json({ message: 'Match deleted successfully' });
	});
  });

// GET all selections
app.get('/selections', (req, res) => {
	selection.getAllSelections((err, results) => {
	  if (err) {
		return res.status(500).json({ error: 'Unable to fetch selections' });
	  }
	  res.json(results);
	});
});

// GET a selection by ID
app.get('/selection/:id', (req, res) => {
	const { id } = req.params;
	selection.getSelectionById(id, (err, result) => {
	  if (err) {
		return res.status(500).json({ error: 'Unable to fetch selection' });
	  }
	  if (!result) {
		return res.status(404).json({ error: 'Selection not found' });
	  }
	  res.json(result);
	});
});

app.post('/selection', (req, res) => {
	selection.createSelection(req.body, (err, result) => {
	  if (err) {
		console.error('Error:', err); // Log the error to the console
		return res.status(500).json({ error: 'Unable to create selection', details: err.message });
	  }
	  res.status(201).json(result);
	});
  });
  

// PUT (update) a selection by ID
app.put('/selection/:id', (req, res) => {
	const { id } = req.params;
	selection.updateSelection(id, req.body, (err, result) => {
	  if (err) {
		return res.status(500).json({ error: 'Unable to update selection' });
	  }
	  res.json({ message: 'Selection updated successfully' });
	});
});

// DELETE a selection by ID (fixed typo)
app.delete('/selection/:id', (req, res) => {
	const { id } = req.params;
	selection.deleteSelection(id, (err, result) => {
	  if (err) {
		return res.status(500).json({ error: 'Unable to delete selection' });
	  }
	  res.json({ message: 'Selection deleted successfully' });
	});
});

// POST: Add a like (user likes another user)
app.post('/like', (req, res) => {
  like.addLike(req.body, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to add like' });
    }
    res.status(201).json(result);
  });
});

// DELETE: Remove a like (user unlikes another user)
app.delete('/like', (req, res) => {
  const { user_id, liked_user_id } = req.body;
  if (!user_id || !liked_user_id) {
    return res.status(400).json({ error: 'user_id and liked_user_id are required' });
  }
  like.removeLike(user_id, liked_user_id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to remove like' });
    }
    res.json({ message: 'Like removed successfully' });
  });
});

// GET: Get all users that a specific user has liked
app.get('/likes/:user_id', (req, res) => {
  const { user_id } = req.params;
  like.getLikesByUser(user_id, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to fetch likes' });
    }
    res.json(results);
  });
});

// GET: Get all users who liked a specific user
app.get('/liked-by/:user_id', (req, res) => {
  const { user_id } = req.params;
  like.getUsersWhoLiked(user_id, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to fetch users who liked' });
    }
    res.json(results);
  });
});

// GET: Check for mutual likes (whether two users liked each other)
// http://localhost:3000/mutual-like?user_id=1&liked_user_id=2
// GET: Check for mutual likes and create a match if mutual
app.get('/mutual-like', (req, res) => {
	const { user_id, liked_user_id } = req.query;
  
	if (!user_id || !liked_user_id) {
	  return res.status(400).json({ error: 'user_id and liked_user_id are required' });
	}
  
	like.checkMutualLike(user_id, liked_user_id, (err, result) => {
	  if (err) {
		return res.status(500).json({ error: 'Unable to check mutual like' });
	  }
	  
	  // If a match was created, return the result
	  if (result.isMutual) {
		res.json({ message: 'Mutual like found, match created!', match: result.match });
	  } else {
		res.json({ message: 'No mutual like found' });
	  }
	});
  });
  


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
