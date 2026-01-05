
import React from 'react';
import Ticker from '../components/Ticker';

interface HomeProps {
  onExplore: () => void;
}

const Home: React.FC<HomeProps> = ({ onExplore }) => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500">
            PRECISION
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Empowering investors with clarity, discipline, and smart tools. Master the markets through a fusion of rigorous education and advanced interactive analytics.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="px-8 py-3 bg-white text-slate-950 font-bold rounded-lg hover:bg-slate-200 transition-all transform hover:scale-105">
              Start Learning
            </button>
            <button 
              onClick={onExplore}
              className="px-8 py-3 bg-transparent border border-slate-700 text-white font-bold rounded-lg hover:border-emerald-500 transition-all transform hover:scale-105"
            >
              Explore Tools
            </button>
          </div>
        </div>
      </section>

      <Ticker />

      {/* The Market Reality */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">The Market Reality</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Navigating the chaos requires more than just luck. It demands a systematic approach to overcome the inherent challenges of modern investing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800">
            <span className="inline-block px-3 py-1 bg-rose-500/10 text-rose-500 text-xs font-bold rounded mb-4 uppercase tracking-wider">The Challenge</span>
            <h3 className="text-3xl font-bold mb-6">Why Most Investors Fail</h3>
            <ul className="space-y-6">
              {[
                'Market volatility and unpredictable price movements',
                'Lack of financial literacy and investment knowledge',
                'Fraud, misinformation, and unreliable advice',
                'Emotional trading and lack of discipline'
              ].map((item, i) => (
                <li key={i} className="flex items-start space-x-4">
                  <div className="mt-1 w-5 h-5 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 text-xs">!</div>
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-colors group">
              <div className="mb-4 text-emerald-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-2">Comprehensive education with visual learning tools</h4>
              <p className="text-slate-400 text-sm mb-4">We provide the infrastructure to turn this concept into a daily habit. Stop guessing and start executing with precision.</p>
              <button className="text-emerald-500 text-sm font-bold group-hover:underline">Explore Feature &rarr;</button>
            </div>
            
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-colors group">
              <div className="mb-4 text-emerald-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-2">AI-powered tools for risk management and analysis</h4>
              <p className="text-slate-400 text-sm mb-4">Our advanced algorithms analyze market sentiment and volatility to give you a clearer picture of your portfolio risk.</p>
              <button className="text-emerald-500 text-sm font-bold group-hover:underline">Explore Feature &rarr;</button>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-32 text-center bg-slate-900/30">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-4xl md:text-5xl font-black italic text-slate-200">
            "Discipline is the bridge between goals and accomplishment."
          </p>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">The Precision Ecosystem</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">A comprehensive suite of tools and resources designed to elevate every aspect of your trading journey.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: 'Educational Hub', desc: 'Concise modules, case studies, and visual guides explaining market fundamentals.', icon: '📖' },
            { title: 'Interactive Tools', desc: 'Risk calculator, precision score, emotion tracker, and diagnostic tools.', icon: '🛠️' },
            { title: 'Gamified Learning', desc: 'Earn badges, take quizzes, and practice with simulations to build habits.', icon: '🎮' },
            { title: 'Community Forum', desc: 'Connect with fellow investors, share insights, and learn from collective wisdom.', icon: '👥' },
            { title: 'Daily Digest', desc: 'Exam-style summaries of market events with sentiment analysis and impact insights.', icon: '📰' },
            { title: 'Mentor Connect', desc: 'Access verified mentors for personalized guidance and professional insights.', icon: '🎓' }
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 p-8 rounded-3xl hover:border-emerald-500 transition-all cursor-pointer group">
              <div className="text-4xl mb-6">{item.icon}</div>
              <h4 className="text-2xl font-bold mb-3">{item.title}</h4>
              <p className="text-slate-400 text-sm mb-6">{item.desc}</p>
              <button className="text-emerald-500 font-bold uppercase tracking-widest text-xs group-hover:translate-x-2 transition-transform">
                Access Module &rarr;
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-t from-emerald-500/10 to-transparent">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Master the Markets?</h2>
          <p className="text-slate-400 mb-10">Join thousands of investors who are building disciplined, informed investment strategies with Eduvest.</p>
          <button className="px-10 py-4 bg-emerald-500 text-white font-black rounded-xl hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20">
            Get Started Free
          </button>
          <div className="mt-8">
            <button className="text-slate-500 text-xs underline hover:text-slate-300">View Disclaimers</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
