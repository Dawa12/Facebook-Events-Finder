require('dotenv').config();
const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('posts', {
    appId: process.env.CLIENT_ID,
  });
});

module.exports = router;
