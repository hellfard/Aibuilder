export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: 'google' | 'github' | 'discord';
  subscription: 'free' | 'pro' | 'enterprise';
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  pages: Page[];
  theme: Theme;
  created_at: string;
  updated_at: string;
  published: boolean;
  domain?: string;
}

export interface Page {
  id: string;
  name: string;
  slug: string;
  components: Component[];
  seo: SEOMetadata;
  created_at: string;
  updated_at: string;
}

export interface Component {
  id: string;
  type: ComponentType;
  props: Record<string, any>;
  children?: Component[];
  styles: ComponentStyles;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export type ComponentType = 
  | 'hero'
  | 'navbar'
  | 'footer'
  | 'card'
  | 'form'
  | 'testimonial'
  | 'pricing'
  | 'feature'
  | 'text'
  | 'image'
  | 'button'
  | 'container';

export interface ComponentStyles {
  background?: string;
  color?: string;
  padding?: string;
  margin?: string;
  borderRadius?: string;
  boxShadow?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: 'left' | 'center' | 'right';
}

export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
  darkMode: boolean;
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
}

export interface AILayoutSuggestion {
  id: string;
  name: string;
  description: string;
  components: Component[];
  preview: string;
  category: 'landing' | 'blog' | 'portfolio' | 'ecommerce' | 'saas';
}

export interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'analytics' | 'payment' | 'email' | 'webhook';
  configured: boolean;
  config?: Record<string, any>;
}
