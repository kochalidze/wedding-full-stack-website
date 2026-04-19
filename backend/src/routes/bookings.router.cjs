const router = require('express').Router();
const { authenticateToken, requireAdmin } = require('../middleware/auth.middleware.cjs');
const { getAllBookings, getMyBookings } = require('../controllers/bookings.controller.cjs');

router.get('/all-bookings', authenticateToken, requireAdmin, getAllBookings)
router.get('/my-bookings', authenticateToken, getMyBookings);

module.exports = router;