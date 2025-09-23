import { create } from 'zustand';
import { User, Project, Page, Component, Theme } from '../types';
import {
  createProject,
  updateProject,
  deleteProject,
  getUserProjects,
  createPage,
  updatePage,
  deletePage,
  getProjectPages,
  subscribeToUserProjects,
  subscribeToProjectPages
} from '../services/database';
import { onAuthStateChange, signOutUser } from '../services/auth';

interface AppStore {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  signOut: () => Promise<void>;
  initAuth: () => () => void;

  // Project state
  currentProject: Project | null;
  projects: Project[];
  setCurrentProject: (project: Project | null) => void;
  createProject: (projectData: Omit<Project, "id" | "created_at" | "updated_at">) => Promise<string>;
  updateProject: (projectId: string, projectData: Partial<Project>) => Promise<void>;
  deleteProject: (projectId: string) => Promise<void>;
  loadUserProjects: () => Promise<void>;

  // Page state
  currentPage: Page | null;
  pages: Page[];
  setCurrentPage: (page: Page | null) => void;
  createPage: (projectId: string, pageData: Omit<Page, "id" | "created_at" | "updated_at">) => Promise<string>;
  updatePage: (pageId: string, pageData: Partial<Page>) => Promise<void>;
  deletePage: (pageId: string) => Promise<void>;
  loadProjectPages: (projectId: string) => Promise<void>;

  // Editor state
  selectedComponent: Component | null;
  isPreviewMode: boolean;
  isDarkMode: boolean;
  isSidebarOpen: boolean;
  setSelectedComponent: (component: Component | null) => void;
  setPreviewMode: (isPreview: boolean) => void;
  toggleDarkMode: () => void;
  toggleSidebar: () => void;

  // Component operations
  addComponent: (component: Component) => void;
  updateComponent: (component: Component) => void;
  deleteComponent: (componentId: string) => void;

  // AI functionality
  isGenerating: boolean;
  generateWebsite: (request: any) => Promise<void>;
  enhanceComponent: (componentId: string, instructions: string) => Promise<void>;

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
  isLoading: true,
  setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
  
  signOut: async () => {
    try {
      await signOutUser();
      set({ user: null, isAuthenticated: false, currentProject: null, projects: [], pages: [] });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  },
  
  initAuth: () => {
    return onAuthStateChange((user) => {
      set({ user, isAuthenticated: !!user, isLoading: false });
      if (user) {
        get().loadUserProjects();
      } else {
        set({ projects: [], currentProject: null, pages: [] });
      }
    });
  },

  // Project state
  currentProject: null,
  projects: [],
  setCurrentProject: (currentProject) => {
    set({ currentProject });
    if (currentProject) {
      get().loadProjectPages(currentProject.id);
    }
  },
  
  createProject: async (projectData) => {
    const { user } = get();
    if (!user) throw new Error('User not authenticated');
    
    const projectId = await createProject(user.id, projectData);
    await get().loadUserProjects();
    return projectId;
  },
  
  updateProject: async (projectId, projectData) => {
    await updateProject(projectId, projectData);
    await get().loadUserProjects();
  },
  
  deleteProject: async (projectId) => {
    await deleteProject(projectId);
    const state = get();
    if (state.currentProject?.id === projectId) {
      set({ currentProject: null, pages: [] });
    }
    await get().loadUserProjects();
  },
  
  loadUserProjects: async () => {
    const { user } = get();
    if (!user) return;
    
    try {
      const projects = await getUserProjects(user.id);
      set({ projects });
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  },

  // Page state
  currentPage: null,
  pages: [],
  setCurrentPage: (currentPage) => set({ currentPage }),
  
  createPage: async (projectId, pageData) => {
    const pageId = await createPage(projectId, pageData);
    await get().loadProjectPages(projectId);
    return pageId;
  },
  
  updatePage: async (pageId, pageData) => {
    await updatePage(pageId, pageData);
    const { currentProject } = get();
    if (currentProject) {
      await get().loadProjectPages(currentProject.id);
    }
  },
  
  deletePage: async (pageId) => {
    await deletePage(pageId);
    const { currentProject, currentPage } = get();
    if (currentPage?.id === pageId) {
      set({ currentPage: null });
    }
    if (currentProject) {
      await get().loadProjectPages(currentProject.id);
    }
  },
  
  loadProjectPages: async (projectId) => {
    try {
      const pages = await getProjectPages(projectId);
      set({ pages });
    } catch (error) {
      console.error('Error loading pages:', error);
    }
  },

  // Editor state
  selectedComponent: null,
  isPreviewMode: false,
  isDarkMode: false,
  isSidebarOpen: false,
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

  // AI functionality
  isGenerating: false,
  generateWebsite: async (request) => {
    set({ isGenerating: true });
    try {
      // TODO: Implement Gemini AI website generation
      console.log('Generating website with:', request);
    } catch (error) {
      console.error('Website generation error:', error);
    } finally {
      set({ isGenerating: false });
    }
  },
  
  enhanceComponent: async (componentId, instructions) => {
    try {
      // TODO: Implement Gemini AI component enhancement
      console.log('Enhancing component:', componentId, instructions);
    } catch (error) {
      console.error('Component enhancement error:', error);
    }
  },

  // Theme state
  currentTheme: defaultTheme,
  setTheme: (currentTheme) => set({ currentTheme }),
}));
