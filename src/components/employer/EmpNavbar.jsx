import React from 'react';
import logo from '../../assets/R.png';
import { FiHome, FiUser, FiLogOut, FiArrowLeft,FiInbox } from 'react-icons/fi'; // Import icons from react-icons library
import { useNavigate,useLocation } from 'react-router-dom';


const EmpNavBar = ({ isAuthenticated, logOut }) => { // Receive isAuthenticated as a prop

  const Navigate = useNavigate()
  const Location = useLocation()

  const headingStyle = {
    color: 'black',
  };

  const isHomePage = Location.pathname === '/employer/empHome';

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
                onClick={() => Navigate(-1)}
                className="text-white hover:text-blue-200 focus:outline-none"
              >
                <FiArrowLeft size={24} />
              </button>
            )}
            <button
              onClick={() => Navigate('/employer/empHome')}
              className="text-white hover:text-blue-200 focus:outline-none"
            >
              <FiHome size={24} />
            </button>
            <button
              onClick={() => Navigate('/employer/empProfile')}
              className="text-white hover:text-blue-200 focus:outline-none"
            >
              <FiUser size={24} />
            </button>
            <button
              onClick={() => Navigate('/employer/message')}
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

export default EmpNavBar;