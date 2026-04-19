const db = require('../config/db.cjs');

const getPackages = (req, res) => {
	try {
		const packages = db.prepare('SELECT * FROM packages').all();
		res.json({ packages });
	}catch (error) {
		res.status(500).json({ error: 'Failed to fetch packages' });
	}
}

const createPackage = (req, res) => {
	const { name, description, price } = req.body;
	try {
		const stmt = db.prepare('INSERT INTO packages (name, description, price) VALUES (?, ?, ?)');
		const info = stmt.run(name, description, price);
		const createdPackage = db.prepare('SELECT * FROM packages WHERE id = ?').get(info.lastInsertRowid);
		res.status(201).json(createdPackage);
	}catch (error) {
		res.status(500).json({ error: 'Failed to create package' });
	}
}

const updatePackage = (req, res) => {
	const { id } = req.params;
	const { name, description, price } = req.body;
	try {
		const stmt = db.prepare(
		'UPDATE packages SET name = ?, description = ?, price = ?, updated_at = datetime("now") WHERE id = ?'
		);
		stmt.run(name, description, price, id);
		const updatedPackage = db.prepare('SELECT * FROM packages WHERE id = ?').get(id);
		res.json(updatedPackage);
	}catch (error) {
		res.status(500).json({ error: 'Failed to update package' });
	}
}

const deletePackage = (req, res) => {
	const { id } = req.params;
	try {
		const stmt = db.prepare('DELETE FROM packages WHERE id = ?');
		stmt.run(id);
		res.json({ message: 'Package deleted successfully' });
	}catch (error) {
		res.status(500).json({ error: 'Failed to delete package' });
	}
}

module.exports = {
	getPackages,
	createPackage,
	updatePackage,
	deletePackage
}