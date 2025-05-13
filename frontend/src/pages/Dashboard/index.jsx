import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';

const Dashboard = () => {
  // Mock user data
  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', lastLogin: new Date() },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Sales', lastLogin: new Date(Date.now() - 86400000) },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Inventory', lastLogin: new Date(Date.now() - 172800000) },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'Sales', lastLogin: new Date(Date.now() - 259200000) },
    { id: 5, name: 'David Brown', email: 'david@example.com', role: 'Inventory', lastLogin: new Date(Date.now() - 345600000) },
    { id: 6, name: 'Emily Davis', email: 'emily@example.com', role: 'Admin', lastLogin: new Date(Date.now() - 432000000) },
    { id: 7, name: 'Robert Wilson', email: 'robert@example.com', role: 'Sales', lastLogin: new Date(Date.now() - 518400000) },
  ]);
  
  // Calculate user statistics
  const totalUsers = users.length;
  const salesUsers = users.filter(user => user.role === 'Sales').length;
  const inventoryUsers = users.filter(user => user.role === 'Inventory').length;
  const adminUsers = users.filter(user => user.role === 'Admin').length;

  return (
    <Layout
      title="User Dashboard"
      description="Overview of system users and roles"
    >
          

          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Total Users */}
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-800 mr-4">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Users</p>
                <p className="text-2xl font-semibold text-gray-900">{totalUsers}</p>
              </div>
            </div>
            
            {/* Sales Users */}
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-800 mr-4">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Sales Staff</p>
                <p className="text-2xl font-semibold text-gray-900">{salesUsers}</p>
              </div>
            </div>
            
            {/* Inventory Users */}
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
              <div className="p-3 rounded-full bg-indigo-100 text-indigo-800 mr-4">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Inventory Staff</p>
                <p className="text-2xl font-semibold text-gray-900">{inventoryUsers}</p>
              </div>
            </div>
          </div>
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 gap-6">
            {/* Role Distribution */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Role Distribution</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Admin Users */}
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-purple-900">Admin Users</p>
                        <p className="text-2xl font-semibold text-purple-700">{adminUsers}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-purple-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${(adminUsers / totalUsers) * 100}%` }}></div>
                      </div>
                      <p className="text-xs text-purple-700 mt-1">{Math.round((adminUsers / totalUsers) * 100)}% of total users</p>
                    </div>
                  </div>
                  
                  {/* Sales Users */}
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-green-900">Sales Users</p>
                        <p className="text-2xl font-semibold text-green-700">{salesUsers}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-green-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: `${(salesUsers / totalUsers) * 100}%` }}></div>
                      </div>
                      <p className="text-xs text-green-700 mt-1">{Math.round((salesUsers / totalUsers) * 100)}% of total users</p>
                    </div>
                  </div>
                  
                  {/* Inventory Users */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-blue-900">Inventory Users</p>
                        <p className="text-2xl font-semibold text-blue-700">{inventoryUsers}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-blue-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(inventoryUsers / totalUsers) * 100}%` }}></div>
                      </div>
                      <p className="text-xs text-blue-700 mt-1">{Math.round((inventoryUsers / totalUsers) * 100)}% of total users</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </Layout>
  );
};

export default Dashboard;
