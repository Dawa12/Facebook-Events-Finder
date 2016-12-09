require('dotenv').config({silent: true});
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const PORT = process.env.PORT || 3000

app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.get('/', (req,res) => {
  res.send('hello')
});

app.listen(PORT, () => console.log('listening on port', PORT));
