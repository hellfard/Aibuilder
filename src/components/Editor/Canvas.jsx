import React from 'react';
import { motion } from 'framer-motion';
import { Component } from '../../types';
import { useStore } from '../../stores/useStore';
import { ComponentRenderer } from './ComponentRenderer';

interface CanvasProps {
  components: Component[];
}

export const Canvas<CanvasProps> = ({ components }) => {
  const { selectedComponent, setSelectedComponent } = useStore();

  return (
    <div className="flex-1 bg-gray-900 dark:bg-gray-100 overflow-auto">
      <div className="min-h-full p-8">
        <div className="max-w-6xl mx-auto bg-black dark:bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="relative min-h-screen">
            {components.length === 0 ? (
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-800 dark:bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-white dark:text-black mb-2">
                    Start building your page
                  </h3>
                  <p className="text-gray-400 dark:text-gray-600">
                    Add components from the panel to get started
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-0">
                {components.map((component, index) => (
                  <motion.div
                    key={component.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative group ${
                      selectedComponent?.id === component.id 
                        ? 'ring-2 ring-purple-500 ring-inset' 
                        : 'hover:ring-2 hover:ring-gray-600 dark:hover:ring-gray-400 hover:ring-inset'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedComponent(component);
                    }}
                  >
                    <ComponentRenderer component={component} />
                    
                    {selectedComponent?.id === component.id && (
                      <div className="absolute -top-8 left-0 bg-purple-600 text-white dark:text-white px-2 py-1 rounded text-xs font-medium">
                        {component.type}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
