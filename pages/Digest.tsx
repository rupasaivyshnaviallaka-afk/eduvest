
import React from 'react';
import { DIGEST_DATA } from '../constants';

const Digest: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div>
          <span className="text-emerald-500 text-[10px] font-black tracking-[0.3em] uppercase mb-2 block">Daily Intelligence</span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter">Precision Digest</h1>
          <p className="text-slate-500 mt-4 text-lg">Exam-style clarity on market macro shifts and technical setups.</p>
        </div>
        <div className="flex items-center space-x-2 bg-slate-900 p-2 rounded-2xl border border-slate-800">
           <button className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs">TODAY</button>
           <button className="px-4 py-2 text-slate-400 font-bold rounded-xl text-xs hover:text-white transition-colors">ARCHIVE</button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-12">
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6 px-2">Historical Briefs</h2>
          {DIGEST_DATA.map((item) => (
            <div key={item.id} className="p-5 bg-slate-900/40 border border-slate-800/60 rounded-2xl hover:border-emerald-500 cursor-pointer transition-all group">
              <div className="text-[10px] text-slate-500 font-bold mb-2 font-mono">{item.date}</div>
              <h4 className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors line-clamp-2">{item.title}</h4>
              <div className="mt-3 flex items-center space-x-2">
                <span className={`w-2 h-2 rounded-full ${item.sentiment.includes('Bullish') ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">{item.sentiment}</span>
              </div>
            </div>
          ))}
          
          <div className="p-8 bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-3xl mt-8">
            <h4 className="font-bold text-emerald-400 mb-2">Subscribe to Briefs</h4>
            <p className="text-slate-500 text-xs mb-4">Get institutional-grade summaries in your inbox at 8:00 AM EST.</p>
            <input type="email" placeholder="email@address.com" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs mb-2 outline-none focus:border-emerald-500" />
            <button className="w-full py-2 bg-emerald-500 text-slate-950 text-[10px] font-black rounded-lg">NOTIFY ME</button>
          </div>
        </div>

        <div className="lg:col-span-3">
          {DIGEST_DATA.slice(0, 1).map((item) => (
            <div key={item.id} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="glass-card rounded-[2.5rem] p-8 lg:p-16 border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] pointer-events-none" />
                
                <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="px-3 py-1 bg-slate-800 text-slate-400 text-[10px] font-black rounded-full font-mono">{item.date}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                      <span className="text-[10px] font-black text-emerald-500 tracking-widest uppercase">Volume {item.id.replace('d', '')}</span>
                    </div>
                    <h2 className="text-4xl lg:text-6xl font-black leading-tight text-white mb-2">{item.title}</h2>
                  </div>
                  <div className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest ${
                    item.sentiment.includes('Bullish') ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white'
                  }`}>
                    {item.sentiment}
                  </div>
                </div>

                <div className="grid gap-16">
                  <section className="relative">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-500 font-black">01</div>
                      <h3 className="text-xl font-black uppercase tracking-widest text-slate-200">Executive Summary</h3>
                    </div>
                    <div className="pl-14">
                      <p className="text-slate-400 text-lg leading-relaxed font-light">{item.summary}</p>
                    </div>
                  </section>

                  <section className="relative">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-500 font-black">02</div>
                      <h3 className="text-xl font-black uppercase tracking-widest text-slate-200">Critical Headlines</h3>
                    </div>
                    <div className="pl-14 grid gap-4">
                      {item.headlines.map((h, i) => (
                        <div key={i} className="flex items-center space-x-4 p-5 bg-slate-800/30 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-colors">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div>
                          <span className="text-slate-200 font-bold">{h}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="relative">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-500 font-black">03</div>
                      <h3 className="text-xl font-black uppercase tracking-widest text-slate-200">Portfolio Impact</h3>
                    </div>
                    <div className="pl-14">
                      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 rounded-[2rem] border border-white/5 shadow-inner">
                        <p className="text-slate-300 text-sm leading-relaxed italic opacity-80">
                          "{item.impact}"
                        </p>
                      </div>
                    </div>
                  </section>
                </div>

                <div className="mt-20 pt-10 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                      <img key={i} src={`https://picsum.photos/seed/${i+10}/100`} className="w-10 h-10 rounded-full border-2 border-slate-900" alt="reader" />
                    ))}
                    <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-slate-500">+12k</div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <button className="p-3 bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </button>
                    <button className="px-10 py-4 bg-white text-slate-950 font-black rounded-2xl hover:bg-slate-200 transition-transform active:scale-95 shadow-lg">
                      DOWNLOAD PDF REPORT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Digest;
