// backend/src/controllers/bookings.controller.cjs
const db = require('../config/db.cjs');

const getAllBookings = (req, res) => {
  try {
    const rows = db.prepare(`
      SELECT
        b.id,
        b.booking_date,
        b.status,
        u.id AS user_id,
        u.name AS user_name,
        u.email AS user_email,
        d.id AS dress_id,
        d.name AS dress_name,
        d.price AS dress_price,
        dec.id AS decoration_id,
        dec.description AS decoration_name,
        dec.price AS decoration_price
      FROM bookings b
      JOIN users u ON u.id = b.user_id
      JOIN dresses d ON d.id = b.dress_id
      LEFT JOIN decorations dec ON dec.id = b.decoration_id
      ORDER BY b.id DESC
    `).all();

    res.json(rows);
  } catch (error) {
    console.error('getAllBookings error:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

const getMyBookings = (req, res) => {
  try {
    const rows = db.prepare(`
      SELECT
        b.id,
        b.booking_date,
        b.status,
        d.name AS dress_name,
        d.price AS dress_price,
        dec.description AS decoration_name,
        dec.price AS decoration_price
      FROM bookings b
      JOIN dresses d ON d.id = b.dress_id
      LEFT JOIN decorations dec ON dec.id = b.decoration_id
      WHERE b.user_id = ?
      ORDER BY b.id DESC
    `).all(req.user.id);

    res.json(rows);
  } catch (error) {
    console.error('getMyBookings error:', error);
    res.status(500).json({ error: 'Failed to fetch your bookings' });
  }
};

const addBooking = (req,res) => {
  
}

module.exports = {
  getAllBookings,
  getMyBookings,
};
