const sequelize = require('./config/database');
const User = require('./models/User');

// Sync the models and create tables
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Sync models to the database (creates tables if they don't exist)
    await sequelize.sync({ force: false });
    console.log('Database synced successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

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
