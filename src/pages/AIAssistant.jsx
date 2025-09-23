import React, { useState } from 'react';
import { Bot, Send, Sparkles, Layout, Palette, Type, Image, Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const AIAssistant = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const suggestions = [
    {
      icon: <Layout className="w-5 h-5" />,
      title: "Create a landing page",
      description: "for a SaaS product with hero, features, and pricing",
      prompt: "Create a modern SaaS landing page with hero section, 3 key features, testimonials, and pricing table"
    },
    {
      icon: <Palette className="w-5 h-5" />,
      title: "Design a portfolio",
      description: "showcase with project gallery and about section",
      prompt: "Design a creative portfolio website with project gallery, about section, and contact form"
    },
    {
      icon: <Type className="w-5 h-5" />,
      title: "Build a blog layout",
      description: "with article listings and sidebar",
      prompt: "Create a clean blog layout with featured articles, category sidebar, and newsletter signup"
    },
    {
      icon: <Image className="w-5 h-5" />,
      title: "Generate content",
      description: "copy and images for any section",
      prompt: "Generate engaging copy and select appropriate images for a fitness app landing page"
    }
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      setPrompt('');
    }, 3000);
  };

  return (
    <div className="p-6 bg-black text-white min-h-full">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl mb-4">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">AI Assistant</h1>
          <p className="text-gray-400 text-lg">
            Describe what you want to build and I'll create it for you
          </p>
        </div>

        {/* Quick Suggestions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-purple-400" />
            Quick Start Ideas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suggestions.map((suggestion, index) => (
              <motion.button
                key={suggestion.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setPrompt(suggestion.prompt)}
                className="p-4 border border-gray-800 rounded-lg hover:border-purple-500 hover:bg-purple-950/20 transition-colors text-left group"
              >
                <div className="flex items-start space-x-3">
                  <div className="text-purple-400 group-hover:text-purple-300 transition-colors">
                    {suggestion.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-white group-hover:text-purple-100 transition-colors">
                      {suggestion.title}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                      {suggestion.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* AI Prompt Input */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Wand2 className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want to build... (e.g., 'Create a modern restaurant website with menu, gallery, and reservation form')"
                className="w-full bg-transparent text-white placeholder-gray-400 resize-none focus:outline-none"
                rows={3}
              />
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-500">
                  {prompt.length}/500 characters
                </div>
                <button
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || isGenerating}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                    prompt.trim() && !isGenerating
                      ? 'bg-white text-black hover:bg-gray-100'
                      : 'bg-gray-800 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Generate</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* AI Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border border-gray-800 rounded-lg">
            <div className="w-12 h-12 bg-purple-950/50 rounded-lg flex items-center justify-center mb-4">
              <Layout className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="font-semibold mb-2">Smart Layouts</h3>
            <p className="text-gray-400 text-sm">
              Generate complete page layouts with optimized component placement and responsive design.
            </p>
          </div>

          <div className="p-6 border border-gray-800 rounded-lg">
            <div className="w-12 h-12 bg-purple-950/50 rounded-lg flex items-center justify-center mb-4">
              <Type className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="font-semibold mb-2">Content Generation</h3>
            <p className="text-gray-400 text-sm">
              Create compelling copy, headlines, and descriptions that match your brand voice.
            </p>
          </div>

          <div className="p-6 border border-gray-800 rounded-lg">
            <div className="w-12 h-12 bg-purple-950/50 rounded-lg flex items-center justify-center mb-4">
              <Palette className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="font-semibold mb-2">Design System</h3>
            <p className="text-gray-400 text-sm">
              Automatically apply consistent colors, typography, and spacing throughout your site.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
