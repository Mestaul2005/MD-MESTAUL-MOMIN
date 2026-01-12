
import React from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_LINKS } from '../constants';

const BottomNav: React.FC = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 z-50">
      {NAV_LINKS.map((link) => (
        <NavLink
          key={link.label}
          to={link.path}
          className={({ isActive }) => `
            flex flex-col items-center space-y-1 transition-colors
            ${isActive ? 'text-pink-600' : 'text-gray-500 hover:text-pink-400'}
          `}
        >
          {link.icon}
          <span className="text-[10px]">{link.label}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default BottomNav;
