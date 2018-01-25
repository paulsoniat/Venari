const dbHelper = require('./database/dbHelper');

module.exports = {
  findOrCreateUser: dbHelper.findOrCreateUser,
  findAllChallenges: dbHelper.findAllChallenges,
  findSpecificChallenge: dbHelper.findSpecificChallenge,
  findOrCreateSubmission: dbHelper.findOrCreateSubmission,
  findOrCreateVote: dbHelper.findOrCreateVote,
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
                  .then(() => dbHelper.getChallengeById(challengeId))
                  .then(challenge => dbHelper.addBadge(userId, challenge.badgeId))
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
    const newChallenge = {
      title: data.title,
      description: data.description,
      image: data.image,
      startDate: data.startDate,
      endDate: data.endDate,
      value: defaultValue,
      badgeId: defaultBadge,
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
    // res.send(data);
  },
  getSubmissionsData: (req, res) => {
    dbHelper.getSubmissionsData()
      .then((submissions) => {
        const data = submissions.map((sub) => {
          return {
            id: sub.dataValues.id,
            itemName: sub.dataValues.item.name,
            userName: sub.dataValues.user.name,
            image: sub.dataValues.image,
          };
        });
        res.send(data);
      })
      .catch((err) => {
        console.error(err, 'error getting submissions');
      });
  },
};
