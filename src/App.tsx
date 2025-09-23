import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppLayout } from './components/Layout/AppLayout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Editor } from './pages/Editor';
import { AIAssistant } from './pages/AIAssistant';
import { Themes } from './pages/Themes';
import { Integrations } from './pages/Integrations';
import { CodeExport } from './pages/CodeExport';
import { VersionHistory } from './pages/VersionHistory';
import { Billing } from './pages/Billing';
import { Settings } from './pages/Settings';
import { Start } from './pages/Start';
import { useStore } from './stores/useStore';
import { handleRedirectResult } from './services/auth';

function App() {
  const { isDarkMode, isLoading, initAuth } = useStore();

  useEffect(() => {
    // Initialize authentication
    const unsubscribe = initAuth();
    
    // Handle redirect result for OAuth
    handleRedirectResult().catch(console.error);
    
    return unsubscribe;
  }, [initAuth]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // Show loading screen while initializing auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/start" element={<Start />} />
          <Route path="/*" element={<AppLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="editor" element={<Editor />} />
            <Route path="ai" element={<AIAssistant />} />
            <Route path="themes" element={<Themes />} />
            <Route path="integrations" element={<Integrations />} />
            <Route path="export" element={<CodeExport />} />
            <Route path="versions" element={<VersionHistory />} />
            <Route path="billing" element={<Billing />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
        <Toaster position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;
