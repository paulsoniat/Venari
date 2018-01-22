const Sequelize = require('sequelize');
const db = require('../index');

const Vote = db.define('item', {
  value: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
});

module.exports = Vote;
