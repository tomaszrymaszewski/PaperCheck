'use client';

import { useState, useEffect } from 'react';
import MathCheck from './components/MathCheck';
import Login from './components/Login';
import { useAuth } from './components/AuthContext';

export default function Home() {
  const { user, loading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg">
        <div className="text-center">
          <div className="inline-block animate-pulse">
            <div className="text-2xl font-bold">Math<span className="text-blue-primary">Check</span></div>
            <p className="mt-4 text-gray-400">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main>
      {user ? <MathCheck /> : <Login />}
    </main>
  );
}
