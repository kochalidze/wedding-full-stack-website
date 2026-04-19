const express = require('express');
const router = express.Router();
const {getAllGalleryItems,
	getGalleryItemById,
	addGalleryItem, deleteGalleryItem} = require('../controllers/gallery.controller.cjs');

router.get('/gallery', getAllGalleryItems);
router.get('/gallery/:id', getGalleryItemById);
router.post('/gallery', addGalleryItem);
router.delete('/gallery/:id', deleteGalleryItem);

module.exports = router;