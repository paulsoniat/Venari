const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const routeHelpers = require('./routehelpers.js');
const models = require('./database/models');
const path = require('path');

passport.use(new Strategy(
  {
    clientID: process.env.FBAPPID,
    clientSecret: process.env.FBAPPSECRET,
    callbackURL: '/login/facebook/return',
  },
  (accessToken, refreshToken, profile, cb) => {
    routeHelpers.findOrCreateUser(profile);
    cb(null, profile);
  },
));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

  app.get(
    '/login',
    (req, res) => {
      res.render('login');
    },
  );

  app.get(
    '/login/facebook',
    passport.authenticate('facebook'),
  );

  app.get(
    '/login/facebook/return',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/');
    },
  );

  app.get('/challenges', routeHelpers.findAllChallenges);

  app.get('/challenge:id', (req, res) => {
    const resArr = []
    resArr.push(req._parsedOriginalUrl)
    const challengeId = resArr[0].path.slice(-1);
    models.Challenge.findAll({
      where: {
        id: challengeId,
      },
    }).then((challenge) => {
      res.send(challenge);
    });
  });

  // app.get('/main', (req, res) => {
  //   res.sendFile(path.join(__dirname, './public/main.html'));
  // });


  app.get('/users', routeHelpers.getUsersData);

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });
};
