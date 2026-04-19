import React, { useState } from 'react';
import axios from 'axios';
import './componentsStyle/AdminDressAddForm.css';

function AdminDressAddForm() {
  const [dressName, setDressName] = useState('');
  const [dressDescription, setDressDescription] = useState('');
  const [dressPrice, setDressPrice] = useState('');
  const [dressSize, setDressSize] = useState('');
  const [dressColor, setDressColor] = useState('');
  const [dressCategory, setDressCategory] = useState(''); // თავიდან ცარიელია
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ვალიდაცია: შევამოწმოთ არჩეულია თუ არა კატეგორია
    if (!dressCategory) {
      alert("გთხოვთ აირჩიოთ კატეგორია!");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8428/api/dress/dresses', {
        name: dressName,
        description: dressDescription,
        price: Number(dressPrice),
        size: dressSize,
        color: dressColor,
        category: dressCategory,
        image_url: imageUrl
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Dress added:', response.data);
      alert('კაბა წარმატებით დაემატა!');

      // ფორმის გასუფთავება
      setDressName('');
      setDressDescription('');
      setDressPrice('');
      setDressSize('');
      setDressColor('');
      setDressCategory('');
      setImageUrl('');

    } catch (error) {
      console.error('Error adding dress:', error);
      
      // დეტალური შეტყობინება შეცდომაზე
      const errorMsg = error.response?.data?.error || "სერვერთან კავშირი ვერ დამყარდა";
      alert('შეცდომა: ' + errorMsg);
      
      if (error.response?.status === 401 || error.response?.status === 403) {
        alert("თქვენ არ გაქვთ ადმინის უფლება ან სესია ამოიწურა.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="admin-dress-form">
      <div className="admin-dress-form__top">
        <h3 className="admin-dress-form__title">დაამატე ახალი კაბა</h3>
        <p className="admin-dress-form__subtitle">შენი კოლექციაში ახალი კაბის დამატება</p>
      </div>

      <div className="admin-dress-form__grid">
        <div className="admin-field">
          <label className="admin-field__label" htmlFor="dress-name">კაბის სახელი</label>
          <input
            id="dress-name"
            type="text"
            placeholder="მაგ: Royal Bride Anniversary Dress"
            required
            value={dressName}
            onChange={(e) => setDressName(e.target.value)}
            className="admin-field__input"
          />
        </div>

        <div className="admin-field">
          <label className="admin-field__label" htmlFor="dress-desc">აღწერა</label>
          <input
            id="dress-desc"
            type="text"
            placeholder="კაბის დეტალური აღწერა"
            required
            value={dressDescription}
            onChange={(e) => setDressDescription(e.target.value)}
            className="admin-field__input"
          />
        </div>

        <div className="admin-field">
          <label className="admin-field__label" htmlFor="dress-price">ფასი</label>
          <input
            id="dress-price"
            type="number"
            placeholder="100"
            step="0.01"
            required
            value={dressPrice}
            onChange={(e) => setDressPrice(e.target.value)}
            className="admin-field__input"
          />
        </div>

        <div className="admin-field">
          <label className="admin-field__label" htmlFor="dress-size">ზომა</label>
          <input
            id="dress-size"
            type="text"
            placeholder="მაგ: XS, S, M, L, XL"
            required
            value={dressSize}
            onChange={(e) => setDressSize(e.target.value)}
            className="admin-field__input"
          />
        </div>

        <div className="admin-field">
          <label className="admin-field__label" htmlFor="dress-color">ფერი</label>
          <input
            id="dress-color"
            type="text"
            placeholder="მაგ: თეთრი, კრემი, ღია ვერცხლისფერი"
            required
            value={dressColor}
            onChange={(e) => setDressColor(e.target.value)}
            className="admin-field__input"
          />
        </div>

        <div className="admin-field">
          <label className="admin-field__label" htmlFor="dress-category">კატეგორია</label>
          <select 
            id="dress-category"
            className="admin-field__input"
            value={dressCategory}
            onChange={(e) => setDressCategory(e.target.value)}
            required
          >
            <option value="" disabled>აირჩიეთ კატეგორია</option>
            <option value="wedding">ქორწილი</option>
            <option value="festive">ღრმელი</option>
          </select>
        </div>

        <div className="admin-field">
          <label className="admin-field__label" htmlFor="image-url">სურათის URL</label>
          <input
            id="image-url"
            type="url"
            placeholder="https://example.com/image.jpg"
            required
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="admin-field__input"
          />
        </div>
      </div>

      <button 
        type="submit" 
        className="admin-dress-form__btn"
        disabled={isLoading}
      >
        {isLoading ? 'დამატებულია...' : 'კაბის დამატება'}
      </button>
    </form>
  );
}

export default AdminDressAddForm;