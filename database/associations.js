const db = require('./index');
const models = require('./models');

// users have many submissions
models.User.hasMany(models.Submission);
models.Submission.belongsTo(models.User);

// user challenges join table
models.User.belongsToMany(models.Challenge, { through: 'user_challenges' });
models.Challenge.belongsToMany(models.User, { through: 'user_challenges' });

// user badges join table
models.User.belongsToMany(models.Badge, { through: 'user_badges' });
models.Badge.belongsToMany(models.User, { through: 'user_badges' });

// item has many submissions
models.Item.hasMany(models.Submission);
models.Submission.belongsTo(models.Item);

// challenges have many items
models.Challenge.hasMany(models.Item);
models.Item.belongsTo(models.Challenge);

// a challenge has one badge
models.Challenge.belongsTo(models.Badge);

// Vote belongs to a voter and submission
models.Submission.belongsToMany(models.User, { through: 'vote' });
models.User.belongsToMany(models.Submission, { through: 'vote' });

db.sync();
