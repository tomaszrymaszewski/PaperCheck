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
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);

  // Math modules
  const moduleOptions = ['Algebra', 'Calculus', 'Statistics', 'Geometry', 'Linear Algebra', 'Number Theory'];

  // Recent submissions mock data
  const recentSubmissions = [
    { id: 'MC-2025-001', module: 'Calculus', exam: 'Midterm', date: '02 Mar 2025', score: 85 },
    { id: 'MC-2025-002', module: 'Algebra', exam: 'Final', date: '28 Feb 2025', score: 92 },
    { id: 'MC-2025-003', module: 'Statistics', exam: 'Quiz', date: '25 Feb 2025', score: 78 }
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

  // Check for tutorial settings on component mount
  useEffect(() => {
    // Show tutorial for first-time users
    const tutorialSeen = localStorage.getItem('mathCheckTutorialSeen');
    if (!tutorialSeen) {
      setTimeout(() => setShowTutorial(true), 1500);
    }
  }, []);

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

  // Handle logout
  const handleLogout = () => {
    logout();
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
                          </p>text-gray-300">MathCheck uses advanced AI to analyze your math papers, identify errors, and provide detailed feedback to help you improve your understanding.</p>
                  </div>
                </div>
                <img
                  src="/api/placeholder/500/280"
                  alt="MathCheck Dashboard Overview"
                  className="rounded-md mb-4 w-full object-cover"
                />
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
                <img
                  src="/api/placeholder/500/280"
                  alt="Uploading Paper"
                  className="rounded-md mb-4 w-full object-cover"
                />
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
                <img
                  src="/api/placeholder/500/280"
                  alt="Analysis Results"
                  className="rounded-md mb-4 w-full object-cover"
                />
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
                <img
                  src="/api/placeholder/500/280"
                  alt="Progress Tracking"
                  className="rounded-md mb-4 w-full object-cover"
                />

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
                    <p>{moduleOptions[parseInt(module)] || 'Mathematics'}</p>
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
