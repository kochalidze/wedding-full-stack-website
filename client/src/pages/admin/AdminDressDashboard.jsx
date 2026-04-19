import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AdminSidebar from '../../components/AdminSidebar';
import AdminStatistics from '../../components/AdminStatistics';
import AdminDressAddForm from '../../components/AdminDressAddForm';

import '../pagesStyle/AdminDressDashboard.css';

function AdminDressDashboard() {
  const [dresses, setDresses] = useState([]);
  const [selectedDress, setSelectedDress] = useState(null);
  const [search, setSearch] = useState("");
  const dressContRef = React.useRef(null);

  // Edit form states
  const [dressName, setDressName] = useState('');
  const [dressDescription, setDressDescription] = useState('');
  const [dressPrice, setDressPrice] = useState('');
  const [dressSize, setDressSize] = useState('');
  const [dressColor, setDressColor] = useState('');
  const [dressCategory, setDressCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Scroll to dress container
  const scrollToDressContainer = () => {
    dressContRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Fetch dresses on mount
  useEffect(() => {
    const fetchDresses = async () => {
      try {
        const response = await axios.get('http://localhost:8428/api/dress/dresses', {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' }
        });
        setDresses(response.data);
      } catch (error) {
        console.error('Error fetching dresses:', error);
      }
    };

    fetchDresses();
  }, []);

  // Select dress to edit
  const handleEdit = (dress) => {
    setSelectedDress(dress);

    setDressName(dress.name);
    setDressDescription(dress.description);
    setDressPrice(dress.price);
    setDressSize(dress.size);
    setDressColor(dress.color);
    setDressCategory(dress.category);
    setImageUrl(dress.image_url);
  };

  // Update dress
  const updateDress = async (id) => {
    try {
      await axios.put(`http://localhost:8428/api/dress/dress-update/${id}`, {
		name: dressName,
		description: dressDescription,
		price: Number(dressPrice),
		size: dressSize,
		color: dressColor,
		category: dressCategory,
		image_url: imageUrl
      }, 
	{
		headers: { 'Content-Type': 'application/json' },
		withCredentials: true // თუ cookie / auth გამოიყენება
	}
	);

      setDresses(prev =>
        prev.map(d =>
          d.id === id
            ? {
                ...d,
                name: dressName,
                description: dressDescription,
                price: dressPrice,
                size: dressSize,
                color: dressColor,
                category: dressCategory,
                image_url: imageUrl
              }
            : d
        )
      );

      setSelectedDress(null);
      alert('Dress updated successfully!');
    } catch (error) {
		alert('Error updating dress. Please try again.');
      console.log('Error updating dress:', error);
    }
  };

  // Delete dress
  const handleDelete = async (dressId) => {
    try {
      await axios.delete(`http://localhost:8428/api/dress/delete-dresses/${dressId}`, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
      });
      setDresses(prevDresses => prevDresses.filter(dress => dress.id !== dressId));
    } catch (error) {
      console.error('Error deleting dress:', error);
    }
  };

  return (
    <div className="admin-dress-dashboard">
      <AdminSidebar />

      <button 
        onClick={scrollToDressContainer}
        className="scroll-to-dresses-btn"
        title="წადი კაბებს"
        aria-label="მოიხმოს კაბებს"
      >
        ↓ 
      </button>

      <div className="content">
        <AdminStatistics />

        <div className="add-dress-container">
          <AdminDressAddForm />
          <div className="admin-dashboard-line"></div>

          <div className="dress-cont" ref={dressContRef}>
            <div className="dress-items-container">
              {dresses.filter(dress =>
                  dress.name.toLowerCase().includes(search.toLowerCase())
                ).map((dress) => (
                <div key={dress.id} className="dress-item">
                  <img src={dress.image_url} alt={dress.name} className="dress-image" />
                  <div className="dress-info">
                    <h4 className="dress-title">{dress.name}</h4>
                  </div>
                  <div className="dress-actions">
                    <button className="edit-button" onClick={() => handleEdit(dress)}>რედაქტირება</button>
                    <button className="delete-button" onClick={() => handleDelete(dress.id)}>წაშლა</button>
                  </div>
                </div>
              ))}
            </div>

            <section className="edit-dress-container">
              <div className="edit-search">
                <label htmlFor="dress-search">კაბის ძებნა</label>
                <input
                  id="dress-search"
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="კაბის სახელი..."
                />
              </div>

              {selectedDress ? (
                <div className="edit-dress-card">
                  <div className="dress-image-wrapper">
                    <img src={selectedDress.image_url} alt={selectedDress.name} />
                  </div>

                  <div className="dress-details">
                    <label htmlFor="edit-name">კაბის სახელი</label>
                    <input
                      id="edit-name"
                      type="text"
                      value={dressName}
                      onChange={(e) => setDressName(e.target.value)}
                    />

                    <label htmlFor="edit-desc">აღწერა</label>
                    <textarea
                      id="edit-desc"
                      value={dressDescription}
                      onChange={(e) => setDressDescription(e.target.value)}
                    />
                    <div className='created-at'>
                      <h6>აიტვირთა: {selectedDress.created_at}</h6>
                    </div>
                    
                    <div className="dress-meta">
                      <div className="meta-item">
                        <label htmlFor="edit-price">ფასი</label>
                        <input
                          id="edit-price"
                          type="number"
                          value={dressPrice}
                          onChange={(e) => setDressPrice(e.target.value)}
                          step="0.01"
                        />
                      </div>

                      <div className="meta-item">
                        <label htmlFor="edit-size">ზომა</label>
                        <input
                          id="edit-size"
                          type="text"
                          value={dressSize}
                          onChange={(e) => setDressSize(e.target.value)}
                        />
                      </div>

                      <div className="meta-item">
                        <label htmlFor="edit-color">ფერი</label>
                        <input
                          id="edit-color"
                          type="text"
                          value={dressColor}
                          onChange={(e) => setDressColor(e.target.value)}
                        />
                      </div>

                      <div className="meta-item">
                        <label htmlFor="edit-category">კატეგორია</label>
                        <input
                          id="edit-category"
                          type="text"
                          value={dressCategory}
                          onChange={(e) => setDressCategory(e.target.value)}
                        />
                      </div>
                    </div>

                    <label htmlFor="edit-image">სურათის URL</label>
                    <input
                      id="edit-image"
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                    />

                    <div className="edit-buttons">
                      <button className="save-btn" onClick={() => updateDress(selectedDress.id)}>შენახვა</button>
                      <button className="cancel-btn" onClick={() => setSelectedDress(null)}>დახურვა</button>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="edit-placeholder">კაბის რედაქტირებისთვის აირჩიეთ მისი ხელმისაწვდომი</p>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDressDashboard;