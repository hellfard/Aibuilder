import React from 'react';
import { Component } from '../../../types';
import { ArrowRight, Play } from 'lucide-react';

interface HeroComponentProps {
  component: Component;
}

export const HeroComponent: React.FC<HeroComponentProps> = ({ component }) => {
  const { props = {} } = component;
  
  return (
    <section className="relative bg-gradient-to-br from-white via-gray-100 to-white text-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.purple.100),transparent)] opacity-20" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-black shadow-xl shadow-purple-600/10 ring-1 ring-purple-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-black sm:text-6xl lg:col-span-2 xl:col-auto">
            {props.title || 'Build Stunning Websites with AI'}
          </h1>
          
          <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
            <p className="text-lg leading-8 text-gray-700">
              {props.subtitle || 'Create professional websites in minutes with our AI-powered drag-and-drop builder. No coding required.'}
            </p>
            
            <div className="mt-10 flex items-center gap-x-6">
              <button className="rounded-md bg-black px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition-colors flex items-center gap-2">
                {props.primaryButtonText || 'Get Started Free'}
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button className="flex items-center gap-x-2 text-sm font-semibold leading-6 text-black hover:text-gray-700 transition-colors">
                <Play className="w-4 h-4" />
                {props.secondaryButtonText || 'Watch Demo'}
              </button>
            </div>
          </div>
          
          <img
            className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
            src={props.image || 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'}
            alt={props.imageAlt || 'Website builder interface'}
          />
        </div>
      </div>
    </section>
  );
};
