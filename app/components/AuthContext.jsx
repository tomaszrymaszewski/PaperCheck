"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { auth, onAuthStateChanged } from '../firebase';
import { useRouter } from 'next/navigation';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || user.email?.split('@')[0],
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
        });
      } else {
        // User is signed out
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Redirect based on auth status
  useEffect(() => {
    if (!loading) {
      // If the path includes dashboard and the user is not authenticated
      if (window.location.pathname.includes('dashboard') && !user) {
        router.push('/');
      }
      // If the user is already authenticated and on the login page
      else if (user && window.location.pathname === '/') {
        router.push('/dashboard');
      }
    }
  }, [user, loading, router]);

  // Context value
  const value = {
    user,
    loading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};

export default AuthContext;
