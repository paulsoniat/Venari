const dbHelper = require('./database/dbHelper');

module.exports = {
  findOrCreateUser: dbHelper.findOrCreateUser,
  findAllChallenges: dbHelper.findAllChallenges,
  findSpecificChallenge: dbHelper.findSpecificChallenge,
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
};
