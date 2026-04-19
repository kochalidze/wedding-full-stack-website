const usersCount = require("../service/adminDashboard.service.cjs").getUsersCount;
const dressesCount = require("../service/adminDashboard.service.cjs").getDressesCount;

const getUsersCount = async (req, res) => {
  try {
    const count = await usersCount();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
const getDressesCount = async (req, res) => {
  try {
    const count = await dressesCount();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getUsersCount,
  getDressesCount
};