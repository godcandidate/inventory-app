import React, { useState, useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import { products, sales, formatCurrency, formatDate } from '../../data/mockData';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesDashboard = () => {
  const [inventory, setInventory] = useState(products);
  const [allSales, setAllSales] = useState(sales);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [saleStatus, setSaleStatus] = useState(null);
  const [salesPeriod, setSalesPeriod] = useState('week'); // 'day', 'week', 'month'
  const [salesData, setSalesData] = useState(null);

  // Handle sales form submission
  const handleSale = (e) => {
    e.preventDefault();
    
    if (!selectedProduct) {
      setSaleStatus({ success: false, message: 'Please select a product' });
      return;
    }

    const product = inventory.find(p => p.id === parseInt(selectedProduct));
    
    if (!product) {
      setSaleStatus({ success: false, message: 'Product not found' });
      return;
    }

    if (product.stock < quantity) {
      setSaleStatus({ success: false, message: 'Not enough stock available' });
      return;
    }

    // Create new sale
    const newSale = {
      id: allSales.length + 1,
      productId: product.id,
      productName: product.name,
      quantity: quantity,
      total: product.price * quantity,
      timestamp: new Date().toISOString()
    };

    // Update inventory
    const updatedInventory = inventory.map(p => {
      if (p.id === product.id) {
        return { ...p, stock: p.stock - quantity };
      }
      return p;
    });

    // Update state
    setAllSales([newSale, ...allSales]);
    setInventory(updatedInventory);
    setSelectedProduct('');
    setQuantity(1);
    setSaleStatus({ success: true, message: 'Sale completed successfully!' });

    // Clear status message after 3 seconds
    setTimeout(() => {
      setSaleStatus(null);
    }, 3000);
  };

  // Calculate total sales
  const getTotalSales = () => {
    return allSales.reduce((total, sale) => total + sale.total, 0);
  };

  // Calculate total items sold
  const getTotalItemsSold = () => {
    return allSales.reduce((total, sale) => total + sale.quantity, 0);
  };

  // Calculate average sale value
  const getAverageSaleValue = () => {
    if (allSales.length === 0) return 0;
    return getTotalSales() / allSales.length;
  };

  // Prepare sales data for chart
  useEffect(() => {
    const prepareSalesData = () => {
      let labels = [];
      let data = [];
      let groupedSales = {};
      
      // Get current date
      const now = new Date();
      
      // Filter and group sales based on selected period
      if (salesPeriod === 'day') {
        // Last 24 hours, grouped by hour
        for (let i = 0; i < 24; i++) {
          const hour = now.getHours() - i;
          const label = `${hour < 0 ? hour + 24 : hour}:00`;
          labels.unshift(label);
          groupedSales[label] = 0;
        }
        
        allSales.forEach(sale => {
          const saleDate = new Date(sale.timestamp);
          const hourDiff = Math.floor((now - saleDate) / (1000 * 60 * 60));
          
          if (hourDiff < 24) {
            const hour = saleDate.getHours();
            const label = `${hour}:00`;
            groupedSales[label] = (groupedSales[label] || 0) + sale.total;
          }
        });
      } else if (salesPeriod === 'week') {
        // Last 7 days
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        for (let i = 6; i >= 0; i--) {
          const date = new Date(now);
          date.setDate(date.getDate() - i);
          const label = days[date.getDay()];
          labels.push(label);
          groupedSales[label] = 0;
        }
        
        allSales.forEach(sale => {
          const saleDate = new Date(sale.timestamp);
          const dayDiff = Math.floor((now - saleDate) / (1000 * 60 * 60 * 24));
          
          if (dayDiff < 7) {
            const day = days[saleDate.getDay()];
            groupedSales[day] = (groupedSales[day] || 0) + sale.total;
          }
        });
      } else if (salesPeriod === 'month') {
        // Last 30 days, grouped by week
        const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        labels = weeks;
        weeks.forEach(week => {
          groupedSales[week] = 0;
        });
        
        allSales.forEach(sale => {
          const saleDate = new Date(sale.timestamp);
          const dayDiff = Math.floor((now - saleDate) / (1000 * 60 * 60 * 24));
          
          if (dayDiff < 30) {
            const weekIndex = Math.floor(dayDiff / 7);
            if (weekIndex < 4) {
              const week = weeks[weekIndex];
              groupedSales[week] = (groupedSales[week] || 0) + sale.total;
            }
          }
        });
      }
      
      // Convert grouped data to array for chart
      data = labels.map(label => groupedSales[label] || 0);
      
      return {
        labels,
        datasets: [
          {
            label: 'Sales',
            data,
            backgroundColor: 'rgba(59, 130, 246, 0.5)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 1,
          },
        ],
      };
    };
    
    setSalesData(prepareSalesData());
  }, [allSales, salesPeriod]);

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Sales Overview - Last ${salesPeriod === 'day' ? '24 Hours' : salesPeriod === 'week' ? '7 Days' : '30 Days'}`,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Sales Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Make sales and track your sales performance
            </p>
          </div>
          
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
                <div className="p-3 rounded-full bg-purple-100 text-purple-800 mr-4">
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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2 md:mb-0">Sales Overview</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSalesPeriod('day')}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    salesPeriod === 'day'
                      ? 'bg-blue-100 text-blue-800'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Day
                </button>
                <button
                  onClick={() => setSalesPeriod('week')}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    salesPeriod === 'week'
                      ? 'bg-blue-100 text-blue-800'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Week
                </button>
                <button
                  onClick={() => setSalesPeriod('month')}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    salesPeriod === 'month'
                      ? 'bg-blue-100 text-blue-800'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Month
                </button>
              </div>
            </div>
            <div className="h-80">
              {salesData && <Bar options={chartOptions} data={salesData} />}
            </div>
          </div>
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Make a Sale Form */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Make a Sale</h2>
              </div>
              <div className="p-6">
                <form onSubmit={handleSale}>
                  {saleStatus && (
                    <div className={`mb-4 p-3 rounded-md ${saleStatus.success ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                      {saleStatus.message}
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-1">Select Product</label>
                    <select
                      id="product"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={selectedProduct}
                      onChange={(e) => setSelectedProduct(e.target.value)}
                    >
                      <option value="">Select a product</option>
                      {inventory.map(product => (
                        <option key={product.id} value={product.id} disabled={product.stock === 0}>
                          {product.name} ({product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                    <input
                      type="number"
                      id="quantity"
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                  >
                    Complete Sale
                  </button>
                </form>
              </div>
            </div>
            
            {/* Recent Sales */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Recent Sales</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {allSales.slice(0, 10).map((sale) => (
                      <tr key={sale.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{sale.productName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{sale.quantity}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatCurrency(sale.total)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{formatDate(sale.timestamp)}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;
