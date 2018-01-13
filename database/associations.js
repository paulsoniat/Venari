const db = require('./index');
const models = require('./models');

// const makeAssociations = function() {
// users have many submissions
models.User.hasMany(models.Submission);
models.Submission.belongsTo(models.User);

// user challenges join table
models.User.belongsToMany(models.Challenge, { through: 'UserChallenges' });
models.Challenge.belongsToMany(models.User, { through: 'UserChallenges' });

// user badges join table
models.User.belongsToMany(models.Badge, { through: 'UserBadges' });
models.Badge.belongsToMany(models.User, { through: 'UserBadges' });

// item has many submissions
models.Item.hasMany(models.Submission);
models.Submission.belongsTo(models.Item);

// challenges have many items
models.Challenge.hasMany(models.Item);
models.Item.belongsTo(models.Challenge);

// a challenge has one badge
models.Challenge.belongsTo(models.Badge);

return db.sync();
// };

// module.exports = makeAssociations;