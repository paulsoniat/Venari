const express = require('express'); 
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const path = require('path');
require('dotenv').config();

const PORT = process.env.port;

passport.use(new Strategy({
  clientID: process.env.FBAPPID,
  clientSecret: process.env.FBAPPSECRET,
  callbackURL: `/login/facebook/return`
},
  function (accessToken, refreshToken, profile, cb) {
    console.log(accessToken, "this is a-token")
    console.log(profile, "this is profile")
    return cb(null, profile);
  }));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});  

const app = express();
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'venari secret', resave: true, saveUninitialized: true }));

app.use(express.static('public'));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/login',
  function(req, res){
    res.render('login');
  });

app.get('/login/facebook',
  passport.authenticate('facebook'));

app.get('/login/facebook/return', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
