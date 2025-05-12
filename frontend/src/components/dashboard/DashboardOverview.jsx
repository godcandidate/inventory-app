import React from 'react';
import { CubeIcon, ShoppingCartIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import StatCard from './StatCard';
import { getTotalProducts, getTotalSales, getLowStockItems, formatCurrency } from '../../data/mockData';

const DashboardOverview = () => {
  const totalProducts = getTotalProducts();
  const totalSales = getTotalSales();
  const lowStockItems = getLowStockItems();
  
  return (
    <div className="mb-8">
      <h1 className="mb-6">Dashboard Overview</h1>
      
      {lowStockItems.length > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <ExclamationCircleIcon className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <span className="font-medium">Attention needed!</span> {lowStockItems.length} {lowStockItems.length === 1 ? 'product is' : 'products are'} below the stock threshold.
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Products" 
          value={totalProducts} 
          icon={<CubeIcon className="h-6 w-6" />} 
          color="blue" 
        />
        <StatCard 
          title="Total Sales" 
          value={formatCurrency(totalSales)} 
          icon={<ShoppingCartIcon className="h-6 w-6" />} 
          color="green" 
        />
        <StatCard 
          title="Low Stock Items" 
          value={lowStockItems.length} 
          icon={<ExclamationCircleIcon className="h-6 w-6" />} 
          color={lowStockItems.length > 0 ? "yellow" : "green"} 
        />
      </div>
    </div>
  );
};

export default DashboardOverview;
