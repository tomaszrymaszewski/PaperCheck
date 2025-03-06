"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth, signInWithGoogle, logoutUser } from '../firebase';

// Create Auth context
const AuthContext = createContext({
  user: null,
  loading: true,
  signIn: async () => {},
  logout: async () => {},
  isAuthenticated: false
});

// Auth provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser({
          uid: authUser.uid,
          email: authUser.email,
          displayName: authUser.displayName || 'User',
          photoURL: authUser.photoURL
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sign in handler
  const signIn = async () => {
    try {
      const result = await signInWithGoogle();
      if (result.success) {
        router.push('/dashboard');
      }
      return result;
    } catch (error) {
      console.error("Sign in error:", error);
      return { success: false, error };
    }
  };

  // Logout handler
  const logout = async () => {
    try {
      await logoutUser();
      router.push('/');
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      return { success: false, error };
    }
  };

  const value = {
    user,
    loading,
    signIn,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  return useContext(AuthContext);
}
