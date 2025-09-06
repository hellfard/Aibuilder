import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { useStore } from '../../stores/useStore';
import { clsx } from 'clsx';

export const AppLayout: React.FC = () => {
  const { isPreviewMode, isSidebarOpen } = useStore();

  if (isPreviewMode) {
    return (
      <div className="min-h-screen bg-black">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar />
      <div className={clsx(
        "flex-1 flex flex-col overflow-hidden transition-all duration-300",
        { 'lg:ml-64': isSidebarOpen }
      )}>
        <TopBar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
