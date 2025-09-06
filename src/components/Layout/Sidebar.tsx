import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Layers, 
  Settings, 
  Palette, 
  Code, 
  Bot,
  Plug,
  CreditCard,
  History,
  Wand2
} from 'lucide-react';
import { clsx } from 'clsx';
import { useStore } from '../../stores/useStore';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'AI Generator', href: '/start', icon: Wand2 },
  { name: 'Editor', href: '/editor', icon: Layers },
  { name: 'Themes', href: '/themes', icon: Palette },
  { name: 'Integrations', href: '/integrations', icon: Plug },
  { name: 'Code Export', href: '/export', icon: Code },
  { name: 'Version History', href: '/versions', icon: History },
  { name: 'Billing', href: '/billing', icon: CreditCard },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const { isSidebarOpen } = useStore();

  return (
    <div className={clsx(
      "fixed inset-y-0 left-0 z-30 w-64 bg-black border-r border-gray-800 flex flex-col transition-transform duration-300 ease-in-out",
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
      'lg:translate-x-0'
    )}>
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg"></div>
          <span className="text-xl font-bold text-white">
            BuilderAI
          </span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              clsx(
                'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-white/10 text-white'
                  : 'text-gray-300 hover:bg-white/5'
              )
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              John Doe
            </p>
            <p className="text-xs text-gray-400">Pro Plan</p>
          </div>
        </div>
      </div>
    </div>
  );
};
