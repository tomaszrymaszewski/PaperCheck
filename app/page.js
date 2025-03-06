"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Basic inline styles
const styles = {
  container: {
    minHeight: '100vh',
    background: '#121212',
    color: 'white',
    fontFamily: 'sans-serif'
  },
  header: {
    background: '#1c1c1c',
    borderBottom: '1px solid #333',
    padding: '0 1rem'
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '4rem'
  },
  logo: {
    display: 'flex',
    alignItems: 'center'
  },
  logoText: {
    fontSize: '1.5rem',
    fontWeight: 'bold'
  },
  logoMath: {
    color: '#3b82f6'
  },
  logoCheck: {
    color: 'white'
  },
  logoBadge: {
    marginLeft: '0.5rem',
    padding: '0.25rem 0.5rem',
    background: '#3b82f6',
    color: 'white',
    borderRadius: '0.25rem',
    fontSize: '0.75rem'
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1rem'
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem'
  },
  subtitle: {
    color: '#9ca3af',
    marginBottom: '2rem'
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50
  },
  modalContent: {
    background: '#2c3542',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    maxWidth: '28rem',
    width: '100%',
    margin: '0 1rem'
  },
  modalTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '1rem'
  },
  modalText: {
    color: '#d1d5db',
    marginBottom: '1rem'
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    background: '#1e2530',
    color: 'white',
    border: 'none',
    borderRadius: '0.375rem',
    marginBottom: '1rem',
    boxSizing: 'border-box'
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    background: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '0.375rem',
    fontWeight: '600',
    cursor: 'pointer'
  },
  disabledButton: {
    opacity: 0.7,
    cursor: 'not-allowed'
  },
  tutorialModal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50
  },
  tutorialContent: {
    position: 'relative',
    background: '#2c3542',
    borderRadius: '0.5rem',
    maxWidth: '32rem',
    width: '100%',
    padding: '1.5rem'
  },
  closeButton: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    color: '#9ca3af',
    cursor: 'pointer',
    background: 'none',
    border: 'none'
  },
  tutorialHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  tutorialTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold'
  },
  tutorialStep: {
    color: '#3b82f6',
    fontSize: '0.875rem'
  },
  progressBar: {
    height: '0.25rem',
    width: '100%',
    background: '#4b5563',
    marginTop: '0.5rem',
    marginBottom: '1rem'
  },
  progressIndicator: {
    height: '100%',
    background: '#3b82f6',
    transition: 'width 0.3s'
  },
  infoBox: {
    background: 'rgba(59, 130, 246, 0.1)',
    borderRadius: '0.375rem',
    padding: '1rem',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'flex-start'
  },
  iconCircle: {
    background: '#3b82f6',
    borderRadius: '50%',
    padding: '0.5rem',
    marginRight: '0.75rem',
    flexShrink: 0
  },
  infoContent: {
    flex: 1
  },
  infoTitle: {
    fontWeight: '600',
    fontSize: '1.125rem',
    marginBottom: '0.25rem'
  },
  infoText: {
    color: '#d1d5db'
  },
  tutorialFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1.5rem'
  },
  backButton: {
    background: '#3c4552',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    border: 'none',
    cursor: 'pointer'
  },
  nextButton: {
    background: '#3b82f6',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    border: 'none',
    cursor: 'pointer'
  },
  startButton: {
    background: '#10b981',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    border: 'none',
    cursor: 'pointer'
  },
  userIcon: {
    width: '2rem',
    height: '2rem',
    background: '#2c3542',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  userInitial: {
    width: '2rem',
    height: '2rem',
    background: '#3b82f6',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
    fontWeight: 'bold'
  },
  successBox: {
    background: 'rgba(16, 185, 129, 0.1)',
    borderRadius: '0.375rem',
    padding: '1rem',
    marginBottom: '1rem'
  },
  successText: {
    color: '#10b981',
    fontWeight: '500'
  }
};

// Simple SVG icons
const Icons = {
  Info: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  X: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  User: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
};

export default function Home() {
  // State for user interaction
  const [userName, setUserName] = useState('');
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Check for saved name on component mount
  useEffect(() => {
    const savedName = localStorage.getItem('mathCheckUserName');
    if (savedName) {
      setUserName(savedName);
    } else {
      setTimeout(() => setIsNameModalOpen(true), 1000);
    }

    // Show tutorial for first-time users
    const tutorialSeen = localStorage.getItem('mathCheckTutorialSeen');
    if (!tutorialSeen) {
      setTimeout(() => setShowTutorial(true), 1500);
    }
  }, []);

  // Save name to localStorage
  const saveName = () => {
    if (userName.trim()) {
      localStorage.setItem('mathCheckUserName', userName);
      localStorage.setItem('mathCheckAuth', 'true');
      setIsNameModalOpen(false);
      
      // Navigate to dashboard after setting name
      router.push('/dashboard');
    }
  };

  // Complete tutorial
  const completeTutorial = () => {
    localStorage.setItem('mathCheckTutorialSeen', 'true');
    setShowTutorial(false);
  };

  // Mock login function
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('mathCheckAuth', 'true');
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div style={styles.container}>
      {/* Name modal */}
      {isNameModalOpen && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>Welcome to MathCheck!</h2>
            <p style={styles.modalText}>Please enter your name so we can personalize your experience.</p>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              style={styles.input}
            />
            <button
              onClick={saveName}
              style={userName.trim() ? styles.button : {...styles.button, ...styles.disabledButton}}
              disabled={!userName.trim()}
            >
              Get Started
            </button>
          </div>
        </div>
      )}

      {/* Tutorial overlay */}
      {showTutorial && (
        <div style={styles.tutorialModal}>
          <div style={styles.tutorialContent}>
            <button
              onClick={() => setShowTutorial(false)}
              style={styles.closeButton}
            >
              <Icons.X />
            </button>

            <div style={styles.tutorialHeader}>
              <h3 style={styles.tutorialTitle}>MathCheck Tutorial</h3>
              <span style={styles.tutorialStep}>Step {tutorialStep + 1} of 4</span>
            </div>
            <div style={styles.progressBar}>
              <div
                style={{
                  ...styles.progressIndicator,
                  width: `${(tutorialStep + 1) * 25}%`
                }}
              ></div>
            </div>

            {tutorialStep === 0 && (
              <div>
                <div style={styles.infoBox}>
                  <div style={styles.iconCircle}>
                    <Icons.Info />
                  </div>
                  <div style={styles.infoContent}>
                    <h4 style={styles.infoTitle}>Welcome to MathCheck</h4>
                    <p style={styles.infoText}>MathCheck uses advanced AI to analyze your math papers, identify errors, and provide detailed feedback to help you improve your understanding.</p>
                  </div>
                </div>
              </div>
            )}

            {tutorialStep === 1 && (
              <div>
                <div style={styles.infoBox}>
                  <div style={styles.iconCircle}>
                    <Icons.Info />
                  </div>
                  <div style={styles.infoContent}>
                    <h4 style={styles.infoTitle}>Upload Your Paper</h4>
                    <p style={styles.infoText}>Select your math module, exam type, and upload your paper in PDF format. Ensure your handwriting is clear or that your typed document uses standard mathematical notation.</p>
                  </div>
                </div>
              </div>
            )}

            {tutorialStep === 2 && (
              <div>
                <div style={styles.infoBox}>
                  <div style={styles.iconCircle}>
                    <Icons.Info />
                  </div>
                  <div style={styles.infoContent}>
                    <h4 style={styles.infoTitle}>Receive Detailed Analysis</h4>
                    <p style={styles.infoText}>Our AI engine will analyze your paper and provide insights into your strengths, areas for improvement, and specific feedback on mathematical concepts.</p>
                  </div>
                </div>
              </div>
            )}

            {tutorialStep === 3 && (
              <div>
                <div style={styles.infoBox}>
                  <div style={styles.iconCircle}>
                    <Icons.Info />
                  </div>
                  <div style={styles.infoContent}>
                    <h4 style={styles.infoTitle}>Track Your Progress</h4>
                    <p style={styles.infoText}>View your submission history, track your improvement over time, and access previous analyses to see how your mathematical skills are developing.</p>
                  </div>
                </div>

                <div style={styles.successBox}>
                  <p style={styles.successText}>You're all set! Start by uploading your first math paper for analysis.</p>
                </div>
              </div>
            )}

            <div style={styles.tutorialFooter}>
              {tutorialStep > 0 ? (
                <button
                  onClick={() => setTutorialStep(prev => prev - 1)}
                  style={styles.backButton}
                >
                  Back
                </button>
              ) : (
                <div></div>
              )}

              {tutorialStep < 3 ? (
                <button
                  onClick={() => setTutorialStep(prev => prev + 1)}
                  style={styles.nextButton}
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={completeTutorial}
                  style={styles.startButton}
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logo}>
            <div style={{...styles.logoText, ...styles.logoMath}}>Math</div>
            <div style={{...styles.logoText, ...styles.logoCheck}}>Check</div>
            <div style={styles.logoBadge}>PRO</div>
          </div>
          <div style={styles.userIcon}>
            {userName ? (
              <div style={styles.userInitial}>
                {userName.charAt(0).toUpperCase()}
              </div>
            ) : (
              <Icons.User />
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        <h1 style={styles.title}>
          {userName ? `Welcome back, ${userName}!` : 'Welcome to MathCheck!'}
        </h1>
        <p style={styles.subtitle}>
          Upload your math papers for AI-powered analysis and detailed feedback
        </p>

        {/* Login Form - shown when not in modal and no user */}
        {!isNameModalOpen && !userName && (
          <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  style={styles.input}
                  required
                />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
                <input 
                  type="password" 
                  placeholder="Enter your password" 
                  style={styles.input}
                  required
                />
              </div>
              <button 
                type="submit" 
                style={styles.button}
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Log In'}
              </button>
              <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                <button 
                  type="button"
                  onClick={() => setIsNameModalOpen(true)}
                  style={{ background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer' }}
                >
                  Don't have an account? Sign Up
                </button>
              </div>
            </form>
          </div>
        )}
        
        <div style={{ marginTop: '2rem', textAlign: 'center', color: '#6b7280' }}>
          <p>MathCheck uses AI to analyze your mathematics papers and provide detailed feedback to improve your skills.</p>
        </div>
      </main>
    </div>
  );
}
