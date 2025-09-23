import React from 'react';
import { Component } from '../../../types';
import { Menu, X } from 'lucide-react';

interface NavbarComponentProps {
  component: Component;
}

export const NavbarComponent<NavbarComponentProps> = ({ component }) => {
  const { props = {} } = component;
  const [isOpen, setIsOpen] = React.useState(false);
  
  const navigation = props.navigation || [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="bg-black dark:bg-white shadow-sm border-b border-gray-800 dark:border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg mr-3"></div>
              <span className="text-xl font-bold text-white dark:text-black">
                {props.logo || 'BuilderAI'}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-300 dark:text-gray-700 hover:text-white dark:hover:text-black px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
            
            <div className="flex items-center space-x-4">
              <button className="text-gray-300 dark:text-gray-700 hover:text-white dark:hover:text-black px-3 py-2 text-sm font-medium">
                Sign In
              </button>
              <button className="bg-white dark:bg-black text-black dark:text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
                Get Started
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 dark:text-gray-700 hover:text-white dark:hover:text-black"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-800 dark:border-gray-200 py-4">
            <div className="space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-300 dark:text-gray-700 hover:text-white dark:hover:text-black hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 border-t border-gray-800 dark:border-gray-200">
                <a
                  href="#"
                  className="block px-3 py-2 text-base font-medium text-gray-300 dark:text-gray-700 hover:text-white dark:hover:text-black hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                >
                  Sign In
                </a>
                <a
                  href="#"
                  className="block px-3 py-2 text-base font-medium bg-white dark:bg-black text-black dark:text-white rounded-lg mx-3 mt-2 text-center hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
