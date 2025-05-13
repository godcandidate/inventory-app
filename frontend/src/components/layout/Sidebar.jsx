import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  HomeIcon, 
  CubeIcon, 
  ShoppingCartIcon, 
  ExclamationCircleIcon, 
  ChartBarIcon,
  ListBulletIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedMenus, setExpandedMenus] = useState({
    inventory: true,
    sales: true
  });
  
  useEffect(() => {
    // Initialize expanded menus state
  }, [location.pathname]);
  
  // Direct navigation functions
  const navigateTo = (path) => {
    navigate(path);
  };
  
  const toggleMenu = (menu) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };
  
  const isActive = (path) => {
    if (path === '/inventory') {
      return location.pathname === '/inventory' && location.pathname !== '/inventory/management';
    } else if (path === '/inventory/management') {
      return location.pathname === '/inventory/management';
    } else {
      return location.pathname === path;
    }
  };
  
  return (
    <div className="h-screen w-64 bg-white shadow-md fixed left-0 top-0 pt-16 overflow-y-auto">
      <div className="p-4">
        <ul className="space-y-2">
          {/* Dashboard Overview */}
          <li>
            <Link 
              to="/dashboard" 
              className={`flex items-center p-2 ${isActive('/dashboard') ? 'text-blue-600 font-medium bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'} rounded-md transition-colors duration-200`}
            >
              <HomeIcon className="h-5 w-5 mr-3" />
              Dashboard Overview
            </Link>
          </li>
          
          {/* Inventory Section */}
          <li className="space-y-1">
            <div 
              className="flex items-center justify-between p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md cursor-pointer transition-colors duration-200"
              onClick={() => toggleMenu('inventory')}
            >
              <div className="flex items-center">
                <CubeIcon className="h-5 w-5 mr-3" />
                <span>Inventory</span>
              </div>
              <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${expandedMenus.inventory ? 'rotate-180' : ''}`} />
            </div>
            
            {expandedMenus.inventory && (
              <ul className="pl-10 space-y-1">
                <li>
                  <button 
                    onClick={() => navigateTo('/inventory')}
                    className={`flex items-center p-2 w-full text-left ${isActive('/inventory') ? 'text-blue-600 font-medium bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'} rounded-md transition-colors duration-200`}
                  >
                    <ChartBarIcon className="h-4 w-4 mr-2" />
                    Inventory Dashboard
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigateTo('/inventory/management')}
                    className={`flex items-center p-2 w-full text-left ${isActive('/inventory/management') ? 'text-blue-600 font-medium bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'} rounded-md transition-colors duration-200`}
                  >
                    <ListBulletIcon className="h-4 w-4 mr-2" />
                    Products Management
                  </button>
                </li>
              </ul>
            )}
          </li>
          
          {/* Sales Section */}
          <li className="space-y-1">
            <div 
              className="flex items-center justify-between p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md cursor-pointer transition-colors duration-200"
              onClick={() => toggleMenu('sales')}
            >
              <div className="flex items-center">
                <ShoppingCartIcon className="h-5 w-5 mr-3" />
                <span>Sales</span>
              </div>
              <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${expandedMenus.sales ? 'rotate-180' : ''}`} />
            </div>
            
            {expandedMenus.sales && (
              <ul className="pl-10 space-y-1">
                <li>
                  <Link 
                    to="/sales" 
                    className={`flex items-center p-2 ${isActive('/sales') && !isActive('/sales/history') && !isActive('/sales/add') ? 'text-blue-600 font-medium bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'} rounded-md transition-colors duration-200`}
                  >
                    <ChartBarIcon className="h-4 w-4 mr-2" />
                    Sales Dashboard
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/sales/management" 
                    className={`flex items-center p-2 ${isActive('/sales/management') ? 'text-blue-600 font-medium bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'} rounded-md transition-colors duration-200`}
                  >
                    <ListBulletIcon className="h-4 w-4 mr-2" />
                    Sales Management
                  </Link>
                </li>
              </ul>
            )}
          </li>
          
          {/* Alerts */}
          <li>
            <Link 
              to="/alerts" 
              className={`flex items-center p-2 ${isActive('/alerts') ? 'text-blue-600 font-medium bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'} rounded-md transition-colors duration-200`}
            >
              <ExclamationCircleIcon className="h-5 w-5 mr-3" />
              Alerts
            </Link>
          </li>
          
          {/* Reports */}
          <li>
            <Link 
              to="/reports" 
              className={`flex items-center p-2 ${isActive('/reports') ? 'text-blue-600 font-medium bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'} rounded-md transition-colors duration-200`}
            >
              <ChartBarIcon className="h-5 w-5 mr-3" />
              Reports
            </Link>
          </li>
        </ul>
      </div>
      <div className="absolute bottom-0 w-full p-4 border-t">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
            <span className="font-medium">SM</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">Store Manager</p>
            <p className="text-xs text-gray-500">admin@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
