const express = require('express');
require('dotenv').config();

const PORT = process.env.port;

const dbHelper = require('./database/dbHelper');
const app = express();
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'venari secret', resave: true, saveUninitialized: true }));

app.use(express.static('public'));

require('./routes')(app);

//route used to test webpack
app.get('/challenge', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/challenge.html'));
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
