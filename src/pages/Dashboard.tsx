import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, Eye, Edit, Trash2 } from 'lucide-react';
import { useStore } from '../stores/useStore';

export const Dashboard: React.FC = () => {
  const { projects } = useStore();

  return (
    <div className="p-4 sm:p-6 bg-black min-h-full">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Your Projects
            </h1>
            <p className="text-gray-400 mt-1">
              Create and manage your websites
            </p>
          </div>
          
          <Link
            to="/start"
            className="bg-white text-black px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-100 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </Link>
        </div>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full pl-10 pr-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-white focus:border-transparent"
          />
        </div>
        
        <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-700 rounded-lg hover:bg-gray-900 transition-colors text-white">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-800 rounded-lg mx-auto mb-4 flex items-center justify-center">
            <Plus className="w-8 h-8 text-gray-600" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">
            No projects yet
          </h3>
          <p className="text-gray-400 mb-6">
            Get started by creating your first website
          </p>
          <Link
            to="/start"
            className="bg-white text-black px-6 py-3 rounded-lg inline-flex items-center space-x-2 hover:bg-gray-100 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create Project</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="h-48 bg-gray-800 flex items-center justify-center">
                <div className="text-gray-600">Project Preview</div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-white mb-1">
                  {project.name}
                </h3>
                <p className="text-sm text-gray-400 mb-3">
                  {project.description || 'No description'}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>Updated {new Date(project.updated_at).toLocaleDateString()}</span>
                  <span className={`px-2 py-1 rounded-full ${
                    project.published 
                      ? 'bg-green-900 text-green-300'
                      : 'bg-gray-800 text-gray-400'
                  }`}>
                    {project.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-sm bg-white text-black rounded-md hover:bg-gray-100 transition-colors">
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  
                  <button className="p-2 text-gray-400 hover:text-gray-200 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  
                  <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
