"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext';
import { useRouter } from 'next/navigation';
import MathCheck from '../components/MathCheck';

// Define styles as JavaScript objects for inline styling
const styles = {
  loadingContainer: {
    minHeight: '100vh',
    backgroundColor: '#1a1a1a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
  },
  loadingContent: {
    textAlign: 'center'
  },
  loadingSpinner: {
    height: '3rem',
    width: '3rem',
    border: '4px solid #3b82f6',
    borderTopColor: 'transparent',
    borderRadius: '50%',
    margin: '0 auto 1rem',
    animation: 'spin 1s linear infinite'
  },
  unauthorizedContainer: {
    minHeight: '100vh',
    backgroundColor: '#1a1a1a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
  },
  unauthorizedContent: {
    textAlign: 'center'
  },
  loginButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    border: 'none',
    cursor: 'pointer',
    marginTop: '1rem'
  }
};

// Add keyframes for spinner animation
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
      <div style={styles.loadingContainer}>
        <div style={styles.loadingContent}>
          <div style={styles.loadingSpinner}></div>
          <p>Loading MathCheck Dashboard...</p>
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
    <div style={styles.unauthorizedContainer}>
      <div style={styles.unauthorizedContent}>
        <p>You need to be logged in to access this page.</p>
        <button 
          onClick={() => router.push('/')}
          style={styles.loginButton}
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}
