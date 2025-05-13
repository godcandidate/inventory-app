import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { products, sales } from '../../data/mockData';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesDashboard = () => {
  const navigate = useNavigate();
  const [allSales] = useState(sales);
  const [salesPeriod, setSalesPeriod] = useState('week'); // 'day', 'week', 'month'
  const [salesData, setSalesData] = useState(null);
  
  // Navigate to sales management
  const navigateToSalesManagement = () => {
    navigate('/sales/management');
  };

  // Get total sales amount
  const getTotalSales = () => {
    return allSales.reduce((total, sale) => total + sale.total, 0);
  };

  // Get total items sold
  const getTotalItemsSold = () => {
    return allSales.reduce((total, sale) => total + sale.quantity, 0);
  };

  // Get average sale value
  const getAverageSaleValue = () => {
    if (allSales.length === 0) return 0;
    return getTotalSales() / allSales.length;
  };

  // Generate chart data based on sales period
  useEffect(() => {
    const generateChartData = () => {
      let labels = [];
      let data = [];
      const now = new Date();
      
      if (salesPeriod === 'day') {
        // Last 24 hours, hourly
        for (let i = 23; i >= 0; i--) {
          const hour = new Date(now);
          hour.setHours(now.getHours() - i);
          labels.push(hour.getHours() + ':00');
          
          const hourSales = allSales.filter(sale => {
            const saleDate = new Date(sale.date);
            return saleDate.getHours() === hour.getHours() && 
                   saleDate.getDate() === hour.getDate() &&
                   saleDate.getMonth() === hour.getMonth() &&
                   saleDate.getFullYear() === hour.getFullYear();
          });
          
          data.push(hourSales.reduce((total, sale) => total + sale.total, 0));
        }
      } else if (salesPeriod === 'week') {
        // Last 7 days, daily
        for (let i = 6; i >= 0; i--) {
          const day = new Date(now);
          day.setDate(now.getDate() - i);
          labels.push(day.toLocaleDateString('en-US', { weekday: 'short' }));
          
          const daySales = allSales.filter(sale => {
            const saleDate = new Date(sale.date);
            return saleDate.getDate() === day.getDate() &&
                   saleDate.getMonth() === day.getMonth() &&
                   saleDate.getFullYear() === day.getFullYear();
          });
          
          data.push(daySales.reduce((total, sale) => total + sale.total, 0));
        }
      } else if (salesPeriod === 'month') {
        // Last 30 days, weekly
        for (let i = 3; i >= 0; i--) {
          const weekStart = new Date(now);
          weekStart.setDate(now.getDate() - (i * 7) - 6);
          const weekEnd = new Date(now);
          weekEnd.setDate(now.getDate() - (i * 7));
          
          labels.push(`${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`);
          
          const weekSales = allSales.filter(sale => {
            const saleDate = new Date(sale.date);
            return saleDate >= weekStart && saleDate <= weekEnd;
          });
          
          data.push(weekSales.reduce((total, sale) => total + sale.total, 0));
        }
      }
      
      return {
        labels,
        datasets: [
          {
            label: 'Sales',
            data,
            backgroundColor: 'rgba(59, 130, 246, 0.5)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 1
          }
        ]
      };
    };
    
    setSalesData(generateChartData());
  }, [salesPeriod, allSales]);

  return (
    <Layout
      title='Sales Dashboard'
      description='Overview of your sales performance'
    >
      {/* Navigation to Sales Management */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={navigateToSalesManagement}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Sales Management
        </button>
      </div>

      {/* Dashboard Content */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Sales Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-800 mr-4">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Sales</p>
                <p className="text-2xl font-semibold text-gray-900">${getTotalSales().toFixed(2)}</p>
              </div>
            </div>
          </div>
          
          {/* Items Sold Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-800 mr-4">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Items Sold</p>
                <p className="text-2xl font-semibold text-gray-900">{getTotalItemsSold()}</p>
              </div>
            </div>
          </div>
          
          {/* Average Sale Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-800 mr-4">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Average Sale</p>
                <p className="text-2xl font-semibold text-gray-900">${getAverageSaleValue().toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sales Chart */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">Sales Trend</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setSalesPeriod('day')}
              className={`px-3 py-1 text-sm rounded-md ${
                salesPeriod === 'day'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setSalesPeriod('week')}
              className={`px-3 py-1 text-sm rounded-md ${
                salesPeriod === 'week'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setSalesPeriod('month')}
              className={`px-3 py-1 text-sm rounded-md ${
                salesPeriod === 'month'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Month
            </button>
          </div>
        </div>
        
        <div className="h-80">
          {salesData && <Bar data={salesData} options={{ maintainAspectRatio: false }} />}
        </div>
      </div>
      
      {/* Top Products */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Top Products</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Units Sold
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products
                .map(product => {
                  const productSales = allSales.filter(sale => sale.product.id === product.id);
                  const unitsSold = productSales.reduce((total, sale) => total + sale.quantity, 0);
                  const revenue = productSales.reduce((total, sale) => total + sale.total, 0);
                  return { product, unitsSold, revenue };
                })
                .filter(item => item.unitsSold > 0)
                .sort((a, b) => b.revenue - a.revenue)
                .slice(0, 5)
                .map(({ product, unitsSold, revenue }) => (
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {unitsSold}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${revenue.toFixed(2)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default SalesDashboard;
