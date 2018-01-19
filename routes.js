const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
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

  app.post('/pictureAnalysis', (req, res) => {
    // send the url to watson
    // get the results of watson into an array
    const visual_recognition = watson.visual_recognition({
      api_key: process.env.WATSONKEY,
      version: 'v3',
      version_date: '2016-05-20',
    });

    const parameters = {
      url: 'http://2wk128489wjq47m3kwxwe9hh.wpengine.netdna-cdn.com/wp-content/uploads/2017/08/burgers_main-bacon-cheeseburger-hamburger-stand.jpg',
    };

  app.get('/users', isLoggedIn, routeHelpers.getUsersData);
    const params = {
      parameters,
    };

    visual_recognition.classify(params, (err, response) => {
      if (err) { console.log(err); } else { res.send(JSON.stringify(response, null, 2)); }
    });
  });

  app.post('/checkData', (req, res) => {
    console.log('in check data');
    const splitData = req.body.dataArray.split(',');
    const checkData = splitData.slice(0, splitData.length - 2);
    console.log(checkData, 'this is check data');
    let challengeItem = splitData[splitData.length - 1];
    challengeItem = challengeItem.slice(1, challengeItem.length);
    console.log(challengeItem, 'this is challenge item');

    // got to account for no somehow above
    var x = checkData.indexOf(challengeItem)
    console.log(typeof challengeItem, "this is challenge item")
    console.log(challengeItem.length, checkData[0].length, "compare these mafks")
    console.log(x, "this is x")

    if (checkData.indexOf(challengeItem) !== -1) {
      res.send('yaaaaaaas');
    } else {
      res.send('no');
      // res.redirect to challenge at id?
    }
  });

  app.post('/addPoint', (req, res) => {
    // const user = document.cookie.user;
    const user = 'Paul';
    let pointValue = 0;
    // in point count route
    // send in challenge and item
    console.log(req.body, 'this is addpoint req body');
    // query for item name
    models.Item.findOne({
      where: { name: req.body.pointData },
    }).then((item) => {
      pointValue = item.dataValues.value;
      models.User.findOne({
        where: { name: user },
      }).then((user) => {
        console.log(user);
        const userScore = user.dataValues.score;
        user.updateAttributes({
          score: userScore + pointValue,
        }).then((res) => {
          console.log("updated points")
        }).catch((err)=> {
          console.log(err, "this is user point error")
        })
      });
    }).catch((err) => {
      console.log(err, 'this is error from item finding');
    });
    // get point value for item
    // add point to existing user
  });

  app.get('/users', routeHelpers.getUsersData);

  app.get('/*', isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });
};
