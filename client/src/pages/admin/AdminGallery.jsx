import React, {useEffect, useState} from 'react';
import axios from 'axios';

import AdminSidebar from '../../components/AdminSidebar';

function AdminGallery() {
	const [galleryItems, setGalleryItems] = useState([]);

	useEffect(() => {
		const fetchGalleryItems = async () => {
			try {
				const response = await axios.get('http://localhost:8428/api/gallery/gallery',{ withCredentials: true });
				setGalleryItems(response.data);

			}catch (error) {
				console.error('Error fetching gallery items:', error);
			}
		}
	}, []);

	const handleAddGalleryItem = async (newItem) => {
		try  {
			const response = await axios.post('http://localhost:8428/api/gallery/gallery', newItem, { withCredentials: true });
			setGalleryItems([...galleryItems, response.data]);
		}catch (error) {
			console.error('Error adding gallery item:', error);
		}
	}

	const handleDeleteGalleryItem = async (id) => {
		try {
			await axios.delete(`http://localhost:8428/api/gallery/gallery/${id}`, { withCredentials: true });
			setGalleryItems(galleryItems.filter(item => item.id !== id));
		} catch (error) {
			console.error('Error deleting gallery item:', error);
		}
	}

  return (
	<div>
		<AdminSidebar />
		<div>

		</div>
	</div>
  )
}

export default AdminGallery