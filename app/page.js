"use client";

import { useState, useEffect } from 'react';
import { useAuth } from './components/AuthContext';
import Login from './components/Login';
import MathCheck from './components/MathCheck';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Home() {
  // Initialize with a loading state
  const [isClient, setIsClient] = useState(false);
  
  // Access auth context and router
  const { user, loading, login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Run once on component mount to confirm we're on the client
  useEffect(() => {
    setIsClient(true);
    
    // Check if we need to redirect after login
    const redirectPath = searchParams.get('from');
    if (user && redirectPath && redirectPath !== '/') {
      router.push(redirectPath);
    }
  }, [user, router, searchParams]);

  // Handle login callback
  const handleLogin = (email, name) => {
    login(email, name);
  };

  // Don't render anything until we confirm we're on the client
  // This prevents hydration errors
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

  // Render login screen if not authenticated
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  // Render main application if authenticated
  return <MathCheck />;
}
