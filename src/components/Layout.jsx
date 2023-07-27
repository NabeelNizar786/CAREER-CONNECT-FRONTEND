// src/components/AdminLayout.js
import React from 'react';
import Sidebar from './sideBar';
import NavBar from './navBar';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar/>
      <div className="w-full">
        <NavBar/>
        <div className="bg-white p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
