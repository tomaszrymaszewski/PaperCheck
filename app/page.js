"use client";

import { useState } from 'react';

export default function PaperCheck() {
  // Form state
  const [module, setModule] = useState('');
  const [exam, setExam] = useState('');
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Math modules
  const moduleOptions = ['Algebra', 'Calculus', 'Statistics', 'Geometry'];

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

  // Simulate upload progress
  const simulateUpload = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsSubmitting(false);
          setShowSuccess(true);
          setUploadProgress(0);
        }, 500);
      }
    }, 300);
  };

  const handleSubmit = () => {
    if (!module || !exam || !file) {
      alert('Please fill all fields and upload a file');
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
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(2) + ' MB';
  };

  return (
    <div className="min-h-screen bg-[#1c1c1c] text-white">
      {/* Header */}
      <nav className="flex justify-between items-center p-4 px-8 border-b border-gray-800">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold">MathCheck</h1>
          <span className="bg-blue-500 text-xs px-2 py-1 rounded-full ml-2">BETA</span>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Support us
        </button>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-8">
        {showSuccess ? (
          <div className="bg-[#2c3542] p-8 rounded-lg text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Paper Submitted Successfully!</h2>
            <p className="text-gray-300 mb-6">
              We've received your {exam.toLowerCase()} for {moduleOptions[parseInt(module)] || module}. 
              You'll receive feedback within 24 hours.
            </p>
            <button
              onClick={resetForm}
              className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700"
            >
              Submit Another Paper
            </button>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Check Your Math Papers</h2>
              <p className="text-gray-400">Upload your math papers for AI-powered analysis and feedback</p>
            </div>
            
            {/* Selection dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="relative">
                <label className="block text-sm text-gray-400 mb-2 ml-1">Module</label>
                <select
                  className="w-full bg-[#2c3542] text-gray-300 p-4 rounded-md appearance-none cursor-pointer"
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
                <label className="block text-sm text-gray-400 mb-2 ml-1">Exam Type</label>
                <select
                  className="w-full bg-[#2c3542] text-gray-300 p-4 rounded-md appearance-none cursor-pointer"
                  value={exam}
                  onChange={(e) => setExam(e.target.value)}
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
                <div className="bg-[#2c3542] rounded-md p-6">
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
                  className={`border-2 border-dashed rounded-md p-12 flex flex-col items-center justify-center ${
                    isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600 hover:border-gray-500'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="text-blue-400 mb-4">
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

                  <label className="bg-blue-600 text-white px-6 py-3 rounded-md cursor-pointer hover:bg-blue-700">
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

            {/* Submit button */}
            {isSubmitting ? (
              <div className="bg-blue-600/20 text-white p-4 rounded-md font-semibold mb-4">
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Uploading... {uploadProgress}%</span>
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
                className={`w-full p-4 rounded-md font-semibold ${
                  !module || !exam || !file
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Check Math Paper
              </button>
            )}

            {/* Information */}
            <div className="mt-8 bg-[#2c3542] p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">How MathCheck Works</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">1.</span>
                  <span>Upload your mathematics paper in PDF format</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">2.</span>
                  <span>Our AI analyzes your mathematical notation, proofs, and calculations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">3.</span>
                  <span>Receive detailed feedback on errors, improvements, and alternative approaches</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">4.</span>
                  <span>Use the insights to improve your mathematical understanding and grades</span>
                </li>
              </ul>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] py-6 mt-12 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-8 text-center text-gray-500 text-sm">
          <p>© 2025 MathCheck. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
