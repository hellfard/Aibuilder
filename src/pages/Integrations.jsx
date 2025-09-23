import React, { useState } from 'react';
import { Plug, Search, Check, Settings, Star, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export const Integrations = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All', count: 24 },
    { id: 'analytics', name: 'Analytics', count: 6 },
    { id: 'payment', name: 'Payments', count: 5 },
    { id: 'email', name: 'Email', count: 4 },
    { id: 'social', name: 'Social Media', count: 3 },
    { id: 'productivity', name: 'Productivity', count: 6 }
  ];

  const integrations = [
    {
      id: 1,
      name: 'Google Analytics',
      category: 'analytics',
      description: 'Track website traffic and user behavior with detailed analytics',
      logo: '📊',
      connected: true,
      popular: true,
      rating: 4.9,
      users: '2M+'
    },
    {
      id: 2,
      name: 'Stripe',
      category: 'payment',
      description: 'Accept online payments with secure checkout flows',
      logo: '💳',
      connected: false,
      popular: true,
      rating: 4.8,
      users: '1.5M+'
    },
    {
      id: 3,
      name: 'Mailchimp',
      category: 'email',
      description: 'Email marketing automation and newsletter management',
      logo: '📧',
      connected: true,
      popular: false,
      rating: 4.7,
      users: '800K+'
    },
    {
      id: 4,
      name: 'Facebook Pixel',
      category: 'analytics',
      description: 'Track conversions and optimize Facebook ad campaigns',
      logo: '📱',
      connected: false,
      popular: true,
      rating: 4.6,
      users: '1.2M+'
    },
    {
      id: 5,
      name: 'PayPal',
      category: 'payment',
      description: 'Accept PayPal payments and improve checkout conversion',
      logo: '💰',
      connected: false,
      popular: false,
      rating: 4.5,
      users: '600K+'
    },
    {
      id: 6,
      name: 'Zapier',
      category: 'productivity',
      description: 'Connect your website to 5000+ apps with automated workflows',
      logo: '⚡',
      connected: false,
      popular: true,
      rating: 4.8,
      users: '500K+'
    },
    {
      id: 7,
      name: 'Hotjar',
      category: 'analytics',
      description: 'Understand user behavior with heatmaps and session recordings',
      logo: '🔥',
      connected: false,
      popular: false,
      rating: 4.7,
      users: '400K+'
    },
    {
      id: 8,
      name: 'ConvertKit',
      category: 'email',
      description: 'Email marketing platform designed for creators',
      logo: '✉️',
      connected: false,
      popular: false,
      rating: 4.6,
      users: '200K+'
    }
  ];

  const filteredIntegrations = integrations.filter(integration => {
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-6 bg-black text-white min-h-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2 flex items-center">
            <Plug className="w-7 h-7 mr-3 text-purple-400" />
            Integrations
          </h1>
          <p className="text-gray-400">
            Connect your website to powerful tools and services
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search integrations..."
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

        {/* Connected Integrations Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Connected</p>
                <p className="text-2xl font-bold text-green-400">
                  {integrations.filter(i => i.connected).length}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-950/50 rounded-lg flex items-center justify-center">
                <Check className="w-5 h-5 text-green-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Available</p>
                <p className="text-2xl font-bold text-blue-400">{integrations.length}</p>
              </div>
              <div className="w-10 h-10 bg-blue-950/50 rounded-lg flex items-center justify-center">
                <Plug className="w-5 h-5 text-blue-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Popular</p>
                <p className="text-2xl font-bold text-purple-400">
                  {integrations.filter(i => i.popular).length}
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-950/50 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIntegrations.map((integration, index) => (
            <motion.div
              key={integration.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gray-900 border rounded-lg p-6 hover:shadow-lg transition-all ${
                integration.connected 
                  ? 'border-green-500/50 bg-green-950/10' 
                  : 'border-gray-800 hover:border-purple-500'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-2xl">
                    {integration.logo}
                  </div>
                  <div>
                    <h3 className="font-semibold flex items-center">
                      {integration.name}
                      {integration.popular && (
                        <Zap className="w-4 h-4 ml-2 text-yellow-400" />
                      )}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span>{integration.rating}</span>
                      <span>•</span>
                      <span>{integration.users} users</span>
                    </div>
                  </div>
                </div>
                
                {integration.connected ? (
                  <div className="flex items-center space-x-1 text-green-400">
                    <Check className="w-4 h-4" />
                    <span className="text-xs">Connected</span>
                  </div>
                ) : null}
              </div>
              
              <p className="text-gray-400 text-sm mb-4">
                {integration.description}
              </p>
              
              <div className="flex space-x-2">
                <button className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  integration.connected
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-white text-black hover:bg-gray-100'
                }`}>
                  {integration.connected ? 'Disconnect' : 'Connect'}
                </button>
                
                <button className="p-2 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors">
                  <Settings className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Integration CTA */}
        <div className="mt-12 p-6 border border-gray-800 rounded-lg text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <Plug className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Need a Custom Integration?</h3>
          <p className="text-gray-400 mb-4 max-w-md mx-auto">
            Can't find what you're looking for? We can build custom integrations for your specific needs.
          </p>
          <button className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
            Request Integration
          </button>
        </div>
      </div>
    </div>
  );
};
