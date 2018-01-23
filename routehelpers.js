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
};
