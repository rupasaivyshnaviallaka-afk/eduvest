
import React from 'react';
import { NavItem } from '../types';

interface HeaderProps {
  activeNav: NavItem;
  onNavChange: (nav: NavItem) => void;
}

const Header: React.FC<HeaderProps> = ({ activeNav, onNavChange }) => {
  const navItems = Object.values(NavItem);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#020617]/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => onNavChange(NavItem.HOME)}
        >
          <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center font-bold text-white">E</div>
          <span className="text-xl font-bold tracking-tight">Eduvest</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => onNavChange(item)}
              className={`text-sm font-medium transition-colors hover:text-emerald-400 ${
                activeNav === item ? 'text-emerald-400' : 'text-slate-400'
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        <button className="md:hidden p-2 text-slate-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
