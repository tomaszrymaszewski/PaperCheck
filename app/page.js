"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext';
import { useRouter } from 'next/navigation';
import MathCheck from '../components/MathCheck';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // If not authenticated, redirect to login
    if (!loading && !user && isClient) {
      router.push('/');
    }
  }, [user, loading, router, isClient]);

  // Don't render until we confirm we're on client
  if (!isClient) {
    return null;
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-white">Loading MathCheck Dashboard...</p>
        </div>
      </div>
    );
  }

  // Render MathCheck if authenticated
  if (user) {
    return <MathCheck />;
  }

  // This should never show because of the redirect, but just in case
  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
      <div className="text-center text-white">
        <p className="mb-4">You need to be logged in to access this page.</p>
        <button 
          onClick={() => router.push('/')}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}
