const express = require('express');
const router = express.Router();
const { registerUser, loginUser, deleteUser, getMe, getAllUsers } = require('../controllers/auth.controller.cjs');
const { authenticateToken, requireAdmin } = require('../middleware/auth.middleware.cjs');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authenticateToken, getMe);
router.delete('/delete/:id', authenticateToken, requireAdmin, deleteUser);module.exports = router;
router.get('/users', authenticateToken, requireAdmin, getAllUsers);