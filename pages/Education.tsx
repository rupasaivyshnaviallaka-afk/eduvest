
import React, { useState } from 'react';
import { EDUCATIONAL_MODULES, CASE_STUDIES } from '../constants';

const Education: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Basics' | 'Problems' | 'Solutions'>('All');

  const filteredModules = filter === 'All' 
    ? EDUCATIONAL_MODULES 
    : EDUCATIONAL_MODULES.filter(m => m.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-black mb-4">Educational Modules</h1>
        <p className="text-slate-400">Comprehensive lessons covering stock market basics, strategies, and advanced concepts.</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {['All', 'Basics', 'Problems', 'Solutions'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat as any)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              filter === cat ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {filteredModules.map((m) => (
          <div key={m.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-emerald-500 transition-all">
            <div className="text-3xl mb-4">{m.icon}</div>
            <h3 className="text-xl font-bold mb-2">{m.title}</h3>
            <p className="text-slate-400 text-sm mb-4">{m.description}</p>
            <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">{m.category}</span>
          </div>
        ))}
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-black mb-4">Real-World Case Studies</h2>
        <p className="text-slate-400">Learn from real investment scenarios, outcomes, and key lessons.</p>
      </div>

      <div className="space-y-12">
        {CASE_STUDIES.map((cs) => (
          <div key={cs.id} className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 flex flex-col md:flex-row">
            <div className="md:w-1/3">
              <img src={cs.imageUrl} alt={cs.title} className="w-full h-full object-cover" />
            </div>
            <div className="md:w-2/3 p-8">
              <h3 className="text-2xl font-bold mb-4">{cs.title}</h3>
              <div className="grid gap-6 mb-6">
                <div>
                  <h4 className="text-emerald-500 font-bold text-xs uppercase mb-1">Scenario</h4>
                  <p className="text-slate-300 text-sm">{cs.scenario}</p>
                </div>
                <div>
                  <h4 className="text-emerald-500 font-bold text-xs uppercase mb-1">Context</h4>
                  <p className="text-slate-300 text-sm">{cs.context}</p>
                </div>
                <div>
                  <h4 className="text-emerald-500 font-bold text-xs uppercase mb-1">Outcome</h4>
                  <p className="text-slate-300 text-sm">{cs.outcome}</p>
                </div>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-xl">
                <h4 className="text-emerald-500 font-bold text-xs uppercase mb-2">Key Learnings</h4>
                <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
                  {cs.keyLearnings.map((k, i) => (
                    <li key={i}>{k}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
