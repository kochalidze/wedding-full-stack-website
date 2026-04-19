import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import DressSidebar from "../components/DressSidebar"
import axios from 'axios';
import { dressFilterStore } from '../store/dressFilterStore';

import './pagesStyle/Dresses.css';

function Dresses() {
  const [dresses, setDresses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  //* Zustand-იდან მოგვაქვს ფილტრები
  const search = dressFilterStore((state) => state.search);
  const color = dressFilterStore((state) => state.color);
  const size = dressFilterStore((state) => state.size);
  const category = dressFilterStore((state) => state.category);
  const price = dressFilterStore((state) => state.price);

  useEffect(() => {
    const fetchDresses = async () => {
      try {
        const response = await axios.get('http://localhost:8428/api/dress/dresses', {
          withCredentials: true
        });
        setDresses(response.data);
      } catch (error) {
        console.error('Error fetching dresses:', error);
      }
    };
    fetchDresses();
  }, []);

  //* useMemo-ს გამოყენება ოპტიმიზაციისთვის (რომ ყოველ რენდერზე არ გადათვალოს, თუ მონაცემები არ შეიცვალა)
  const filteredDresses = useMemo(() => {
    return dresses.filter((dress) => {
      // 1. ტექსტური ძებნა (სახელი ან აღწერა)
      const matchSearch = !search || 
              dress.name?.toLowerCase().includes(search.toLowerCase()) ||
              dress.description?.toLowerCase().includes(search.toLowerCase());

      // 2. ფერი (Case-insensitive შედარება უსაფრთხოებისთვის)
      const matchColor = color 
        ? dress.color?.toLowerCase() === color.toLowerCase() 
        : true;

      // 3. ზომა
      const matchSize = size ? dress.size === size : true;

      // 4. კატეგორია
      const matchCategory = category ? dress.category === category : true;

      // 5. ფასი (გაუმჯობესებული დიაპაზონი)
      let matchPrice = true;
      if (price) {
        if (price.includes('-')) {
          const [min, max] = price.split('-').map(Number);
          matchPrice = dress.price >= min && dress.price <= max;
        } else if (price.includes('+')) {
          const min = Number(price.replace('+', ''));
          matchPrice = dress.price >= min;
        }
      }

      return matchSearch && matchColor && matchSize && matchCategory && matchPrice;
    });
  }, [dresses, color, size, category, price, searchTerm]);

  return (
    <div className='dress-page'>
      {/* Sidebar-ს გადავცეთ setSearchTerm თუ იქ გაქვს input */}
      <DressSidebar onSearchChange={setSearchTerm} /> 
      
      <div className='content'>
        <div className="content-header">
          <h2>კაბები</h2>
          <span className="results-count">ნაპოვნია: {filteredDresses.length}</span>
        </div>

        <div className='dress-cards-container'>
          {filteredDresses.length > 0 ? (
            filteredDresses.map((dress) => (
              <div key={dress.id} className='dress-card' onClick={() => navigate(`/dress/${dress.id}`)}>
                <div className="image-wrapper"> 
                  <img src={dress.image_url} alt={dress.name} />
                </div>
                <div className="card-body">
                  <h5>{dress.name}</h5>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div 
                  style={{ 
                    backgroundColor: dress.color,
                    width: '15px', 
                    height: '15px', 
                    borderRadius: '50%',
                    border: '1px solid #ddd' 
                  }} 
                ></div>
                <p className="description" style={{ margin: 0 }}>{dress.color}</p>
              </div>
                                
                  <div className="card-footer">
                    <span className='price'>{dress.price} </span>
                    <span className='size-tag'>{dress.size}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">კაბები მოცემული ფილტრით ვერ მოიძებნა.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dresses;