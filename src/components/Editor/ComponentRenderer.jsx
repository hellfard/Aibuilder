import React from 'react';
import { HeroComponent } from './components/HeroComponent';
import { NavbarComponent } from './components/NavbarComponent';
import { TextComponent } from './components/TextComponent';
import { ButtonComponent } from './components/ButtonComponent';
import { CardComponent } from './components/CardComponent';
import { FeatureComponent } from './components/FeatureComponent';
import { TestimonialComponent } from './components/TestimonialComponent';
import { PricingComponent } from './components/PricingComponent';
import { ImageComponent } from './components/ImageComponent';
import { FormComponent } from './components/FormComponent';


export const ComponentRenderer<ComponentRendererProps> = ({ component }) => {
  switch (component.type) {
    case 'hero':
      return <HeroComponent component={component} />;
    case 'navbar':
      return <NavbarComponent component={component} />;
    case 'text':
      return <TextComponent component={component} />;
    case 'button':
      return <ButtonComponent component={component} />;
    case 'card':
      return <CardComponent component={component} />;
    case 'feature':
      return <FeatureComponent component={component} />;
    case 'testimonial':
      return <TestimonialComponent component={component} />;
    case 'pricing':
      return <PricingComponent component={component} />;
    case 'image':
      return <ImageComponent component={component} />;
    case 'form':
      return <FormComponent component={component} />;
    default:
      return <div>Unknown component type: {component.type}</div>;
  }
};
