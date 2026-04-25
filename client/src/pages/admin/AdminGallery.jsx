import React, {useEffect, useState} from 'react';
import axios from 'axios';

import AdminSidebar from '../../components/AdminSidebar';
import AdminGalleryForm from '../../components/AdminGalletyForm';

import '../pagesStyle/AdminGallery.css';

function AdminGallery() {
	const [galleryItems, setGalleryItems] = useState([]);

	useEffect(() => {
		const fetchGalleryItems = async () => {
			try {
				const response = await axios.get('http://localhost:8428/api/gallery/gallery',{ withCredentials: true, headers: { 'Content-Type': 'application/json' }});
				setGalleryItems(response.data);

			}catch (error) {
				console.error('Error fetching gallery items:', error);
			}
		}
		fetchGalleryItems()
	}, []);

	const handleDeleteGalleryItem = async (id) => {
		try {
			await axios.delete(`http://localhost:8428/api/gallery/gallery/${id}`, { withCredentials: true });
			setGalleryItems(galleryItems.filter(item => item.id !== id));
		} catch (error) {
			console.error('Error deleting gallery item:', error);
		}
	}

  return (
	<div className="admin-gallery-container">
		<AdminSidebar />
		<div className="admin-content">
			<div className="content-header">
			<h2 className="content-header-title">
  {'გალერეა'.split('').map((char, i) => (
    <span key={i}>{char}</span>
  ))}
</h2>
			<span className="content-header-count">{galleryItems.length} ფოტო</span>
			</div>
			<div className="content-body">
			<AdminGalleryForm />
			<div>
				<div className="gallery-section-header">
				<span className="gallery-section-title">ყველა ფოტო გალერიიდან</span>
				<div className="gallery-section-line"></div>
				</div>
				<section className="all-gallery">
				{galleryItems.map(item => (
					<div key={item.id} className="gallery-card">
					<div className="gallery-card-img-wrap">
						<img src={item.image_url} alt="" />
					</div>
					<div className="gallery-card-content">
						<div className="gallery-card-body">
							<p className="gallery-card-desc">{item.description}</p>
						</div>
						<button onClick={() => handleDeleteGalleryItem(item.id)} className="gallery-card-delete-btn">
							<span className="gallery-card-delete">წაშლა</span>
						</button>
						</div>
					</div>
				))}
				</section>
			</div>

			</div>
		</div>
	</div>
  )
}

export default AdminGallery