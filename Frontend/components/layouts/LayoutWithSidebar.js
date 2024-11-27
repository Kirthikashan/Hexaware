import React from 'react';

import { Outlet } from 'react-router-dom';

const LayoutWithSidebar = () => {
  return (
    <div className="layout-with-sidebar">
      
      <div className="main-content">
        <Outlet /> {/* This renders the child route components */}
      </div>
    </div>
  );
};

export default LayoutWithSidebar;
