import React from 'react';
import { Component } from '../../../types';
import { Check } from 'lucide-react';

interface PricingComponentProps {
  component: Component;
}

export const PricingComponent<PricingComponentProps> = ({ component }) => {
  const { props = {} } = component;
  const {
    title = "Pro Plan",
    price = "$29",
    period = "/month",
    description = "Perfect for growing businesses",
    features = [
      "Unlimited projects",
      "AI assistance",
      "Custom domains",
      "Priority support"
    ],
    highlighted = false,
    buttonText = "Get Started"
  } = props;

  return (
    <div className="px-6 py-4">
      <div className={`
        relative bg-white dark:bg-gray-800 border rounded-lg p-6 
        ${highlighted 
          ? 'border-black dark:border-white shadow-lg scale-105' 
          : 'border-gray-200 dark:border-gray-700'
        }
      `}>
        {highlighted && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <span className="bg-black dark:bg-white text-white dark:text-black px-3 py-1 text-sm font-medium rounded-full">
              Most Popular
            </span>
          </div>
        )}
        
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {title}
          </h3>
          
          <div className="mb-4">
            <span className="text-4xl font-bold text-gray-900 dark:text-white">
              {price}
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              {period}
            </span>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {description}
          </p>
          
          <ul className="space-y-3 mb-8">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
          
          <button className={`
            w-full py-3 px-4 rounded-lg font-medium transition-colors
            ${highlighted
              ? 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
            }
          `}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};
