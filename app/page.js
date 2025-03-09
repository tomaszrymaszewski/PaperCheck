"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Login from './components/Login';
import { useAuth } from './components/AuthContext';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If user is authenticated, redirect to dashboard
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  // If still loading or user is authenticated (and will be redirected), show loading
  if (loading || user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // If user is not authenticated, show login page
  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-blue-500">Math</span>Check
          </h1>
          <p className="text-gray-400">AI-powered mathematics paper analysis</p>
        </div>
        
        <Login />
      </div>
    </main>
  );
}
