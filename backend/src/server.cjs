const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// require('dotenv').config({ path: './.env' });
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const app = express();
const PORT = process.env.PORT;

if (!process.env.JWT_SECRET) {
	console.warn('JWT_SECRET is not set. Using an insecure development fallback secret.');
}

app.use(cors({
	origin: 'http://localhost:5173',
	credentials: true
}))
app.use(express.json());
app.use(cookieParser());


//* Import routes
const authRoutes = require('./routes/auth.router.cjs');
const dressRoutes = require('./routes/dress.router.cjs');
// const decorationRoutes = require('./routes/decorations.router.cjs');
const statisticRoutes = require('./routes/statistic.router.cjs');
const usersRoutes = require('./routes/users.router.cjs');
const bookingsRoutes = require('./routes/bookings.router.cjs');
const commentsRoutes = require('./routes/coments.router.cjs');
const packagesRoutes = require('./routes/packages.router.cjs');
const galleryRoutes = require('./routes/gallery.router.cjs');
const cartRoutes = require('./routes/cart.router.cjs');

//* Use routes
app.use('/api/auth', authRoutes);
app.use('/api/dress', dressRoutes);
// app.use('/api/decorations', decorationRoutes);
app.use('/api/statistic', statisticRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/packages', packagesRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/cart', cartRoutes);
console.log("Cart routes loaded");

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

setInterval(() => {}, 1000);