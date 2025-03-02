"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function PaperCheck() {
  const [subject, setSubject] = useState('');
  const [module, setModule] = useState('');
  const [exam, setExam] = useState('');
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

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

  const handleSubmit = () => {
    if (!subject || !module || !exam || !file) {
      alert('Please fill all fields and upload a file');
      return;
    }

    // Here you would handle the file upload to your backend
    console.log('Submitting:', { subject, module, exam, file });

    // Mock submission success
    alert('Paper submitted for checking!');
  };

  return (
      <div className="min-h-screen bg-[#1c1c1c] text-white">
        {/* Header */}
        <nav className="flex justify-between items-center p-4 px-8">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold">PaperCheck</h1>
            <span className="text-blue-500 ml-2 text-sm">BETA</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-300 hover:text-white">How to use</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Support us
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto p-8">
          {/* Selection dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="relative">
              <select
                  className="w-full bg-[#2c3542] text-gray-300 p-4 rounded-md appearance-none cursor-pointer"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
              >
                <option value="" disabled>Select Subject</option>
                <option value="math">Mathematics</option>
                <option value="science">Science</option>
                <option value="english">English</option>
                <option value="history">History</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="relative">
              <select
                  className="w-full bg-[#2c3542] text-gray-300 p-4 rounded-md appearance-none cursor-pointer"
                  value={module}
                  onChange={(e) => setModule(e.target.value)}
              >
                <option value="" disabled>Select Module</option>
                <option value="module1">Module 1</option>
                <option value="module2">Module 2</option>
                <option value="module3">Module 3</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="relative">
              <select
                  className="w-full bg-[#2c3542] text-gray-300 p-4 rounded-md appearance-none cursor-pointer"
                  value={exam}
                  onChange={(e) => setExam(e.target.value)}
              >
                <option value="" disabled>Select Exam</option>
                <option value="midterm">Midterm</option>
                <option value="final">Final</option>
                <option value="quiz">Quiz</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* File upload section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Upload Files</h2>
            <div
                className={`border-2 border-dashed rounded-md p-12 flex flex-col items-center justify-center ${
                    isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
              <div className="text-gray-400 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <p className="text-center mb-4">Drag and Drop files here</p>
              <p className="text-gray-500 text-sm mb-4">Files Supported: PDF</p>

              <label className="bg-[#2c3542] text-white px-4 py-2 rounded-md cursor-pointer hover:bg-[#3c4552]">
                Choose File
                <input
                    type="file"
                    className="hidden"
                    accept="application/pdf"
                    onChange={handleFileChange}
                />
              </label>

              {file && (
                  <div className="mt-4 text-green-500">
                    Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </div>
              )}

              <p className="text-gray-500 text-sm mt-4">Maximum size: 5MB</p>
            </div>
          </div>

          {/* Submit button */}
          <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white p-4 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Check Past Paper!
          </button>
        </main>
      </div>
  );
}