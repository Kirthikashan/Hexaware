// Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; // Ensure this path is correct
import '../App.css';

const Layout = () => {
  return (
    <div className="layout-container">
      <Sidebar />
      <div className="main-content">
        <Outlet /> {/* This will render the matched route's component */}
      </div>
    </div>
  );
};

export default Layout;
