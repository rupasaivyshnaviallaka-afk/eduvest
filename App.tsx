
import React, { useState, useEffect } from 'react';
import { NavItem } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Education from './pages/Education';
import Tools from './pages/Tools';
import Learning from './pages/Learning';
import Community from './pages/Community';
import Digest from './pages/Digest';

const App: React.FC = () => {
  const [activeNav, setActiveNav] = useState<NavItem>(NavItem.HOME);

  // Scroll to top when switching navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeNav]);

  const renderContent = () => {
    switch (activeNav) {
      case NavItem.HOME:
        return <Home onExplore={() => setActiveNav(NavItem.TOOLS)} />;
      case NavItem.EDUCATION:
        return <Education />;
      case NavItem.TOOLS:
        return <Tools />;
      case NavItem.LEARNING:
        return <Learning />;
      case NavItem.COMMUNITY:
        return <Community />;
      case NavItem.DIGEST:
        return <Digest />;
      default:
        return <Home onExplore={() => setActiveNav(NavItem.TOOLS)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header activeNav={activeNav} onNavChange={setActiveNav} />
      <main className="flex-grow pt-16">
        {renderContent()}
      </main>
      <Footer onNavChange={setActiveNav} />
    </div>
  );
};

export default App;
