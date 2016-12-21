if (process.env.NODE_ENV == 'development') require('dotenv').config({ silent: true });
const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('posts', {
    appId: process.env.CLIENT_ID,
  });
});

module.exports = router;
