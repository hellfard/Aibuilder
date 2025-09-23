import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wand2, Code, Layers, Upload, Github, Sparkles } from 'lucide-react';

const FigmaIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.5 5.5H8.5C6.84315 5.5 5.5 6.84315 5.5 8.5V15.5C5.5 17.1569 6.84315 18.5 8.5 18.5H15.5C17.1569 18.5 18.5 17.1569 18.5 15.5V8.5C18.5 6.84315 17.1569 5.5 15.5 5.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 15.5C13.6569 15.5 15 14.1569 15 12.5C15 10.8431 13.6569 9.5 12 9.5V15.5Z" fill="currentColor"/>
    <path d="M12 9.5C10.3431 9.5 9 10.8431 9 12.5C9 14.1569 10.3431 15.5 12 15.5V9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


export const Start = () => {
  const [prompt, setPrompt] = useState('');

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-gray-900 [mask-image:linear-gradient(to_bottom,white_5%,transparent_90%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e336b33,transparent)]"></div>

      <div className="relative z-10 w-full max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="inline-flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl mr-4 flex items-center justify-center">
              <Wand2 className="w-8 h-8" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">AI Generator</h1>
          </div>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Describe the website you want to build, and let our AI bring it to life in seconds.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl blur-lg opacity-25 group-hover:opacity-50 transition duration-1000 animate-tilt"></div>
          
          <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl p-4 sm:p-6">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., A modern landing page for a new AI-powered photo editing app..."
              className="w-full h-32 sm:h-40 bg-transparent text-white placeholder-gray-500 resize-none focus:outline-none text-base sm:text-lg"
            />
            <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors" title="Upload Files">
                  <Upload className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors" title="Import from GitHub">
                  <Github className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors" title="Import from Figma">
                  <FigmaIcon />
                </button>
              </div>
              <button
                disabled={!prompt.trim()}
                className="w-full sm:w-auto bg-white text-black px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-5 h-5" />
                Generate
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 border border-gray-700 rounded-lg hover:bg-gray-900 transition-colors">
            <Code className="w-5 h-5" />
            <span>Code Preview</span>
          </button>
          <div className="text-gray-500">or</div>
          <Link
            to="/editor"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 border border-gray-700 rounded-lg hover:bg-gray-900 transition-colors"
          >
            <Layers className="w-5 h-5" />
            <span>Go to Editor</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};
