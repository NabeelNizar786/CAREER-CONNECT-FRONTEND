import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="bg-gray-800 w-64 min-h-screen p-4">
      <div className="text-white font-bold text-2xl mb-8">MENU</div>
      <ul className="space-y-2">
        <li
          className={`text-white py-2 mb-6 rounded cursor-pointer ${
            window.location.pathname === '/AdminHome' ? 'bg-blue-500' : ''
          }`}
        >
          <Link to="/AdminHome" className="text-white hover:text-gray-400">
            <span className="mr-2 text-2xl">📊</span> DASHBOARD
          </Link>
        </li>
        <li
          className={`text-white py-2 mb-6 rounded cursor-pointer ${
            window.location.pathname === '/usersList' ? 'bg-blue-500' : ''
          }`}
        >
          <Link to="/usersList" className="text-white hover:text-gray-400">
            <span className="mr-2 text-2xl">👥</span> USERS
          </Link>
        </li>
        <li className="flex items-center mb-4">
          <Link to="/CompanyList" className="text-white hover:text-gray-400">
            <span className="mr-2 text-2xl">🏢</span> COMPANIES
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
