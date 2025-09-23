import React from 'react';
import { Star, Zap, Shield } from 'lucide-react';


export const FeatureComponent<FeatureComponentProps> = ({ component }) => {
  const { props = {} } = component;
  const {
    title = 'Amazing Feature',
    description = 'This feature will help you achieve your goals faster and more efficiently.',
    icon = 'star'
  } = props;

  const getIcon = () => {
    switch (icon) {
      case 'zap':
        return <Zap className="w-6 h-6" />;
      case 'shield':
        return <Shield className="w-6 h-6" />;
      case 'star':
      default:
        return <Star className="w-6 h-6" />;
    }
  };

  return (
    <div className="px-6 py-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-black dark:bg-white text-white dark:text-black rounded-lg mb-4">
          {getIcon()}
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
};
