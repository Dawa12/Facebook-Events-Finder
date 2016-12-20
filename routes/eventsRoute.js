require('dotenv').config();
const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('index', {
    appId: process.env.CLIENT_ID,
  });
});

module.exports = router;
