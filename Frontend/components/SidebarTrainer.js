import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../pages/trainerDashboard.module.css'; // Import CSS module

const SidebarTrainer = () => {
  return (
    <div className={styles.sidebar}>
      <ul>
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => (isActive ? styles['active-link'] : '')}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/trainer/trainer-dashboard" 
            className={({ isActive }) => (isActive ? styles['active-link'] : '')}
          >
            Trainer Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/trainer/history" 
            className={({ isActive }) => (isActive ? styles['active-link'] : '')}
          >
            History
          </NavLink>
        </li>
        
        <li>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => (isActive ? styles['active-link'] : '')}
          >
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/profile" 
            className={({ isActive }) => (isActive ? styles['active-link'] : '')}
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/questionbank" 
            className={({ isActive }) => (isActive ? styles['active-link'] : '')}
          >
            Question Bank
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SidebarTrainer;
