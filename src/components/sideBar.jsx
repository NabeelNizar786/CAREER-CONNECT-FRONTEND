import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import { toast } from 'react-hot-toast';
import { FaChartBar, FaUserFriends, FaBuilding, FaClipboardList, FaCity, FaTools, FaMoneyBillAlt, FaSignOutAlt } from 'react-icons/fa';

function Sidebar() {
  const location = useLocation();
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(showLoading());
    localStorage.removeItem('adminJwt');
    setTimeout(() => {
      dispatch(hideLoading());
      Navigate('/admin/adminLogin');
      toast.success('LOGOUT SUCCESSFULLY');
    }, 1000); // Change the delay time as per your preference
  };

  return (
    <div className="bg-gray-800 w-64 min-h-screen p-4">
      <div className="text-white font-bold text-2xl mb-8">MENU</div>
      <ul>
        <li className={`text-white flex items-center py-2 mb-6 rounded cursor-pointer ${location.pathname === '/admin/adminHome' ? 'bg-blue-500 px-1' : ''}`}>
          <Link to="/admin/adminHome" className="text-white hover:text-gray-400 flex items-center">
            <span className="mr-2 text-2xl"><FaChartBar /></span> DASHBOARD
          </Link>
        </li>
        <li className={`text-white flex items-center py-2 mb-6 rounded cursor-pointer ${location.pathname === '/admin/usersList' ? 'bg-blue-500 px-1' : ''}`}>
          <Link to="/admin/usersList" className="text-white hover:text-gray-400 flex items-center">
            <span className="mr-2 text-2xl"><FaUserFriends /></span> USERS
          </Link>
        </li>
        <li className={`text-white flex items-center py-2 mb-6 rounded cursor-pointer ${location.pathname === '/admin/empList' ? 'bg-blue-500 px-1' : ''}`}>
          <Link to="/admin/empList" className="text-white hover:text-gray-400 flex items-center">
            <span className="mr-2 text-2xl"><FaBuilding /></span> COMPANIES
          </Link>
        </li>
        <li className={`text-white flex items-center py-2 mb-6 rounded cursor-pointer ${location.pathname === '/admin/approvalReq' ? 'bg-blue-500 px-1' : ''}`}>
          <Link to="/admin/approvalReq" className="text-white hover:text-gray-400 flex items-center">
            <span className="mr-2 text-2xl"><FaClipboardList /></span> REQUESTS
          </Link>
        </li>
        <li className={`text-white flex items-center py-2 mb-6 rounded cursor-pointer ${location.pathname === '/admin/cityList' ? 'bg-blue-500 px-1' : ''}`}>
          <Link to="/admin/cityList" className="text-white hover:text-gray-400 flex items-center">
            <span className="mr-2 text-2xl"><FaCity /></span> CITIES
          </Link>
        </li>
        <li className={`text-white flex items-center py-2 mb-6 rounded cursor-pointer ${location.pathname === '/admin/skillsList' ? 'bg-blue-500 px-1' : ''}`}>
          <Link to="/admin/skillsList" className="text-white hover:text-gray-400 flex items-center">
            <span className="mr-2 text-2xl"><FaTools /></span> SKILLS
          </Link>
        </li>
        <li className={`text-white flex items-center py-2 mb-6 rounded cursor-pointer ${location.pathname === '/admin/subscriptionsList' ? 'bg-blue-500 px-1' : ''}`}>
          <Link to="/admin/subscriptionsList" className="text-white hover:text-gray-400 flex items-center">
            <span className="mr-2 text-2xl"><FaMoneyBillAlt /></span> SUBSCRIPTIONS
          </Link>
        </li>
        <li className="flex items-center mb-4">
          <button onClick={logOut} className="text-white hover:text-gray-400 flex items-center">
            <span className="mr-2 text-2xl"><FaSignOutAlt /></span> LOGOUT
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
