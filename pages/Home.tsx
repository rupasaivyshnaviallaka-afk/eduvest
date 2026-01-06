
import React, { useEffect, useRef } from 'react';
import Ticker from '../components/Ticker';
import { IconChart, IconShield, IconBrain, IconTool, IconTrophy, IconUsers, IconBook } from '../components/Icons';

declare var google: any;

interface HomeProps {
  onExplore: () => void;
}

const Home: React.FC<HomeProps> = ({ onExplore }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof google === 'undefined') return;

    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(() => {
      if (!chartRef.current) return;
      const data = google.visualization.arrayToDataTable([
        ['Time', 'Sentiment'],
        ['08:00', 45],
        ['10:00', 52],
        ['12:00', 48],
        ['14:00', 65],
        ['16:00', 78],
        ['18:00', 72],
      ]);

      const options = {
        curveType: 'function',
        legend: { position: 'none' },
        backgroundColor: 'transparent',
        colors: ['#10b981'],
        vAxis: { 
          gridlines: { color: '#1e293b' },
          textStyle: { color: '#64748b', fontSize: 10 },
          baselineColor: '#1e293b'
        },
        hAxis: { 
          textStyle: { color: '#64748b', fontSize: 10 },
          baselineColor: '#1e293b'
        },
        chartArea: { width: '90%', height: '80%' }
      };

      const chart = new google.visualization.LineChart(chartRef.current);
      chart.draw(data, options);
    });
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-20">
        <div className="absolute inset-0 opacity-20 pointer-events-none select-none">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <path d="M0 600 Q 200 400, 400 500 T 800 300 T 1200 450 T 1600 200" stroke="#10b981" strokeWidth="2" fill="none" strokeDasharray="5,5" />
            <path d="M0 700 Q 300 500, 600 650 T 1000 400 T 1400 550 T 1800 300" stroke="#0ea5e9" strokeWidth="1" fill="none" />
          </svg>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-8 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Real-Time Market Analytics Active</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.85]">
            <span className="block text-slate-400 opacity-50 text-4xl md:text-5xl font-medium tracking-normal mb-2 uppercase">Precision Driven</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-500">EDUVEST</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Eliminate guesswork. Build discipline. Master the markets with our high-fidelity educational ecosystem and AI-driven diagnostic tools.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="group relative px-10 py-4 bg-emerald-500 text-slate-950 font-black rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-emerald-500/20 uppercase tracking-widest text-sm">
              <span className="relative z-10">START MASTERCLASS</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
            </button>
            <button onClick={onExplore} className="px-10 py-4 bg-slate-900 border border-slate-800 text-white font-bold rounded-full hover:bg-slate-800 hover:border-slate-700 transition-all uppercase tracking-widest text-sm">EXPLORE ANALYTICS</button>
          </div>
        </div>
      </section>

      <Ticker />

      {/* Problem & Solution Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-500/10 blur-[100px]" />
            <h2 className="text-5xl font-black mb-8 leading-tight">Bridging the gap between <br/><span className="text-emerald-500 uppercase">Retail & Institutional</span> Clarity.</h2>
            <p className="text-slate-400 mb-10 text-lg leading-relaxed">Modern markets are engineered to exploit emotional biases. We provide the technical and psychological infrastructure to help you trade with professional-grade discipline.</p>
            <div className="space-y-4">
              {[
                { t: 'Volatility', d: 'Predictive modeling for price swings.', icon: <IconChart /> },
                { t: 'Literacy', d: 'Structural understanding of market depth.', icon: <IconBook /> },
                { t: 'Anti-Fraud', d: 'Verified data streams and mentor auditing.', icon: <IconShield /> }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/50">
                  <div className="text-emerald-500">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-slate-200">{item.t}</h4>
                    <p className="text-xs text-slate-500">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4 pt-12">
              <img src="https://images.unsplash.com/photo-1642543348745-03b1219733d9?auto=format&fit=crop&q=80&w=400" className="rounded-3xl border border-slate-800 shadow-2xl h-64 w-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="Advanced Analytics" />
              <div className="bg-emerald-500 p-8 rounded-3xl text-slate-950">
                <div className="text-4xl font-black mb-2">94%</div>
                <div className="text-sm font-bold leading-tight uppercase tracking-tight">Success rate in discipline modules.</div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl h-full flex flex-col overflow-hidden">
                <div className="flex-grow p-4">
                   <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2">Live Sentiment Index</h4>
                   <div ref={chartRef} className="w-full h-32" />
                </div>
                <div className="p-4 pt-0">
                  <div className="text-xl font-black mb-1">AI Insights</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider">Real-time neural aggregation.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-32 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <span className="text-emerald-500 text-xs font-black uppercase tracking-[0.3em] mb-4 block">Future Trajectory</span>
            <h2 className="text-5xl font-black">Roadmap to Precision</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { phase: 'Phase 1', title: 'Educational Core', desc: 'Launch of full modular hub and risk logic.', status: 'Complete' },
              { phase: 'Phase 2', title: 'Mobile Nexus', desc: 'iOS & Android app for on-the-go precision.', status: 'In Progress' },
              { phase: 'Phase 3', title: 'Blockchain Ledger', desc: 'Immutable transparency for mentor track records.', status: 'Coming Q4' },
              { phase: 'Phase 4', title: 'Broker Neural', desc: 'Direct execution via API partnerships.', status: 'Researching' }
            ].map((item, i) => (
              <div key={i} className="relative p-8 glass-card rounded-3xl border-t-2 border-emerald-500/30 group hover:bg-slate-900/80 transition-all">
                <div className="text-xs font-black text-emerald-500 mb-4 uppercase">{item.phase}</div>
                <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed">{item.desc}</p>
                <div className="text-[10px] font-bold text-slate-400 bg-slate-800 inline-block px-2 py-1 rounded group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors uppercase tracking-widest">{item.status}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Preview */}
      <section className="py-32 max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <h2 className="text-4xl font-black mb-6 uppercase">The Precision <br/> Ecosystem</h2>
            <p className="text-slate-500 mb-8">Integrated modules designed for consistent capital growth and behavioral stability.</p>
            <button className="flex items-center space-x-2 text-emerald-500 font-bold group uppercase tracking-widest text-xs">
              <span>EXPLORE ALL MODULES</span><span className="group-hover:translate-x-2 transition-transform">→</span>
            </button>
          </div>
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Risk Calculator', desc: 'Precise position sizing.', icon: <IconTool /> },
              { title: 'Sentiment Analysis', desc: 'Fear & Greed Indexing.', icon: <IconBrain /> },
              { title: 'Gamified Quizzes', desc: 'Retention based learning.', icon: <IconTrophy /> },
              { title: 'Mentor Network', desc: 'Direct access to pros.', icon: <IconUsers /> }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-slate-900/50 border border-slate-800 rounded-3xl hover:bg-slate-800 transition-colors cursor-pointer group">
                <div className="text-emerald-500 mb-4 group-hover:scale-110 transition-transform inline-block">{item.icon}</div>
                <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                <p className="text-slate-500 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto rounded-[3rem] bg-gradient-to-br from-emerald-600 to-teal-900 p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl shadow-emerald-500/20">
          <div className="absolute inset-0 bg-grid opacity-10" />
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 relative z-10 uppercase tracking-tighter">Stop Guessing. <br/> Start Investing.</h2>
          <p className="text-emerald-100/70 mb-12 max-w-xl mx-auto relative z-10 text-lg">Join 50,000+ investors using Eduvest to sharpen their edge in the markets.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 relative z-10">
            <button className="px-12 py-5 bg-white text-emerald-900 font-black rounded-full shadow-xl hover:scale-105 transition-transform uppercase tracking-widest text-sm">CREATE FREE ACCOUNT</button>
            <button className="px-12 py-5 bg-emerald-700/50 text-white font-bold rounded-full border border-emerald-400/30 backdrop-blur hover:bg-emerald-700 transition-colors uppercase tracking-widest text-sm">WATCH DEMO</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
