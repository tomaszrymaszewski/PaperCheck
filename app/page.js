"use client";

import { useState, useEffect } from 'react';
import { useAuth } from './components/AuthContext';
import Login from './components/Login';
import { useRouter } from 'next/navigation';

export default function Home() {
  // Initialize with a loading state
  const [isClient, setIsClient] = useState(false);
  
  // Access auth context
  const { user, loading, login } = useAuth();
  const router = useRouter();

  // Run once on component mount to confirm we're on the client
  useEffect(() => {
    setIsClient(true);
    
    // If already authenticated, redirect to dashboard
    if (user && isClient) {
      router.push('/dashboard');
    }
  }, [user, router, isClient]);

  // Handle login callback
  const handleLogin = (email, name) => {
    login(email, name);
  };

  // Don't render anything until we confirm we're on the client
  if (!isClient) {
    return null;
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-white">Loading MathCheck...</p>
        </div>
      </div>
    );
  }

  // Always render login screen on the homepage
  // The redirect to dashboard happens in useEffect if user is already logged in
  return <Login onLogin={handleLogin} />;
}
