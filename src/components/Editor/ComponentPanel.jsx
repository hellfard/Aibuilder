import React from 'react';
import { 
  Type, 
  Image, 
  Square, 
  CreditCard, 
  MessageSquare, 
  Star,
  DollarSign,
  Navigation,
  Layout
} from 'lucide-react';


const componentTypes = [
  { type: 'hero' as ComponentType, name: 'Hero Section', icon: Layout, description: 'Eye-catching hero with headline and CTA' },
  { type: 'navbar' as ComponentType, name: 'Navigation', icon: Navigation, description: 'Header navigation bar' },
  { type: 'text' as ComponentType, name: 'Text', icon: Type, description: 'Heading, paragraph, or styled text' },
  { type: 'image' as ComponentType, name: 'Image', icon: Image, description: 'Photos, illustrations, or graphics' },
  { type: 'button' as ComponentType, name: 'Button', icon: Square, description: 'Call-to-action buttons' },
  { type: 'card' as ComponentType, name: 'Card', icon: CreditCard, description: 'Content cards and containers' },
  { type: 'testimonial' as ComponentType, name: 'Testimonial', icon: MessageSquare, description: 'Customer reviews and quotes' },
  { type: 'feature' as ComponentType, name: 'Feature', icon: Star, description: 'Feature highlights with icons' },
  { type: 'pricing' as ComponentType, name: 'Pricing', icon: DollarSign, description: 'Pricing tables and plans' },
  { type: 'form' as ComponentType, name: 'Form', icon: Square, description: 'Contact forms and inputs' },
];

export const ComponentPanel<ComponentPanelProps> = ({ onAddComponent }) => {
  return (
    <div className="w-80 bg-black dark:bg-white border-r border-gray-800 dark:border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-800 dark:border-gray-200">
        <h3 className="text-lg font-semibold text-white dark:text-black">Components</h3>
        <p className="text-sm text-gray-400 dark:text-gray-600 mt-1">
          Drag components to your canvas
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {componentTypes.map((component) => (
          <button
            key={component.type}
            onClick={() => onAddComponent(component.type)}
            className="w-full p-3 text-left border border-gray-800 dark:border-gray-200 rounded-lg hover:border-purple-500 dark:hover:border-purple-500 hover:bg-purple-950/20 dark:hover:bg-purple-50 transition-colors group"
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-gray-800 dark:bg-gray-200 rounded-md group-hover:bg-purple-800/30 dark:group-hover:bg-purple-100 transition-colors">
                <component.icon className="w-4 h-4 text-gray-400 dark:text-gray-600 group-hover:text-purple-400 dark:group-hover:text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-white dark:text-black">
                  {component.name}
                </h4>
                <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
                  {component.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-gray-800 dark:border-gray-200">
        <button className="w-full px-4 py-2 bg-white hover:bg-gray-100 text-black rounded-lg transition-colors flex items-center justify-center space-x-2">
          <span>AI Generate Layout</span>
        </button>
      </div>
    </div>
  );
};
