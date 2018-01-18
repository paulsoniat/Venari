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
    process.nextTick(() => {
      routeHelpers.findOrCreateUser(profile, accessToken, (user) => {
        cb(null, user);
      });
    });
  },
));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

const isLoggedIn = (req, res, next) => {
  console.log('req.user', req.user);
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/');
};

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
    passport.authenticate('facebook', {
      successRedirect: '/main',
      failureRedirect: '/login',
    }),
  );

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/user', isLoggedIn, routeHelpers.getUserSession);

  app.get('/challenges', isLoggedIn, routeHelpers.findAllChallenges);

  app.get('/challenge:id', isLoggedIn, (req, res) => {
    const resArr = [];
    resArr.push(req._parsedOriginalUrl);
    const challengeId = resArr[0].path.slice(-1);
    models.Item.findAll({ where: { challengeId } }).then((items) => {
      res.send(items);
    });
  });
  
  app.get('/pictureAnalysis', (req, res) => {
    console.log(req, "this is request");
    res.send('hello');
  });

  app.get('/users', isLoggedIn, routeHelpers.getUsersData);

  app.get('/*', isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });
};
