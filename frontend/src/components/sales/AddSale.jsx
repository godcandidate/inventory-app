import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../../data/mockData';

const AddSale = ({ 
  inventory, 
  selectedProduct, 
  setSelectedProduct, 
  quantity, 
  setQuantity, 
  handleSale 
}) => {
  const [selectedProductDetails, setSelectedProductDetails] = useState(null);
  const [total, setTotal] = useState(0);
  
  // Update selected product details when product changes
  useEffect(() => {
    if (selectedProduct) {
      const product = inventory.find(p => p.id === parseInt(selectedProduct));
      setSelectedProductDetails(product);
    } else {
      setSelectedProductDetails(null);
    }
  }, [selectedProduct, inventory]);
  
  // Calculate total when product or quantity changes
  useEffect(() => {
    if (selectedProductDetails) {
      setTotal(selectedProductDetails.price * quantity);
    } else {
      setTotal(0);
    }
  }, [selectedProductDetails, quantity]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <form onSubmit={handleSale} className="space-y-6">
        {/* Product Selection */}
        <div>
          <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-1">Select Product</label>
          <div className="relative">
            <select
              id="product"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="appearance-none block w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            >
              <option value="">Choose a product...</option>
              {inventory.map(product => (
                <option key={product.id} value={product.id} disabled={product.stock <= 0}>
                  {product.name} ({formatCurrency(product.price)}) - {product.stock} in stock
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Product Preview */}
        {selectedProductDetails && (
          <div className="flex items-center p-3 bg-blue-50 rounded-lg">
            <div className="flex-shrink-0 h-12 w-12 mr-3">
              <img className="h-12 w-12 rounded-md object-cover" src={selectedProductDetails.image} alt={selectedProductDetails.name} />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-blue-900">{selectedProductDetails.name}</h4>
              <p className="text-xs text-blue-700">{formatCurrency(selectedProductDetails.price)} per unit · {selectedProductDetails.stock} available</p>
            </div>
          </div>
        )}
        
        {/* Quantity Input */}
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
          <div className="flex rounded-md shadow-sm">
            <button 
              type="button"
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            <input
              type="number"
              id="quantity"
              min="1"
              max={selectedProductDetails ? selectedProductDetails.stock : 999}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="flex-1 block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-center"
              required
            />
            <button 
              type="button"
              onClick={() => selectedProductDetails && quantity < selectedProductDetails.stock && setQuantity(quantity + 1)}
              className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Total */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-base font-medium text-gray-700">Total Amount:</span>
            <span className="text-xl font-bold text-blue-600">{formatCurrency(total)}</span>
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={!selectedProduct || quantity < 1 || (selectedProductDetails && quantity > selectedProductDetails.stock)}
            className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Complete Sale
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSale;
