import React from 'react';
import { 
  Play, 
  Save, 
  Undo, 
  Redo, 
  Monitor, 
  Tablet, 
  Smartphone,
  Moon,
  Sun,
  Eye,
  Menu,
  X,
  Layers
} from 'lucide-react';
import { useStore } from '../../stores/useStore';
import { clsx } from 'clsx';

export const TopBar = () => {
  const { 
    currentProject, 
    isPreviewMode, 
    isDarkMode,
    isSidebarOpen,
    setPreviewMode, 
    toggleDarkMode,
    toggleSidebar
  } = useStore();

  return (
    <div className="h-16 bg-black border-b border-gray-800 flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center space-x-4">
        <button onClick={toggleSidebar} className="lg:hidden p-2 text-gray-400 hover:text-white">
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <h1 className="text-lg font-semibold text-white">
          {currentProject?.name || 'Untitled Project'}
        </h1>
      </div>

      <div className="flex items-center space-x-1 sm:space-x-2">
        {/* Preview Controls */}
        <div className="hidden sm:flex items-center bg-gray-800 rounded-lg p-1">
          <button 
            className={clsx(
              'p-2 rounded-md transition-colors',
              !isPreviewMode 
                ? 'bg-black text-white shadow-sm' 
                : 'text-gray-400 hover:text-white'
            )}
            onClick={() => setPreviewMode(false)}
          >
            <Layers className="w-4 h-4" />
          </button>
          <button 
            className={clsx(
              'p-2 rounded-md transition-colors',
              isPreviewMode 
                ? 'bg-black text-white shadow-sm' 
                : 'text-gray-400 hover:text-white'
            )}
            onClick={() => setPreviewMode(true)}
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Device Preview */}
        <div className="hidden md:flex items-center bg-gray-800 rounded-lg p-1">
          <button className="p-2 rounded-md text-gray-400 hover:text-white">
            <Monitor className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-md text-gray-400 hover:text-white">
            <Tablet className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-md text-gray-400 hover:text-white">
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        {/* Actions */}
        <div className="hidden sm:flex items-center space-x-1">
          <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800">
            <Undo className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800">
            <Redo className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800">
            <Save className="w-4 h-4" />
          </button>
        </div>

        {/* Theme Toggle */}
        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800"
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Publish */}
        <button className="px-3 py-2 sm:px-4 bg-white hover:bg-gray-100 text-black rounded-lg flex items-center space-x-2 transition-colors text-sm sm:text-base">
          <Play className="w-4 h-4" />
          <span className="hidden sm:inline">Publish</span>
        </button>
      </div>
    </div>
  );
};
