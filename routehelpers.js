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
              callback(null, completed);
            });
        }
      })
      .catch((err) => {
        callback(err);
      });
  },
};
