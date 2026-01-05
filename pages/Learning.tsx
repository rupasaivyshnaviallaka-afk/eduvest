
import React from 'react';

const Learning: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black mb-4">Gamified Learning</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">Master the markets through practice. Earn badges, complete quizzes, and test your skills in realistic simulations.</p>
      </div>

      <div className="mb-20">
        <h2 className="text-2xl font-bold mb-8">Achievement Badges</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {[
            { name: 'Market Novice', icon: '🌱', xp: '+50 XP', desc: 'Completed first module' },
            { name: 'Quiz Whiz', icon: '⚡', xp: '+100 XP', desc: '100% on 5 quizzes' },
            { name: 'Risk Master', icon: '🛡️', xp: '+150 XP', desc: 'Expert calculator use' },
            { name: 'Daily Reader', icon: '📅', xp: '+30 XP', desc: '7-day digest streak' },
            { name: 'Analyst', icon: '📊', xp: '+200 XP', desc: 'Analyzed 10 stocks' },
            { name: 'Disciplined', icon: '🧘', xp: '+500 XP', desc: 'No emotional trades' }
          ].map((badge, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl text-center group hover:border-emerald-500 transition-all">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{badge.icon}</div>
              <h4 className="font-bold text-sm mb-1">{badge.name}</h4>
              <div className="text-emerald-500 text-[10px] font-bold mb-2">{badge.xp}</div>
              <p className="text-slate-500 text-[10px]">{badge.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-20">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold">Interactive Quizzes</h2>
            <p className="text-slate-400 text-sm">Test your knowledge and sharpen your skills.</p>
          </div>
          <button className="text-emerald-500 text-sm font-bold">View All Quizzes &rarr;</button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Market Basics 101', level: 'Beginner', questions: 10, time: '5m' },
            { title: 'Technical Analysis', level: 'Intermediate', questions: 15, time: '8m' },
            { title: 'Risk & Portfolio', level: 'Advanced', questions: 20, time: '12m' }
          ].map((quiz, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
              <div className="flex justify-between items-start mb-4">
                <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold rounded">{quiz.level}</span>
                <span className="text-slate-500 text-[10px]">{quiz.time}</span>
              </div>
              <h4 className="text-lg font-bold mb-4">{quiz.title}</h4>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-xs">{quiz.questions} Questions</span>
                <button className="px-4 py-2 bg-slate-800 text-white text-xs font-bold rounded-lg hover:bg-emerald-500 transition-colors">Start Quiz</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-8">Trading Simulations</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden group">
            <div className="h-48 bg-emerald-500/10 flex items-center justify-center">
              <svg className="w-16 h-16 text-emerald-500 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold mb-2">Bull Market Challenge</h3>
              <p className="text-slate-400 text-sm mb-6">Navigate a high-growth environment. Can you maximize gains while managing inevitable corrections?</p>
              <button className="w-full py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors">Launch Simulation</button>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden group">
            <div className="h-48 bg-rose-500/10 flex items-center justify-center">
              <svg className="w-16 h-16 text-rose-500 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
              </svg>
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold mb-2">Bear Market Survival</h3>
              <p className="text-slate-400 text-sm mb-6">Preserve your capital during a prolonged downturn. Master the art of defensive positioning.</p>
              <button className="w-full py-3 bg-slate-800 border border-slate-700 text-white font-bold rounded-xl hover:border-rose-500 transition-colors">Launch Simulation</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learning;
