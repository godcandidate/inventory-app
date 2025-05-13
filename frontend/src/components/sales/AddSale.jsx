import React from 'react';
import { formatCurrency } from '../../data/mockData';

const AddSale = ({ 
  inventory, 
  selectedProduct, 
  setSelectedProduct, 
  quantity, 
  setQuantity, 
  handleSale 
}) => {
  // Calculate sale total
  const calculateTotal = () => {
    if (!selectedProduct) return 0;
    const product = inventory.find(p => p.id === parseInt(selectedProduct));
    return product ? product.price * quantity : 0;
  };

  return (
    <div className="px-4 py-5 sm:p-6 bg-white shadow rounded-lg">
      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Add New Sale</h3>
      <form onSubmit={handleSale} className="space-y-6">
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="product" className="block text-sm font-medium text-gray-700">Product</label>
            <div className="mt-1">
              <select
                id="product"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                required
              >
                <option value="">Select a product</option>
                {inventory.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name} ({formatCurrency(product.price)}) - {product.stock} in stock
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="sm:col-span-3">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
            <div className="mt-1">
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          
          <div className="sm:col-span-6">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Total:</span>
              <span className="text-lg font-semibold text-gray-900">{formatCurrency(calculateTotal())}</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Complete Sale
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSale;
