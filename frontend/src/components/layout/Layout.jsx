import React from 'react';
import Navbar from '../common/Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children, title, description }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar />
      <main className="md:ml-64 pt-24 min-h-screen transition-all duration-300">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          {/* Page Header */}
          {(title || description) && (
            <div className="mb-8">
              {title && <h1 className="text-2xl font-bold text-gray-900">{title}</h1>}
              {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
            </div>
          )}
          
          {/* Page Content */}
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
