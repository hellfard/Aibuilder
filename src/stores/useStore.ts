import { create } from 'zustand';
import { User, Project, Page, Component, Theme } from '../types';

interface AppStore {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;

  // Project state
  currentProject: Project | null;
  projects: Project[];
  setCurrentProject: (project: Project | null) => void;
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (projectId: string) => void;

  // Editor state
  currentPage: Page | null;
  selectedComponent: Component | null;
  isPreviewMode: boolean;
  isDarkMode: boolean;
  isSidebarOpen: boolean;
  setCurrentPage: (page: Page | null) => void;
  setSelectedComponent: (component: Component | null) => void;
  setPreviewMode: (isPreview: boolean) => void;
  toggleDarkMode: () => void;
  toggleSidebar: () => void;

  // Component operations
  addComponent: (component: Component) => void;
  updateComponent: (component: Component) => void;
  deleteComponent: (componentId: string) => void;

  // Theme state
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
}

const defaultTheme: Theme = {
  colors: {
    primary: '#ffffff',
    secondary: '#000000',
    accent: '#6366f1',
    background: '#000000',
    surface: '#1f1f1f',
    text: '#ffffff',
    textSecondary: '#a1a1aa',
  },
  fonts: {
    heading: 'Cal Sans',
    body: 'Inter',
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(255 255 255 / 0.05)',
    md: '0 4px 6px -1px rgb(255 255 255 / 0.1)',
    lg: '0 10px 15px -3px rgb(255 255 255 / 0.1)',
  },
  darkMode: false,
};

export const useStore = create<AppStore>((set, get) => ({
  // User state
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),

  // Project state
  currentProject: null,
  projects: [],
  setCurrentProject: (currentProject) => set({ currentProject }),
  addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
  updateProject: (project) => set((state) => ({
    projects: state.projects.map(p => p.id === project.id ? project : p),
    currentProject: state.currentProject?.id === project.id ? project : state.currentProject,
  })),
  deleteProject: (projectId) => set((state) => ({
    projects: state.projects.filter(p => p.id !== projectId),
    currentProject: state.currentProject?.id === projectId ? null : state.currentProject,
  })),

  // Editor state
  currentPage: null,
  selectedComponent: null,
  isPreviewMode: false,
  isDarkMode: false,
  isSidebarOpen: false,
  setCurrentPage: (currentPage) => set({ currentPage }),
  setSelectedComponent: (selectedComponent) => set({ selectedComponent }),
  setPreviewMode: (isPreviewMode) => set({ isPreviewMode }),
  toggleDarkMode: () => set((state) => {
    const isDarkMode = !state.isDarkMode;
    document.documentElement.classList.toggle('dark', isDarkMode);
    return { isDarkMode };
  }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  // Component operations
  addComponent: (component) => set((state) => {
    if (!state.currentPage) return state;
    
    const updatedPage = {
      ...state.currentPage,
      components: [...state.currentPage.components, component],
    };

    return {
      currentPage: updatedPage,
      currentProject: state.currentProject ? {
        ...state.currentProject,
        pages: state.currentProject.pages.map(p => 
          p.id === updatedPage.id ? updatedPage : p
        ),
      } : null,
    };
  }),

  updateComponent: (component) => set((state) => {
    if (!state.currentPage) return state;

    const updatedPage = {
      ...state.currentPage,
      components: state.currentPage.components.map(c => 
        c.id === component.id ? component : c
      ),
    };

    return {
      currentPage: updatedPage,
      selectedComponent: component,
      currentProject: state.currentProject ? {
        ...state.currentProject,
        pages: state.currentProject.pages.map(p => 
          p.id === updatedPage.id ? updatedPage : p
        ),
      } : null,
    };
  }),

  deleteComponent: (componentId) => set((state) => {
    if (!state.currentPage) return state;

    const updatedPage = {
      ...state.currentPage,
      components: state.currentPage.components.filter(c => c.id !== componentId),
    };

    return {
      currentPage: updatedPage,
      selectedComponent: state.selectedComponent?.id === componentId ? null : state.selectedComponent,
      currentProject: state.currentProject ? {
        ...state.currentProject,
        pages: state.currentProject.pages.map(p => 
          p.id === updatedPage.id ? updatedPage : p
        ),
      } : null,
    };
  }),

  // Theme state
  currentTheme: defaultTheme,
  setTheme: (currentTheme) => set({ currentTheme }),
}));
