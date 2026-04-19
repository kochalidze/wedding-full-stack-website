const db = require('../config/db.cjs');

//* Get all decorations
//? function for Users 
const getAllDecorations = (req, res) => {
	try {
		const stmt = db.prepare('SELECT * FROM decorations');
		const decorations = stmt.all();
		res.json(decorations);
	} catch (error) {
		res.status(500).json({ error: 'Failed to retrieve decorations' });
	}
}

//* Get a decoration by ID
//? function for Users 
const getDecorationById = (req, res) => {
	const { id } = req.params;
	try {
		const stmt = db.prepare('SELECT * FROM decorations WHERE id = ?');
		const decoration = stmt.get(id);
		res.json(decoration);
	} catch (error) {
		res.status(500).json({ error: 'Failed to retrieve decoration' });
	}
}

//* Add a new decoration
//? function for Admin panel
const addDecoration = (req, res) => {
	const { description, price, image_url } = req.body;
	try {
		const stmt = db.prepare('INSERT INTO decorations (description, price, image_url) VALUES (?, ?, ?)');
		stmt.run(description, price, image_url);
		res.status(201).json({ message: 'Decoration added successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Failed to add decoration' });
	}
}

//* Update a decoration by ID
//? function for Admin panel
const updateDecoration = (req, res) => {
	const { id } = req.params;
	const { description, price, image_url } = req.body;
	try {
		const stmt = db.prepare('UPDATE decorations SET description = ?, price = ?, image_url = ? WHERE id = ?');
		stmt.run(description, price, image_url, id);
		res.json({ message: 'Decoration updated successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Failed to update decoration' });
	}
}

//* Delete a decoration by ID
//? function for Admin panel
const deleteDecoration = (req, res) => {
	const { id } = req.params;
	try {
		const stmt = db.prepare('DELETE FROM decorations WHERE id = ?');
		stmt.run(id);
		res.json({ message: 'Decoration deleted successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Failed to delete decoration' });
	}
}

module.exports = {
	getAllDecorations,
	getDecorationById,
	addDecoration,
	updateDecoration,
	deleteDecoration
};