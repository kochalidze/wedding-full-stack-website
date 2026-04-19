import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaGem, FaGift, FaCamera, FaBuilding, FaBirthdayCake } from 'react-icons/fa';

const servicesData = [
  {
    icon: <FaHeart size={40} color="#e07b91" />,
    title: "საქორწინო კაბები",
    description: "იპოვნე შენი ოცნების კაბა ჩვენი განსაკუთრებული კოლექციიდან."
  },
  {
    icon: <FaGem size={40} color="#f7c59f" />,
    title: "ბეჭდები და სამკაული",
    description: "აირჩიე სრულყოფილი ბეჭდები და სამკაული შენი განსაკუთრებული დღისათვის."
  },
  {
    icon: <FaGift size={40} color="#9b59b6" />,
    title: "დეკორაცია",
    description: "ლამაზი დეკორი, რომელიც თქვენს ქორწილს დაუვიწყარს შეუქმნის."
  },
  {
    icon: <FaBirthdayCake size={40} color="#f39c12" />,
    title: "ტორტები",
    description: "გემრიელი საქორწინო ტორტები სხვადასხვა სტილში და გემოთი."
  },
  {
    icon: <FaCamera size={40} color="#3498db" />,
    title: "ფოტოგრაფია",
    description: "პროფესიულ ფოტოგრაფებს ვიღებთ, რომ ყველა მომენტი დაიფიქსიროს."
  },
  {
    icon: <FaBuilding size={40} color="#27ae60" />,
    title: "ადგილები",
    description: "გამოიძია დახვეწილი ადგილები ცერემონიასა და მიღებისთვის."
  }
];

const Services = () => {
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
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="services-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="services-container">
        <motion.div className="services-header" variants={cardVariants}>
          <h2>ჩვენი სერვისები</h2>
          <p>
            გთავაზობთ ყველაფერს, რაც საჭიროა თქვენი საქორწინო დღის დასამახსოვრებლად.
          </p>
        </motion.div>

        <motion.div className="services-grid" variants={containerVariants}>
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              className="service-card"
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Services;