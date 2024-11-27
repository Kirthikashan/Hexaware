// src/components/layouts/LayoutWithoutSidebar.js
import React from 'react';
import { Outlet } from 'react-router-dom';

const LayoutWithoutSidebar = () => {
  return (
    <div className="layout-without-sidebar">
      {/* This Outlet will render the Home, Login, and Register pages */}
      <Outlet />
    </div>
  );
};

export default LayoutWithoutSidebar;
