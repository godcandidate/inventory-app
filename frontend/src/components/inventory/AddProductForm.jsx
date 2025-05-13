import React from 'react';

const AddProductForm = ({ formData, handleInputChange, addProduct }) => {
  return (
    <div className="px-4 py-5 sm:p-6 bg-white shadow rounded-lg">
      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Add New Product</h3>
      <form onSubmit={addProduct} className="space-y-6">
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
            <div className="mt-1">
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          
          <div className="sm:col-span-3">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)</label>
            <div className="mt-1">
              <input
                type="number"
                name="price"
                id="price"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleInputChange}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          
          <div className="sm:col-span-3">
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock Quantity</label>
            <div className="mt-1">
              <input
                type="number"
                name="stock"
                id="stock"
                min="0"
                value={formData.stock}
                onChange={handleInputChange}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          
          <div className="sm:col-span-3">
            <label htmlFor="threshold" className="block text-sm font-medium text-gray-700">Low Stock Threshold</label>
            <div className="mt-1">
              <input
                type="number"
                name="threshold"
                id="threshold"
                min="0"
                value={formData.threshold}
                onChange={handleInputChange}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          
          <div className="sm:col-span-6">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
            <div className="mt-1">
              <input
                type="text"
                name="image"
                id="image"
                value={formData.image}
                onChange={handleInputChange}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
