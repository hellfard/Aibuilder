import React from 'react';


export const TextComponent<TextComponentProps> = ({ component }) => {
  const { props = {} } = component;
  const { variant = 'paragraph', content = 'Add your text here' } = props;

  const getTextClasses = () => {
    switch (variant) {
      case 'h1':
        return 'text-4xl md:text-5xl lg:text-6xl font-bold';
      case 'h2':
        return 'text-3xl md:text-4xl lg:text-5xl font-bold';
      case 'h3':
        return 'text-2xl md:text-3xl lg:text-4xl font-bold';
      case 'h4':
        return 'text-xl md:text-2xl lg:text-3xl font-semibold';
      case 'h5':
        return 'text-lg md:text-xl lg:text-2xl font-semibold';
      case 'h6':
        return 'text-base md:text-lg lg:text-xl font-medium';
      case 'lead':
        return 'text-lg md:text-xl text-gray-600 dark:text-gray-400';
      case 'paragraph':
      default:
        return 'text-base text-gray-700 dark:text-gray-300';
    }
  };

  const Tag = variant.startsWith('h') ? variant : 'p';

  return (
    <div className="px-6 py-4">
      <Tag 
        className={`${getTextClasses()} ${props.className || ''}`}
        style={component.styles}
      >
        {content}
      </Tag>
    </div>
  );
};
