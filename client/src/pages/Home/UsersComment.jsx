import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaTimes } from 'react-icons/fa';
import axios from 'axios';

function UsersComment() {
  const [comments, setComments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    rating: 5
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8428/api/comments/');
      setComments(response.data.comments || []);
    } catch (err) {
      setError('კომენტარების ჩატვირთვა ვერ მოხერხდა. სცადეთ მოგვიანებით.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        userId: null,
        name: formData.name,
        email: formData.email,
        comment: formData.message,
        rating: formData.rating
      };
      const response = await axios.post('http://localhost:8428/api/comments/add-comment', payload);
      if (response.data) {
        setComments((prev) => [response.data, ...prev]);
        setSubmitted(true);
        setTimeout(() => {
          setShowForm(false);
          setSubmitted(false);
          setFormData({ name: '', email: '', message: '', rating: 5 });
        }, 2000);
      }
    } catch (err) {
      setError('კომენტარი ვერ გაიგზავნა. სცადეთ მოგვიანებით.');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div
      className="testimonials-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="testimonials-container">
        <motion.div className="testimonials-header" variants={cardVariants}>
          <h2>კლიენტების მოსაზრებები</h2>
          <p>იხილეთ რას ამბობენ ჩვენი ბედნიერი მომხმარებლები</p>
          <motion.button
            className="add-testimonial-btn"
            onClick={() => setShowForm(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            დაკომენტარება
          </motion.button>
        </motion.div>

        {error && <p className="testimonials-error">{error}</p>}

        {loading ? (
          <p className="testimonials-loading">იტვირთება...</p>
        ) : (
          <motion.div className="testimonials-grid" variants={containerVariants}>
            {comments.length === 0 ? (
              <div className="no-comments">კომენტარები ჯერ არ არის. იყავი პირველი!</div>
            ) : (
              comments.slice(0, 6).map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  className="testimonial-card"
                  variants={cardVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="testimonial-content">
                    <FaQuoteLeft className="quote-icon" />
                    <p className="testimonial-text">{testimonial.comment}</p>
                    <div className="rating">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="star" />
                      ))}
                    </div>
                  </div>
                  <div className="testimonial-author">
                    <div className="author-image author-image-fallback">{testimonial.user_name?.[0] || 'U'}</div>
                    <h4 className="author-name">{testimonial.user_name || 'მომხმარებელი'}</h4>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </div>


      <AnimatePresence>
        {showForm && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowForm(false)}
          >
            <motion.div
              className="modal-content"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>დატოვეთ თქვენი მოსაზრება</h3>
                <button className="close-btn" onClick={() => setShowForm(false)}>
                  <FaTimes />
                </button>
              </div>

              {submitted ? (
                <motion.div className="success-message" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <h4>მადლობა!</h4>
                  <p>თქვენი მოსაზრება წარმატებით გაიგზავნა და მალე გამოჩნდება საიტზე.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="testimonial-form">
                  <div className="form-group">
                    <label htmlFor="name">სახელი *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="შეიყვანეთ თქვენი სახელი"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">ელ. ფოსტა *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="example@email.com"
                    />
                  </div>

                  <div className="form-group">
                    <label>რეიტინგი *</label>
                    <div className="rating-input">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={`star-input ${star <= formData.rating ? 'active' : ''}`}
                          onClick={() => handleRatingChange(star)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">მოსაზრება *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="4"
                      placeholder="გაგვიზიარეთ თქვენი გამოცდილება..."
                    />
                  </div>

                  <div className="form-actions">
                    <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>
                      გაუქმება
                    </button>
                    <button type="submit" className="submit-btn">
                      გაგზავნა
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default UsersComment;