const express = require('express');

const path = require('path');
require('dotenv').config();
const PORT = process.env.port;

const app = express();



app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
