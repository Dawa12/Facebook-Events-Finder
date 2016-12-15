// using template right now for placeholder

//
// const fetch = require('node-fetch');
//
// const API_URL = 'http://api.openweathermap.org/data/2.5/weather?';
// const API_KEY = process.env.OPENWEATHER_KEY;
// // const { icons } = require('../weather-icons');
//
// function findWeatherByCity(req, res, next) {
//   // if (res.weather.weather[0].main in icons) res.icon = icons[res.weather.weather[0].main];
//
//   fetch(`${API_URL}q=New+York&units=imperial&APPID=${API_KEY}`)
//   .then(r => r.json())
//   .then((result) => {
//     res.weather = result;
//     // console.log(result);
//     next();
//   })
//   .catch((err) => {
//     res.err = err;
//     next();
//   });
// }
//
// module.exports = { findWeatherByCity };
