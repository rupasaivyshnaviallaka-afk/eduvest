
import React from 'react';
import { DIGEST_DATA } from '../constants';

const Digest: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-black mb-4">Daily Precision Digest</h1>
        <p className="text-slate-400">Exam-style clarity on daily market events, sentiment, and impacts.</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-12">
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Recent Digests</h2>
          {DIGEST_DATA.map((item) => (
            <div key={item.id} className="p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-emerald-500 cursor-pointer transition-all">
              <div className="text-[10px] text-slate-500 font-bold mb-1">{item.date}</div>
              <h4 className="text-sm font-bold text-slate-300 line-clamp-2">{item.title}</h4>
            </div>
          ))}
        </div>

        <div className="lg:col-span-3">
          {DIGEST_DATA.map((item, idx) => (
            <div key={item.id} className={`${idx !== 0 ? 'hidden' : 'block'}`}>
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 lg:p-12">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <span className="text-emerald-500 text-xs font-bold uppercase tracking-widest">{item.date}</span>
                    <h2 className="text-3xl lg:text-4xl font-black mt-2">{item.title}</h2>
                  </div>
                  <div className={`px-4 py-2 rounded-lg font-bold text-sm ${
                    item.sentiment.includes('Bullish') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                  }`}>
                    {item.sentiment}
                  </div>
                </div>

                <div className="grid gap-10">
                  <section>
                    <h3 className="text-lg font-bold mb-3 border-l-4 border-emerald-500 pl-4">Executive Summary</h3>
                    <p className="text-slate-400 leading-relaxed">{item.summary}</p>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold mb-4 border-l-4 border-emerald-500 pl-4">Key Headlines</h3>
                    <ul className="space-y-4">
                      {item.headlines.map((h, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-emerald-500 mr-3">•</span>
                          <span className="text-slate-300 font-medium">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold mb-3 border-l-4 border-emerald-500 pl-4">Impact Analysis</h3>
                    <div className="bg-slate-800/50 p-6 rounded-2xl text-slate-300 text-sm italic">
                      {item.impact}
                    </div>
                  </section>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-800 flex justify-between items-center">
                  <div className="flex space-x-4">
                    <button className="text-slate-500 hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </button>
                    <button className="text-slate-500 hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>
                  </div>
                  <button className="px-6 py-2 bg-slate-800 text-white font-bold rounded-lg hover:bg-slate-700 transition-colors">
                    Read Full Report
                  </button>
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
