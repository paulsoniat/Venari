const Sequelize = require('sequelize');
const db = require('../index');

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  score: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});


module.exports = User;
