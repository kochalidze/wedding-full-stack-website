import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { FaArrowRight } from "react-icons/fa6";

function HomeGallerySection() {
  const [galleryItems, setGalleryItems] = useState([]);
  const navigate = useNavigate();

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
	  <h4 onClick={() => navigate('/gallery')}>მეტის ნახვა <FaArrowRight /></h4>
	  <div>
		  {galleryItems.slice(0, 3).map(item => (
			<div key={item.id} >
			<div>
			  <img src={item.image_url}/>
			</div>
			<div>
			  <div>
				<p>{item.description}</p>
			  </div>
			  </div>
			</div>
		  ))}
	  </div>
	</div>
  );

}

export default HomeGallerySection