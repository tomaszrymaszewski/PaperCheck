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
  userIcon: {
    width: '2rem',
    height: '2rem',
    background: '#2c3542',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
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
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1rem'
  },
  welcomeSection: {
    marginBottom: '2rem'
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem'
  },
  subtitle: {
    color: '#9ca3af'
  },
  tabs: {
    display: 'flex',
    borderBottom: '1px solid #333',
    marginBottom: '1.5rem'
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.75rem 0.25rem',
    marginRight: '1.5rem',
    color: '#9ca3af',
    cursor: 'pointer',
    borderBottom: '2px solid transparent'
  },
  activeTab: {
    color: '#3b82f6',
    borderBottom: '2px solid #3b82f6',
    fontWeight: '500'
  },
  tabIcon: {
    marginRight: '0.5rem'
  },
  formSection: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  selectionGroup: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    marginBottom: '1.5rem'
  },
  formControl: {
    marginBottom: '1.5rem'
  },
  label: {
    display: 'block',
    fontSize: '0.875rem',
    color: '#9ca3af',
    marginBottom: '0.5rem'
  },
  select: {
    width: '100%',
    background: '#2c3542',
    color: '#d1d5db',
    padding: '1rem',
    borderRadius: '0.375rem',
    border: 'none',
    appearance: 'none',
    cursor: 'pointer'
  },
  uploadSection: {
    marginBottom: '1.5rem'
  },
  uploadHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  uploadTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center'
  },
  uploadRestriction: {
    fontSize: '0.875rem',
    color: '#9ca3af'
  },
  dropzone: {
    border: '2px dashed #4b5563',
    borderRadius: '0.5rem',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  dropzoneActive: {
    border: '2px dashed #3b82f6',
    background: 'rgba(59, 130, 246, 0.1)'
  },
  dropzoneIcon: {
    color: '#3b82f6',
    marginBottom: '1rem',
    fontSize: '4rem'
  },
  dropzoneText: {
    textAlign: 'center',
    marginBottom: '0.5rem',
    fontWeight: '500'
  },
  dropzoneSubtext: {
    color: '#6b7280',
    fontSize: '0.875rem',
    textAlign: 'center',
    marginBottom: '1rem'
  },
  browseButton: {
    background: '#3b82f6',
    color: 'white',
    padding: '0.5rem 1.25rem',
    borderRadius: '0.375rem',
    border: 'none',
    cursor: 'pointer'
  },
  infoPanel: {
    background: '#1e2d3d',
    borderRadius: '0.5rem',
    padding: '1.5rem'
  },
  infoPanelTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center'
  },
  stepsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  step: {
    display: 'flex'
  },
  stepNumber: {
    background: 'rgba(59, 130, 246, 0.1)',
    width: '2rem',
    height: '2rem',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#3b82f6',
    fontWeight: '500',
    marginRight: '0.75rem',
    flexShrink: 0
  },
  stepContent: {
    flex: 1
  },
  stepTitle: {
    fontWeight: '500',
    marginBottom: '0.25rem'
  },
  stepDescription: {
    color: '#9ca3af',
    fontSize: '0.875rem'
  },
  infoTip: {
    marginTop: '1.5rem',
    padding: '0.75rem',
    background: 'rgba(59, 130, 246, 0.1)',
    borderRadius: '0.375rem',
    display: 'flex',
    alignItems: 'flex-start'
  },
  infoIcon: {
    color: '#3b82f6',
    marginRight: '0.5rem',
    flexShrink: 0
  },
  infoText: {
    color: '#3b82f6',
    fontSize: '0.875rem'
  },
  submitButton: {
    width: '100%',
    padding: '1rem',
    background: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '0.375rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  disabledButton: {
    background: '#4b5563',
    color: '#9ca3af',
    cursor: 'not-allowed'
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  featureCard: {
    background: '#2c3542',
    padding: '1.25rem',
    borderRadius: '0.5rem'
  },
  featureIconContainer: {
    width: '3rem',
    height: '3rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '0.5rem',
    marginBottom: '1rem'
  },
  featureGreen: {
    background: 'rgba(16, 185, 129, 0.1)',
    color: '#10b981'
  },
  featureBlue: {
    background: 'rgba(59, 130, 246, 0.1)',
    color: '#3b82f6'
  },
  featurePurple: {
    background: 'rgba(139, 92, 246, 0.1)',
    color: '#8b5cf6'
  },
  featureTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    marginBottom: '0.5rem'
  },
  featureDescription: {
    color: '#9ca3af'
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
  filePreview: {
    background: '#2c3542',
    borderRadius: '0.5rem',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  fileInfo: {
    display: 'flex',
    alignItems: 'center'
  },
  fileIcon: {
    width: '2.5rem',
    height: '2.5rem',
    background: 'rgba(59, 130, 246, 0.1)',
    color: '#3b82f6',
    borderRadius: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '1rem'
  },
  fileName: {
    fontWeight: '500',
    marginBottom: '0.25rem'
  },
  fileSize: {
    color: '#9ca3af',
    fontSize: '0.875rem'
  },
  removeButton: {
    color: '#9ca3af',
    cursor: 'pointer',
    background: 'none',
    border: 'none'
  }
};

// Simple SVG icons
const Icons = {
  Upload: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  ),
  Clock: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Chart: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  Info: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  File: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
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
  ),
  Shield: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Lightbulb: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6M10 22h4M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14" />
    </svg>
  ),
  Activity: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  )
};

export default function Dashboard() {
  // State for user interaction
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState('upload');
  const [module, setModule] = useState('');
  const [exam, setExam] = useState('');
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const router = useRouter();

  // Math modules and exam options
  const moduleOptions = ['Algebra', 'Calculus', 'Statistics', 'Geometry', 'Linear Algebra', 'Number Theory'];
  
  // Check for saved name on component mount
  useEffect(() => {
    const savedName = localStorage.getItem('mathCheckUserName');
    const isAuthenticated = localStorage.getItem('mathCheckAuth');
    
    if (savedName) {
      setUserName(savedName);
    }
    
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [router]);

  // File handling functions
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf') {
        setFile(droppedFile);
      } else {
        alert('Only PDF files are supported');
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
      } else {
        alert('Only PDF files are supported');
      }
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(2) + ' MB';
  };

  // Complete tutorial
  const completeTutorial = () => {
    localStorage.setItem('mathCheckTutorialSeen', 'true');
    setShowTutorial(false);
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('mathCheckAuth');
    router.push('/');
  };

  // Submit handler
  const handleSubmit = () => {
    if (!module || !exam || !file) {
      alert('Please fill all fields and upload a file');
      return;
    }
    
    alert('Paper submitted for analysis! This would trigger the upload process in a real application.');
  };

  return (
    <div style={styles.container}>
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

            {/* More tutorial steps here */}

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
            <div style={{...styles.logoText, ...styles.logoCheck}}>Math</div>
            <div style={{...styles.logoText, ...styles.logoMath}}>Check</div>
            <div style={styles.logoBadge}>PRO</div>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <button 
              onClick={() => setShowTutorial(true)}
              style={{background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', display: 'flex', alignItems: 'center'}}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '0.25rem'}}>
                <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
              Tutorial
            </button>
            <div 
              style={styles.userIcon}
              onClick={handleLogout}
              title="Logout"
            >
              {userName ? (
                <div style={styles.userInitial}>
                  {userName.charAt(0).toUpperCase()}
                </div>
              ) : (
                <Icons.User />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        {/* Welcome message */}
        <div style={styles.welcomeSection}>
          <h1 style={styles.title}>
            {userName ? `Welcome back, ${userName}!` : 'Welcome to MathCheck!'}
          </h1>
          <p style={styles.subtitle}>Upload your math papers for AI-powered analysis and detailed feedback</p>
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          <button 
            onClick={() => setActiveTab('upload')}
            style={activeTab === 'upload' ? {...styles.tab, ...styles.activeTab} : styles.tab}
          >
            <span style={styles.tabIcon}><Icons.Upload /></span>
            Upload Paper
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            style={activeTab === 'history' ? {...styles.tab, ...styles.activeTab} : styles.tab}
          >
            <span style={styles.tabIcon}><Icons.Clock /></span>
            History
          </button>
          <button 
            onClick={() => setActiveTab('insights')}
            style={activeTab === 'insights' ? {...styles.tab, ...styles.activeTab} : styles.tab}
          >
            <span style={styles.tabIcon}><Icons.Chart /></span>
            Insights
          </button>
        </div>

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              <div>
                {/* Module and Exam Selection */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{position: 'relative'}}>
                    <label style={styles.label}>Mathematics Module</label>
                    <select
                      style={styles.select}
                      value={module}
                      onChange={(e) => setModule(e.target.value)}
                    >
                      <option value="" disabled>Select Module</option>
                      {moduleOptions.map((mod, index) => (
                        <option key={index} value={index}>{mod}</option>
                      ))}
                    </select>
                  </div>

                  <div style={{position: 'relative'}}>
                    <label style={styles.label}>Exam Type</label>
                    <select
                      style={styles.select}
                      value={exam}
                      onChange={(e) => setExam(e.target.value)}
                    >
                      <option value="" disabled>Select Exam</option>
                      <option value="midterm">Midterm</option>
                      <option value="final">Final Exam</option>
                      <option value="quiz">Quiz</option>
                      <option value="homework">Homework</option>
                      <option value="practice">Practice Problems</option>
                    </select>
                  </div>
                </div>

                {/* File upload section */}
                <div style={styles.uploadSection}>
                  <div style={styles.uploadHeader}>
                    <h2 style={styles.uploadTitle}>
                      <span style={{marginRight: '0.5rem', color: '#3b82f6'}}><Icons.Upload /></span>
                      Upload Your Paper
                    </h2>
                    <span style={styles.uploadRestriction}>PDF files only (max 10MB)</span>
                  </div>

                  {file ? (
                    <div style={styles.filePreview}>
                      <div style={styles.fileInfo}>
                        <div style={styles.fileIcon}>
                          <Icons.File />
                        </div>
                        <div>
                          <p style={styles.fileName}>{file.name}</p>
                          <p style={styles.fileSize}>{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <button
                        onClick={removeFile}
                        style={styles.removeButton}
                      >
                        <Icons.X />
                      </button>
                    </div>
                  ) : (
                    <div
                      style={isDragging ? {...styles.dropzone, ...styles.dropzoneActive} : styles.dropzone}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <div style={{color: '#3b82f6', marginBottom: '1rem', fontSize: '2.5rem'}}>
                        <Icons.Upload />
                      </div>
                      <p style={styles.dropzoneText}>Drag and Drop your paper here</p>
                      <p style={styles.dropzoneSubtext}>Supported Format: PDF</p>

                      <label style={styles.browseButton}>
                        Browse Files
                        <input
                          type="file"
                          style={{display: 'none'}}
                          accept="application/pdf"
                          onChange={handleFileChange}
                        />
                      </label>

                      <p style={{...styles.dropzoneSubtext, marginTop: '1rem'}}>
                        For best results, ensure that your mathematical notation is clear and legible.<br />
                        Our AI can recognize both handwritten and typed mathematics.
                      </p>
                    </div>
                  )}
                </div>

                {/* Submit button */}
                <button
                  onClick={handleSubmit}
                  disabled={!module || !exam || !file}
                  style={!module || !exam || !file ? 
                    {...styles.submitButton, ...styles.disabledButton} : 
                    styles.submitButton
                  }
                >
                  <span style={{marginRight: '0.5rem'}}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                    </svg>
                  </span>
                  Analyze Math Paper
                </button>
              </div>

              <div style={styles.infoPanel}>
                <h3 style={styles.infoPanelTitle}>
                  <span style={{color: '#3b82f6', marginRight: '0.5rem'}}><Icons.Info /></span>
                  How It Works
                </h3>
                <div style={styles.stepsList}>
                  <div style={styles.step}>
                    <div style={styles.stepNumber}>1</div>
                    <div style={styles.stepContent}>
                      <h4 style={styles.stepTitle}>Select your module</h4>
                      <p style={styles.stepDescription}>Choose the specific math topic your paper covers</p>
                    </div>
                  </div>
                  <div style={styles.step}>
                    <div style={styles.stepNumber}>2</div>
                    <div style={styles.stepContent}>
                      <h4 style={styles.stepTitle}>Upload your paper</h4>
                      <p style={styles.stepDescription}>Submit your PDF file with clear mathematical notation</p>
                    </div>
                  </div>
                  <div style={styles.step}>
                    <div style={styles.stepNumber}>3</div>
                    <div style={styles.stepContent}>
                      <h4 style={styles.stepTitle}>AI analysis</h4>
                      <p style={styles.stepDescription}>Our system analyzes your work for accuracy and understanding</p>
                    </div>
                  </div>
                  <div style={styles.step}>
                    <div style={styles.stepNumber}>4</div>
                    <div style={styles.stepContent}>
                      <h4 style={styles.stepTitle}>Get detailed feedback</h4>
                      <p style={styles.stepDescription}>Receive personalized insights to improve your skills</p>
                    </div>
                  </div>
                </div>

                <div style={styles.infoTip}>
                  <span style={styles.infoIcon}><Icons.Info /></span>
                  <p style={styles.infoText}>
                    Our AI can recognize a wide range of mathematical notation including calculus, linear algebra, and statistics.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              <div style={styles.featureCard}>
                <div style={{...styles.featureIconContainer, ...styles.featureGreen}}>
                  <Icons.Shield />
                </div>
                <h3 style={styles.featureTitle}>Smart Error Detection</h3>
                <p style={styles.featureDescription}>Our AI identifies calculation errors, notation issues, and logical gaps in your mathematical reasoning.</p>
              </div>
              
              <div style={styles.featureCard}>
                <div style={{...styles.featureIconContainer, ...styles.featureBlue}}>
                  <Icons.Lightbulb />
                </div>
                <h3 style={styles.featureTitle}>Personalized Tips</h3>
                <p style={styles.featureDescription}>Get tailored recommendations to strengthen your mathematical skills and improve your problem-solving approach.</p>
              </div>
              
              <div style={styles.featureCard}>
                <div style={{...styles.featureIconContainer, ...styles.featurePurple}}>
                  <Icons.Activity />
                </div>
                <h3 style={styles.featureTitle}>Progress Tracking</h3>
                <p style={styles.featureDescription}>Monitor your improvement over time with detailed analytics and see how your mathematical skills are developing.</p>
              </div>
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div style={{textAlign: 'center', padding: '3rem 0'}}>
            <h2 style={{fontSize: '1.5rem', marginBottom: '1rem'}}>Submission History</h2>
            <p style={{color: '#9ca3af'}}>You haven't submitted any papers yet. Upload your first paper to get started!</p>
          </div>
        )}

        {/* Insights Tab */}
        {activeTab === 'insights' && (
          <div style={{textAlign: 'center', padding: '3rem 0'}}>
            <h2 style={{fontSize: '1.5rem', marginBottom: '1rem'}}>Performance Insights</h2>
            <p style={{color: '#9ca3af'}}>Submit your first paper to start tracking your progress and get personalized insights.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        background: '#1a1a1a',
        padding: '2rem 0',
        borderTop: '1px solid #333',
        marginTop: '3rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            <div style={{...styles.logoText, ...styles.logoCheck}}>Math</div>
            <div style={{...styles.logoText, ...styles.logoMath}}>Check</div>
          </div>
          <p style={{color: '#6b7280', fontSize: '0.875rem'}}>
            © 2025 MathCheck. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
