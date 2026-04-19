import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function HomeHeroSection() {
	const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section
      className="hero-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="hero-container">
        <motion.div className="hero-images" variants={itemVariants}>
          <motion.div
            className="main-image"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img src="https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=800&q=80" alt="ქალის კაბა" />
            <div className="years-experience">15+ წელი გამოცდილება</div>
          </motion.div>
          <motion.div
            className="small-image"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img src="https://tse1.mm.bing.net/th?id=OIF.v5zAim7d21X%2bqMmCcfMX0w&pid=Api&P=0&h=220" alt="საქორწინო დაგეგმილი" />
          </motion.div>
        </motion.div>

        <motion.div className="hero-content" variants={itemVariants}>
          <span className="premium">პრემიუმ მომსახურება</span>
          <h1>განახორციელეთ თქვენი <span className="highlight">საიიზო ოცნება</span></h1>
          <p>ჩვენ გთავაზობთ სრულ საქორწინო დაგეგმვას, ელეგანტურ დეკორს და დაუვიწყარ მომენტებს. თქვენი განსაკუთრებული დღე იმსახურებს სრულყოფილებას და სტილს.</p>
          
          <div className="features">
            <motion.div className="feature-box" whileHover={{ scale: 1.05 }}>
              <h3>საქორწინო დაგეგმვა</h3>
              <p>გეგმა თავიდან ბოლომდე კომპლექსურად.</p>
            </motion.div>
            <motion.div className="feature-box" whileHover={{ scale: 1.05 }}>
              <h3>დეკორი & სტილიზაცია</h3>
              <p>მშვენიერი დეკორი თქვენს თემაზე მორგებული.</p>
            </motion.div>
          </div>

          <motion.button
            className="cta-btn"
            onClick={() => navigate('/planning')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            შეკვეთის მიღება
          </motion.button>

          <div className="stats">
            <motion.div className="stat" variants={itemVariants}>
              <span className="number">500+</span>
              <span className="label">გეგმირებული საქორწინოები</span>
            </motion.div>
            <motion.div className="stat" variants={itemVariants}>
              <span className="number">100%</span>
              <span className="label">დაკმაყოფილებული წყვილები</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default HomeHeroSection;