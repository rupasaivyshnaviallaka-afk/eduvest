
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';
import { NavItem } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Education from './pages/Education';
import Tools from './pages/Tools';
import Learning from './pages/Learning';
import Community from './pages/Community';
import Digest from './pages/Digest';
import Auth from './pages/Auth';
import Profile from './pages/Profile';

const App: React.FC = () => {
  const [activeNav, setActiveNav] = useState<NavItem>(NavItem.HOME);
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // Force a reload to get the latest emailVerified status
          await currentUser.reload();
          // Re-check status from the auth instance after reload
          const refreshedUser = auth.currentUser;
          
          if (refreshedUser && refreshedUser.emailVerified) {
            setUser(refreshedUser);
          } else {
            // User is logged in but not verified. 
            // We treat them as null so they stay on the Auth/Verification screen.
            setUser(null);
          }
        } catch (error) {
          console.error("Auth reload failed:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setInitializing(false);
    });
    return () => unsubscribe();
  }, []);

  // Scroll to top when switching navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeNav]);

  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

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
      case NavItem.PROFILE:
        return <Profile />;
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
