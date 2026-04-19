const express = require('express');
const router = express.Router();
const { getUserById, updateUserStatus, updateUserInfo } = require('../controllers/users.controller.cjs');
const { authenticateToken, requireAdmin } = require('../middleware/auth.middleware.cjs');

router.get('/:id', authenticateToken, getUserById);
router.put('/status/:id', authenticateToken, requireAdmin, updateUserStatus);
router.put('/info/:id', authenticateToken, updateUserInfo);

module.exports = router;