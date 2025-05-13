import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { products, sales, getStockStatus, getStatusColor, getTotalProducts, getTotalSales, getLowStockItems, formatCurrency, formatDate } from '../../data/mockData';

const Dashboard = () => {
  const [inventory] = useState(products);
  const [recentSales] = useState(sales);
  
  const totalProducts = getTotalProducts();
  const totalSalesAmount = getTotalSales();
  const lowStockItems = getLowStockItems();

  return (
    <Layout
      title="Dashboard Overview"
      description="Welcome to your inventory management dashboard"
    >
          
          {/* Alert Banner */}
          {lowStockItems.length > 0 && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <span className="font-medium">Attention needed!</span> {lowStockItems.length} {lowStockItems.length === 1 ? 'product is' : 'products are'} below the stock threshold.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Total Products */}
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-800 mr-4">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Products</p>
                <p className="text-2xl font-semibold text-gray-900">{totalProducts}</p>
              </div>
            </div>
            
            {/* Total Sales */}
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-800 mr-4">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Sales</p>
                <p className="text-2xl font-semibold text-gray-900">{formatCurrency(totalSalesAmount)}</p>
              </div>
            </div>
            
            {/* Low Stock Items */}
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
              <div className={`p-3 rounded-full ${lowStockItems.length > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'} mr-4`}>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Low Stock Items</p>
                <p className="text-2xl font-semibold text-gray-900">{lowStockItems.length}</p>
              </div>
            </div>
          </div>
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Inventory Overview */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">Inventory Overview</h2>
                  <Link 
                    to="/inventory" 
                    className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                  >
                    View All
                  </Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {inventory.slice(0, 5).map((product) => {
                        const status = getStockStatus(product);
                        const statusColor = getStatusColor(status);
                        
                        return (
                          <tr key={product.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img className="h-10 w-10 rounded-full" src={product.image} alt={product.name} />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{formatCurrency(product.price)}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{product.stock}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor} py-1`}>
                                {status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              {/* Low Stock Alerts */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800">Low Stock Alerts</h2>
                </div>
                <div className="p-6">
                  {lowStockItems.length === 0 ? (
                    <p className="text-sm text-gray-500">No low stock items at the moment.</p>
                  ) : (
                    <ul className="divide-y divide-gray-200">
                      {lowStockItems.map(item => (
                        <li key={item.id} className="py-3 flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={item.image} alt={item.name} />
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-500">Current stock: {item.stock} (Threshold: {item.threshold})</p>
                          </div>
                          <div>
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.stock === 0 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'} py-1`}>
                              {item.stock === 0 ? 'Out of Stock' : 'Low Stock'}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              
              {/* Recent Sales */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">Recent Sales</h2>
                  <Link 
                    to="/sales" 
                    className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                  >
                    View All
                  </Link>
                </div>
                <div className="p-6">
                  <ul className="divide-y divide-gray-200">
                    {recentSales.slice(0, 5).map(sale => (
                      <li key={sale.id} className="py-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{sale.productName}</p>
                            <p className="text-sm text-gray-500">Qty: {sale.quantity} · {formatCurrency(sale.total)}</p>
                          </div>
                          <div className="text-sm text-gray-500">{formatDate(sale.timestamp)}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800">Quick Actions</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Link 
                      to="/sales" 
                      className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200 text-center"
                    >
                      Make a Sale
                    </Link>
                    <Link 
                      to="/inventory" 
                      className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors duration-200 text-center"
                    >
                      Add Product
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </Layout>
  );
};

export default Dashboard;
