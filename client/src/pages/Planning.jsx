import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaRing, FaCamera, FaUtensils, FaMusic, FaCar, FaMapMarkerAlt } from "react-icons/fa";
import './pagesStyle/Planning.css';

export default function Planning() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setSubmitted(true);
  };

  const categories = [
    { icon: <FaRing />, title: "ქორწილი", color: "#e07b91" },
    { icon: <FaCamera />, title: "ფოტო/ვიდეო", color: "#3498db" },
    { icon: <FaUtensils />, title: "კვება", color: "#e67e22" },
    { icon: <FaMusic />, title: "მუსიკა", color: "#9b59b6" },
    { icon: <FaCar />, title: "ტრანსპორტი", color: "#2ecc71" },
    { icon: <FaMapMarkerAlt />, title: "ადგილმდებარეობა", color: "#f39c12" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="planning-container">
      {/* Hero Banner */}
      <motion.div
        className="planning-banner"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="banner-overlay">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            დაგეგმეთ თქვენი სრულყოფილი ქორწილი
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            ჩვენ დაგეხმარებით თქვენი ოცნების დღის განხორციელებაში
          </motion.p>
        </div>
      </motion.div>

      {/* Categories Overlay */}
      <motion.div
        className="planning-categories-overlay"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {categories.map((category, index) => (
          <motion.div
            key={index}
            className="category-card"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="category-icon" style={{ backgroundColor: category.color }}>
              {category.icon}
            </div>
            <h3 className="category-title">{category.title}</h3>
          </motion.div>
        ))}
      </motion.div>

      {/* Booking Section */}
      <motion.div
        className="booking-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="booking-content">
          <h2>დაჯავშნეთ კონსულტაცია</h2>
          <p>გაგვიზიარეთ თქვენი დეტალები და ჩვენ დაგიკავშირდებით მალე.</p>

          {submitted ? (
            <motion.div
              className="success-message"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3>მადლობა!</h3>
              <p>თქვენი მოთხოვნა წარმატებით გაიგზავნა. ჩვენ თქვენთან მალე დაგიკავშირდებით.</p>
            </motion.div>
          ) : (
            <form className="booking-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <input
                  type="text"
                  name="name"
                  placeholder="სახელი"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="ელ. ფოსტა"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-row">
                <input
                  type="tel"
                  name="phone"
                  placeholder="ტელეფონი"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <textarea
                name="message"
                placeholder="მესიჯი / დეტალები"
                value={formData.message}
                onChange={handleChange}
                rows="4"
              ></textarea>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                გაგზავნა
              </motion.button>
            </form>
          )}
        </div>
      </motion.div>

      {/* Additional Info Section */}
      <motion.div
        className="info-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>რატომ ჩვენ?</h2>
        <div className="info-grid">
          <div className="info-item">
            <FaRing size={40} color="#e07b91" />
            <h3>გამოცდილება</h3>
            <p>15+ წელი გამოცდილება საქორწინო დაგეგმვაში</p>
          </div>
          <div className="info-item">
            <FaCamera size={40} color="#3498db" />
            <h3>პროფესიონალიზმი</h3>
            <p>მაღალი ხარისხის სერვისი და დეტალების ყურადღება</p>
          </div>
          <div className="info-item">
            <FaUtensils size={40} color="#e67e22" />
            <h3>ინდივიდუალური მიდგომა</h3>
            <p>თითოეული წყვილისთვის უნიკალური გადაწყვეტილებები</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}