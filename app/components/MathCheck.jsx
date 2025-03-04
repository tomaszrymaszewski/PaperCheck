'use client';

import { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export default function MathCheck() {
  const { user, logout } = useAuth();
  
  // Form state
  const [module, setModule] = useState('');
  const [exam, setExam] = useState('');
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');
  const [userName, setUserName] = useState('');
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);

  // Math modules
  const moduleOptions = ['P1', 'P2', 'P3', 'P4', 'S1', 'S2', 'S3', 'M1', 'M2', 'FP1', 'FP2'];
  const dateOptions = ['June 2019', 'October 2019',
    'January 2020', 'June 2020', 'October 2020',
    'January 2021', 'June 2021', 'October 2021',
    'January 2022', 'June 2022', 'October 2022',
    'January 2023', 'June 2023', 'October 2023',
    'January 2024', 'June 2024', 'October 2024',
  ];

  // Recent submissions mock data
  const recentSubmissions = [
    { id: 'MC-2025-001', module: 'P2', exam: 'June 2019', date: '02 Mar 2025', score: 85 },
    { id: 'MC-2025-002', module: 'M1', exam: 'January 2023', date: '28 Feb 2025', score: 92 },
    { id: 'MC-2025-003', module: 'S1', exam: 'January 2024', date: '25 Feb 2025', score: 78 },
  ];

  // Sample feedback data
  const sampleFeedback = {
    strengths: [
      "Excellent use of the chain rule in differentiation problems",
      "Clear step-by-step working in integration by parts",
      "Good application of the fundamental theorem of calculus"
    ],
    weaknesses: [
      "Minor errors in implicit differentiation on page 3",
      "Inconsistent notation when solving differential equations",
      "Could improve explanation of convergence in infinite series"
    ],
    tips: [
      "Remember to verify your answers by differentiating your antiderivatives",
      "When working with multivariable functions, always specify which variable you're differentiating with respect to",
      "For optimization problems, always check both critical points and endpoints"
    ],
    score: 85
  };

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
      setIsNameModalOpen(false);
    }
  };

  // Complete tutorial
  const completeTutorial = () => {
    localStorage.setItem('mathCheckTutorialSeen', 'true');
    setShowTutorial(false);
  };

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
        showAlert('Only PDF files are supported', 'error');
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
      } else {
        showAlert('Only PDF files are supported', 'error');
      }
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  // Show alert message
  const [alert, setAlert] = useState({ message: '', type: '', visible: false });

  const showAlert = (message, type = 'info') => {
    setAlert({ message, type, visible: true });
    setTimeout(() => {
      setAlert(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  // Simulate upload progress
  const simulateUpload = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);

      if (progress >= 50) {
        // Show preview at 50%
        setShowPreview(true);
      }

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsSubmitting(false);
          setShowSuccess(true);
          setShowPreview(false);
          setUploadProgress(0);
        }, 800);
      }
    }, 200);
  };

  const handleSubmit = () => {
    if (!module || !exam || !file) {
      showAlert('Please fill all fields and upload a file', 'error');
      return;
    }

    // Simulate file upload
    setIsSubmitting(true);
    simulateUpload();
  };

  const resetForm = () => {
    setModule('');
    setExam('');
    setFile(null);
    setShowSuccess(false);
    setActiveTab('upload');
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(2) + ' MB';
  };

  // Generate a random time left
  const getRandomTime = () => {
    return Math.floor(Math.random() * 20) + 5;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#121212] text-white">
      {/* Alert notification */}
      {alert.visible && (
        <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 transition-all duration-300 ${
          alert.type === 'error' ? 'bg-red-500' : 'bg-green-500'
        }`}>
          {alert.message}
        </div>
      )}

      {/* Name modal */}
      {isNameModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-[#2c3542] p-6 rounded-lg max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Welcome to MathCheck!</h2>
            <p className="text-gray-300 mb-4">Please enter your name so we can personalize your experience.</p>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              className="w-full bg-[#1e2530] text-white p-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={saveName}
              className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700"
              disabled={!userName.trim()}
            >
              Get Started
            </button>
          </div>
        </div>
      )}

      {/* Tutorial overlay */}
      {showTutorial && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <div className="relative bg-[#2c3542] rounded-lg max-w-lg w-full p-6">
            <button
              onClick={() => setShowTutorial(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="mb-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">MathCheck Tutorial</h3>
                <span className="text-blue-400 text-sm">Step {tutorialStep + 1} of 4</span>
              </div>
              <div className="h-1 w-full bg-gray-700 mt-2">
                <div
                  className="h-1 bg-blue-500 transition-all duration-300"
                  style={{ width: `${(tutorialStep + 1) * 25}%` }}
                ></div>
              </div>
            </div>

            {tutorialStep === 0 && (
              <div>
                <div className="bg-blue-500/10 p-4 rounded-md mb-4 flex items-start">
                  <div className="bg-blue-500 p-2 rounded-full mr-3 shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Welcome to MathCheck</h4>
                    <p className="text-gray-300">MathCheck uses advanced AI to analyze your math papers, identify errors, and provide detailed feedback to help you improve your understanding.</p>
                  </div>
                </div>
              </div>
            )}

            {tutorialStep === 1 && (
              <div>
                <div className="bg-blue-500/10 p-4 rounded-md mb-4 flex items-start">
                  <div className="bg-blue-500 p-2 rounded-full mr-3 shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Upload Your Paper</h4>
                    <p className="text-gray-300">Select your math module, exam type, and upload your paper in PDF format. Ensure your handwriting is clear or that your typed document uses standard mathematical notation.</p>
                  </div>
                </div>
              </div>
            )}

            {tutorialStep === 2 && (
              <div>
                <div className="bg-blue-500/10 p-4 rounded-md mb-4 flex items-start">
                  <div className="bg-blue-500 p-2 rounded-full mr-3 shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Receive Detailed Analysis</h4>
                    <p className="text-gray-300">Our AI engine will analyze your paper and provide insights into your strengths, areas for improvement, and specific feedback on mathematical concepts.</p>
                  </div>
                </div>
              </div>
            )}

            {tutorialStep === 3 && (
              <div>
                <div className="bg-blue-500/10 p-4 rounded-md mb-4 flex items-start">
                  <div className="bg-blue-500 p-2 rounded-full mr-3 shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Track Your Progress</h4>
                    <p className="text-gray-300">View your submission history, track your improvement over time, and access previous analyses to see how your mathematical skills are developing.</p>
                  </div>
                </div>

                <div className="bg-green-500/10 p-4 rounded-md mb-4">
                  <p className="text-green-400 font-medium">You&apos;re all set! Start by uploading your first math paper for analysis.</p>
                </div>
              </div>
            )}

            <div className="flex justify-between">
              {tutorialStep > 0 ? (
                <button
                  onClick={() => setTutorialStep(prev => prev - 1)}
                  className="bg-[#3c4552] text-white px-4 py-2 rounded-md hover:bg-[#4c5562]"
                >
                  Back
                </button>
              ) : (
                <div></div>
              )}

              {tutorialStep < 3 ? (
                <button
                  onClick={() => setTutorialStep(prev => prev + 1)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={completeTutorial}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-40">
          <div className="bg-[#2c3542] p-6 rounded-lg max-w-3xl w-full mx-4 relative">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <svg className="w-6 h-6 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Preliminary Analysis in Progress
              <div className="ml-3 flex items-center text-sm text-green-400">
                <span className="relative flex h-3 w-3 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                Processing...
              </div>
            </h2>

            <div className="mb-6">
              <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 animate-pulse" style={{ width: '60%' }}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Uploading</span>
                <span>Analyzing</span>
                <span>Generating Feedback</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="p-4 bg-blue-500/10 rounded-md mb-4">
                <h3 className="font-medium mb-2">Document Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Module:</p>
                    <p>{moduleOptions[module] || 'Mathematics'}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Exam Type:</p>
                    <p>{exam}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">File:</p>
                    <p>{file?.name || 'document.pdf'}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Pages:</p>
                    <p>Detecting...</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-500/10 rounded-md mb-4">
                <h3 className="font-medium text-green-400 mb-2">Initial Detection</h3>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Mathematical notation recognized
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Equations and formulas detected
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Potential calculation errors found
                  </li>
                </ul>
              </div>

              <p className="text-center text-sm text-gray-400">
                Full analysis will be ready in approximately {getRandomTime()} seconds...
              </p>
            </div>

            <div className="text-center">
              <button
                onClick={() => setShowPreview(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 inline-flex items-center"
              >
                Continue in Background
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-[#1c1c1c] border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold">Math</div>
              <div className="text-2xl font-bold text-blue-500">Check</div>
              <div className="ml-2 px-2 py-1 text-xs bg-blue-500 text-white rounded-md">BETA</div>
            </div>

            <div className="flex items-center space-x-4">
            <button className="text-gray-300 hover:text-white hidden md:flex items-center">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Help
              </button>
              <button
                onClick={() => setShowTutorial(true)}
                className="text-gray-300 hover:text-white hidden md:flex items-center"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
                Tutorial
              </button>
              <div className="bg-[#2c3542] p-2 rounded-full text-white">
                {userName ? (
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Welcome message */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">
            {userName ? `Welcome back, ${userName}!` : 'Welcome to MathCheck!'}
          </h1>
          <p className="text-gray-400">Upload your math papers for AI-powered analysis and detailed feedback</p>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-800">
          <div className="flex space-x-6">
            <button
              onClick={() => setActiveTab('upload')}
              className={`pb-3 px-1 flex items-center ${
                activeTab === 'upload'
                  ? 'text-blue-500 border-b-2 border-blue-500 font-medium'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Upload Paper
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`pb-3 px-1 flex items-center ${
                activeTab === 'history'
                  ? 'text-blue-500 border-b-2 border-blue-500 font-medium'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              History
            </button>
            <button
              onClick={() => setActiveTab('insights')}
              className={`pb-3 px-1 flex items-center ${
                activeTab === 'insights'
                  ? 'text-blue-500 border-b-2 border-blue-500 font-medium'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Insights
            </button>
          </div>
        </div>

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <div>
            {showSuccess ? (
              <div className="bg-[#1e2d3d] p-8 rounded-lg overflow-hidden">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Analysis Complete!</h2>
                  <p className="text-gray-300">
                    We&apos;ve analyzed your {exam.toLowerCase()} for {moduleOptions[parseInt(module)] || 'Mathematics'}.
                  </p>
                </div>

                <div className="bg-[#2c3542] p-6 rounded-lg mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <svg className="w-6 h-6 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h3 className="text-xl font-semibold">Analysis Results</h3>
                    </div>
                    <div className="bg-blue-500/20 px-3 py-1 rounded-full flex items-center">
                      <svg className="w-4 h-4 text-blue-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="text-blue-400 font-medium">{sampleFeedback.score}/100</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="flex items-center text-green-400 mb-3">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Strengths
                      </h4>
                      <ul className="space-y-2">
                        {sampleFeedback.strengths.map((strength, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-gray-500 mr-2">•</span>
                            <span className="text-gray-300">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="flex items-center text-red-400 mb-3">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        Areas for Improvement
                      </h4>
                      <ul className="space-y-2">
                        {sampleFeedback.weaknesses.map((weakness, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-gray-500 mr-2">•</span>
                            <span className="text-gray-300">{weakness}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="flex items-center text-blue-400 mb-3">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      Tips for Improvement
                    </h4>
                    <ul className="space-y-2">
                      {sampleFeedback.tips.map((tip, i) => (
                        <li key={i} className="flex items-start bg-blue-500/10 p-3 rounded-md">
                          <span className="text-blue-400 mr-2">{i+1}.</span>
                          <span className="text-gray-300">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-gray-700">
                    <h4 className="mb-3 text-blue-400">Performance Overview</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="bg-[#1e2530] p-3 rounded-md text-center">
                        <div className="text-2xl font-bold text-blue-500 mb-1">{sampleFeedback.score}%</div>
                        <div className="text-gray-400 text-sm">Overall Score</div>
                      </div>
                      <div className="bg-[#1e2530] p-3 rounded-md text-center">
                        <div className="text-2xl font-bold text-green-500 mb-1">92%</div>
                        <div className="text-gray-400 text-sm">Notation</div>
                      </div>
                      <div className="bg-[#1e2530] p-3 rounded-md text-center">
                        <div className="text-2xl font-bold text-yellow-500 mb-1">76%</div>
                        <div className="text-gray-400 text-sm">Calculations</div>
                      </div>
                      <div className="bg-[#1e2530] p-3 rounded-md text-center">
                        <div className="text-2xl font-bold text-purple-500 mb-1">88%</div>
                        <div className="text-gray-400 text-sm">Methodology</div>
                      </div>
                    </div>

                    <p className="text-gray-300">
                      Your paper demonstrates strong understanding of core calculus concepts, particularly in applying the chain rule and integration techniques. Focus on improving your notation consistency in differential equations and double-check your work in implicit differentiation to avoid calculation errors.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <button
                    onClick={resetForm}
                    className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-all duration-300 flex-1 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Submit Another Paper
                  </button>
                  <button
                    className="bg-[#2c3542] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#3c4552] transition-all duration-300 flex items-center justify-center flex-1"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Full Report
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="col-span-2">
                    {/* Module and Exam Selection */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="relative">
                        <label className="block text-sm text-gray-400 mb-2 ml-1">Module</label>
                        <select
                          className="w-full bg-[#2c3542] text-gray-300 p-4 rounded-md appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={module}
                          onChange={(e) => setModule(e.target.value)}
                        >
                          <option value="" disabled>Select Module</option>
                          {moduleOptions.map((mod, index) => (
                            <option key={index} value={index}>{mod}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 top-6">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>

                      <div className="relative">
                        <label className="block text-sm text-gray-400 mb-2 ml-1">Exam</label>
                        <select
                          className="w-full bg-[#2c3542] text-gray-300 p-4 rounded-md appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={exam}
                          onChange={(e) => setExam(e.target.value)}
                        >
                          <option value="" disabled>Select Module</option>
                          {dateOptions.map((mod, index) => (
                              <option key={index} value={index}>{mod}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 top-6">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* File upload section */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold flex items-center">
                          <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          Upload Your Paper
                        </h2>
                        <span className="text-gray-400 text-sm">PDF files only (max 10MB)</span>
                      </div>

                      {file ? (
                        <div className="bg-[#2c3542] rounded-md p-6 transition-all duration-300 hover:shadow-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="bg-blue-500/20 p-3 rounded-md mr-4">
                                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                  />
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium truncate max-w-xs">{file.name}</p>
                                <p className="text-gray-400 text-sm">{formatFileSize(file.size)}</p>
                              </div>
                            </div>
                            <button
                              onClick={removeFile}
                              className="text-gray-400 hover:text-red-500 p-2"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div
                          className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center transition-all duration-300 ${
                            isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600 hover:border-gray-500 hover:bg-[#22293a]'
                          }`}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                        >
                          <div className={`text-blue-400 mb-4 transition-transform duration-300 ${isDragging ? 'scale-110' : ''}`}>
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              />
                            </svg>
                          </div>
                          <p className="text-center mb-2 font-medium">Drag and Drop your paper here</p>
                          <p className="text-gray-500 text-sm mb-4">Supported Format: PDF</p>

                          <label className="bg-blue-600 text-white px-5 py-2 rounded-md cursor-pointer hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
                            Browse Files
                            <input
                              type="file"
                              className="hidden"
                              accept="application/pdf"
                              onChange={handleFileChange}
                            />
                          </label>

                          <p className="text-gray-500 text-sm mt-4 text-center">
                            For best results, ensure that your mathematical notation is clear and legible.<br />
                            Our AI can recognize both handwritten and typed mathematics.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Submit button */}
                    {isSubmitting ? (
                      <div className="bg-blue-600/20 text-white p-4 rounded-md font-semibold mb-4">
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Analyzing... {uploadProgress}%</span>
                        </div>
                        <div className="w-full bg-blue-900 rounded-full h-2 mt-3">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={handleSubmit}
                        disabled={!module || !exam || !file}
                        className={`w-full p-4 rounded-md font-semibold transition-all duration-300 flex items-center justify-center ${
                          !module || !exam || !file
                          ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
                        }`}
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
                          />
                        </svg>
                        Analyze Math Paper
                      </button>
                    )}
                  </div>

                  <div className="bg-[#1e2d3d] rounded-lg p-6 h-fit">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <svg className="w-5 h-5 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      How It Works
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex">
                        <div className="bg-blue-500/20 w-8 h-8 rounded-full flex items-center justify-center mr-3 shrink-0">
                          <span className="text-blue-400 font-medium">1</span>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Select your module</h4>
                          <p className="text-gray-400 text-sm">Choose the specific math topic your paper covers</p>
                        </div>
                      </li>
                      <li className="flex">
                        <div className="bg-blue-500/20 w-8 h-8 rounded-full flex items-center justify-center mr-3 shrink-0">
                          <span className="text-blue-400 font-medium">2</span>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Upload your paper</h4>
                          <p className="text-gray-400 text-sm">Submit your PDF file with clear mathematical notation</p>
                        </div>
                      </li>
                      <li className="flex">
                        <div className="bg-blue-500/20 w-8 h-8 rounded-full flex items-center justify-center mr-3 shrink-0">
                          <span className="text-blue-400 font-medium">3</span>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">AI analysis</h4>
                          <p className="text-gray-400 text-sm">Our system analyzes your work for accuracy and understanding</p>
                        </div>
                      </li>
                      <li className="flex">
                        <div className="bg-blue-500/20 w-8 h-8 rounded-full flex items-center justify-center mr-3 shrink-0">
                          <span className="text-blue-400 font-medium">4</span>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Get detailed feedback</h4>
                          <p className="text-gray-400 text-sm">Receive personalized insights to improve your skills</p>
                        </div>
                      </li>
                    </ul>

                    <div className="mt-6 p-3 bg-blue-500/10 rounded-md">
                      <p className="text-sm text-blue-400 flex items-start">
                        <svg className="w-5 h-5 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Our AI can recognize a wide range of mathematical notation including calculus, linear algebra, and statistics.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-[#2c3542] p-5 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div className="bg-green-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Smart Error Detection</h3>
                    <p className="text-gray-400">Our AI identifies calculation errors, notation issues, and logical gaps in your mathematical reasoning.</p>
                  </div>

                  <div className="bg-[#2c3542] p-5 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div className="bg-blue-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Personalized Tips</h3>
                    <p className="text-gray-400">Get tailored recommendations to strengthen your mathematical skills and improve your problem-solving approach.</p>
                  </div>

                  <div className="bg-[#2c3542] p-5 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Progress Tracking</h3>
                    <p className="text-gray-400">Monitor your improvement over time with detailed analytics and see how your mathematical skills are developing.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Submission History
              </h2>
              <div className="relative">
                <input
                  type="text"
                  className="bg-[#2c3542] text-gray-300 pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search submissions..."
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-[#1e2d3d] overflow-hidden rounded-lg mb-8">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-[#2c3542]">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Module</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Exam</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Score</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {recentSubmissions.map((submission, index) => (
                      <tr key={index} className="hover:bg-[#2c3542]/50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium">{submission.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm">{submission.module}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm">{submission.exam}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-400">{submission.date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            submission.score >= 90 ? 'bg-green-200 text-green-800' :
                            submission.score >= 80 ? 'bg-blue-200 text-blue-800' :
                            submission.score >= 70 ? 'bg-yellow-200 text-yellow-800' :
                            'bg-red-200 text-red-800'
                          }`}>
                            {submission.score}%
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          <div className="flex space-x-3">
                            <button className="text-blue-400 hover:text-blue-300">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                            <button className="text-green-400 hover:text-green-300">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                            </button>
                            <button className="text-red-400 hover:text-red-300">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-[#2c3542] px-6 py-4 flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  Showing <span className="font-medium">3</span> of <span className="font-medium">3</span> submissions
                </div>
                <div className="flex space-x-2">
                  <button className="bg-[#1e2d3d] text-gray-400 px-3 py-1 rounded-md hover:bg-[#3c4552] hover:text-white disabled:opacity-50" disabled>
                    Previous
                  </button>
                  <button className="bg-[#1e2d3d] text-gray-400 px-3 py-1 rounded-md hover:bg-[#3c4552] hover:text-white disabled:opacity-50" disabled>
                    Next
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-[#1e2d3d] p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                About Your Submission History
              </h3>
              <p className="text-gray-400 mb-4">
                Your submission history shows all the math papers you&apos;ve submitted for analysis.
                You can view detailed feedback, download reports, or delete submissions you no longer need.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-[#2c3542] p-4 rounded-md">
                  <div className="text-2xl font-bold text-blue-500 mb-1">3</div>
                  <div className="text-gray-400 text-sm">Total Submissions</div>
                </div>
                <div className="bg-[#2c3542] p-4 rounded-md">
                  <div className="text-2xl font-bold text-green-500 mb-1">85%</div>
                  <div className="text-gray-400 text-sm">Average Score</div>
                </div>
                <div className="bg-[#2c3542] p-4 rounded-md">
                  <div className="text-2xl font-bold text-purple-500 mb-1">+7%</div>
                  <div className="text-gray-400 text-sm">Improvement Trend</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Insights Tab */}
        {activeTab === 'insights' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Performance Insights
              </h2>
              <div>
                <select className="bg-[#2c3542] text-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="all">All Time</option>
                  <option value="3months">Last 3 Months</option>
                  <option value="month">Last Month</option>
                  <option value="week">Last Week</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#1e2d3d] p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Performance by Module</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Calculus</span>
                      <span className="text-blue-400">85%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div className="h-2 bg-blue-500 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Algebra</span>
                      <span className="text-green-400">92%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div className="h-2 bg-green-500 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Statistics</span>
                      <span className="text-yellow-400">78%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Linear Algebra</span>
                      <span className="text-purple-400">88%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div className="h-2 bg-purple-500 rounded-full" style={{ width: '88%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1e2d3d] p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Skill Breakdown</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#2c3542] p-4 rounded-md text-center">
                    <svg className="w-8 h-8 mx-auto text-green-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="font-medium mb-1">Notation</div>
                    <div className="text-xl font-bold text-green-500">92%</div>
                  </div>
                  <div className="bg-[#2c3542] p-4 rounded-md text-center">
                    <svg className="w-8 h-8 mx-auto text-yellow-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    <div className="font-medium mb-1">Calculations</div>
                    <div className="text-xl font-bold text-yellow-500">76%</div>
                  </div>
                  <div className="bg-[#2c3542] p-4 rounded-md text-center">
                    <svg className="w-8 h-8 mx-auto text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div className="font-medium mb-1">Methodology</div>
                    <div className="text-xl font-bold text-blue-500">88%</div>
                  </div>
                  <div className="bg-[#2c3542] p-4 rounded-md text-center">
                    <svg className="w-8 h-8 mx-auto text-purple-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="font-medium mb-1">Problem Approach</div>
                    <div className="text-xl font-bold text-purple-500">82%</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#1e2d3d] p-6 rounded-lg col-span-2">
                <h3 className="text-lg font-semibold mb-4">Common Mistakes</h3>
                <div className="space-y-4">
                  <div className="bg-[#2c3542] p-4 rounded-md">
                    <div className="flex items-start">
                      <div className="bg-red-500/20 p-2 rounded-md mr-3">
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Chain Rule Errors</h4>
                        <p className="text-gray-400 text-sm">Missing factors when differentiating composite functions. Remember to apply the chain rule carefully.</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#2c3542] p-4 rounded-md">
                    <div className="flex items-start">
                      <div className="bg-red-500/20 p-2 rounded-md mr-3">
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Integration Sign Errors</h4>
                        <p className="text-gray-400 text-sm">Incorrect signs when calculating antiderivatives. Be careful with negative signs in integration.</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#2c3542] p-4 rounded-md">
                    <div className="flex items-start">
                      <div className="bg-red-500/20 p-2 rounded-md mr-3">
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Variable Inconsistency</h4>
                        <p className="text-gray-400 text-sm">Using different variables without clear substitution. Maintain consistent notation throughout your solutions.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1e2d3d] p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Recommended Focus Areas</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-blue-500/20 w-6 h-6 rounded-full flex items-center justify-center mr-3 shrink-0">
                      <span className="text-blue-400 font-medium">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Implicit Differentiation</h4>
                      <p className="text-gray-400 text-sm">Practice with more complex equations</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-500/20 w-6 h-6 rounded-full flex items-center justify-center mr-3 shrink-0">
                      <span className="text-blue-400 font-medium">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Integration by Parts</h4>
                      <p className="text-gray-400 text-sm">Focus on choosing u and dv effectively</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-500/20 w-6 h-6 rounded-full flex items-center justify-center mr-3 shrink-0">
                      <span className="text-blue-400 font-medium">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Series Convergence</h4>
                      <p className="text-gray-400 text-sm">Review criteria for infinite series</p>
                    </div>
                  </li>
                </ul>

                <div className="mt-6 p-4 bg-green-500/10 rounded-md">
                  <p className="text-sm flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <span className="text-green-400">
                      Your overall understanding of calculus fundamentals is strong!
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] py-8 border-t border-gray-800 mt-12">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="text-xl font-bold">Math</div>
                <div className="text-xl font-bold text-blue-500">Check</div>
              </div>
              <p className="text-gray-400 mb-4">Advanced AI-powered mathematical analysis and feedback to help students improve their understanding and skills.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-500">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-500">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-500">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-blue-500">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-500">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-500">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-blue-500">Math Tutorials</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-500">Practice Problems</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-500">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-500">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
              <p className="text-gray-400 mb-3">Subscribe to receive updates and tips for improving your math skills.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-[#2c3542] text-white px-4 py-2 rounded-l-md focus:outline-none flex-1"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">© 2025 MathCheck. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 text-sm hover:text-gray-400">Privacy Policy</a>
              <a href="#" className="text-gray-500 text-sm hover:text-gray-400">Terms of Service</a>
              <a href="#" className="text-gray-500 text-sm hover:text-gray-400">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
