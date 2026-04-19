const express = require('express');
const router = express.Router();
const { getAllDresses, getDressById, addDress, updateDress, deleteDress } = require('../controllers/dress.controller.cjs');
const { authenticateToken, requireAdmin } = require('../middleware/auth.middleware.cjs');

router.get('/dresses', getAllDresses);
router.get('/dresses/:id', getDressById);
router.post('/dresses', authenticateToken, requireAdmin, addDress);
router.put('/dress-update/:id', authenticateToken, requireAdmin, updateDress)
router.delete('/delete-dresses/:id', authenticateToken, requireAdmin, deleteDress);

module.exports = router;