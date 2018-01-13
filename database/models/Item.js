const Sequelize = require('sequelize');
const db = require('../index');

const Item = db.define('item', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  value: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
});

module.exports = Item;