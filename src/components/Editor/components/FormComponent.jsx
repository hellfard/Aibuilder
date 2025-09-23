import React from 'react';
import { Component } from '../../../types';

interface FormComponentProps {
  component: Component;
}

export const FormComponent<FormComponentProps> = ({ component }) => {
  const { props = {} } = component;
  const {
    title = "Get in Touch",
    description = "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
    fields = [
      { name: 'name', label: 'Full Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'message', label: 'Message', type: 'textarea', required: true }
    ],
    buttonText = "Send Message"
  } = props;

  return (
    <div className="px-6 py-8">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>
        
        <form className="space-y-6">
          {fields.map((field) => (
            <div key={field.name}>
              <label 
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              
              {field.type === 'textarea' ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  rows={4}
                  required={field.required}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent"
                  placeholder={`Enter your ${field.label.toLowerCase()}`}
                />
              ) : (
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent"
                  placeholder={`Enter your ${field.label.toLowerCase()}`}
                />
              )}
            </div>
          ))}
          
          <button
            type="submit"
            className="w-full bg-black dark:bg-white text-white dark:text-black py-3 px-4 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};
