import React from 'react';
import { 
  HomeIcon, 
  CubeIcon, 
  ShoppingCartIcon, 
  ExclamationCircleIcon, 
  ChartBarIcon 
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-white shadow-md fixed left-0 top-0 pt-16">
      <div className="p-4">
        <ul className="space-y-2">
          <li>
            <a href="#" className="flex items-center p-2 text-primary font-medium rounded-md bg-blue-50">
              <HomeIcon className="h-5 w-5 mr-3" />
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-2 text-gray-600 hover:text-primary hover:bg-blue-50 rounded-md transition-colors duration-200">
              <CubeIcon className="h-5 w-5 mr-3" />
              Inventory
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-2 text-gray-600 hover:text-primary hover:bg-blue-50 rounded-md transition-colors duration-200">
              <ShoppingCartIcon className="h-5 w-5 mr-3" />
              Sales
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-2 text-gray-600 hover:text-primary hover:bg-blue-50 rounded-md transition-colors duration-200">
              <ExclamationCircleIcon className="h-5 w-5 mr-3" />
              Alerts
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-2 text-gray-600 hover:text-primary hover:bg-blue-50 rounded-md transition-colors duration-200">
              <ChartBarIcon className="h-5 w-5 mr-3" />
              Reports
            </a>
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
            <p className="text-xs text-gray-500">Main Branch</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
