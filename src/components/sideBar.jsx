import React from 'react';
import { HiLogout } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import { toast } from 'react-hot-toast';

function Sidebar() {

  const Navigate = useNavigate()
  const dispatch = useDispatch()

  const logOut = () => {
    dispatch(showLoading());
    localStorage.removeItem('adminJwt');
    setTimeout(() => {
      dispatch(hideLoading());
      Navigate('/admin/adminLogin');
      toast.success('LOGOUT SUCCESSFULLY')
    }, 1000); // Change the delay time as per your preference
  };

  return (
    <div className="bg-gray-800 w-64 min-h-screen p-4">
      <div className="text-white font-bold text-2xl mb-8">MENU</div>
      <ul className="space-y-2">
        <li
          className={`text-white py-2 mb-6 rounded cursor-pointer ${
            window.location.pathname === '/AdminHome' ? 'bg-blue-500' : ''
          }`}
        >
          <Link to="/admin/adminHome" className="text-white hover:text-gray-400">
            <span className="mr-2 text-2xl">📊</span> DASHBOARD
          </Link>
        </li>
        <li
          className={`text-white py-2 mb-6 rounded cursor-pointer ${
            window.location.pathname === '/usersList' ? 'bg-blue-500' : ''
          }`}
        >
          <Link to="/admin/usersList" className="text-white hover:text-gray-400">
            <span className="mr-2 text-2xl">👥</span> USERS
          </Link>
        </li>
        <li className="flex items-center mb-4">
          <Link to="/admin/empList" className="text-white hover:text-gray-400">
            <span className="mr-2 text-2xl">🏢</span> COMPANIES
          </Link>
        </li>
        <li className="flex items-center mb-4">
          <Link to="/admin/approvalReq" className="text-white hover:text-gray-400">
            <span className="mr-2 text-2xl">🏢</span> REQUESTS
          </Link>
        </li>
        <li className="flex items-center mb-4">
          <Link to="/admin/cityList" className="text-white hover:text-gray-400">
            <span className="mr-2 text-2xl">🏢</span> CITIES
          </Link>
        </li>
        <li className="flex items-center mb-4">
          <Link to="/admin/skillsList" className="text-white hover:text-gray-400">
            <span className="mr-2 text-2xl">🏢</span> SKILLS
          </Link>
        </li>
        <li className="flex items-center mb-4">
          <button onClick={logOut} className="text-white hover:text-gray-400">
            <span className="mr-2 text-2xl">{<HiLogout/>}</span> LOGOUT
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
