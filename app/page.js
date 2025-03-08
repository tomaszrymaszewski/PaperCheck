"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  loginWithEmailAndPassword, 
  registerWithEmailAndPassword, 
  loginWithGoogle
} from './firebase';
import { useAuth } from './components/AuthContext';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const router = useRouter();
  const { user, loading } = useAuth();

  // Check if user is already logged in
  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simple validation
    if (!email || !password || (showRegister && !name)) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }
    
    try {
      if (showRegister) {
        // Register new user
        const userCredential = await registerWithEmailAndPassword(email, password);
        // We could update the user profile with the name here if needed
        // await updateProfile(userCredential.user, { displayName: name });
      } else {
        // Login existing user
        await loginWithEmailAndPassword(email, password);
      }
      // Successful auth will trigger the useEffect redirect
    } catch (error) {
      console.error("Authentication error:", error);
      setError(error.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError('');
    try {
      await loginWithGoogle();
      // Successful auth will trigger the useEffect redirect
    } catch (error) {
      console.error("Google authentication error:", error);
      setError(error.message || 'Google authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  // If still loading authentication state, show loading spinner
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#121212',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{
          border: '4px solid #1a1a1a',
          borderRadius: '50%',
          borderTop: '4px solid #3b82f6',
          width: '40px',
          height: '40px',
          animation: 'spin 1s linear infinite'
        }}></div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // If user is authenticated, this will redirect before rendering
  if (user) return null;

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#121212',
      color: 'white',
      fontFamily: 'sans-serif'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#1a1a1a',
        borderBottom: '1px solid #333',
        padding: '0 1rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '4rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{
              color: '#3b82f6',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>Math</span>
            <span style={{
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>Check</span>
            <span style={{
              marginLeft: '0.5rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontSize: '0.75rem',
              fontWeight: 'bold'
            }}>BETA</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1rem'
      }}>
        {/* Login/Register form */}
        <div style={{
          maxWidth: '400px',
          margin: '0 auto',
          backgroundColor: '#1e2530',
          padding: '2rem',
          borderRadius: '0.5rem'
        }}>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            {showRegister ? 'Create Account' : 'Welcome Back'}
          </h1>

          {/* Error message */}
          {error && (
            <div style={{
              backgroundColor: 'rgba(220, 38, 38, 0.2)',
              borderColor: 'rgb(220, 38, 38)',
              color: 'rgb(252, 165, 165)',
              padding: '0.75rem',
              borderRadius: '0.375rem',
              marginBottom: '1rem'
            }}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            {showRegister && (
              <div style={{ marginBottom: '1rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#9ca3af'
                }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: '#2c3542',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.375rem',
                    outline: 'none'
                  }}
                />
              </div>
            )}
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#9ca3af'
              }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#2c3542',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  outline: 'none'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#9ca3af'
              }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={showRegister ? "Create a password" : "Enter your password"}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#2c3542',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  outline: 'none'
                }}
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                fontWeight: 'bold',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.7 : 1
              }}
            >
              {isLoading ? (
                'Loading...'
              ) : (
                showRegister ? 'Sign Up' : 'Log In'
              )}
            </button>
          </form>

          {/* Google login button */}
          <div style={{ marginTop: '1rem' }}>
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: 'transparent',
                color: 'white',
                border: '1px solid #6b7280',
                borderRadius: '0.375rem',
                fontWeight: 'bold',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.7 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg style={{ marginRight: '0.5rem', width: '20px', height: '20px' }} viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                />
              </svg>
              Sign in with Google
            </button>
          </div>
          
          <div style={{
            marginTop: '1rem',
            textAlign: 'center'
          }}>
            <button
              onClick={() => setShowRegister(!showRegister)}
              style={{
                background: 'none',
                border: 'none',
                color: '#9ca3af',
                cursor: 'pointer'
              }}
            >
              {showRegister ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
        
        <p style={{
          textAlign: 'center',
          color: '#6b7280',
          marginTop: '2rem'
        }}>
          MathCheck uses AI to analyze your mathematics papers and provide detailed feedback to improve your skills.
        </p>
      </main>
    </div>
  );
}
