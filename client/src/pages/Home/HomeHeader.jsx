import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function HomeHeader() {
	const navigate = useNavigate();

  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.5,
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      className='home-header'
      initial="hidden"
      animate="visible"
      variants={headerVariants}
    >
      <div className='home-header-container'>
        <motion.div
          className='home-header-cont'
          variants={headerVariants}
        >
    
          <h1>დაგეგმე შენი ოცნების ქორწილი ერთ სივრცეში</h1>
        </motion.div>
        <motion.h6 variants={headerVariants}>
          აირჩიე სასურველი თარიღი და 
          დაჯავშნე საუკეთესო სერვისები მარტივად, სახლიდან გაუსვლელად.
        </motion.h6>
        <motion.div variants={buttonVariants}>
          <button onClick={() => navigate('/planning')}>დაგეგმვის დაწყება</button>
          <button onClick={() => navigate('/dresses')}>კაბები</button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default HomeHeader;