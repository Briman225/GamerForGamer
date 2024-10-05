// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');

// Create an instance of Express
const app = express();

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

// Start the server
const PORT = process.env.PORT || 3000; // Use environment variable or default to 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const User = require('./models/User');

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch users' });
  }
});

// Add a new user
app.post('/users', async (req, res) => {
	try {
	  const { name, age, gender, bio, pictureUrl } = req.body;
	  const newUser = await User.create({ name, age, gender, bio, pictureUrl });
	  res.status(201).json(newUser);
	} catch (error) {
	  res.status(500).json({ error: 'Unable to create user' });
	}
  });

  // Update a user by ID
app.put('/users/:id', async (req, res) => {
	try {
	  const { id } = req.params;
	  const { name, age, gender, bio, pictureUrl } = req.body;
  
	  const user = await User.findByPk(id);
	  if (!user) {
		return res.status(404).json({ error: 'User not found' });
	  }
  
	  user.name = name;
	  user.age = age;
	  user.gender = gender;
	  user.bio = bio;
	  user.pictureUrl = pictureUrl;
  
	  await user.save();
	  res.json(user);
	} catch (error) {
	  res.status(500).json({ error: 'Unable to update user' });
	}
  });
  