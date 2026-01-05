
import React from 'react';

const Community: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black mb-4">Connect & Learn</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">Join a thriving community of disciplined investors. Share insights, ask questions, and learn from experts.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Trending Discussions</h2>
            <button className="text-emerald-500 text-sm font-bold">+ New Discussion</button>
          </div>
          
          <div className="space-y-4">
            {[
              { title: 'Best strategies for volatile markets?', author: 'InvestorJohn', replies: 24, category: 'Strategies', time: '2h ago' },
              { title: 'Understanding P/E ratios in tech', author: 'MarketWatcher', replies: 12, category: 'Basics', time: '5h ago' },
              { title: 'My journey to a disciplined trader', author: 'ZenTrading', replies: 45, category: 'Mindset', time: '1d ago' },
              { title: 'Analyzing the upcoming Fed meeting', author: 'MacroAnalyst', replies: 8, category: 'Analysis', time: '3h ago' }
            ].map((post, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-slate-700 cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{post.category}</span>
                  <span className="text-[10px] text-slate-500">{post.time}</span>
                </div>
                <h4 className="text-lg font-bold mb-3 group-hover:text-emerald-400 transition-colors">{post.title}</h4>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>By {post.author}</span>
                  <span>{post.replies} Replies</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Top Mentors</h2>
          <div className="space-y-6">
            {[
              { name: 'Dr. Sarah Chen', expertise: 'Macro Economics', rating: 4.9, image: 'https://picsum.photos/seed/sarah/100' },
              { name: 'Marcus Thorne', expertise: 'Technical Analysis', rating: 4.8, image: 'https://picsum.photos/seed/marcus/100' },
              { name: 'Elena Rodriguez', expertise: 'Value Investing', rating: 5.0, image: 'https://picsum.photos/seed/elena/100' }
            ].map((mentor, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center space-x-4">
                <img src={mentor.image} alt={mentor.name} className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-grow">
                  <h4 className="font-bold text-sm">{mentor.name}</h4>
                  <p className="text-slate-500 text-xs">{mentor.expertise}</p>
                </div>
                <div className="text-right">
                  <div className="text-yellow-500 text-xs font-bold">★ {mentor.rating}</div>
                  <button className="text-[10px] text-emerald-500 font-bold uppercase hover:underline">Connect</button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-3xl">
            <h3 className="text-lg font-bold mb-2">Become a Mentor</h3>
            <p className="text-slate-400 text-xs mb-4">Share your knowledge and help others succeed in their investing journey.</p>
            <button className="w-full py-3 bg-emerald-500 text-white font-bold rounded-xl text-sm">Apply Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
