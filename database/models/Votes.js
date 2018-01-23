const Sequelize = require('sequelize');
const db = require('../index');

const Vote = db.define('Vote', {
  value: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
});

module.exports = Vote;
