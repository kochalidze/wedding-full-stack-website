const express = require('express');
const router = express.Router();
const { getAllDecorations,
	getDecorationById,
	addDecoration,
	updateDecoration,
	deleteDecoration } = require('../controllers/decorations.controller.cjs');
const { authenticateToken, requireAdmin } = require('../middleware/auth.middleware.cjs');

router.get('/', getAllDecorations);
//* GET /api/decorations

router.get('/:id', getDecorationById);
//* GET /api/decorations/:id

router.post('/', authenticateToken, requireAdmin, addDecoration);
//* POST /api/decorations

router.put('/:id', authenticateToken, requireAdmin, updateDecoration);
//* PUT /api/decorations/:id

router.delete('/:id', authenticateToken, requireAdmin, deleteDecoration);
//* DELETE /api/decorations/:id

module.exports = router;
