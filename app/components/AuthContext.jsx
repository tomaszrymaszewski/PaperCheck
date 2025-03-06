'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { auth, signInWithGoogle, loginWithEmailPassword, registerWithEmailPassword, logoutUser } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component that wraps your app and provides the auth context value
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Set up auth state observer
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // User is signed in
        setUser({
          uid: authUser.uid,
          email: authUser.email,
          displayName: authUser.displayName || localStorage.getItem('mathCheckUserName') || 'User',
          photoURL: authUser.photoURL,
        });
      } else {
        // User is signed out
        setUser(null);
      }
      setLoading(false);
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, []);

  // Sign in with Google
  const signInWithGoogleAuth = async () => {
    setLoading(true);
    try {
      const result = await signInWithGoogle();
      if (result.success) {
        return { success: true, user: result.user };
      }
      return { success: false, error: result.error };
    } finally {
      setLoading(false);
    }
  };

  // Sign in with email/password
  const login = async (email, password) => {
    setLoading(true);
    try {
      const result = await loginWithEmailPassword(email, password);
      if (result.success) {
        return { success: true, user: result.user };
      }
      return { success: false, error: result.error };
    } finally {
      setLoading(false);
    }
  };

  // Register with email/password
  const register = async (email, password, name) => {
    setLoading(true);
    try {
      const result = await registerWithEmailPassword(email, password);
      if (result.success) {
        // Store user name for later use
        localStorage.setItem('mathCheckUserName', name);
        return { success: true, user: result.user };
      }
      return { success: false, error: result.error };
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const logout = async () => {
    setLoading(true);
    try {
      await logoutUser();
      router.push('/');
      return { success: true };
    } catch (error) {
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  // Context value
  const value = {
    user,
    loading,
    signInWithGoogle: signInWithGoogleAuth,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
