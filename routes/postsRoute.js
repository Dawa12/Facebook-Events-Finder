const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('posts', {
    // smaple code on sending data inside response
    // weather: res.weather,
  });
});

module.exports = router;
