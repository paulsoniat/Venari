const dbHelper = require('./database/dbHelper');

module.exports = {
  findOrCreateUser: dbHelper.findOrCreateUser,
  findAllChallenges: dbHelper.findAllChallenges,
  findSpecificChallenge: dbHelper.findSpecificChallenge,
  findOrCreateSubmission: dbHelper.findOrCreateSubmission,
  findOrCreateVote: dbHelper.findOrCreateVote,
  findUserSubmissions: dbHelper.findUserSubmissions,
  getUsersData: (req, res) => {
    dbHelper.getLeaderboardData((err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    });
  },
  getUserSession: (req, res) => {
    res.send(req.user);
  },
  userCompletedChallenge: (userId, challengeId, callback) => {
    dbHelper.userChallengeExists(userId, challengeId)
      .then((found) => {
        if (found) {
          callback(null, true);
        } else {
          dbHelper.getUserChallengeSubmissions(userId, challengeId)
            .then((submissions) => {
              const completed = submissions.reduce((done, sub) => {
                if (!sub) {
                  return false;
                }
                return done;
              }, true);
              console.log('challenge completed', completed);
              if (completed) {
                dbHelper.completeChallenge(userId, challengeId)
                  // remove until we have meaningful badge features
                  // .then(() => dbHelper.getChallengeById(challengeId))
                  // .then(challenge => dbHelper.addBadge(userId, challenge.badgeId))
                  .then(() => {
                    callback(null, true);
                  });
              } else {
                callback(null, false);
              }
            });
        }
      })
      .catch((err) => {
        console.error(err, 'error completing challenge');
        callback(err);
      });
  },
  createChallenge: (req, res) => {
    const data = req.body;
    const defaultBadge = 1;
    const defaultValue = 5;
    const longitude = data.longitude || null;
    const latitude = data.latitude || null;
    const newChallenge = {
      title: data.title,
      description: data.description,
      image: data.image,
      startDate: data.startDate,
      endDate: data.endDate,
      value: defaultValue,
      badgeId: defaultBadge,
      longitude,
      latitude,
    };
    dbHelper.getChallengeByTitle(newChallenge.title)
      .then((found) => {
        if (found) {
          res.send('challenge already exists');
        } else {
          dbHelper.createChallenge(newChallenge)
            .then((created) => {
              // create challenge items
              console.log('new challenge', created);
              const promises = data.items.map(item =>
                dbHelper.addChallengeItem(created.dataValues.id, item));
              return Promise.all(promises);
            })
            .then((items) => {
              console.log('new challenge items', items);
              res.send('created challenge');
            });
        }
      })
      .catch((err) => {
        console.error(err, 'error creating challenge');
        res.send(err);
      });
  },
  getSubmissionsData: (req, res) => {
    dbHelper.getSubmissionsData()
      .then((submissions) => {
        const data = submissions.map(sub => ({
          id: sub.dataValues.id,
          itemName: sub.dataValues.item.name,
          userName: sub.dataValues.user.name,
          image: sub.dataValues.image,
        }));
        res.send(data);
      })
      .catch((err) => {
        console.error(err, 'error getting submissions');
      });
  },
  getUserSubmissions: (req, res) => {
    dbHelper.findUserSubmissions(req.user.id)
      .then((submissions) => {
        const data = submissions.map(sub => ({
          id: sub.dataValues.id,
          image: sub.dataValues.image,
          itemName: sub.dataValues.item.name,
          date: sub.dataValues.createdAt.toString(),
        }));
        res.send(data);
      })
      .catch((err) => {
        console.error(err, 'error getting submissions');
      });
  },
  getPhotoChallenges: (req, res) => {
    dbHelper.getPhotoChallenges()
      .then((challenges) => {
        res.send(challenges);
      })
      .catch((err) => {
        console.log('error getting photo challenges', err);
        res.send(err);
      });
  },
  getGeoChallenges: (req, res) => {
    dbHelper.getGeoChallenges()
      .then((challenges) => {
        res.send(challenges);
      })
      .catch((err) => {
        console.log('error getting location challenges', err);
        res.send(err);
      });
  },
};
