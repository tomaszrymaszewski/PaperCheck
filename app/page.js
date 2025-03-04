'use client';

import { useEffect, useState } from 'react';
import MathCheck from './components/MathCheck';
import Login from './components/Login';
import { useAuth } from './components/AuthContext';

export default function Home() {
  const { user, loading } = useAuth();
  const [showContent, setShowContent] = useState(false);

  // Add a slight delay to prevent flash of login screen when user is already logged in
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  if (!showContent || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#121212] flex items-center justify-center">
        <div className="animate-pulse flex items-center text-blue-500">
          <span className="text-2xl font-bold">Math</span>
          <span className="text-2xl font-bold text-white">Check</span>
          <span className="ml-2 px-2 py-1 text-xs bg-blue-500 text-white rounded-md">PRO</span>
        </div>
      </div>
    );
  }

  return (
    <main>
      {user ? (
        <MathCheck />
      ) : (
        <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#121212] flex items-center justify-center p-4">
          <Login />
        </div>
      )}
    </main>
  );
}
