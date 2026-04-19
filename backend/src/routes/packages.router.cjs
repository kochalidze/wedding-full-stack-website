const express = require('express');
const router = express.Router();
const { getPackages, createPackage, updatePackage, deletePackage } = require('../controllers/packages.controller.cjs');
const { authenticateToken, requireAdmin} = require('../middleware/auth.middleware.cjs');

router.get('/get-packages', authenticateToken, getPackages);
router.post('/create-packages', authenticateToken, requireAdmin, createPackage);
router.put('/update-packages/:id', authenticateToken, requireAdmin, updatePackage);
router.delete('/delete-packages/:id', authenticateToken, requireAdmin, deletePackage);

module.exports = router;