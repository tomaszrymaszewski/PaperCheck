'use client';

import { useState } from 'react';
import { useAuth } from './AuthContext';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (isSignUp && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      setLoading(true);
      
      if (isSignUp) {
        // Handle signup
        const result = await signup(email, password);
        if (!result.success) {
          setError(result.error || 'Failed to create account');
        }
      } else {
        // Handle login
        const result = await login(email, password);
        if (!result.success) {
          setError(result.error || 'Invalid email or password');
        }
      }
    } catch (error) {
      setError('An unexpected error occurred');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError('');
  };

  return (
    <div className="bg-[#1e2d3d] p-8 rounded-lg max-w-md w-full mx-auto shadow-xl">
      <div className="flex justify-center mb-8">
        <div className="flex items-center">
          <div className="text-2xl font-bold text-blue-500">Math</div>
          <div className="text-2xl font-bold text-white">Check</div>
          <div className="ml-2 px-2 py-1 text-xs bg-blue-500 text-white rounded-md">PRO</div>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        {isSignUp ? 'Create an Account' : 'Welcome Back'}
      </h2>
      
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-md mb-6">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm text-gray-400 mb-2">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#2c3542] text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm text-gray-400 mb-2">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#2c3542] text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        {isSignUp && (
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm text-gray-400 mb-2">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-[#2c3542] text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        )}
        
        <button
          type="submit"
          className={`w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition-colors mt-2 flex justify-center items-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {isSignUp ? 'Creating Account...' : 'Logging In...'}
            </>
          ) : (
            <>{isSignUp ? 'Sign Up' : 'Log In'}</>
          )}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <button 
          onClick={toggleMode} 
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          {isSignUp 
            ? 'Already have an account? Log In' 
            : 'Don\'t have an account? Sign Up'}
        </button>
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-700">
        <div className="text-center text-gray-400 text-sm">
          <p>MathCheck uses AI to analyze your mathematics papers and provide detailed feedback to improve your skills.</p>
        </div>
      </div>
    </div>
  );
}
