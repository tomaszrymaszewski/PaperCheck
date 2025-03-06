"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './components/AuthContext';

// Keep your existing styles from the original file...
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#1a1a1a',
    color: 'white',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    marginBottom: '2rem'
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  logoText: {
    fontSize: '1.5rem',
    fontWeight: 'bold'
  },
  logoMath: {
    color: '#3b82f6' // blue-500
  },
  logoPro: {
    marginLeft: '0.5rem',
    fontSize: '0.75rem',
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.25rem'
  },
  main: {
    maxWidth: '28rem',
    margin: '0 auto',
    width: '100%'
  },
  title: {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
    textAlign: 'center'
  },
  errorContainer: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgb(239, 68, 68)',
    color: 'rgb(239, 68, 68)',
    padding: '1rem',
    borderRadius: '0.375rem',
    marginBottom: '1.5rem'
  },
  googleButton: {
    width: '100%',
    backgroundColor: '#ffffff',
    color: '#2c3542',
    padding: '0.75rem',
    borderRadius: '0.375rem',
    fontWeight: '600',
    cursor: 'pointer',
    border: 'none',
    marginBottom: '1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px'
  },
  buttonDisabled: {
    opacity: '0.7',
    cursor: 'not-allowed'
  },
  footer: {
    marginTop: '3rem',
    textAlign: 'center',
    color: '#6b7280',
    fontSize: '0.875rem'
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
  },
  loadingSpinner: {
    border: '4px solid rgba(0, 0, 0, 0.1)',
    borderLeft: '4px solid #3b82f6',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite',
    marginBottom: '1rem',
  }
};

export default function Login() {
  const { user, loading, signIn } = useAuth();
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard if already logged in
    if (user && !loading) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      await signIn();
      // Redirect will happen automatically in the AuthContext
    } catch (err) {
      console.error('Sign in error:', err);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logoContainer}>
          <div style={{...styles.logoText, ...styles.logoMath}}>Math</div>
          <div style={styles.logoText}>Check</div>
          <div style={styles.logoPro}>PRO</div>
        </div>
      </header>

      <main style={styles.main}>
        <h1 style={styles.title}>
          Welcome to MathCheck
        </h1>
        
        {error && (
          <div style={styles.errorContainer}>
            {error}
          </div>
        )}
        
        <button
          onClick={handleGoogleSignIn}
          style={styles.googleButton}
        >
          <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
          </svg>
          Sign in with Google
        </button>
        
        <div style={styles.footer}>
          <p>MathCheck uses AI to analyze your mathematics papers and provide detailed feedback to improve your skills.</p>
        </div>
      </main>
    </div>
  );
}
