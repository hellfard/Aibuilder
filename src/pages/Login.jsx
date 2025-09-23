import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Mail, MessageCircle, ArrowLeft } from 'lucide-react';
import { signInWithGoogle, signInWithGitHub } from '../services/auth.js';
import { useStore } from '../stores/useStore.js';
import toast from 'react-hot-toast';

export const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useStore();
  const [isSigningIn, setIsSigningIn] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleGoogleSignIn = async () => {
    try {
      setIsSigningIn(true);
      await signInWithGoogle(true);
      toast.success('Successfully signed in with Google!');
    } catch (error) {
      console.error('Google sign in error:', error);
      toast.error('Failed to sign in with Google. Please try again.');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleGitHubSignIn = async () => {
    try {
      setIsSigningIn(true);
      await signInWithGitHub(true);
      toast.success('Successfully signed in with GitHub!');
    } catch (error) {
      console.error('GitHub sign in error:', error);
      toast.error('Failed to sign in with GitHub. Please try again.');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleDiscordSignIn = () => {
    toast.info('Discord authentication coming soon!');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to home
            </Link>
            
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg mr-3"></div>
              <span className="text-2xl font-bold">BuilderAI</span>
            </div>
            
            <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
            <p className="text-gray-400">Sign in to your account to continue building</p>
          </div>

          <div className="space-y-4">
            {/* Google Sign In */}
            <button 
              onClick={handleGoogleSignIn}
              disabled={isSigningIn}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg hover:border-gray-500 hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Mail className="w-5 h-5 mr-3 text-red-500" />
              <span>{isSigningIn ? 'Signing in...' : 'Continue with Google'}</span>
            </button>

            {/* GitHub Sign In */}
            <button 
              onClick={handleGitHubSignIn}
              disabled={isSigningIn}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg hover:border-gray-500 hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Github className="w-5 h-5 mr-3" />
              <span>{isSigningIn ? 'Signing in...' : 'Continue with GitHub'}</span>
            </button>

            {/* Discord Sign In */}
            <button 
              onClick={handleDiscordSignIn}
              disabled={isSigningIn}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg hover:border-gray-500 hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <MessageCircle className="w-5 h-5 mr-3 text-indigo-500" />
              <span>Continue with Discord</span>
            </button>
          </div>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black text-gray-400">Email authentication coming soon</span>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-400">
            Don't have an account? Just sign in and we'll create one for you!
          </p>

          <div className="mt-8 pt-6 border-t border-gray-800 text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our{' '}
              <a href="#" className="text-purple-400 hover:text-purple-300">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-purple-400 hover:text-purple-300">Privacy Policy</a>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-purple-900 via-gray-900 to-black items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-center max-w-lg"
        >
          <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl mx-auto mb-8 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-white rounded-lg"></div>
          </div>
          
          <h2 className="text-3xl font-bold mb-4">
            Build the future with AI
          </h2>
          <p className="text-gray-300 text-lg">
            Join thousands of creators who are building amazing websites with our AI-powered platform.
          </p>
          
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-400">1M+</div>
              <div className="text-sm text-gray-400">Websites Created</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">50K+</div>
              <div className="text-sm text-gray-400">Active Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">99.9%</div>
              <div className="text-sm text-gray-400">Uptime</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};