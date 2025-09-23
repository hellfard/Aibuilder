import React, { useState } from 'react';
import { History, Eye, RotateCcw, GitBranch, Clock, User } from 'lucide-react';
import { motion } from 'framer-motion';

export const VersionHistory = () => {
  const [selectedVersion, setSelectedVersion] = useState(null);

  const versions = [
    {
      id: '1',
      version: 'v1.5.2',
      message: 'Updated hero section with new CTA button',
      author: 'John Doe',
      date: '2025-01-11T14:30:00Z',
      changes: 12,
      type: 'minor',
      isCurrent: true
    },
    {
      id: '2',
      version: 'v1.5.1',
      message: 'Fixed responsive issues on mobile devices',
      author: 'John Doe',
      date: '2025-01-11T10:15:00Z',
      changes: 8,
      type: 'patch',
      isCurrent: false
    },
    {
      id: '3',
      version: 'v1.5.0',
      message: 'Added new pricing section and testimonials',
      author: 'Sarah Johnson',
      date: '2025-01-10T16:45:00Z',
      changes: 25,
      type: 'minor',
      isCurrent: false
    },
    {
      id: '4',
      version: 'v1.4.3',
      message: 'Improved page loading performance',
      author: 'Mike Chen',
      date: '2025-01-09T12:20:00Z',
      changes: 5,
      type: 'patch',
      isCurrent: false
    },
    {
      id: '5',
      version: 'v1.4.2',
      message: 'Updated navigation menu with new links',
      author: 'John Doe',
      date: '2025-01-08T09:30:00Z',
      changes: 3,
      type: 'patch',
      isCurrent: false
    },
    {
      id: '6',
      version: 'v1.4.1',
      message: 'Fixed contact form validation errors',
      author: 'Sarah Johnson',
      date: '2025-01-07T15:10:00Z',
      changes: 7,
      type: 'patch',
      isCurrent: false
    },
    {
      id: '7',
      version: 'v1.4.0',
      message: 'Major redesign with new brand colors and layout',
      author: 'Design Team',
      date: '2025-01-05T11:00:00Z',
      changes: 48,
      type: 'major',
      isCurrent: false
    }
  ];

  const getVersionTypeColor = (type: string) => {
    switch (type) {
      case 'major':
        return 'bg-red-600 text-white';
      case 'minor':
        return 'bg-blue-600 text-white';
      case 'patch':
        return 'bg-green-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
  };

  return (
    <div className="p-6 bg-black text-white min-h-full">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2 flex items-center">
            <History className="w-7 h-7 mr-3 text-purple-400" />
            Version History
          </h1>
          <p className="text-gray-400">
            Track changes and restore previous versions of your website
          </p>
        </div>

        {/* Current Version Info */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1">Current Version</h3>
              <p className="text-gray-400">You're working on version {versions[0].version}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Latest
              </span>
              <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                Save Version
              </button>
            </div>
          </div>
        </div>

        {/* Version Timeline */}
        <div className="space-y-4">
          {versions.map((version, index) => (
            <motion.div
              key={version.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-gray-900 border rounded-lg p-6 transition-all hover:shadow-lg ${
                selectedVersion === version.id 
                  ? 'border-purple-500 bg-purple-950/20' 
                  : 'border-gray-800 hover:border-gray-700'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  {/* Version Icon */}
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <GitBranch className="w-5 h-5 text-purple-400" />
                  </div>
                  
                  {/* Version Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold">{version.version}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getVersionTypeColor(version.type)}`}>
                        {version.type}
                      </span>
                      {version.isCurrent && (
                        <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">
                          Current
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-300 mb-3">{version.message}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{version.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{getTimeAgo(version.date)}</span>
                      </div>
                      <span>{version.changes} changes</span>
                    </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex items-center space-x-2 ml-4">
                  <button 
                    onClick={() => setSelectedVersion(selectedVersion === version.id ? null : version.id)}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  
                  {!version.isCurrent && (
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
              
              {/* Expanded Details */}
              {selectedVersion === version.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 pt-6 border-t border-gray-800"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Version Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Created:</span>
                          <span>{formatDate(version.date)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Author:</span>
                          <span>{version.author}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Changes:</span>
                          <span>{version.changes} files modified</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Type:</span>
                          <span className="capitalize">{version.type} release</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Actions</h4>
                      <div className="space-y-2">
                        <button className="w-full bg-white text-black py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors text-sm">
                          Preview Version
                        </button>
                        {!version.isCurrent && (
                          <button className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors text-sm">
                            Restore Version
                          </button>
                        )}
                        <button className="w-full border border-gray-600 text-gray-300 py-2 px-4 rounded-lg hover:border-gray-500 transition-colors text-sm">
                          Compare Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Version Management */}
        <div className="mt-8 bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h3 className="font-semibold mb-4">Version Management</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors text-center">
              <div className="w-8 h-8 bg-blue-950/50 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <GitBranch className="w-4 h-4 text-blue-400" />
              </div>
              <div className="font-medium">Create Branch</div>
              <div className="text-sm text-gray-400">Work on features separately</div>
            </button>
            
            <button className="p-4 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors text-center">
              <div className="w-8 h-8 bg-green-950/50 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <History className="w-4 h-4 text-green-400" />
              </div>
              <div className="font-medium">Auto-Save</div>
              <div className="text-sm text-gray-400">Enable automatic versioning</div>
            </button>
            
            <button className="p-4 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors text-center">
              <div className="w-8 h-8 bg-purple-950/50 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <RotateCcw className="w-4 h-4 text-purple-400" />
              </div>
              <div className="font-medium">Rollback</div>
              <div className="text-sm text-gray-400">Undo recent changes</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
