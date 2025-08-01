import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Clipboard, Package, Truck, CheckSquare } from 'lucide-react';

const TabNavigation = () => {
  const location = useLocation();
  
  const tabs = [
    { name: 'BOM', path: '/bom', icon: <Clipboard size={20} /> },
    { name: 'MR', path: '/mr', icon: <Package size={20} /> },
    { name: 'PR', path: '/supplier', icon: <Truck size={20} /> },
    { name: 'QA Status', path: '/qa', icon: <CheckSquare size={20} /> },
  ];

  return (
    <div className="bg-white overflow-hidden ">
      <div className="flex flex-wrap">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) => 
              `py-4 px-6 border-b-2 flex items-center space-x-2 transition-all tab-transition
               ${isActive 
                 ? 'border-[hsl(var(--primary))] text-[hsl(var(--primary))] font-medium' 
                 : 'border-transparent text-gray-500 hover:text-[hsl(var(--primary))] hover:bg-gray-50'}`
            }
          >
            {tab.icon}
            <span>{tab.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;