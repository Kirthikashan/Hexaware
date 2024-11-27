import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../pages/adminDashboard.module.css';

const SidebarAdmin = () => {
  return (
    <div className={styles.sidebar}>
      <ul>
        <li>
          <NavLink
            exact
            to="/"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/administrator-dashboard"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Administrator Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/report"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Feedback Analysis
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/admin/curriculum-mapping" 
            className={({ isActive }) => (isActive ? styles.active : '')} // Ensure this is correct
          >
            Curriculum Mapping
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
        {/* Add the new Report button here */}
        
      </ul>
    </div>
  );
};

export default SidebarAdmin;
