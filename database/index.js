const Sequelize = require('sequelize');
require('dotenv').config();

// connect to cloud db
const sequelize = new Sequelize(process.env.db_uri);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
