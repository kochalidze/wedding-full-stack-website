const jwt = require('jsonwebtoken');

const getJwtSecret = () => process.env.JWT_SECRET || 'dev-only-jwt-secret-change-me';

const authenticateToken = (req, res, next) => {
   
    const token = req.cookies.token || req.cookies.auth_token;

    if (!token) {
        return res.status(401).json({ error: 'ავტორიზაცია საჭიროა (ქუქი ვერ მოიძებნა)' });
    }

    const secret = getJwtSecret();

    try {
        const payload = jwt.verify(token, secret);
        req.user = payload; 
        next();
    } catch (error) {
        return res.status(401).json({ error: 'ტოკენი ვადაგასულია ან არასწორია' });
    }
};

const requireAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    return res.status(403).json({ error: 'წვდომა აკრძალულია. მხოლოდ ადმინებისთვის.' });
};

module.exports = {
	authenticateToken,
	requireAdmin
};
