import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { products, sales, formatCurrency, formatDate } from '../../data/mockData';
import SalesHistory from '../../components/sales/SalesHistory';
import AddSale from '../../components/sales/AddSale';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [inventory, setInventory] = useState(products);
  const [allSales, setAllSales] = useState(sales);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [saleStatus, setSaleStatus] = useState(null);
  const [salesPeriod, setSalesPeriod] = useState('week'); // 'day', 'week', 'month'
  const [salesData, setSalesData] = useState(null);
  
  // Set active tab based on URL path
  useEffect(() => {
    if (location.pathname === '/sales/history') {
      setActiveTab('history');
    } else if (location.pathname === '/sales/add') {
      setActiveTab('add');
    } else {
      setActiveTab('dashboard');
    }
  }, [location.pathname]);
  
  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'history') {
      navigate('/sales/history');
    } else if (tab === 'add') {
      navigate('/sales/add');
    } else {
      navigate('/sales');
    }
  };

  // Handle sales form submission
  const handleSale = (e) => {
    e.preventDefault();
    
    if (!selectedProduct) {
      setSaleStatus({
        type: 'error',
        message: 'Please select a product'
      });
      return;
    }
    
    const product = inventory.find(p => p.id === parseInt(selectedProduct));
    
    if (!product) {
      setSaleStatus({
        type: 'error',
        message: 'Product not found'
      });
      return;
    }
    
    if (product.stock < quantity) {
      setSaleStatus({
        type: 'error',
        message: `Not enough stock. Only ${product.stock} available.`
      });
      return;
    }
    
    // Create new sale
    const newSale = {
      id: allSales.length + 1,
      date: new Date(),
      product: product,
      quantity: quantity,
      total: product.price * quantity
    };
    
    // Update inventory
    const updatedInventory = inventory.map(p => {
      if (p.id === product.id) {
        return {
          ...p,
          stock: p.stock - quantity
        };
      }
      return p;
    });
    
    // Update state
    setAllSales([newSale, ...allSales]);
    setInventory(updatedInventory);
    setSelectedProduct('');
    setQuantity(1);
    
    // Show success message
    setSaleStatus({
      type: 'success',
      message: `Sale completed: ${quantity} x ${product.name}`
    });
    
    // Clear status after 3 seconds
    setTimeout(() => {
      setSaleStatus(null);
    }, 3000);
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

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Sales Overview (${salesPeriod === 'day' ? 'Last 24 Hours' : salesPeriod === 'week' ? 'Last 7 Days' : 'Last 30 Days'})`,
      },
    },
  };

  // Render the Sales Dashboard content
  const renderDashboard = () => (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Sales */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-800 mr-4">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Sales</p>
              <p className="text-2xl font-semibold text-gray-900">{formatCurrency(getTotalSales())}</p>
            </div>
          </div>
        </div>
            
        {/* Items Sold */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-800 mr-4">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Items Sold</p>
              <p className="text-2xl font-semibold text-gray-900">{getTotalItemsSold()}</p>
            </div>
          </div>
        </div>
            
        {/* Average Sale */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-800 mr-4">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Average Sale</p>
              <p className="text-2xl font-semibold text-gray-900">{formatCurrency(getAverageSaleValue())}</p>
            </div>
          </div>
        </div>
      </div>
          
      {/* Sales Chart */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900">Sales Overview</h2>
          <div className="mt-3 md:mt-0 flex space-x-3">
            <button 
              onClick={() => setSalesPeriod('day')} 
              className={`px-3 py-1 text-sm font-medium rounded-md ${salesPeriod === 'day' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              Day
            </button>
            <button 
              onClick={() => setSalesPeriod('week')} 
              className={`px-3 py-1 text-sm font-medium rounded-md ${salesPeriod === 'week' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              Week
            </button>
            <button 
              onClick={() => setSalesPeriod('month')} 
              className={`px-3 py-1 text-sm font-medium rounded-md ${salesPeriod === 'month' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              Month
            </button>
          </div>
        </div>
        <div className="h-80">
          {salesData && <Bar data={salesData} options={chartOptions} />}
        </div>
      </div>
          
      {/* Recent Sales */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Sales</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allSales.slice(0, 5).map((sale) => (
                <tr key={sale.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src={sale.product.image} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{sale.product.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(sale.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {sale.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(sale.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  return (
    <Layout
      title="Sales Management"
      description="Monitor sales performance and manage sales"
    >
      {/* Status message */}
      {saleStatus && (
        <div className={`mb-4 p-4 rounded-md ${saleStatus.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {saleStatus.message}
        </div>
      )}
      
      {/* Tab Navigation */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex -mb-px">
          <button
            onClick={() => handleTabChange('dashboard')}
            className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'dashboard' 
              ? 'border-blue-500 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Sales Dashboard
          </button>
          <button
            onClick={() => handleTabChange('history')}
            className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'history' 
              ? 'border-blue-500 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Sales History
          </button>
          <button
            onClick={() => handleTabChange('add')}
            className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'add' 
              ? 'border-blue-500 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Add Sale
          </button>
        </div>
      </div>
      
      {/* Conditional Content Based on Active Tab */}
      {activeTab === 'dashboard' && renderDashboard()}
      
      {activeTab === 'history' && (
        <SalesHistory sales={allSales} />
      )}
      
      {activeTab === 'add' && (
        <AddSale 
          inventory={inventory}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          quantity={quantity}
          setQuantity={setQuantity}
          handleSale={handleSale}
        />
      )}
    </Layout>
  );
};

export default SalesDashboard;
