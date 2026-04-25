const db = require('../config/db.cjs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getJwtSecret = () => process.env.JWT_SECRET || 'dev-only-jwt-secret-change-me';

//* ამოწმებს მიმდინარე მომხმარებელს
const getMe = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: "Not authenticated" });
    }

    try {
        const user = db
            .prepare('SELECT id, name, email, role, created_at FROM users WHERE id = ?')
            .get(req.user.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch current user' });
    }
};

const registerUser = (req, res) => {
    const { name, email, password } = req.body; 
    
    try {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
        if (existingUser) return res.status(400).json({ error: 'Email already exists' });

        let role = 'user';
        if (email === 'admin@example.com') role = 'admin';

        const stmt = db.prepare('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)');
        const info = stmt.run(name, email, hashedPassword, role);

        const createdUser = db
            .prepare('SELECT id, name, email, role, created_at FROM users WHERE id = ?')
            .get(info.lastInsertRowid);
            
        res.status(201).json(createdUser);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: 'Registration failed', details: error.message });
    }
}

const loginUser = (req, res) => {
    const { email, password } = req.body;
    try {
        const jwtSecret = getJwtSecret();
        const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role }, 
            jwtSecret, 
            { expiresIn: '1d' } // 1 დღე
            // { expiresIn: '1m' } // 1 წუთი
        );

        // --- ცვლილება აქ: ვინახავთ ქუქიში ---
        res.cookie('token', token, {
            httpOnly: true,     // იცავს XSS-სგან
            secure: process.env.NODE_ENV === 'production', // მხოლოდ HTTPS-ზე პროდაქშენში
            sameSite: 'Strict', // იცავს CSRF-სგან
            maxAge: 24 * 60 * 60 * 1000 // 1 დღე
            // maxAge: 60 * 1000 // 1 წუთი
        });

        res.json({ 
            message: 'Login successful',
            user: { id: user.id, email: user.email, role: user.role } 
        });

    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};


const getAllUsers = (req, res) => {
	try {
		const stmt = db.prepare('SELECT * FROM users');
		const users = stmt.all();
		res.json(users);
	}catch (error) {
		res.status(500).json({ error: 'Failed to fetch users' });
		console.log('Fetch users error:', error);
	}	
}

const deleteUser = (req, res) => {
    const userId = req.params.id;
    try {
        const info = db.prepare('DELETE FROM users WHERE id = ?').run(userId);
        if (info.changes === 0) return res.status(404).json({ error: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Deletion failed' });
    }
}


module.exports = {
    registerUser,
    loginUser,
    deleteUser,
    getMe,
    getAllUsers
};
