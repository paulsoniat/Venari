const sequelize = require('./index');
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
    models.User.findAll({
      order: [['score', 'DESC']],
      include: [
        {
          model: models.Badge,
        },
        {
          model: models.Challenge,
        },
        {
          model: models.Submission,
        },
      ],
    })
      .then((users) => {
        callback(null, users);
      })
      .catch((err) => {
        console.log(err);
        callback(err);
      });
  },
};

