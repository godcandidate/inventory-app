import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'

// Page Components
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import UserManagement from './pages/UserManagement'
import InventoryManagement from './pages/InventoryManagement'
import InventoryDashboard from './pages/InventoryDashboard'
import ProductManagement from './pages/ProductManagement'
import SalesDashboard from './pages/SalesDashboard'
import SalesManagement from './pages/SalesManagement'

// Auth Context
import { AuthProvider, useAuth } from './context/AuthContext'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Admin Route Component
const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // Allow all authenticated users to access inventory routes
  return children;
};

function App() {
  console.log('App component rendering');
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/user-management" element={
              <AdminRoute>
                <UserManagement />
              </AdminRoute>
            } />
            <Route path="/inventory-dashboard" element={
              <AdminRoute>
                <InventoryDashboard />
              </AdminRoute>
            } />
            <Route path="/inventory/management" element={
              <AdminRoute>
                <InventoryManagement />
              </AdminRoute>
            } />
            <Route path="/sales" element={
              <ProtectedRoute>
                <SalesDashboard />
              </ProtectedRoute>
            } />
            <Route path="/sales/management" element={
              <ProtectedRoute>
                <SalesManagement />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App
