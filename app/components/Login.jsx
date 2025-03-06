"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, just check if email and password are not empty
      if (email && password) {
        if (isRegister) {
          // Store user in localStorage for demo purposes
          localStorage.setItem('mathCheckUserName', name);
        }
        
        // Call the onLogin function passed from parent
        if (onLogin) {
          onLogin(email, name);
        }
        
        // Important: Store auth status
        localStorage.setItem('mathCheckAuth', 'true');
        localStorage.setItem('mathCheckUserEmail', email);
        
        // Redirect to the main application
        router.push('/dashboard');
      } else {
        setError('Please enter valid credentials');
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
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

        <form onSubmit={handleSubmit}>
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
