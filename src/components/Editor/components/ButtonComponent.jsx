import React from 'react';
import { Component } from '../../../types';
import { ArrowRight } from 'lucide-react';

interface ButtonComponentProps {
  component: Component;
}

export const ButtonComponent: React.FC<ButtonComponentProps> = ({ component }) => {
  const { props = {} } = component;
  const { 
    text = 'Button Text',
    variant = 'primary',
    size = 'md',
    icon = false
  } = props;

  const getButtonClasses = () => {
    let classes = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ';
    
    // Size
    switch (size) {
      case 'sm':
        classes += 'px-3 py-2 text-sm rounded-md ';
        break;
      case 'lg':
        classes += 'px-6 py-3 text-lg rounded-lg ';
        break;
      case 'md':
      default:
        classes += 'px-4 py-2 text-base rounded-lg ';
        break;
    }
    
    // Variant
    switch (variant) {
      case 'secondary':
        classes += 'bg-black text-white border border-gray-700 hover:bg-gray-900 focus:ring-gray-500 ';
        break;
      case 'outline':
        classes += 'border border-white text-white hover:bg-white hover:text-black focus:ring-white ';
        break;
      case 'ghost':
        classes += 'text-white hover:bg-gray-800 focus:ring-gray-500 ';
        break;
      case 'primary':
      default:
        classes += 'bg-white text-black hover:bg-gray-100 focus:ring-white ';
        break;
    }
    
    return classes;
  };

  return (
    <div className="px-6 py-4">
      <button 
        className={getButtonClasses()}
        style={component.styles}
      >
        {text}
        {icon && <ArrowRight className="ml-2 w-4 h-4" />}
      </button>
    </div>
  );
};
