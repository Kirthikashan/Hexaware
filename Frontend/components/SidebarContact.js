import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../pages/Contact.module.css'; // Importing the CSS module

const SidebarContact = () => {
  return (
    <div className={styles.sidebar}>
      <ul className={styles.sidebarList}>
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/profile" 
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Profile
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SidebarContact;
