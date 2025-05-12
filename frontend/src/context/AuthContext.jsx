import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the auth context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('inventoryAppUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (userData) => {
    // In a real app, this would validate credentials with a backend
    // For this mockup, we'll simulate a successful login
    const user = {
      id: userData.email,
      name: userData.email.split('@')[0],
      email: userData.email,
      role: userData.email.includes('admin') ? 'admin' : 'user',
    };
    
    setUser(user);
    localStorage.setItem('inventoryAppUser', JSON.stringify(user));
    return user;
  };

  // Register function
  const register = (userData) => {
    // In a real app, this would send registration data to a backend
    // For this mockup, we'll simulate a successful registration
    const user = {
      id: userData.email,
      name: userData.name || userData.email.split('@')[0],
      email: userData.email,
      role: 'user',
    };
    
    setUser(user);
    localStorage.setItem('inventoryAppUser', JSON.stringify(user));
    return user;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('inventoryAppUser');
  };

  // Auth context value
  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
