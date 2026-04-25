import React, {useState} from 'react';
import axios from 'axios';

import './componentsStyle/AdminGalleryForm.css';

function AdminGalletyForm() {
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8428/api/gallery/gallery', 
        {
          description: description, 
          image_url: imageUrl }, 
        { withCredentials: true });
      console.log('Gallery item added:', response.data);
      setTitle('');
      setDescription('');
      setImageUrl('');
    } catch (error) {
      console.error('Error adding gallery item:', error);
    }
  };

  return (
<form onSubmit={handleSubmit} className="wedding-form-card">
  <div className="corner corner-tl"></div>
  <div className="corner corner-tr"></div>
  <div className="corner corner-bl"></div>
  <div className="corner corner-br"></div>

  <div className="form-ornament">✦ &nbsp; Gallery &nbsp; ✦</div>
  <h2 className="form-title">დაამატე გალერეაში</h2>

  <div className="form-divider">
    <div className="form-divider-line"></div>
    <div className="form-divider-diamond"></div>
    <div className="form-divider-line"></div>
  </div>

  <div className="field-group">
    <label className="field-label" htmlFor="description">აღწერა</label>
    <textarea
      className="field-textarea"
      id="description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="მოუყევით ამ მომენტს..."
      required
    />
  </div>

  <div className="field-group">
    <label className="field-label" htmlFor="imageUrl">სურათის URL</label>
    <input
      className="field-input"
      type="text"
      id="imageUrl"
      value={imageUrl}
      onChange={(e) => setImageUrl(e.target.value)}
      placeholder="https://..."
      required
    />
  </div>

  <div className="submit-wrapper">
    <button className='submit-gallery-button'>
      <span> დაამაატე</span>
    </button>
  </div>
</form>  )
}

export default AdminGalletyForm;