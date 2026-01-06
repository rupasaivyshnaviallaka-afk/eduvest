
import React, { useState } from 'react';
import { IconUsers, IconBrain, IconChart, IconShield, IconRocket } from '../components/Icons';

const Community: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const discussionCategories = [
    { name: 'General Chat', icon: <IconUsers /> },
    { name: 'Technical Analysis', icon: <IconChart /> },
    { name: 'Fundamental Analysis', icon: <IconShield /> },
    { name: 'Crypto', icon: <IconRocket /> },
    { name: 'Psychology', icon: <IconBrain /> }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 relative">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">Community Forum</h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
          Connect with mentors and fellow investors. Discuss strategies, share insights, and grow together.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Left Sidebar - Features and Navigation */}
        <aside className="lg:col-span-1 space-y-8">
          {/* Daily Digest Widget */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 blur-xl group-hover:bg-emerald-500/20 transition-all"></div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-emerald-500">
                <IconRocket />
              </div>
              <h3 className="font-black text-sm uppercase tracking-widest">Daily Digest</h3>
            </div>
            <div className="space-y-4">
              <div className="pb-4 border-b border-slate-800/50">
                <h4 className="text-xs font-black text-emerald-400 mb-1 uppercase tracking-tight">Market Volatility Ahead?</h4>
                <p className="text-[10px] text-slate-500 leading-tight">With CPI data looming, key support levels are being tested at 4750 and 478...</p>
              </div>
              <div>
                <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Top Movers</h5>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="font-bold text-slate-300">NVDA</span>
                    <span className="text-emerald-500 font-mono">+3.2%</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="font-bold text-slate-300">TSLA</span>
                    <span className="text-rose-500 font-mono">-1.8%</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="font-bold text-slate-300">AAPL</span>
                    <span className="text-emerald-500 font-mono">+0.8%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* New Discussion Trigger */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full py-4 bg-emerald-500 text-slate-950 font-black rounded-2xl flex items-center justify-center space-x-2 shadow-xl shadow-emerald-500/10 hover:scale-[1.02] transition-transform uppercase tracking-widest text-xs"
          >
            <span className="text-lg">+</span>
            <span>New Discussion</span>
          </button>

          {/* Discussion Navigation Categories */}
          <nav className="space-y-2">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 px-4">All Discussions</h3>
            {discussionCategories.map((cat, i) => (
              <button key={i} className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-slate-900 text-slate-400 hover:text-emerald-400 transition-all text-xs font-bold text-left group">
                <div className="scale-75 opacity-70 group-hover:opacity-100">{cat.icon}</div>
                <span>{cat.name}</span>
              </button>
            ))}
          </nav>

          {/* Verified Mentors Widget */}
          <div className="space-y-4">
             <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 px-4 flex items-center">
               <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></span>
               Verified Mentors
             </h3>
             {[
               { name: 'Sarah Smith', role: 'Macro Strategist', xp: '12y Exp', img: 'https://picsum.photos/seed/sarah/100' },
               { name: 'Mike Johnson', role: 'Technical Analyst', xp: '8y Exp', img: 'https://picsum.photos/seed/mike/100' },
               { name: 'Jason Brown', role: 'Crypto Expert', xp: '6y Exp', img: 'https://picsum.photos/seed/jason/100' }
             ].map((mentor, i) => (
               <div key={i} className="flex items-center space-x-3 px-4 py-3 bg-slate-900/40 border border-slate-800/50 rounded-2xl group cursor-pointer hover:border-emerald-500/30 transition-all">
                 <img src={mentor.img} alt={mentor.name} className="w-8 h-8 rounded-full border border-slate-800 group-hover:grayscale-0 grayscale transition-all" />
                 <div>
                   <h4 className="text-xs font-black text-slate-200">{mentor.name}</h4>
                   <p className="text-[9px] text-slate-500 uppercase tracking-tighter">{mentor.role} • {mentor.xp}</p>
                 </div>
               </div>
             ))}
          </div>
        </aside>

        {/* Main Feed Area */}
        <div className="lg:col-span-3 space-y-6">
          {[
            { title: 'Hi', author: 'ZenTrader', category: 'Technical Analysis', replies: 0, views: 0, time: 'Just now' },
            { title: 'Market Volatility', author: 'ZenTrader', category: 'Fundamentals', replies: 12, views: 156, time: '2h ago' },
            { title: 'Analysis on Tech Sector correction', author: 'TradePro', category: 'Technical Analysis', replies: 24, views: 312, time: '5h ago', isPinned: true },
            { title: 'Question about position sizing for small accounts', author: 'NewbieInvestor', category: 'Fundamentals', replies: 8, views: 98, time: '3h ago' },
            { title: 'Is Bitcoin forming a double top?', author: 'CryptoKing', category: 'Crypto', replies: 112, views: 2405, time: '8h ago' },
            { title: 'Top 5 High Yield Aristocrats for 2024', author: 'DividendGuru', replies: 35, views: 420, time: '1d ago' },
            { title: 'Weekly Watchlist: EV Sector Breakouts', author: 'RisingTrends', category: 'Technical Analysis', replies: 15, views: 190, time: '2d ago' }
          ].map((post, i) => (
            <div key={i} className="bg-slate-950 border border-slate-800 rounded-2xl p-6 hover:border-emerald-500/50 transition-all cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <div className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black rounded uppercase tracking-widest">
                  {post.category || 'General'}
                </div>
                <div className="flex space-x-4 text-slate-500 text-[10px] font-mono">
                  <div className="flex items-center space-x-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                    <span>{post.replies}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    <span>{post.views}</span>
                  </div>
                </div>
              </div>
              <h4 className="text-xl font-bold mb-4 group-hover:text-emerald-400 transition-colors leading-snug">
                {post.title}
              </h4>
              <div className="flex items-center space-x-3 text-[10px] text-slate-500">
                <span className="font-black text-slate-300 uppercase tracking-widest">{post.author}</span>
                <span className="w-1 h-1 bg-slate-800 rounded-full"></span>
                <span className="font-mono uppercase">{post.time}</span>
                {post.isPinned && <span className="text-emerald-500 font-black uppercase ml-auto tracking-widest">Pinned</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Discussion Modal Backdrop & Content */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#020617]/90 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-[2.5rem] shadow-2xl p-8 lg:p-10">
            <h3 className="text-2xl font-black mb-6 uppercase tracking-tight">Start New Discussion</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Topic Title</label>
                <input 
                  type="text" 
                  placeholder="e.g., Thoughts on recent market volatility?"
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-sm font-bold focus:border-emerald-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Category</label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-sm font-bold focus:border-emerald-500 outline-none transition-all appearance-none">
                  {discussionCategories.map((cat, i) => (
                    <option key={i} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Content</label>
                <textarea 
                  rows={4}
                  placeholder="Share your insights or ask a question..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-sm font-bold focus:border-emerald-500 outline-none transition-all"
                ></textarea>
              </div>
            </div>
            <div className="mt-8 flex space-x-4">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-4 bg-slate-800 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-slate-750 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 py-4 bg-emerald-500 text-slate-950 font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-emerald-400 transition-colors">
                Post Discussion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;
