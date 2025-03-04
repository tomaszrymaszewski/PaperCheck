'use client';

import { createContext, useContext, useState, useEffect } from 'react';

// Create auth context
const AuthContext = createContext();

// AuthProvider component to wrap the app
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('mathCheckUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error reading from localStorage:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      // In a real app, this would make an API request to validate credentials
      // For demo purposes, we'll just accept any email/password combination
      const userData = {
        id: Date.now().toString(),
        email,
        name: email.split('@')[0], // Use part of the email as the name
      };
      
      // Save to localStorage
      localStorage.setItem('mathCheckUser', JSON.stringify(userData));
      
      // Update state
      setUser(userData);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Authentication failed' };
    }
  };

  // Signup function
  const signup = async (email, password) => {
    try {
      // In a real app, this would make an API request to create a new user
      // For demo purposes, we'll just accept any email/password
      const userData = {
        id: Date.now().toString(),
        email,
        name: email.split('@')[0], // Use part of the email as the name
      };
      
      // Save to localStorage
      localStorage.setItem('mathCheckUser', JSON.stringify(userData));
      
      // Update state
      setUser(userData);
      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: 'Failed to create account' };
    }
  };

  // Logout function
  const logout = () => {
    try {
      // Remove from localStorage
      localStorage.removeItem('mathCheckUser');
      
      // Update state
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Context value
  const value = {
    user,
    loading,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
