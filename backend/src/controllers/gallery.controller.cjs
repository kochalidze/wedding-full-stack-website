const db = require('../config/db.cjs');

const getAllGalleryItems = (req, res) => {
	try {
		const galleryItems = db.prepare('SELECT * FROM gallery').all();
		res.json(galleryItems);
	} catch (error) {
		console.error('Error fetching gallery items:', error);
		res.status(500).json({ error: 'Failed to fetch gallery items' });
	}
}

const getGalleryItemById = (req, res) => {
	const { id } = req.params;
	try {
		const galleryItem = db.prepare('SELECT * FROM gallery WHERE id = ?').get(id);
		if (!galleryItem) {
			return res.status(404).json({ error: 'Gallery item not found' });
		}
		res.json(galleryItem);
	} catch (error) {
		console.error('Error fetching gallery item:', error);
		res.status(500).json({ error: 'Failed to fetch gallery item' });
	}	
}

const addGalleryItem = (req, res) => {
	const { image_url, description } = req.body;
	if (!image_url) {
		return res.status(400).json({ error: 'Image URL is required' });
	}
	try {
		const stmt = db.prepare('INSERT INTO gallery (image_url, description) VALUES (?, ?)');
		const info = stmt.run(image_url, description);
		res.status(201).json({ id: info.lastInsertRowid, image_url, description });
	} catch (error) {
		console.error('Error adding gallery item:', error);
		res.status(500).json({ error: 'Failed to add gallery item' });
	}
}

const deleteGalleryItem = (req, res) => {
	const { id } = req.params;
	try {
		const stmt = db.prepare('DELETE FROM gallery WHERE id = ?');
		stmt.run(id);
		res.status(200).json({ message: 'Gallery item deleted successfully' });
	} catch (error) {
		console.error('Error deleting gallery item:', error);
		res.status(500).json({ error: 'Failed to delete gallery item' });
	}
}


module.exports = {
	getAllGalleryItems,
	getGalleryItemById,
	addGalleryItem,
	deleteGalleryItem
};