// components/EmployeeLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; // Ensure this path is correct
import '../App.css'; // Include general styles or override them if needed

const EmployeeLayout = () => {
  return (
    <div className="employee-layout-container">
      <Sidebar />
      <div className="employee-main-content">
        <Outlet /> {/* This will render the matched route's component */}
      </div>
    </div>
  );
};

export default EmployeeLayout;
