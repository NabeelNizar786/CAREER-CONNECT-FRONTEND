import React from 'react';
import logo from '../assets/R.png'

const NavBar = () => {

  const headingStyle = {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 'bold',
    fontSize: '25px',
    marginBottom: '1px',
  };

  return (
    <nav className="bg-blue-200 p-2">
      <div className="flex items-center">
        <div className="mr-3">
          <img src={logo} alt="Logo" className="h-16" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-black-500" style={headingStyle}>CAREER</h1>
          <h1 className="text-2xl font-bold text-black-500" style={headingStyle}>CONNECT.COM</h1>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;


