require('dotenv').config({silent: true});

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 3000

const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const {FB, FacebookApiException} = require('fb');

const eventsRoute = require './routes/eventsRoute.js'

app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));

app.use(bodyParser.json());

app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

passport.use(new Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/login/facebook/return'
  },
  function(accessToken, refreshToken, profile, cb) {
    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb(null, profile);
  }));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


app.use('/', eventsRoute)

app.use('/api', (req,res) => {
  res.send('hello')
});

// using history api fallback library to access url paths directly
// referenced from video tutorial on router sertup: https://www.youtube.com/watch?v=eofpZPRUnP8
// const history = require('connect-history-api-fallback');
// app.use(history());

// const cookie-parser = require('cookie-parser');
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));

// app.get('*', function (request, response){   response.sendFile(path.resolve(__dirname, 'dist', 'index.html')) })

// app.get('/login',
//   // function(req, res){
//   //   res.render('login');
//   // }
//   );

app.get('/login/facebook',
  passport.authenticate('facebook')
);

app.get('/login/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });

app.listen(PORT, () => console.log('listening on port', PORT));
