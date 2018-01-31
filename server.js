if (process.env.NODE_ENV == 'development')
  require('dotenv').config({ silent: true });
const express = require('express');
const path = require('path');
const logger = require('morgan');
const eventsRoute = require('./routes/eventsRoute');
const postsRoute = require('./routes/postsRoute');

const app = express();
const port = process.argv[2] || process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', homeRoute);
app.use('/', eventsRoute);
app.use('/posts', postsRoute);

app.listen(port, () => console.log('Server is running on ', port));
