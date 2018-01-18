const express = require('express');
require('dotenv').config();

const PORT = process.env.port;

const app = express();
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'venari secret', resave: true, saveUninitialized: true }));

app.use(express.static('public'));

require('./routes')(app);

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
