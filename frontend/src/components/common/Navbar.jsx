import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <svg className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 5H4V19H20V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 9H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M4 13H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M9 9V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M15 9V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span className="ml-2 text-xl font-bold text-gray-900">InventoryPro</span>
              </Link>
            </div>
            
            {user && (
              <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                <Link to="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100">User</Link>
                <Link to="/inventory-dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100">Inventory</Link>
                {user.role === 'admin' && (
                  <Link to="/inventory" className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100">Inventory Management</Link>
                )}
                <Link to="/sales" className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100">Sales</Link>
              </div>
            )}
          </div>
          
          <div className="flex items-center">
            {user ? (
              <div className="ml-3 relative flex items-center">
                <span className="text-sm text-gray-700 mr-4 hidden md:block">Welcome, {user.name}</span>
                <button 
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                >
                  Logout
                </button>
                <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                  <span className="font-medium">{user.name.charAt(0).toUpperCase()}</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100">Login</Link>
                <Link to="/register" className="px-3 py-2 rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
