require('./associations');
const models = require('./models');

// add database functions here
module.exports = {
  findOrCreateUser: function findOrCreateUser(userProfile) {
    models.User.findOrCreate({
      where: { fbId: userProfile.id },
      defaults: { name: userProfile.displayName },
    })
      .spread((user, created) => {
        console.log(user.get({
          plain: true,
        }));
        console.log(created);
      });
  },
  findAllChallenges: function findAllChallenges(req, res) {
    models.Challenge.findAll().then((challenges) => {
      const challengeData = [];
      challenges.forEach((challenge) => {
        challengeData.push(challenge.dataValues);
      });
      res.send(challengeData);
    });
  },
  findSpecificChallenge: function findSpecificChallenge(req, res, challengeId) {
    console.log('placeholder for a more modular specific challenge finder');
  },
  getLeaderboardData: (callback) => {
    models.User.findAll().then((users) => {
      
    });
  },
};

