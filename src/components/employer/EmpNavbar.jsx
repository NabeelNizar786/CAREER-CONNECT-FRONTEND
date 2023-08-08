import React from 'react';
import logo from '../../assets/R.png';
import { FiHome, FiUser, FiLogOut } from 'react-icons/fi'; // Import icons from react-icons library
import { useNavigate } from 'react-router-dom';


const EmpNavBar = ({ isAuthenticated, logOut }) => { // Receive isAuthenticated as a prop

  const Navigate = useNavigate()
  const headingStyle = {
    color: 'black',
  };

  return (
    <nav className="bg-blue-200 p-2">
      <div className="flex items-center">
        <div className="mr-3">
          <img src={logo} alt="Logo" className="h-16" />
        </div>
        <div>
          <h1 className="text-2xl font-bold" style={headingStyle}>CAREER</h1>
          <h1 className="text-2xl font-bold" style={headingStyle}>CONNECT.COM</h1>
        </div>
        {isAuthenticated && ( // Only render the icons if the user is authenticated
          <div className="ml-auto flex items-center">
            <a onClick={() => Navigate('/employer/empHome')} className="mr-8 hover:text-blue-600 cursor-pointer">
              <FiHome size={35} />
            </a>
            <a onClick={() => Navigate('/employer/empProfile')} className="mr-8 hover:text-blue-600 cursor-pointer">
              <FiUser size={35} />
            </a>
            <a onClick={logOut} className='hover:text-blue-600 cursor-pointer' >
              <FiLogOut size={35} />
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default EmpNavBar;