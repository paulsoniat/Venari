const Sequelize = require('sequelize');
const db = require('../index');

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  score: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  fbId: {
    type: Sequelize.STRING,
    unique: true,
  },
});


module.exports = User;
