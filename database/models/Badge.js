const Sequelize = require('sequelize');
const db = require('../index');

const Badge = db.define('badge', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Badge;
