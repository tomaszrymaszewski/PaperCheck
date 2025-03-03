"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function PaperCheck() {
  // Form state
  const [subject, setSubject] = useState('');
  const [module, setModule] = useState('');
  const [exam, setExam] = useState('');
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [activeTutorialStep, setActiveTutorialStep] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);

  // Dynamically generate module options based on selected subject
  const [moduleOptions, setModuleOptions] = useState([]);
  
  // Available subjects with their respective modules
  const subjectData = {
    math: ['Algebra', 'Calculus', 'Statistics', 'Geometry'],
    science: ['Biology', 'Chemistry', 'Physics', 'Environmental Science'],
    english: ['Literature', 'Writing', 'Language', 'Comprehension'],
    history: ['World History', 'US History', 'European History', 'Ancient History']
  };

  // Update modules when subject changes
  useEffect(() => {
    if (subject) {
      setModuleOptions(subjectData[subject] || []);
      setModule(''); // Reset module selection
    }
  }, [subject]);

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
        showToast('Only PDF files are supported', 'error');
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
      } else {
        showToast('Only PDF files are supported', 'error');
      }
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  // Toast notification system
  const [toast, setToast] = useState({ message: '', type: '', visible: false });
  
  const showToast = (message, type = 'info') => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  // Simulate upload progress
  // State for managing feedback preview
  const [showPreview, setShowPreview] = useState(false);
  const [feedbackPreview, setFeedbackPreview] = useState(null);
  
  // Sample feedback data
  const sampleFeedback = {
    math: {
      strengths: ["Strong mathematical notation", "Clear problem-solving steps", "Good use of theorems"],
      weaknesses: ["Some calculation errors on page 3", "Missing explanations for key steps", "Inconsistent variable naming"],
      score: 85
    },
    science: {
      strengths: ["Well-structured lab report", "Thorough methodology", "Good data visualization"],
      weaknesses: ["Hypothesis could be more specific", "Some statistical analysis errors", "Missing discussion of limitations"],
      score: 78
    },
    english: {
      strengths: ["Strong thesis statement", "Well-organized paragraphs", "Effective use of evidence"],
      weaknesses: ["Some grammatical errors", "Citation format inconsistencies", "Conclusion needs strengthening"],
      score: 82
    },
    history: {
      strengths: ["Comprehensive historical context", "Good use of primary sources", "Clear chronological structure"],
      weaknesses: ["Some factual inaccuracies", "More critical analysis needed", "Additional sources recommended"],
      score: 76
    }
  };

  const simulateUpload = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      
      if (progress >= 50 && !showPreview && !feedbackPreview) {
        // Show preliminary feedback preview at 50%
        setFeedbackPreview(sampleFeedback[subject]);
        setShowPreview(true);
      }
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsSubmitting(false);
          setShowSuccess(true);
          setShowPreview(false);
          setUploadProgress(0);
        }, 500);
      }
    }, 150);
  };

  const handleSubmit = () => {
    if (!subject || !module || !exam || !file) {
      showToast('Please fill all fields and upload a file', 'error');
      return;
    }

    // Simulate file upload
    setIsSubmitting(true);
    simulateUpload();
    console.log('Submitting:', { subject, module, exam, file });
  };

  const resetForm = () => {
    setSubject('');
    setModule('');
    setExam('');
    setFile(null);
    setShowSuccess(false);
  };

  // Helper function to format bytes to readable file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(2) + ' MB';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1c1c1c] to-[#0c1019] text-white">
      {/* Toast notification */}
      {toast.visible && (
        <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 transition-all duration-300 ${
          toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'
        }`}>
          {toast.message}
        </div>
      )}

      {/* Help modal */}
      {isHelpOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#2c2c2c] p-6 rounded-lg max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">How to use PaperCheck</h2>
              <button 
                onClick={() => setIsHelpOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-lg">1. Select your subject</h3>
                <p className="text-gray-300">Choose the subject for which you want to check your paper.</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-lg">2. Choose the module</h3>
                <p className="text-gray-300">Select the specific module within your subject.</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-lg">3. Select exam type</h3>
                <p className="text-gray-300">Specify whether it's a midterm, final exam, or quiz.</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-lg">4. Upload your paper</h3>
                <p className="text-gray-300">Upload your paper in PDF format (max 5MB).</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-lg">5. Get results</h3>
                <p className="text-gray-300">Our AI will analyze your paper and provide feedback.</p>
              </div>
            </div>
            <div className="mt-6 flex space-x-4">
              <button 
                onClick={() => setIsHelpOpen(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex-1"
              >
                Got it!
              </button>
              <button 
                onClick={() => {
                  setIsHelpOpen(false);
                  setShowTutorial(true);
                  setActiveTutorialStep(0);
                }}
                className="bg-[#3c4552] text-white px-4 py-2 rounded-md hover:bg-[#4c5562] flex-1"
              >
                Start Interactive Tour
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Interactive Tutorial */}
      {showTutorial && (
        <div className="fixed inset-0 bg-black/80 z-50">
          <div className="absolute top-4 right-4">
            <button 
              onClick={() => setShowTutorial(false)}
              className="text-gray-400 hover:text-white p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Tutorial Steps */}
          <div className="max-w-md mx-auto bg-[#2c2c2c] rounded-lg mt-20 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">PaperCheck Tutorial</h3>
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  Step {activeTutorialStep + 1} of 5
                </span>
              </div>
              
              {activeTutorialStep === 0 && (
                <div>
                  <div className="bg-blue-500/20 p-4 rounded-md mb-4">
                    <div className="flex items-center">
                      <div className="bg-blue-500 rounded-full p-2 mr-3">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-medium">Welcome to PaperCheck!</h4>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">
                    PaperCheck uses advanced AI to analyze your academic papers and provide detailed feedback to help you improve your grades.
                  </p>
                  <p className="text-gray-300 mb-4">
                    This quick tutorial will show you how to use the main features of PaperCheck.
                  </p>
                </div>
              )}
              
              {activeTutorialStep === 1 && (
                <div>
                  <div className="bg-blue-500/20 p-4 rounded-md mb-4">
                    <div className="flex items-center">
                      <div className="bg-blue-500 rounded-full p-2 mr-3">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-medium">Step 1: Select Subject & Module</h4>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">
                    First, choose your academic subject from the dropdown menu. This helps our AI understand the context of your paper.
                  </p>
                  <p className="text-gray-300">
                    Then select the specific module within that subject. The module options will update based on your subject selection.
                  </p>
                </div>
              )}
              
              {activeTutorialStep === 2 && (
                <div>
                  <div className="bg-blue-500/20 p-4 rounded-md mb-4">
                    <div className="flex items-center">
                      <div className="bg-blue-500 rounded-full p-2 mr-3">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293

      {/* Header */}
      <nav className="flex justify-between items-center p-4 px-8 border-b border-gray-800">
        <div className="flex items-center">
          <div className="relative">
            <h1 className="text-3xl font-bold">PaperCheck</h1>
            <span className="absolute -top-2 -right-12 bg-blue-500 text-xs px-2 py-1 rounded-full">BETA</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowTutorial(true)}
              className="text-gray-300 hover:text-white flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" 
                />
              </svg>
              Interactive Tour
            </button>
            
            <button 
              onClick={() => setIsHelpOpen(true)}
              className="text-gray-300 hover:text-white flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
              Help
            </button>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2 transition-all duration-300 transform hover:scale-105">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            Support us
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-8">
        {showSuccess ? (
          <div className="bg-[#1e2d3d] p-8 rounded-lg">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Analysis Complete!</h2>
              <p className="text-gray-300">
                We've analyzed your {exam.toLowerCase()} for {
                  moduleOptions[parseInt(module)] || module
                } ({
                  subjectData[subject] ? subject.charAt(0).toUpperCase() + subject.slice(1) : subject
                }).
              </p>
            </div>
            
            <div className="bg-[#2c3542] p-6 rounded-lg mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Paper Analysis Results</h3>
                <div className="bg-blue-500/20 px-3 py-1 rounded-full">
                  <span className="text-blue-400 font-medium">{sampleFeedback[subject].score}/100</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="flex items-center text-green-400 mb-3">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Strengths
                  </h4>
                  <ul className="space-y-2">
                    {sampleFeedback[subject].strengths.map((strength, i) => (
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Areas for Improvement
                  </h4>
                  <ul className="space-y-2">
                    {sampleFeedback[subject].weaknesses.map((weakness, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-gray-500 mr-2">•</span>
                        <span className="text-gray-300">{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-700">
                <h4 className="mb-3 text-blue-400">Summary</h4>
                <p className="text-gray-300">
                  Your paper demonstrates {sampleFeedback[subject].score >= 80 ? 'strong' : 'adequate'} understanding of the core concepts. 
                  The analytical approach is {sampleFeedback[subject].score >= 80 ? 'well-structured' : 'generally sound'}, with particularly 
                  good {sampleFeedback[subject].strengths[0].toLowerCase()}.
                  To improve your grade further, focus on addressing {sampleFeedback[subject].weaknesses[0].toLowerCase()}.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button
                onClick={resetForm}
                className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-all duration-300 flex-1"
              >
                Submit Another Paper
              </button>
              <button className="bg-[#2c3542] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#3c4552] transition-all duration-300 flex items-center justify-center flex-1">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Full Report
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Check Your Papers</h2>
              <p className="text-gray-400">Upload your academic papers and get AI-powered feedback</p>
            </div>
            
            {/* Progress steps */}
            <div className="flex items-center justify-between mb-8 px-4">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  subject ? 'bg-blue-600' : 'bg-gray-700'
                }`}>
                  {subject ? (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : "1"}
                </div>
                <div className={`h-1 w-12 ${module ? 'bg-blue-600' : 'bg-gray-700'}`}></div>
              </div>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  module ? 'bg-blue-600' : 'bg-gray-700'
                }`}>
                  {module ? (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : "2"}
                </div>
                <div className={`h-1 w-12 ${exam ? 'bg-blue-600' : 'bg-gray-700'}`}></div>
              </div>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  exam ? 'bg-blue-600' : 'bg-gray-700'
                }`}>
                  {exam ? (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : "3"}
                </div>
                <div className={`h-1 w-12 ${file ? 'bg-blue-600' : 'bg-gray-700'}`}></div>
              </div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                file ? 'bg-blue-600' : 'bg-gray-700'
              }`}>
                {file ? (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : "4"}
              </div>
            </div>

            {/* Selection dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="relative group">
                <label className="block text-sm text-gray-400 mb-2 ml-1">Subject</label>
                <select
                  className="w-full bg-[#2c3542] text-gray-300 p-4 rounded-md appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                >
                  <option value="" disabled>Select Subject</option>
                  <option value="math">Mathematics</option>
                  <option value="science">Science</option>
                  <option value="english">English</option>
                  <option value="history">History</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 top-6">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div className="relative group">
                <label className="block text-sm text-gray-400 mb-2 ml-1">Module</label>
                <select
                  className={`w-full bg-[#2c3542] text-gray-300 p-4 rounded-md appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${!subject && 'opacity-60 cursor-not-allowed'}`}
                  value={module}
                  onChange={(e) => setModule(e.target.value)}
                  disabled={!subject}
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

              <div className="relative group">
                <label className="block text-sm text-gray-400 mb-2 ml-1">Exam Type</label>
                <select
                  className={`w-full bg-[#2c3542] text-gray-300 p-4 rounded-md appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${!module && 'opacity-60 cursor-not-allowed'}`}
                  value={exam}
                  onChange={(e) => setExam(e.target.value)}
                  disabled={!module}
                >
                  <option value="" disabled>Select Exam</option>
                  <option value="midterm">Midterm</option>
                  <option value="final">Final Exam</option>
                  <option value="quiz">Quiz</option>
                  <option value="assignment">Assignment</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 top-6">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* File upload section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Upload Paper</h2>
                <span className="text-gray-400 text-sm">PDF files only (max 5MB)</span>
              </div>
              
              {file ? (
                <div className="bg-[#2c3542] rounded-md p-6 transition-all duration-300">
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
                  className={`border-2 border-dashed rounded-md p-12 flex flex-col items-center justify-center transition-all duration-300 ${
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
                  <p className="text-gray-500 text-sm mb-6">or</p>

                  <label className="bg-blue-600 text-white px-6 py-3 rounded-md cursor-pointer hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
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

            {/* Feedback Preview Modal */}
            {showPreview && feedbackPreview && (
              <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                <div className="bg-[#2c2c2c] p-6 rounded-lg max-w-2xl w-full mx-4 relative">
                  <div className="absolute top-4 right-4">
                    <button 
                      onClick={() => setShowPreview(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Preliminary Analysis</h2>
                    <div className="flex items-center">
                      <div className="animate-pulse mr-2">
                        <span className="inline-block h-2 w-2 rounded-full bg-green-500"></span>
                      </div>
                      <span className="text-green-500 text-sm">Analysis in progress...</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="col-span-2">
                      <div className="bg-[#1e2d3d] p-4 rounded-md mb-4">
                        <h3 className="font-medium mb-2 text-blue-400">Strengths</h3>
                        <ul className="list-disc pl-5 space-y-1 text-gray-300">
                          {feedbackPreview.strengths.map((strength, i) => (
                            <li key={i}>{strength}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-[#1e2d3d] p-4 rounded-md">
                        <h3 className="font-medium mb-2 text-red-400">Areas for Improvement</h3>
                        <ul className="list-disc pl-5 space-y-1 text-gray-300">
                          {feedbackPreview.weaknesses.map((weakness, i) => (
                            <li key={i}>{weakness}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div>
                      <div className="bg-[#1e2d3d] p-4 rounded-md h-full flex flex-col">
                        <h3 className="font-medium mb-4 text-center">Preliminary Score</h3>
                        <div className="flex-1 flex items-center justify-center">
                          <div className="relative w-32 h-32">
                            <svg className="w-full h-full" viewBox="0 0 36 36">
                              <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#444"
                                strokeWidth="3"
                                strokeDasharray="100, 100"
                              />
                              <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke={feedbackPreview.score >= 90 ? "#10B981" : feedbackPreview.score >= 80 ? "#3B82F6" : feedbackPreview.score >= 70 ? "#F59E0B" : "#EF4444"}
                                strokeWidth="3"
                                strokeDasharray={`${feedbackPreview.score}, 100`}
                              />
                              <text x="18" y="20.5" className="text-5xl font-bold" textAnchor="middle" fill="white">
                                {feedbackPreview.score}
                              </text>
                            </svg>
                          </div>
                }
            
            {/* Information cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-[#2c3542] p-6 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M13 10V3L4 14h7v7l9-11h-7z" 
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Fast Analysis</h3>
                <p className="text-gray-400">Get feedback on your paper in less than 30 minutes</p>
              </div>
              
              <div className="bg-[#2c3542] p-6 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="bg-green-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Private & Secure</h3>
                <p className="text-gray-400">Your papers are encrypted and never shared with third parties</p>
              </div>
              
              <div className="bg-[#2c3542] p-6 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="bg-blue-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" 
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">In-depth Feedback</h3>
                <p className="text-gray-400">Receive detailed comments, corrections, and improvement suggestions</p>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Testimonials */}
      <section className="bg-gradient-to-b from-[#0c1019] to-[#1a1a1a] py-16">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-2xl font-bold text-center mb-12">What Students Say About Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#2c3542] p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center font-bold text-lg">
                  JS
                </div>
                <div className="ml-4">
                  <p className="font-medium">Jessica S.</p>
                  <p className="text-gray-400 text-sm">Computer Science Student</p>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300">"PaperCheck helped me improve my algorithm analysis paper. The feedback was detailed and helped me understand where I was going wrong with my proofs."</p>
            </div>
            
            <div className="bg-[#2c3542] p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center font-bold text-lg">
                  DK
                </div>
                <div className="ml-4">
                  <p className="font-medium">David K.</p>
                  <p className="text-gray-400 text-sm">Biology Major</p>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300">"The feedback I received on my molecular biology essay was incredible. Not only did they point out mistakes, but they also provided additional resources to help me understand complex concepts."</p>
            </div>
            
            <div className="bg-[#2c3542] p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center font-bold text-lg">
                  AT
                </div>
                <div className="ml-4">
                  <p className="font-medium">Amelia T.</p>
                  <p className="text-gray-400 text-sm">Mathematics Student</p>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-3">
                {[...Array(4)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <p className="text-gray-300">"Fast turnaround and accurate feedback on my calculus exam. Some of the explanations could have been more detailed, but overall it helped me improve my grade significantly."</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#1a1a1a] py-16">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-2xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {[
              {
                question: "How long does it take to get feedback?",
                answer: "Most submissions receive feedback within 1-2 hours, with a maximum wait time of 24 hours for complex papers or during peak periods."
              },
              {
                question: "What types of papers can I submit?",
                answer: "You can submit any academic paper including essays, research papers, lab reports, problem sets, and exam papers across all subjects offered."
              },
              {
                question: "Is my paper checked by AI or humans?",
                answer: "We use a hybrid approach. Advanced AI analyzes your paper first, then subject matter experts review the AI's feedback to ensure accuracy and quality."
              },
              {
                question: "How does PaperCheck handle plagiarism?",
                answer: "While we primarily focus on content analysis, we do include basic plagiarism detection. For comprehensive plagiarism checking, we recommend using dedicated services."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-[#2c3542] rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-3 flex justify-between items-center">
                    {faq.question}
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </h3>
                  <p className="text-gray-400">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-6">Still have questions? We're here to help!</p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-all duration-300 inline-flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Contact Support
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-b from-[#1a1a1a] to-[#0c1019] py-16">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-blue-500 mb-2">25k+</p>
              <p className="text-gray-400">Papers Checked</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-green-500 mb-2">98%</p>
              <p className="text-gray-400">Satisfaction Rate</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-purple-500 mb-2">2.5h</p>
              <p className="text-gray-400">Average Response Time</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-yellow-500 mb-2">150+</p>
              <p className="text-gray-400">Supported Universities</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA before Footer */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to improve your academic performance?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of students who are achieving better grades with PaperCheck</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-md font-bold hover:bg-gray-100 transition-all duration-300">
              Get Started Now
            </button>
            <button className="bg-blue-700 text-white px-8 py-4 rounded-md font-bold hover:bg-blue-800 transition-all duration-300">
              View Pricing Plans
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">PaperCheck</h3>
              <p className="text-gray-400 mb-4">Helping students achieve academic excellence through AI-powered paper analysis and feedback.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Testimonials</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Tutorials</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">API Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Stay Updated</h3>
              <p className="text-gray-400 mb-4">Subscribe to our newsletter for tips, news and updates</p>
              <div className="flex">
                <input type="email" placeholder="Your email" className="bg-[#2c3542] text-white p-3 rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-blue-500" />
                <button className="bg-blue-600 text-white p-3 rounded-r-md hover:bg-blue-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>© 2025 PaperCheck. All rights reserved.</p>
            <div className="flex justify-center mt-4 space-x-4">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
              <a href="#" className="hover:text-white">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
