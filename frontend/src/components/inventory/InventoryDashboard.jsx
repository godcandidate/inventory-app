import React from 'react';
import { getStockStatus } from '../../data/mockData';

const InventoryDashboard = ({ inventory }) => {
  // Calculate inventory statistics
  const totalItems = inventory.length;
  const inStockItems = inventory.filter(item => getStockStatus(item.stock, item.threshold) === 'In Stock').length;
  const lowStockItems = inventory.filter(item => getStockStatus(item.stock, item.threshold) === 'Low Stock').length;
  const outOfStockItems = inventory.filter(item => getStockStatus(item.stock, item.threshold) === 'Out of Stock').length;
  
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900">Inventory Dashboard</h2>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your inventory status
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Products */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-800 mr-4">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Products</p>
              <p className="text-2xl font-semibold text-gray-900">{totalItems}</p>
            </div>
          </div>
        </div>
        
        {/* In Stock Items */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-800 mr-4">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">In Stock Items</p>
              <p className="text-2xl font-semibold text-gray-900">{inStockItems}</p>
            </div>
          </div>
        </div>
        
        {/* Out of Stock Items */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 text-red-800 mr-4">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Out of Stock</p>
              <p className="text-2xl font-semibold text-gray-900">{outOfStockItems}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Additional Information */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Inventory Status Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center mb-2">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-700">In Stock: {inStockItems} items ({Math.round((inStockItems / totalItems) * 100)}%)</span>
            </div>
            <div className="flex items-center mb-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-700">Low Stock: {lowStockItems} items ({Math.round((lowStockItems / totalItems) * 100)}%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-700">Out of Stock: {outOfStockItems} items ({Math.round((outOfStockItems / totalItems) * 100)}%)</span>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-medium">Total Products:</span> {totalItems}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-medium">Available Products:</span> {inStockItems + lowStockItems}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Need Attention:</span> {lowStockItems + outOfStockItems} items
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryDashboard;
