const db = require('../index');

// join table between users and challenges
const UserChallenges = db.define('user_challenges', {});
module.exports = UserChallenges;
