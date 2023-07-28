import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import { toast } from 'react-hot-toast';

function EmployerHome() {

  const Navigate = useNavigate()
  const dispatch = useDispatch()

  const logOut = () => {
    dispatch(showLoading());
    localStorage.removeItem('empJwt');
    setTimeout(() => {
      dispatch(hideLoading());
      Navigate('/employer/empLogin');
      toast.success('LOGOUT SUCCESSFULLY')
    }, 1000); // Change the delay time as per your preference
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 min-h-screen">
      <nav className="bg-white p-4">
        <div className="container mx-auto">
          <ul className="flex items-center justify-between">
            <li>
              <a href="#" className="text-purple-500 text-lg font-bold">
                Your Logo
              </a>
            </li>
            <li>
              {/* Add more menu items as needed */}
              <a href="#" className="text-gray-700 mx-4">
                Home
              </a>
              <a href="#" className="text-gray-700 mx-4">
                About
              </a>
              <a href="#" className="text-gray-700 mx-4">
                Contact
              </a>
            </li>
            <button onClick={logOut} className="text-gray-700 mx-4">
                Logout
              </button>
          </ul>
        </div>
      </nav>
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-white mb-4">Welcome to Employer Home</h1>
        <p className="text-lg text-white">
          Your beautiful content goes here...
        </p>
      </div>
    </div>
  );
}

export default EmployerHome;
