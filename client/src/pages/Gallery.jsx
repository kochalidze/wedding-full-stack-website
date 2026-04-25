import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Gallery() {
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

  return (
    <div>
      <h1>Gallery</h1>
      <div className="image-grid">
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
                <span className="gallery-card-delete">Delete</span>
              </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );

}

export default Gallery