const Sequelize = require('sequelize');
const db = require('../index');

const Submission = db.define('submission', {
  image: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  score: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Submission;
