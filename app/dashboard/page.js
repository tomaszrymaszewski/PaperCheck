"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '../firebase';
import { useAuth } from '../components/AuthContext';

// All your original styles and icons remain the same
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
  // ... all other styles remain unchanged
};

// All your original Icons component remains the same
const Icons = {
  Upload: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  ),
  // ... all other icons remain unchanged
};

export default function Dashboard() {
  // State for user interaction
  const [activeTab, setActiveTab] = useState('upload');
  const [module, setModule] = useState('');
  const [exam, setExam] = useState('');
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  
  const router = useRouter();
  const { user, loading } = useAuth();

  // Math modules and exam options
  const moduleOptions = ['Algebra', 'Calculus', 'Statistics', 'Geometry', 'Linear Algebra', 'Number Theory'];
  
  // Check authentication on component mount
  useEffect(() => {
    // If not authenticated and not loading, redirect to login
    if (!loading && !user) {
      router.push('/');
    }
    
    // Check if tutorial has been seen before
    const tutorialSeen = localStorage.getItem('mathCheckTutorialSeen');
    if (!tutorialSeen && user) {
      setShowTutorial(true);
    }
  }, [user, loading, router]);

  // File handling functions remain unchanged
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

  // Logout handler - using Firebase logout
  const handleLogout = async () => {
    try {
      await logout(); // Firebase logout function
      router.push('/');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Submit handler
  const handleSubmit = () => {
    if (!module || !exam || !file) {
      alert('Please fill all fields and upload a file');
      return;
    }
    
    alert('Paper submitted for analysis! This would trigger the upload process in a real application.');
  };

  // If still loading or user is not authenticated (and will be redirected), show loading
  if (loading || !user) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#121212'
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
            <div style={styles.logoBadge}>BETA</div>
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
              {user?.displayName ? (
                <div style={styles.userInitial}>
                  {user.displayName.charAt(0).toUpperCase()}
                </div>
              ) : user?.email ? (
                <div style={styles.userInitial}>
                  {user.email.charAt(0).toUpperCase()}
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
            {user?.displayName ? `Welcome back, ${user.displayName}!` : 
             user?.email ? `Welcome back, ${user.email.split('@')[0]}!` : 
             'Welcome to MathCheck!'}
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

                {/* File upload section - Unchanged */}
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

              {/* Info Panel - Unchanged */}
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

            {/* Feature cards - Unchanged */}
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
