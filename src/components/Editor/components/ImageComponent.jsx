import React from 'react';
import { Component } from '../../../types';

interface ImageComponentProps {
  component: Component;
}

export const ImageComponent: React.FC<ImageComponentProps> = ({ component }) => {
  const { props = {} } = component;
  const {
    src = 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    alt = 'Image description',
    caption,
    rounded = true
  } = props;

  return (
    <div className="px-6 py-4">
      <figure>
        <img 
          src={src} 
          alt={alt}
          className={`w-full h-auto object-cover ${rounded ? 'rounded-lg' : ''}`}
          style={component.styles}
        />
        {caption && (
          <figcaption className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center">
            {caption}
          </figcaption>
        )}
      </figure>
    </div>
  );
};
