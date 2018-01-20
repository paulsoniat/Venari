const passport = require('passport');
const { Strategy } = require('passport-facebook');
const routeHelpers = require('./routehelpers.js');
const models = require('./database/models');
const path = require('path');
const watson = require('watson-developer-cloud');
const fs = require('fs');

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

  app.post('/pictureAnalysis', (req, res) => {
    console.log(req.body, "this is picture analysis request")
    const visual_recognition = watson.visual_recognition({
      api_key: process.env.WATSONKEY,
      version: 'v3',
      version_date: '2016-05-20',
    });

    const parameters = {
      url: req.body.imageFile,
    };

    const params = {
      parameters,
    };

    visual_recognition.classify(params, (err, response) => {
      if (err) { console.log(err); } else { res.send(JSON.stringify(response, null, 2)); }
    });
  });

  app.post('/checkData', (req, res) => {
    const splitData = req.body.dataArray.split(',');
    const checkData = splitData.slice(0, splitData.length - 2);
    let challengeItem = splitData[splitData.length - 1];
    challengeItem = challengeItem.slice(1, challengeItem.length);
    if (checkData.indexOf(challengeItem) !== -1) {
      res.send('yaaaaaaas');
    } else {
      res.send('no');
      // res.redirect to challenge at id?
    }
  });

  app.post('/saveSubmission', (req, res) => {
    // const userId = req.user.id;
    const splitData = req.body.submissionData.split(',');
    const link = splitData[2];
    const itemName = splitData[0];
    models.Item.findOne({
      where: { name: itemName },
    }).then((item) => {
      const itemId = item.dataValues.id;
      routeHelpers.findOrCreateSubmission(req.user.id, itemId, link, (created) => {
        if (created) {
          res.send('created');
        } else {
          res.send('exists');
        }
      });
    }).catch((err) => {
      console.log(err, 'error in submission on server side');
    });
  });

  app.post('/addPoint', (req, res) => {
    // const userData = 'Paul';
    const userData = req.user.name;
    const fullUserData = req.user;
    console.log(userData, 'this is user data');
    let pointValue = 0;
    models.Item.findOne({
      where: { name: req.body.pointData },
    }).then((item) => {
      pointValue = item.dataValues.value;
      models.User.findOne({
        where: { name: userData },
      }).then((user) => {
        const userScore = user.dataValues.score;
        user.updateAttributes({
          score: userScore + pointValue,
        }).then((res) => {
          console.log('updated points');
        }).catch((err) => {
          console.log(err, 'this is user point error');
        });
      });
    }).catch((err) => {
      console.log(err, 'this is error from item finding');
    });
  });

  app.get('/users', isLoggedIn, routeHelpers.getUsersData);

  app.get('/*', isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });
};
