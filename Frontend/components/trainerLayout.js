import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; // Ensure this path is correct
import '../App.css';

const TrainerLayout = () => {
  return (
    <div className="trainer-layout-container">
      <Sidebar />
      <div className="trainer-main-content">
        <Outlet /> {/* This will render the matched route's component */}
      </div>
    </div>
  );
};

export default TrainerLayout;
