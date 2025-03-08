"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const router = useRouter();

  // Check if user is already logged in
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('mathCheckAuth');
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simple validation
    if (!email || !password || (showRegister && !name)) {
      alert("Please fill in all fields");
      setIsLoading(false);
      return;
    }
    
    // Simulate login/register
    setTimeout(() => {
      if (showRegister) {
        localStorage.setItem('mathCheckUserName', name);
      }
      localStorage.setItem('mathCheckAuth', 'true');
      localStorage.setItem('mathCheckUserEmail', email);
      
      setIsLoading(false);
      router.push('/dashboard');
    }, 1000);
  };

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
