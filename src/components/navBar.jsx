import React from 'react';
import logo from '../assets/R.png';
import { FiHome, FiUser, FiLogOut, FiArrowLeft } from 'react-icons/fi'; // Import icons from react-icons library
import { useNavigate,useLocation } from 'react-router-dom';


const NavBar = ({ isAuthenticated, logOut }) => { // Receive isAuthenticated as a prop

  const Navigate = useNavigate()
  const Location = useLocation();

  const isHomePage = Location.pathname === '/user/home';

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
            {!isHomePage && (
          <button onClick={()=>Navigate(-1)}
          className="mr-8 hover:text-blue-600 cursor-pointer"
          >
            <FiArrowLeft size={35} />
          </button>
            )}
            <a onClick={() => Navigate('/user/home')} className="mr-8 hover:text-blue-600 cursor-pointer">
              <FiHome size={35} />
            </a>
            <a onClick={() => Navigate('/user/profile')} className="mr-8 hover:text-blue-600 cursor-pointer">
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

export default NavBar;


