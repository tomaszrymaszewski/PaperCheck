"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, just check if email and password are not empty
      if (email && password) {
        if (isRegister) {
          // Store user in localStorage for demo purposes
          localStorage.setItem('mathCheckUserName', name);
        }
        
        // Call the onLogin function passed from parent
        if (onLogin) {
          onLogin(email, name);
        }
        
        // Important: Store auth status
        localStorage.setItem('mathCheckAuth', 'true');
        localStorage.setItem('mathCheckUserEmail', email);
        
        // Redirect to the main application
        router.push('/dashboard');
      } else {
        setError('Please enter valid credentials');
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#121212] text-white p-4">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center">
          <div className="text-2xl font-bold text-blue-500">Math</div>
          <div className="text-2xl font-bold">Check</div>
          <div className="ml-2 px-2 py-1 text-xs bg-blue-500 text-white rounded-md">PRO</div>
        </div>
      </header>

      <main className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          {isRegister ? 'Create Account' : 'Welcome Back'}
        </h1>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm text-gray-400 mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#2c3542] text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
                required={isRegister}
              />
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm text-gray-400 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#2c3542] text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm text-gray-400 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#2c3542] text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={isRegister ? "Create a password" : "Enter your password"}
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-600 text-white p-3 rounded-md font-semibold ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isRegister ? 'Creating Account...' : 'Logging In...'}
              </span>
            ) : (
              <>{isRegister ? 'Sign Up' : 'Log In'}</>
            )}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <button 
            onClick={() => setIsRegister(!isRegister)}
            className="text-gray-400 hover:text-blue-500"
          >
            {isRegister ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
          </button>
        </div>
        
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>MathCheck uses AI to analyze your mathematics papers and provide detailed feedback to improve your skills.</p>
        </div>
      </main>
    </div>
  );
}
