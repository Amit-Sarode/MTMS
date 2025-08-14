import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Clipboard, Package, Truck, CheckSquare } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const TabNavigation: React.FC = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const tabs = [
    { name: 'BOM', path: '/bom', icon: <Clipboard size={20} /> },
    { name: 'MR', path: '/mr', icon: <Package size={20} /> },
    { name: 'PR', path: '/supplier', icon: <Truck size={20} /> },
    { name: 'QA Status', path: '/qa', icon: <CheckSquare size={20} /> },
  ];

  return (
    <div className="text-gray-900 dark:text-gray-100">
      <div className="text-gray-900 dark:text-gray-100 flex justify-between items-center px-4">
        {/* Tabs */}
        <div className="flex flex-wrap">
          {tabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `py-4 px-6 border-b-2 flex items-center space-x-2 transition-all tab-transition
                 ${
                   isActive
                     ? 'border-[hsl(var(--primary))] text-[hsl(var(--primary))] font-medium'
                     : 'border-transparent text-gray-500 dark:text-gray-300 hover:text-[hsl(var(--primary))] hover:bg-gray-50 dark:hover:bg-gray-700'
                 }`
              }
            >
              {tab.icon}
              <span>{tab.name}</span>
            </NavLink>
          ))}
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="text-gray-900 dark:text-gray-100"
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </div>
  );
};

export default TabNavigation;
