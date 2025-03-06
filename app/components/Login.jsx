"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  signInWithGoogle, 
  loginWithEmailPassword, 
  registerWithEmailPassword,
  auth
} from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Define styles as JavaScript objects for inline styling
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
  formGroup: {
    marginBottom: '1rem'
  },
  label: {
    display: 'block',
    fontSize: '0.875rem',
    color: '#9ca3af',
    marginBottom: '0.5rem'
  },
  input: {
    width: '100%',
    backgroundColor: '#2c3542',
    color: 'white',
    padding: '0.75rem',
    borderRadius: '0.375rem',
    border: 'none',
    outline: 'none'
  },
  button: {
    width: '100%',
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '0.75rem',
    borderRadius: '0.375rem',
    fontWeight: '600',
    cursor: 'pointer',
    border: 'none',
    marginBottom: '0.5rem'
  },
  buttonDisabled: {
    opacity: '0.7',
    cursor: 'not-allowed'
  },
  buttonContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  spinner: {
    marginRight: '0.75rem'
  },
  switchButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#9ca3af',
    cursor: 'pointer',
    marginTop: '1rem',
    textAlign: 'center',
    display: 'block',
    width: '100%'
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
  divider: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    margin: '1.5rem 0',
    color: '#9ca3af'
  },
  dividerLine: {
    flex: '1',
    height: '1px',
    backgroundColor: '#4b5563'
  },
  dividerText: {
    padding: '0 1rem'
  },
  footer: {
    marginTop: '3rem',
    textAlign: 'center',
    color: '#6b7280',
    fontSize: '0.875rem'
  }
};

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
    // Check if user is already authenticated
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/dashboard');
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, [router]);

  const handleEmailPasswordSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      if (!email || !password) {
        setError('Please enter both email and password.');
        setIsLoading(false);
        return;
      }

      let result;
      
      if (isRegister) {
        if (!name) {
          setError('Please enter your name.');
          setIsLoading(false);
          return;
        }
        
        // Register with email and password
        result = await registerWithEmailPassword(email, password);
        
        if (result.success) {
          // Save name for the user
          localStorage.setItem('mathCheckUserName', name);
        }
      } else {
        // Login with email and password
        result = await loginWithEmailPassword(email, password);
      }
      
      if (result.success) {
        // Call onLogin if provided
        if (onLogin) {
          onLogin(email, name || result.user.displayName);
        }
        
        // Navigate to dashboard
        router.push('/dashboard');
      } else {
        setError(result.error.message || 'Authentication failed. Please try again.');
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const result = await signInWithGoogle();
      
      if (result.success) {
        // Call onLogin if provided
        if (onLogin) {
          onLogin(result.user.email, result.user.displayName);
        }
        
        // Navigate to dashboard
        router.push('/dashboard');
      } else {
        setError(result.error.message || 'Google sign in failed. Please try again.');
      }
    } catch (err) {
      setError('Google sign in failed. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

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
          {isRegister ? 'Create Account' : 'Welcome Back'}
        </h1>
        
        {error && (
          <div style={styles.errorContainer}>
            {error}
          </div>
        )}
        
        {/* Google Sign In Button */}
        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          style={{
            ...styles.googleButton,
            ...(isLoading ? styles.buttonDisabled : {})
          }}
        >
          <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
          </svg>
          Sign in with Google
        </button>
        
        <div style={styles.divider}>
          <div style={styles.dividerLine}></div>
          <div style={styles.dividerText}>OR</div>
          <div style={styles.dividerLine}></div>
        </div>

        <form onSubmit={handleEmailPasswordSubmit}>
          {isRegister && (
            <div style={styles.formGroup}>
              <label htmlFor="name" style={styles.label}>
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={styles.input}
                placeholder="Enter your name"
                required={isRegister}
              />
            </div>
          )}
          
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder={isRegister ? "Create a password" : "Enter your password"}
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            style={{
              ...styles.button,
              ...(isLoading ? styles.buttonDisabled : {})
            }}
          >
            {isLoading ? (
              <span style={styles.buttonContent}>
                <svg style={styles.spinner} width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4" opacity="0.25" />
                  <path fill="none" stroke="currentColor" strokeWidth="4" opacity="0.75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {isRegister ? 'Creating Account...' : 'Logging In...'}
              </span>
            ) : (
              <>{isRegister ? 'Sign Up' : 'Log In'}</>
            )}
          </button>
        </form>
        
        <button 
          onClick={() => setIsRegister(!isRegister)}
          style={styles.switchButton}
        >
          {isRegister ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
        </button>
        
        <div style={styles.footer}>
          <p>MathCheck uses AI to analyze your mathematics papers and provide detailed feedback to improve your skills.</p>
        </div>
      </main>
    </div>
  );
}
