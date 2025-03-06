"use client";

import { createContext, useContext, useState, useEffect } from 'react';

// Helper functions for cookie management
const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const eraseCookie = (name) => {
  document.cookie = name + '=; Max-Age=-99999999; path=/';
};

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
      // Check cookies and localStorage for auth status
      const isAuthenticatedCookie = getCookie('mathCheckAuth') === 'true';
      const isAuthenticatedStorage = localStorage.getItem('mathCheckAuth') === 'true';
      const isAuthenticated = isAuthenticatedCookie || isAuthenticatedStorage;
      
      const userName = getCookie('mathCheckUserName') || localStorage.getItem('mathCheckUserName');
      const userEmail = getCookie('mathCheckUserEmail') || localStorage.getItem('mathCheckUserEmail') || 'user@example.com';
      
      if (isAuthenticated && userName) {
        setUser({ name: userName, email: userEmail });
      } else {
        setUser(null);
      }
    }
    
    setLoading(false);
  }, []);

  // Login function
  const login = (email, name) => {
    if (typeof window !== 'undefined') {
      // Set in both localStorage and cookies for middleware support
      localStorage.setItem('mathCheckAuth', 'true');
      localStorage.setItem('mathCheckUserEmail', email);
      setCookie('mathCheckAuth', 'true', 7); // 7 days
      setCookie('mathCheckUserEmail', email, 7);
      
      if (name) {
        localStorage.setItem('mathCheckUserName', name);
        setCookie('mathCheckUserName', name, 7);
      }
      
      setUser({ 
        name: name || getCookie('mathCheckUserName') || localStorage.getItem('mathCheckUserName') || 'User', 
        email 
      });
    }
  };

  // Logout function
  const logout = () => {
    if (typeof window !== 'undefined') {
      // Clear from both localStorage and cookies
      localStorage.removeItem('mathCheckAuth');
      eraseCookie('mathCheckAuth');
      
      // We don't remove the username so returning users still see their name
      // But we do need to set user state to null
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
