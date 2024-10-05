require('dotenv').config();

const { Sequelize } = require('sequelize');
const db_name = process.env.DB_NAME;
const db_user = process.env.DB_USER;
const db_user_password = process.env.DB_USER_PASSWORD;

// Set up MySQL database connection using Sequelize
const sequelize = new Sequelize(db_name, db_user, db_user_password, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false // Disable query logging for cleaner console output
});

module.exports = sequelize;
