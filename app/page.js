"use client";

import { useState, useEffect } from 'react';
import { useAuth } from './components/AuthContext';
import Login from './components/Login';
import { useRouter } from 'next/navigation';

// Define styles for loading state
const loadingStyles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#1a1a1a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    textAlign: 'center'
  },
  spinner: {
    height: '3rem',
    width: '3rem',
    border: '4px solid #3b82f6',
    borderTopColor: 'transparent',
    borderRadius: '50%',
    margin: '0 auto 1rem',
    animation: 'spin 1s linear infinite'
  },
  text: {
    color: 'white'
  }
};

// Add keyframes for spinner animation in client-side only
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}

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
      <div style={loadingStyles.container}>
        <div style={loadingStyles.content}>
          <div style={loadingStyles.spinner}></div>
          <p style={loadingStyles.text}>Loading MathCheck...</p>
        </div>
      </div>
    );
  }

  // Always render login screen on the homepage
  // The redirect to dashboard happens in useEffect if user is already logged in
  return <Login onLogin={handleLogin} />;
}
