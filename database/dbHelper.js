const sequelize = require('./index');
require('./associations');
const models = require('./models');

// add database functions here
module.exports = {
  findOrCreateUser: function findOrCreateUser(userProfile, accessToken, callback) {
    models.User.findOrCreate({
      where: { fbId: userProfile.id },
      defaults: {
        name: userProfile.displayName,
        // fbToken: accessToken,
      },
    })
      .spread((user, created) => {
        console.log(user.get({
          plain: true,
        }));
        console.log(created);
        callback(user);
      });
  },
  findOrCreateVote: function findOrCreateVote(userId, submissionId, cb) {
    models.Vote.findOrCreate({
      where: {
        userId,
        submissionId,
      },
      // defaults: {
      // },
    }).spread((vote, created) => {
      cb(created);
    }).catch((err) => {
      console.log(err, 'this is error after spread');
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
  findOrCreateSubmission: function findOrCreateSubmission(userId, itemId, image, cb) {
    models.Submission.findOrCreate({
      where: {
        userId,
        itemId,
      },
      defaults: {
        image,
      },
    }).spread((submission, created) => {
      cb(created);
    }).catch((err) => {
      console.log(err, 'this is error after spread');
    });
  },
};

