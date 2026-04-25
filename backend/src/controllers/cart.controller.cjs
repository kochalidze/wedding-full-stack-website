const db = require('../config/db.cjs');

// GET /cart/:userId — მომხმარებლის კალათის მიღება
const getCart = (req, res) => {
  const { userId } = req.params;

  const sql = `
    SELECT 
      cart.id,
      cart.quantity,
      cart.created_at,
      cart.dress_id,
      cart.decoration_id,
      dresses.name        AS dress_name,
      dresses.price       AS dress_price,
      decorations.name    AS decoration_name,
      decorations.price   AS decoration_price
    FROM cart
    LEFT JOIN dresses     ON cart.dress_id      = dresses.id
    LEFT JOIN decorations ON cart.decoration_id = decorations.id
    WHERE cart.user_id = ?
    ORDER BY cart.created_at DESC
  `;

  db.all(sql, [userId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "კალათის მიღება ვერ მოხერხდა", details: err.message });
    }
    res.json(rows);
  });
};

// POST /cart — კალათაში დამატება
const addToCart = (req, res) => {
  const { user_id, dress_id = null, decoration_id = null, quantity = 1 } = req.body;

  // ვალიდაცია — ზუსტად ერთი უნდა იყოს მითითებული
  const hasDress      = dress_id !== null && dress_id !== undefined;
  const hasDecoration = decoration_id !== null && decoration_id !== undefined;

  if (!user_id) {
    return res.status(400).json({ error: "user_id სავალდებულოა" });
  }
  if (hasDress === hasDecoration) {
    return res.status(400).json({
      error: "უნდა მიუთითოთ ან dress_id ან decoration_id, მაგრამ არა ორივე ან არცერთი",
    });
  }
  if (quantity < 1) {
    return res.status(400).json({ error: "quantity უნდა იყოს მინიმუმ 1" });
  }

  const sql = `
    INSERT INTO cart (user_id, dress_id, decoration_id, quantity)
    VALUES (?, ?, ?, ?)
  `;

  db.run(sql, [user_id, dress_id || null, decoration_id || null, quantity], function (err) {
    if (err) {
      return res.status(500).json({ error: "კალათაში დამატება ვერ მოხერხდა", details: err.message });
    }
    res.status(201).json({ message: "კალათაში დაემატა", id: this.lastID });
  });
};

// PATCH /cart/:id — რაოდენობის განახლება
const updateCartItem = (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity < 1) {
    return res.status(400).json({ error: "quantity უნდა იყოს მინიმუმ 1" });
  }

  const sql = `UPDATE cart SET quantity = ? WHERE id = ?`;

  db.run(sql, [quantity, id], function (err) {
    if (err) {
      return res.status(500).json({ error: "განახლება ვერ მოხერხდა", details: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "ჩანაწერი ვერ მოიძებნა" });
    }
    res.json({ message: "განახლდა" });
  });
};

// DELETE /cart/:id — ერთი პროდუქტის წაშლა
const removeCartItem = (req, res) => {
  const { id } = req.params;

  db.run(`DELETE FROM cart WHERE id = ?`, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: "წაშლა ვერ მოხერხდა", details: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "ჩანაწერი ვერ მოიძებნა" });
    }
    res.json({ message: "წაიშალა" });
  });
};

// DELETE /cart/user/:userId — მთელი კალათის გასუფთავება
const clearCart = (req, res) => {
  const { userId } = req.params;

  db.run(`DELETE FROM cart WHERE user_id = ?`, [userId], function (err) {
    if (err) {
      return res.status(500).json({ error: "კალათის გასუფთავება ვერ მოხერხდა", details: err.message });
    }
    res.json({ message: "კალათა გასუფთავდა", deleted: this.changes });
  });
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};