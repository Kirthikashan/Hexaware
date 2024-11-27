import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import styles from './Home.module.css'; // Import CSS module


const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGetStarted = () => {
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div className={styles['home-container']}>
      {/* Main content */}
      <div className={styles['main-content']}>
        <header className={styles['hero-section']}>
          <h1 className={styles['hero-title']}>
            Welcome to <b>ASKIFY</b>
          </h1>
          <p className={styles['hero-description']}>
            Create and generate questions effortlessly with our intuitive platform. 
            Explore various features and get started today!
          </p>
          <button className={styles['get-started-btn']} onClick={handleGetStarted}>
            Get Started
          </button>
        </header>
        
        <footer className={styles['footer']}>
          <p>&copy; {new Date().getFullYear()} Automated Question Generator. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
