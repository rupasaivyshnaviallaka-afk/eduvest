
import React from 'react';
import { NavItem } from '../types';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

interface HeaderProps {
  activeNav: NavItem;
  onNavChange: (nav: NavItem) => void;
}

const Header: React.FC<HeaderProps> = ({ activeNav, onNavChange }) => {
  const navItems = Object.values(NavItem).filter(item => item !== NavItem.PROFILE);
  const user = auth.currentUser;

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#020617]/90 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div 
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={() => onNavChange(NavItem.HOME)}
        >
          <div className="relative">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl rotate-3 group-hover:rotate-12 transition-transform shadow-lg shadow-emerald-500/20 flex items-center justify-center font-black text-slate-950 text-xl">E</div>
            <div className="absolute -inset-1 bg-emerald-500/20 blur rounded-xl -z-10 group-hover:bg-emerald-500/40 transition-colors"></div>
          </div>
          <span className="text-2xl font-black tracking-tight text-white group-hover:text-emerald-400 transition-colors uppercase">Eduvest</span>
        </div>

        <nav className="hidden lg:flex items-center space-x-10">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => onNavChange(item)}
              className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all relative py-2 ${
                activeNav === item ? 'text-emerald-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              {item}
              {activeNav === item && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <div 
            onClick={() => onNavChange(NavItem.PROFILE)}
            className={`hidden md:flex items-center space-x-3 px-4 py-2 bg-slate-900/50 border border-white/5 rounded-full cursor-pointer hover:bg-slate-800 transition-all ${
              activeNav === NavItem.PROFILE ? 'ring-2 ring-emerald-500/50' : ''
            }`}
          >
            <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] font-black text-slate-950 overflow-hidden">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'
              )}
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate max-w-[100px]">
              {user?.displayName || 'Operator'}
            </span>
          </div>
          
          <button 
            onClick={handleSignOut}
            className="px-6 py-2.5 bg-slate-900 border border-slate-800 rounded-full text-[10px] font-black hover:bg-rose-500/10 hover:border-rose-500/50 hover:text-rose-500 transition-all uppercase tracking-widest"
          >
            Terminal Out
          </button>
          
          <button className="lg:hidden p-2 text-slate-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
