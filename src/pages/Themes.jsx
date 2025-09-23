import React, { useState } from 'react';
import { Palette, Download, Eye, Star, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

export const Themes = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Themes', count: 24 },
    { id: 'business', name: 'Business', count: 8 },
    { id: 'portfolio', name: 'Portfolio', count: 6 },
    { id: 'ecommerce', name: 'E-commerce', count: 5 },
    { id: 'blog', name: 'Blog', count: 3 },
    { id: 'landing', name: 'Landing Page', count: 2 }
  ];

  const themes = [
    {
      id: 1,
      name: 'Modern SaaS',
      category: 'business',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Clean and modern design perfect for SaaS products',
      rating: 4.9,
      downloads: 1234,
      premium: false
    },
    {
      id: 2,
      name: 'Creative Studio',
      category: 'portfolio',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Showcase your creative work with this stunning portfolio theme',
      rating: 4.8,
      downloads: 987,
      premium: true
    },
    {
      id: 3,
      name: 'E-shop Pro',
      category: 'ecommerce',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Complete e-commerce solution with cart and checkout',
      rating: 4.7,
      downloads: 756,
      premium: true
    },
    {
      id: 4,
      name: 'Tech Startup',
      category: 'landing',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'High-converting landing page for tech startups',
      rating: 4.9,
      downloads: 2100,
      premium: false
    },
    {
      id: 5,
      name: 'Personal Blog',
      category: 'blog',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Minimal and elegant blog theme for content creators',
      rating: 4.6,
      downloads: 543,
      premium: false
    },
    {
      id: 6,
      name: 'Corporate Pro',
      category: 'business',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Professional corporate website with team and services sections',
      rating: 4.8,
      downloads: 876,
      premium: true
    }
  ];

  const filteredThemes = themes.filter(theme => {
    const matchesCategory = selectedCategory === 'all' || theme.category === selectedCategory;
    const matchesSearch = theme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         theme.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-6 bg-black text-white min-h-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2 flex items-center">
                <Palette className="w-7 h-7 mr-3 text-purple-400" />
                Themes & Templates
              </h1>
              <p className="text-gray-400">
                Choose from professionally designed themes or create your own
              </p>
            </div>
            <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              Upload Custom Theme
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search themes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Theme Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredThemes.map((theme, index) => (
            <motion.div
              key={theme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-purple-500 hover:shadow-lg transition-all group"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={theme.image} 
                  alt={theme.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                    <button className="p-2 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {theme.premium && (
                  <div className="absolute top-3 right-3 bg-purple-600 text-white px-2 py-1 rounded text-xs font-medium">
                    Pro
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white">{theme.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-400">{theme.rating}</span>
                  </div>
                </div>
                
                <p className="text-gray-400 text-sm mb-3">{theme.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {theme.downloads.toLocaleString()} downloads
                  </span>
                  <button className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    theme.premium
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}>
                    {theme.premium ? 'Use Pro Theme' : 'Use Free Theme'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Theme Section */}
        <div className="mt-12 p-6 border border-gray-800 rounded-lg text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <Palette className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Create Your Own Theme</h3>
          <p className="text-gray-400 mb-4 max-w-md mx-auto">
            Build a custom theme from scratch or modify an existing one to match your brand
          </p>
          <button className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
            Start Custom Theme
          </button>
        </div>
      </div>
    </div>
  );
};
