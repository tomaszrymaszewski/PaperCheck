"use client";

import { useState } from 'react';

export default function MathCheck({ userId }) {
  const [file, setFile] = useState(null);
  const [module, setModule] = useState('');
  const [uploading, setUploading] = useState(false);
  const [fileError, setFileError] = useState('');

  // Options for math modules
  const moduleOptions = [
    'Algebra', 
    'Calculus', 
    'Statistics', 
    'Geometry', 
    'Linear Algebra', 
    'Number Theory'
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setFileError('');
      } else {
        setFile(null);
        setFileError('Please upload only PDF files');
      }
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!file || !module) {
      setFileError('Please select a file and a module');
      return;
    }
    
    setUploading(true);
    
    try {
      // Here you would normally upload the file to Firebase Storage
      // and save the metadata to Firestore
      console.log('Uploading file:', file.name);
      console.log('Module:', module);
      console.log('User ID:', userId);
      
      // Simulating an upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Upload successful! Your paper has been submitted for analysis.');
      
      // Reset form
      setFile(null);
      setModule('');
    } catch (error) {
      console.error('Error uploading file:', error);
      setFileError('An error occurred while uploading your file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Upload Your Math Paper</h2>
      
      <form onSubmit={handleUpload} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Mathematics Module
          </label>
          <select
            value={module}
            onChange={(e) => setModule(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="" disabled>Select a module</option>
            {moduleOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Upload PDF (Max 10MB)
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-400">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-gray-700 rounded-md font-medium text-indigo-400 hover:text-indigo-300 focus-within:outline-none"
                >
                  <span className="px-2 py-1">Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept="application/pdf"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-400">PDF up to 10MB</p>
            </div>
          </div>
          {file && (
            <p className="mt-2 text-sm text-green-400">
              Selected file: {file.name}
            </p>
          )}
          {fileError && (
            <p className="mt-2 text-sm text-red-400">
              {fileError}
            </p>
          )}
        </div>
        
        <div>
          <button
            type="submit"
            disabled={uploading || !file || !module}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Analyze Paper'}
          </button>
        </div>
      </form>
    </div>
  );
}
