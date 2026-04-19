const db = require('../config/db.cjs');

const getUserById = (req, res) => {
  const id = Number(req.params.id);
  const requester = req.user;

  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid user id' });
  }

  // User can read only own profile. Admin can read any profile.
  if (!requester || (requester.role !== 'admin' && requester.id !== id)) {
    return res.status(403).json({ error: 'Access denied' });
  }

  try {
    const user = db
      .prepare('SELECT id, name, email, role, created_at FROM users WHERE id = ?')
      .get(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

// const updateUserStatus  = (req,res)  => {
//   const id = req.params.id;
//   const { status } = req.body;

//   db.prepare(`
//     UPDATE users
//     SET status = ?
//     WHERE id = ?
//   `).run(status, id);

//   res.json({ message: "User status updated" });
// }
// const updateUserStatus = (req, res) => {
//   const id = Number(req.params.id);
//   const { status } = req.body || {};

//   if (!Number.isInteger(id)) {
//     return res.status(400).json({ error: 'Invalid user id' });
//   }

//   if (!ALLOWED_STATUSES.has(status)) {
//     return res.status(400).json({ error: 'Invalid status value' });
//   }

//   try {
//     const info = db
//       .prepare(`
//         UPDATE users
//         SET status = ?
//         WHERE id = ?
//       `)
//       .run(status, id);

//     if (info.changes === 0) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     return res.json({ message: 'User status updated', id, status });
//   } catch (error) {
//     console.error('updateUserStatus error:', error);
//     return res.status(500).json({ error: 'Failed to update user status' });
//   }
// };

const updateUserStatus = (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body || {};

  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid user id' });
  }

  if (!ALLOWED_STATUSES.has(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  try {
    const info = db.prepare(`
      UPDATE users
      SET status = ?
      WHERE id = ?
    `).run(status, id);

    if (info.changes === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ message: 'User status updated', id, status });
  } catch (error) {
    console.error('updateUserStatus error:', error);
    return res.status(500).json({ error: 'Failed to update user status' });
  }
};

const updateUserInfo = (req, res) => {
  const { name, last_name, email } = req.body || {};
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid user id' });
  }

  if (!name || !last_name || !email) {
    return res.status(400).json({ error: 'Name, last name, and email are required' });
  }

  try {
    const info = db.prepare(`
      UPDATE users
      SET name = ?, last_name = ?, email = ?
      WHERE id = ?
    `).run(name, last_name, email, id);

    if (info.changes === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ message: 'User info updated', id, name, last_name, email });
  }catch (error) {
    console.error('updateUserInfo error:', error);
    return res.status(500).json({ error: 'Failed to update user info' });
  }
}

module.exports = {
  getUserById,
  updateUserStatus,
  updateUserInfo
};
