"use client";

import { createContext, useContext, useState, useEffect } from 'react';

// Create the auth context
const AuthContext = createContext();

// Export the provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for authentication status on mount
  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
      // Check localStorage for auth status
      const isAuthenticated = localStorage.getItem('mathCheckAuth') === 'true';
      const userName = localStorage.getItem('mathCheckUserName');
      
      if (isAuthenticated && userName) {
        setUser({ name: userName, email: localStorage.getItem('mathCheckUserEmail') || 'user@example.com' });
      } else {
        setUser(null);
      }
    }
    
    setLoading(false);
  }, []);

  // Login function
  const login = (email, name) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mathCheckAuth', 'true');
      localStorage.setItem('mathCheckUserEmail', email);
      if (name) localStorage.setItem('mathCheckUserName', name);
      
      setUser({ 
        name: name || localStorage.getItem('mathCheckUserName') || 'User', 
        email 
      });
    }
  };

  // Logout function
  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mathCheckAuth');
      // We don't remove the username so returning users still see their name
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
