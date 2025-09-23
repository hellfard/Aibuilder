import React from 'react';
import { Component } from '../../../types';

interface CardComponentProps {
  component: Component;
}

export const CardComponent: React.FC<CardComponentProps> = ({ component }) => {
  const { props = {} } = component;
  const {
    title = 'Card Title',
    content = 'This is a sample card content. You can customize this text to match your needs.',
    image,
    showButton = true,
    buttonText = 'Learn More'
  } = props;

  return (
    <div className="px-6 py-4">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow">
        {image && (
          <img 
            src={image} 
            alt={title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
        )}
        
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {content}
          </p>
          
          {showButton && (
            <button className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 font-medium text-sm transition-colors">
              {buttonText} →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
