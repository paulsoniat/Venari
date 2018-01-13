const db = require('../index');

// join table between users and badges
const UserBadges = db.define('user_badges', {});
module.exports = UserBadges;
