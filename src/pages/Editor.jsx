import React, { useState } from 'react';
import { ComponentPanel } from '../components/Editor/ComponentPanel';
import { Canvas } from '../components/Editor/Canvas';
import { useStore } from '../stores/useStore.js';
import { PanelRightOpen } from 'lucide-react';

export const Editor = () => {
  const { currentPage, addComponent } = useStore();
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleAddComponent = (type) => {
    const newComponent = {
      id: Date.now().toString(),
      type,
      props: {},
      styles: {},
      position: { x: 0, y: 0 },
      size: { width: 100, height: 'auto' },
    };

    addComponent(newComponent);
  };

  return (
    <div className="flex h-full relative">
      <div className={`
        absolute lg:relative top-0 left-0 h-full z-20 transition-transform duration-300
        ${isPanelOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <ComponentPanel onAddComponent={handleAddComponent} />
      </div>
      
      <div className="flex-1 flex flex-col">
        <Canvas components={currentPage?.components || []} />
      </div>

      <button 
        onClick={() => setIsPanelOpen(!isPanelOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-30 w-12 h-12 bg-purple-600 text-white rounded-full shadow-lg flex items-center justify-center"
      >
        <PanelRightOpen className="w-6 h-6" />
      </button>
    </div>
  );
};