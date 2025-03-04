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
  const [alert, setAlert] = useState({ message: '', type: '', visible: false });

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
                    <p className="text-gray-300">MathCheck uses advanced AI to analyze your math papers, identify errors, and provide detailed feedback to help you improve your understanding.</p>
                  </div>
                </div>
                <img
                  src="/api/placeholder/500/280"
                  alt="MathCheck Dashboard Overview"
                  className="rounded-md mb-4 w-full object-cover"
                />
              </div>
            )}

            <div className="flex justify-between mt-4">
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

      {/* Header */}
      <header className="bg-[#1c1c1c] border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-500">Math</div>
              <div className="text-2xl font-bold">Check</div>
              <div className="ml-2 px-2 py-1 text-xs bg-blue-500 text-white rounded-md">PRO</div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowTutorial(true)}
                className="text-gray-300 hover:text-white hidden md:flex items-center"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
                Tutorial
              </button>
              <div className="relative group">
                <button className="bg-[#2c3542] p-2 rounded-full text-white">
                  {user ? (
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-[#2c3542] rounded-md shadow-lg overflow-hidden z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-3 border-b border-gray-700">
                    <p className="font-semibold">{user?.name || 'User'}</p>
                    <p className="text-sm text-gray-400 truncate">{user?.email || 'user@example.com'}</p>
                  </div>
                  <div className="p-2">
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-[#3c4552] rounded-md flex items-center text-red-400"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                </div>
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
            {user ? `Welcome back, ${user.name}!` : 'Welcome to MathCheck!'}
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
          <div className="bg-[#1e2d3d] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Upload Your Math Paper</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="relative">
                <label className="block text-sm text-gray-400 mb-2">Mathematics Module</label>
                <select
                  className="w-full bg-[#2c3542] text-gray-300 p-3 rounded-md"
                  value={module}
                  onChange={(e) => setModule(e.target.value)}
                >
                  <option value="" disabled>Select Module</option>
                  {moduleOptions.map((mod, index) => (
                    <option key={index} value={index}>{mod}</option>
                  ))}
                </select>
              </div>
              
              <div className="relative">
                <label className="block text-sm text-gray-400 mb-2">Exam Type</label>
                <select
                  className="w-full bg-[#2c3542] text-gray-300 p-3 rounded-md"
                  value={exam}
                  onChange={(e) => setExam(e.target.value)}
                >
                  <option value="" disabled>Select Exam</option>
                  <option value="midterm">Midterm</option>
                  <option value="final">Final Exam</option>
                  <option value="quiz">Quiz</option>
                  <option value="homework">Homework</option>
                </select>
              </div>
            </div>
            
            <div className="mb-6">
              {file ? (
                <div className="bg-[#2c3542] p-4 rounded-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg className="w-8 h-8 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-gray-400 text-sm">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <button onClick={removeFile} className="text-gray-400 hover:text-red-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center ${
                    isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <svg className="w-16 h-16 text-blue-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-center mb-2 font-medium">Drag and Drop your paper here</p>
                  <p className="text-gray-500 text-sm mb-4">Supported Format: PDF</p>
                  
                  <label className="bg-blue-600 text-white px-5 py-2 rounded-md cursor-pointer hover:bg-blue-700">
                    Browse Files
                    <input
                      type="file"
                      className="hidden"
                      accept="application/pdf"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              )}
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={!module || !exam || !file || isSubmitting}
              className={`w-full p-4 rounded-md font-semibold ${
                !module || !exam || !file
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing... {uploadProgress}%
                </span>
              ) : (
                <span>Analyze Math Paper</span>
              )}
            </button>
          </div>
        )}
      </main>

      {/* Simplified Footer */}
      <footer className="bg-[#1a1a1a] py-6 border-t border-gray-800 mt-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="text-xl font-bold text-blue-500">Math</div>
              <div className="text-xl font-bold">Check</div>
            </div>
            <p className="text-gray-500 text-sm">© 2025 MathCheck. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
