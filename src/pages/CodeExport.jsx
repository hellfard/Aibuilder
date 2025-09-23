import React, { useState } from 'react';
import { Code, Download, Copy, FileText, Settings, Play } from 'lucide-react';
import { motion } from 'framer-motion';

export const CodeExport = () => {
  const [selectedFormat, setSelectedFormat] = useState('react');
  const [includeStyles, setIncludeStyles] = useState(true);
  const [minifyCode, setMinifyCode] = useState(false);
  const [includeComments, setIncludeComments] = useState(true);

  const exportFormats = [
    {
      id: 'react',
      name: 'React + TypeScript',
      description: 'Modern React components with TypeScript',
      icon: '⚛️',
      popular: true
    },
    {
      id: 'html',
      name: 'HTML + CSS',
      description: 'Static HTML with vanilla CSS',
      icon: '🌐',
      popular: true
    },
    {
      id: 'vue',
      name: 'Vue.js',
      description: 'Vue components with Composition API',
      icon: '💚',
      popular: false
    },
    {
      id: 'angular',
      name: 'Angular',
      description: 'Angular components with TypeScript',
      icon: '🅰️',
      popular: false
    },
    {
      id: 'svelte',
      name: 'Svelte',
      description: 'Lightweight Svelte components',
      icon: '🔥',
      popular: false
    },
    {
      id: 'tailwind',
      name: 'Tailwind CSS',
      description: 'Utility-first CSS framework',
      icon: '🎨',
      popular: true
    }
  ];

  const codePreview = `// Generated React Component
import React from 'react';
import { ArrowRight } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Build Stunning Websites with AI
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Create professional websites in minutes with our 
          AI-powered drag-and-drop builder.
        </p>
        <button className="bg-white text-black px-8 py-4 
                          rounded-lg font-semibold flex items-center 
                          gap-2 mx-auto hover:bg-gray-100 transition-colors">
          Get Started Free
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};`;

  return (
    <div className="p-6 bg-black text-white min-h-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2 flex items-center">
            <Code className="w-7 h-7 mr-3 text-purple-400" />
            Code Export
          </h1>
          <p className="text-gray-400">
            Export your designs as clean, production-ready code
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Export Options */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-purple-400" />
                Export Settings
              </h3>
              
              {/* Format Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Export Format
                </label>
                <div className="space-y-2">
                  {exportFormats.map((format) => (
                    <button
                      key={format.id}
                      onClick={() => setSelectedFormat(format.id)}
                      className={`w-full p-3 rounded-lg border transition-colors text-left ${
                        selectedFormat === format.id
                          ? 'border-purple-500 bg-purple-950/20'
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{format.icon}</span>
                          <div>
                            <div className="font-medium flex items-center">
                              {format.name}
                              {format.popular && (
                                <span className="ml-2 text-xs bg-purple-600 text-white px-2 py-1 rounded">
                                  Popular
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-gray-400">
                              {format.description}
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Options */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-300">
                    Include Styles
                  </label>
                  <input
                    type="checkbox"
                    checked={includeStyles}
                    onChange={(e) => setIncludeStyles(e.target.checked)}
                    className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-300">
                    Minify Code
                  </label>
                  <input
                    type="checkbox"
                    checked={minifyCode}
                    onChange={(e) => setMinifyCode(e.target.checked)}
                    className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-300">
                    Include Comments
                  </label>
                  <input
                    type="checkbox"
                    checked={includeComments}
                    onChange={(e) => setIncludeComments(e.target.checked)}
                    className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded"
                  />
                </div>
              </div>

              {/* Export Actions */}
              <div className="mt-6 space-y-3">
                <button className="w-full bg-white text-black py-3 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Download ZIP</span>
                </button>
                
                <button className="w-full bg-gray-800 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2">
                  <Copy className="w-4 h-4" />
                  <span>Copy to Clipboard</span>
                </button>
                
                <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2">
                  <Play className="w-4 h-4" />
                  <span>Live Preview</span>
                </button>
              </div>
            </div>

            {/* Export Stats */}
            <div className="mt-6 bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h3 className="font-semibold mb-4">Export Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Components</span>
                  <span>5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Lines of Code</span>
                  <span>342</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">File Size</span>
                  <span>12.5 KB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Dependencies</span>
                  <span>3</span>
                </div>
              </div>
            </div>
          </div>

          {/* Code Preview */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium">HeroSection.tsx</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-1 text-gray-400 hover:text-white transition-colors">
                    <Copy className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-white transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="p-4 overflow-x-auto">
                <pre className="text-sm text-gray-300 leading-relaxed">
                  <code>{codePreview}</code>
                </pre>
              </div>
            </div>

            {/* File Structure */}
            <div className="mt-6 bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h3 className="font-semibold mb-4">Generated File Structure</h3>
              <div className="space-y-2 text-sm font-mono">
                <div className="text-gray-400">📁 src/</div>
                <div className="text-gray-400 ml-4">📁 components/</div>
                <div className="text-white ml-8">📄 HeroSection.tsx</div>
                <div className="text-white ml-8">📄 NavbarComponent.tsx</div>
                <div className="text-white ml-8">📄 FeatureSection.tsx</div>
                <div className="text-gray-400 ml-4">📁 styles/</div>
                <div className="text-white ml-8">📄 globals.css</div>
                <div className="text-white ml-8">📄 components.css</div>
                <div className="text-white ml-4">📄 App.tsx</div>
                <div className="text-white ml-4">📄 index.tsx</div>
                <div className="text-white">📄 package.json</div>
                <div className="text-white">📄 README.md</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
