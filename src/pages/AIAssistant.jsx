import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Wand2, Palette, Layout, Type, MessageSquare, ArrowRight, Loader2 } from 'lucide-react';
import { useStore } from '../stores/useStore.js';
import { generateWebsiteLayout, generateContent, enhanceComponent } from '../gemini.js';
import toast from 'react-hot-toast';

export const AIAssistant = () => {
  const { user, currentProject, createProject, createPage, currentPage, addComponent, isGenerating } = useStore();
  const [selectedFeature, setSelectedFeature] = useState('generate');
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const aiFeatures = [
    {
      id: 'generate',
      title: 'Generate Website',
      description: 'Create a complete website layout from a description',
      icon: Layout,
      color: 'from-purple-500 to-indigo-600'
    },
    {
      id: 'enhance',
      title: 'Enhance Component',
      description: 'Improve existing components with AI suggestions',
      icon: Wand2,
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 'content',
      title: 'Generate Content',
      description: 'Create engaging copy for your website',
      icon: Type,
      color: 'from-green-500 to-blue-600'
    },
    {
      id: 'design',
      title: 'Design Suggestions',
      description: 'Get AI-powered design and color recommendations',
      icon: Palette,
      color: 'from-pink-500 to-red-600'
    }
  ];

  const handleGenerateWebsite = async () => {
    if (!prompt.trim()) {
      toast.error('Please describe what kind of website you want to create');
      return;
    }

    if (!user) {
      toast.error('Please sign in to use AI features');
      return;
    }

    try {
      setIsProcessing(true);
      
      const request = {
        description: prompt,
        industry: 'general',
        style: 'modern',
        colors: ['#6366f1', '#8b5cf6', '#06b6d4'],
        features: ['responsive', 'modern', 'accessible']
      };

      const result = await generateWebsiteLayout(request);
      
      // Create a new project
      const projectId = await createProject({
        name: result.page?.name || 'AI Generated Website',
        description: prompt,
        pages: [],
        theme: result.theme || {},
        published: false,
        domain: undefined
      });

      // Create the page
      const pageId = await createPage(projectId, {
        name: result.page?.name || 'Home',
        slug: result.page?.slug || 'home',
        components: result.components || [],
        seo: result.page?.seo || {
          title: result.page?.name || 'Home',
          description: prompt,
          keywords: []
        }
      });

      toast.success('Website generated successfully! Check your projects.');
      setPrompt('');
      
    } catch (error) {
      console.error('Website generation error:', error);
      toast.error('Failed to generate website. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGenerateContent = async () => {
    if (!prompt.trim()) {
      toast.error('Please describe what content you need');
      return;
    }

    try {
      setIsProcessing(true);
      const content = await generateContent('website content', prompt);
      
      // Copy to clipboard
      navigator.clipboard.writeText(content);
      toast.success('Content generated and copied to clipboard!');
      setPrompt('');
      
    } catch (error) {
      console.error('Content generation error:', error);
      toast.error('Failed to generate content. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEnhanceComponent = async () => {
    if (!currentPage?.components?.length) {
      toast.error('No components found to enhance. Create a page with components first.');
      return;
    }

    if (!prompt.trim()) {
      toast.error('Please describe how you want to enhance the component');
      return;
    }

    try {
      setIsProcessing(true);
      const component = currentPage.components[0]; // Enhance first component as example
      const enhanced = await enhanceComponent(component, prompt);
      
      // Add the enhanced component
      addComponent(enhanced);
      toast.success('Component enhanced successfully!');
      setPrompt('');
      
    } catch (error) {
      console.error('Component enhancement error:', error);
      toast.error('Failed to enhance component. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = async () => {
    switch (selectedFeature) {
      case 'generate':
        await handleGenerateWebsite();
        break;
      case 'content':
        await handleGenerateContent();
        break;
      case 'enhance':
        await handleEnhanceComponent();
        break;
      case 'design':
        toast.info('Design suggestions feature coming soon!');
        break;
      default:
        break;
    }
  };

  const getPromptPlaceholder = () => {
    switch (selectedFeature) {
      case 'generate':
        return 'Describe your website (e.g., "Create a modern portfolio website for a graphic designer with a dark theme")';
      case 'enhance':
        return 'Describe how to improve the component (e.g., "Make it more modern with better colors and typography")';
      case 'content':
        return 'Describe the content you need (e.g., "Write compelling hero text for a SaaS landing page")';
      case 'design':
        return 'Describe your design preferences (e.g., "Suggest a color scheme for a tech startup")';
      default:
        return 'Enter your request...';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center mb-4"
        >
          <Sparkles className="w-8 h-8 text-purple-500 mr-3" />
          <h1 className="text-3xl font-bold text-white">AI Assistant</h1>
        </motion.div>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Harness the power of artificial intelligence to create stunning websites, generate content, and enhance your designs.
        </p>
      </div>

      {/* Feature Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {aiFeatures.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.button
              key={feature.id}
              onClick={() => setSelectedFeature(feature.id)}
              className={`p-6 rounded-xl border text-left transition-all ${
                selectedFeature === feature.id
                  ? 'border-purple-500 bg-purple-500/10'
                  : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.description}</p>
            </motion.button>
          );
        })}
      </motion.div>

      {/* AI Prompt Interface */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-800/50 rounded-xl border border-gray-700 p-6"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {aiFeatures.find(f => f.id === selectedFeature)?.title}
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={getPromptPlaceholder()}
              className="w-full h-32 px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">
              {prompt.length}/500 characters
            </div>
            <button
              onClick={handleSubmit}
              disabled={isProcessing || !prompt.trim()}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-medium hover:from-purple-600 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
          <MessageSquare className="w-8 h-8 text-blue-500 mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Need Ideas?</h3>
          <p className="text-sm text-gray-400 mb-4">
            Not sure what to create? Get inspired with our AI-powered suggestions.
          </p>
          <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
            Get Suggestions →
          </button>
        </div>

        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
          <Layout className="w-8 h-8 text-green-500 mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Templates</h3>
          <p className="text-sm text-gray-400 mb-4">
            Start with professionally designed templates and customize with AI.
          </p>
          <button className="text-green-400 hover:text-green-300 text-sm font-medium">
            Browse Templates →
          </button>
        </div>

        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
          <Wand2 className="w-8 h-8 text-purple-500 mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">AI Tips</h3>
          <p className="text-sm text-gray-400 mb-4">
            Learn how to write better prompts for amazing AI-generated results.
          </p>
          <button className="text-purple-400 hover:text-purple-300 text-sm font-medium">
            Learn More →
          </button>
        </div>
      </motion.div>
    </div>
  );
};