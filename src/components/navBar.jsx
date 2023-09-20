import React from 'react';
import logo from '../assets/R.png';
import { FiHome, FiUser, FiLogOut, FiArrowLeft, FiInbox } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';

const NavBar = ({ isAuthenticated, logOut }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === '/user/home';

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg py-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-3">
            <img src={logo} alt="Logo" className="h-12" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">CAREER</h1>
            <h1 className="text-2xl font-bold text-white">CONNECT.COM</h1>
          </div>
        </div>
        {isAuthenticated && (
          <div className="ml-auto flex items-center space-x-4">
            {!isHomePage && (
              <button
                onClick={() => navigate(-1)}
                className="text-white hover:text-blue-200 focus:outline-none"
              >
                <FiArrowLeft size={24} />
              </button>
            )}
            <button
              onClick={() => navigate('/user/home')}
              className="text-white hover:text-blue-200 focus:outline-none"
            >
              <FiHome size={24} />
            </button>
            <button
              onClick={() => navigate('/user/profile')}
              className="text-white hover:text-blue-200 focus:outline-none"
            >
              <FiUser size={24} />
            </button>
            <button
              onClick={() => navigate('/user/userChat')}
              className="text-white hover:text-blue-200 focus:outline-none"
            >
              <FiInbox size={24} />
            </button>
            <button
              onClick={logOut}
              className="text-white hover:text-blue-200 focus:outline-none"
            >
              <FiLogOut size={24} />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
