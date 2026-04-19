const express = require('express');
const router = express.Router();
const { getComments, addComment, deleteComment } = require('../controllers/coments.controller.cjs');
const { authenticateToken, requireAdmin } = require('../middleware/auth.middleware.cjs');

router.get('/', getComments);
router.post('/add-comment', addComment);
router.delete('/:commentId', authenticateToken, requireAdmin, deleteComment);

module.exports = router;