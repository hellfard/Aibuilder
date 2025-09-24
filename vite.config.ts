import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  server: {
    host: '0aa06f1f-b1c7-4e82-abf5-044cf2a7bffb-00-1qjuu2yoq98ub.sisko.replit.dev',
    port: 5000,
    hmr: {
      clientPort: 443,
    },
  },
  
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});