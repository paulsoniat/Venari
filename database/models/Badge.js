const Sequelize = require('sequelize');
const db = require('../index');

const Badge = db.define('badge', {
  image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Badge;
