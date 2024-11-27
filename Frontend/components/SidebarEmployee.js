import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../pages/employeeDashboard.module.css'; // Import the CSS module

const SidebarEmployee = () => {
  return (
    <div className={styles.sidebar}>
      <ul className={styles.sidebarMenu}>
        <li className={styles.sidebarItem}>
          <NavLink
            exact
            to="/"
            className={({ isActive }) => isActive ? styles.activeLink : styles.sidebarLink} 
          >
            Home
          </NavLink>
        </li>
        <li className={styles.sidebarItem}>
          <NavLink
            to="/employee/learning-plan"
            className={({ isActive }) => isActive ? styles.activeLink : styles.sidebarLink}
          >
            Learning Plan
          </NavLink>
        </li>
        <li className={styles.sidebarItem}>
          <NavLink
            to="/employee/employee-dashboard"
            className={({ isActive }) => isActive ? styles.activeLink : styles.sidebarLink}
          >
            Employee Dashboard
          </NavLink>
        </li>
        <li className={styles.sidebarItem}>
          <NavLink
            to="/contact"
            className={({ isActive }) => isActive ? styles.activeLink : styles.sidebarLink}
          >
            Contact
          </NavLink>
        </li>
        <li className={styles.sidebarItem}>
          <NavLink
            to="/profile"
            className={({ isActive }) => isActive ? styles.activeLink : styles.sidebarLink}
          >
            Profile
          </NavLink>
        </li>
        <li className={styles.sidebarItem}>
          <NavLink
            to="/chatbot"
            className={({ isActive }) => isActive ? styles.activeLink : styles.sidebarLink}
          >
            Chatbot
          </NavLink>
        </li>
        <li className={styles.sidebarItem}>
          <NavLink
            to="/question-bank"
            className={({ isActive }) => isActive ? styles.activeLink : styles.sidebarLink}
          >
            Question Bank
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SidebarEmployee;
