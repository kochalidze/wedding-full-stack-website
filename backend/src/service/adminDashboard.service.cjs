const db = require('../config/db.cjs');

const getUsersCount = () => {
  const row = db.prepare('SELECT COUNT(*) AS totalUsers FROM users').get();
  return row.totalUsers;
};
const getDressesCount = () => {
  const row = db.prepare('SELECT COUNT(*) AS totalDresses FROM dresses').get();
  return row.totalDresses;
}

module.exports = {
  getUsersCount,
  getDressesCount
};