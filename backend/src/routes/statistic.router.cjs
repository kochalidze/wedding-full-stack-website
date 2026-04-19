const express = require('express');
const router = express.Router();

const { getUsersCount, getDressesCount } = require('../controllers/statistic.controller.cjs');
const { authenticateToken, requireAdmin } = require('../middleware/auth.middleware.cjs');


router.get('/users-count', authenticateToken, requireAdmin, getUsersCount);

router.get('/dresses-count', authenticateToken, requireAdmin, getDressesCount);
router.get('/user-dresses-count', getDressesCount)

module.exports = router;