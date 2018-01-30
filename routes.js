const passport = require('passport');
const { Strategy } = require('passport-facebook');
const routeHelpers = require('./routehelpers.js');
const models = require('./database/models');
const path = require('path');
const watson = require('watson-developer-cloud');
const fs = require('fs');
const sequelize = require('sequelize');

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
      successRedirect: '/home',
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
    const challengeId = resArr[0].path.split(':')[1];
    models.Item.findAll({ where: { challengeId } }).then((items) => {
      res.send(items);
    });
  });

  app.post('/pictureAnalysis', (req, res) => {
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
    }
  });

  app.post('/saveSubmission', (req, res) => {
    const splitData = req.body.submissionData.split(',');
    const link = splitData[2];
    const challengeId = splitData[1];
    const itemName = splitData[0];
    models.Challenge.findById(challengeId)
      .then((challenge) => {
        return challenge.getItems();
      })
      .then((items) => {
        const itemId = items.reduce((id, item) => {
          return item.dataValues.name === itemName ? item.dataValues.id : id;
        }, null);
        if (itemId) {
          routeHelpers.findOrCreateSubmission(req.user.id, itemId, link, (created) => {
            if (created) {
              routeHelpers.userCompletedChallenge(
                req.user.id,
                challengeId,
                (err, completed) => {
                  if (err) {
                    console.error('error', err);
                    res.send(err);
                  } else if (completed) {
                    res.send('challenge complete');
                  } else {
                    res.send('created');
                  }
                },
              );
            } else {
              res.send('exists');
            }
          });
        }
      })
      .catch((err) => {
        console.error('error saving submission', err);
        res.send(err);
      });
  });

  app.post('/addPoint', (req, res) => {
    const userId = req.user.id;
    let pointValue = 0;
    models.Item.findOne({
      where: { name: req.body.pointData },
    }).then((item) => {
      pointValue = item.dataValues.value;
      models.User.findById(userId).then((user) => {
        const userScore = user.dataValues.score;
        user.updateAttributes({
          score: userScore + pointValue,
        }).then((updated) => {
          console.log('updated points');
          res.send(':ok-hand:');
        }).catch((err) => {
          console.log(err, 'this is user point error');
        });
      });
    }).catch((err) => {
      console.log(err, 'this is error from item finding');
    });
  });


  app.post('/addVote', (req, res) => {
    routeHelpers.findOrCreateVote(req.user.id, req.body.imageId, (created) => {
      if (created) {
        models.Submission.findOne({
          where: { id: req.body.imageId },
        }).then((submission) => {
          models.User.findOne({
            where: { id: submission.dataValues.userId },
          }).then((user) => {
            models.Item.findOne({
              where: { id: submission.dataValues.itemId },
            })
              .then((item) => {
                const userScore = user.dataValues.score;
                const itemScore = item.dataValues.value;
                user.updateAttributes({
                  score: userScore + itemScore,
                }).then(() => {
                  res.send('updated points');
                });
              });
          });
        });
      } else {
        res.send('vote already exists, no cheating allowed in Venari');
      }
    });
  });

  app.get('/findSubmissions', routeHelpers.getSubmissionsData);


  app.get('/getbadges', (req, res) => {
    const results = [];
    models.UserChallenges.findAll({
      where: { userId: req.user.id },
    }).then((challenges) => {
      challenges.forEach((challenge) => {
        models.Challenge.findOne({
          where: { id: challenge.dataValues.challengeId },
        }).then((event) => {
          results.push(event);
        });
      });
    });
    setTimeout(() => {
      res.send(results);
    }, 1500);
  });

  app.get('/users', isLoggedIn, routeHelpers.getUsersData);

  app.post('/challenge', isLoggedIn, routeHelpers.createChallenge);

  app.get('/userSubmissions', routeHelpers.getUserSubmissions);

  app.get('/photoChallenges', isLoggedIn, routeHelpers.getPhotoChallenges);
  
  app.get('/geoChallenges', isLoggedIn, routeHelpers.getGeoChallenges);

  app.get('/*', isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });
};
