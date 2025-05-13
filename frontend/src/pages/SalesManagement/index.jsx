import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { products, sales, formatCurrency, formatDate } from '../../data/mockData';
import SalesHistory from '../../components/sales/SalesHistory';
import AddSale from '../../components/sales/AddSale';

const SalesManagement = () => {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState(products);
  const [allSales, setAllSales] = useState(sales);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [saleStatus, setSaleStatus] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const navigateToDashboard = () => {
    navigate('/sales');
  };

  // Filter sales based on search term
  const filteredSales = allSales.filter(sale =>
    sale.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.id.toString().includes(searchTerm.toLowerCase())
  );

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
    setIsAddModalOpen(false);
    
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

  return (
    <Layout
      title="Sales Management"
      description="View and manage your sales history"
    >
      {/* Navigation link back to dashboard */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={navigateToDashboard}
          className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>
      </div>

      {/* Search and Add Sale */}
      <div className="flex justify-between mb-6">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search sales..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Sale
        </button>
      </div>

      {/* Sales History */}
      <SalesHistory sales={filteredSales} />

      {/* Status Message */}
      {saleStatus && (
        <div className={`fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg ${
          saleStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {saleStatus.message}
        </div>
      )}

      {/* Add Sale Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Sale</h2>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <AddSale 
              inventory={inventory}
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
              quantity={quantity}
              setQuantity={setQuantity}
              handleSale={handleSale}
            />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default SalesManagement;
