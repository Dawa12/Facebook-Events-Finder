// if (process.env.NODE_ENV == 'development')
// require('dotenv').config({ silent: true });

require('dotenv').config({ silent: true });

const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('index', {
    appId: process.env.CLIENT_ID
  });

  console.log('process.env', process.env);
});

module.exports = router;
