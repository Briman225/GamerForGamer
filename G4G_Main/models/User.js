const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const user = sequelize.define('User', {
	user_id: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false
	},
	pass: {
		type: DataTypes.STRING,
		allowNull: false
	},
	first_name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	last_name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	age: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	zip_code: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
})

module.exports = user;
