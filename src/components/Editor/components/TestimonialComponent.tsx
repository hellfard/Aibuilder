import React from 'react';
import { Component } from '../../../types';
import { Star } from 'lucide-react';

interface TestimonialComponentProps {
  component: Component;
}

export const TestimonialComponent: React.FC<TestimonialComponentProps> = ({ component }) => {
  const { props = {} } = component;
  const {
    quote = "This platform has completely transformed how we build websites. The AI assistance is incredible!",
    author = "Sarah Johnson",
    role = "Product Manager",
    company = "TechCorp",
    avatar = "https://images.unsplash.com/photo-1494790108755-2616b612b182?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    rating = 5
  } = props;

  return (
    <div className="px-6 py-8">
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <div className="flex items-center mb-4">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
          ))}
        </div>
        
        <blockquote className="text-gray-900 dark:text-white text-lg mb-6">
          "{quote}"
        </blockquote>
        
        <div className="flex items-center">
          <img 
            src={avatar} 
            alt={author}
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {author}
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              {role} at {company}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
