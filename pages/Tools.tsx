
import React, { useState, useEffect, useRef } from 'react';
import { IconBank, IconChart, IconBrain, IconShield } from '../components/Icons';

declare var google: any;

const Tools: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'calculator' | 'score' | 'tracker' | 'doctor'>('calculator');

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-20">
        <span className="text-emerald-500 text-[10px] font-black tracking-[0.4em] uppercase mb-4 block">Analytical Engine</span>
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase">Diagnostic Ecosystem</h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
          Remove emotional noise using institutional-grade diagnostic tools. Calculate risk, track sentiment, and optimize allocation with precision.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {[
          { id: 'calculator', label: 'Position Sizing', icon: <IconBank /> },
          { id: 'score', label: 'Alpha Score', icon: <IconChart /> },
          { id: 'tracker', label: 'Mood Index', icon: <IconBrain /> },
          { id: 'doctor', label: 'Portfolio Audit', icon: <IconShield /> }
        ].map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id as any)}
            className={`flex items-center space-x-3 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border ${
              activeTool === tool.id 
                ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-2xl shadow-emerald-500/20 scale-105' 
                : 'bg-slate-900/50 border-white/5 text-slate-400 hover:border-slate-700 hover:bg-slate-900'
            }`}
          >
            <span>{tool.icon}</span>
            <span>{tool.label}</span>
          </button>
        ))}
      </div>

      <div className="glass-card border border-white/5 rounded-[3rem] p-8 lg:p-16 min-h-[600px] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] pointer-events-none" />
        <div className="relative z-10">
          {activeTool === 'calculator' && <RiskCalculator />}
          {activeTool === 'score' && <PrecisionScore />}
          {activeTool === 'tracker' && <EmotionTracker />}
          {activeTool === 'doctor' && <PortfolioDoctor />}
        </div>
      </div>
      
      <div className="mt-12 text-center">
         <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em]">*All data computed locally. Private & Anonymous.*</p>
      </div>
    </div>
  );
};

const RiskCalculator = () => {
  const [entry, setEntry] = useState(150.50);
  const [stopLoss, setStopLoss] = useState(145.25);
  const [risk, setRisk] = useState(1000);
  
  const riskPerShare = entry - stopLoss;
  const shares = riskPerShare > 0 ? Math.floor(risk / riskPerShare) : 0;
  const totalInvestment = shares * entry;

  return (
    <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <h3 className="text-3xl font-black mb-4">Risk Magnitude</h3>
        <p className="text-slate-500 text-sm mb-10">Determine exact position sizes based on hard stop-losses to maintain portfolio consistency.</p>
        
        <div className="space-y-8">
          {[
            { label: 'Entry Price', val: entry, set: setEntry, unit: '$' },
            { label: 'Hard Stop-Loss', val: stopLoss, set: setStopLoss, unit: '$' },
            { label: 'Risk Budget', val: risk, set: setRisk, unit: '$' }
          ].map((field, i) => (
            <div key={i} className="group">
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 group-focus-within:text-emerald-500 transition-colors">{field.label}</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 font-bold">{field.unit}</span>
                <input 
                  type="number" 
                  value={field.val} 
                  onChange={(e) => field.set(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-6 py-4 text-xl font-bold focus:border-emerald-500 outline-none transition-all shadow-inner"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-emerald-500 p-12 rounded-[2.5rem] text-slate-950 shadow-2xl shadow-emerald-500/20 text-center relative overflow-hidden group">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
        <div className="relative z-10">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 opacity-70">Optimal Allocation</div>
          <div className="text-7xl lg:text-8xl font-black mb-4 tabular-nums">{shares}</div>
          <div className="text-xl font-bold mb-10">SHARES</div>
          
          <div className="pt-8 border-t border-slate-950/10 grid grid-cols-2 gap-4">
            <div>
              <div className="text-[10px] font-bold uppercase opacity-50">Exposure</div>
              <div className="text-lg font-black">${totalInvestment.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase opacity-50">Unit Risk</div>
              <div className="text-lg font-black">${riskPerShare.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PrecisionScore = () => {
  const [fundamental, setFundamental] = useState(85);
  const [sentiment, setSentiment] = useState(62);
  const [volatility, setVolatility] = useState(24);
  const chartRef = useRef<HTMLDivElement>(null);
  
  const score = Math.round((fundamental + sentiment + (100 - volatility)) / 3);

  useEffect(() => {
    if (typeof google === 'undefined') return;
    google.charts.load('current', { packages: ['corechart', 'bar'] });
    google.charts.setOnLoadCallback(() => {
      if (!chartRef.current) return;
      const data = google.visualization.arrayToDataTable([
        ['Metric', 'Your Score', { role: 'style' }],
        ['Fundamental', fundamental, '#10b981'],
        ['Sentiment', sentiment, '#3b82f6'],
        ['Risk Mitigation', 100 - volatility, '#f43f5e']
      ]);

      const options = {
        legend: { position: 'none' },
        backgroundColor: 'transparent',
        hAxis: { gridlines: { color: 'transparent' }, textStyle: { color: '#64748b' } },
        vAxis: { gridlines: { color: '#1e293b' }, textStyle: { color: '#64748b' } },
        chartArea: { width: '80%', height: '80%' }
      };

      const chart = new google.visualization.ColumnChart(chartRef.current);
      chart.draw(data, options);
    });
  }, [fundamental, sentiment, volatility]);

  return (
    <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-16">
      <div className="space-y-10">
        <h3 className="text-3xl font-black">Trade Precision</h3>
        <p className="text-slate-500 text-sm">Aggregating weighted variables into a single high-fidelity score.</p>
        
        <div className="space-y-12">
          {[
            { label: 'Fundamental Integrity', val: fundamental, set: setFundamental, color: 'bg-emerald-500', icon: <IconBank /> },
            { label: 'Market Sentiment', val: sentiment, set: setSentiment, color: 'bg-blue-500', icon: <IconBrain /> },
            { label: 'Volatility Compression', val: volatility, set: setVolatility, color: 'bg-rose-500', icon: <IconChart /> }
          ].map((item, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center">
                   <span className="mr-2">{item.icon}</span> {item.label}
                </span>
                <span className="text-sm font-black font-mono">{item.val}%</span>
              </div>
              <div className="relative h-2 bg-slate-950 rounded-full border border-white/5">
                <div className={`absolute left-0 top-0 h-full rounded-full ${item.color} shadow-[0_0_10px_rgba(255,255,255,0.1)]`} style={{ width: `${item.val}%` }}></div>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={item.val} 
                  onChange={(e) => item.set(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-12 bg-slate-950 rounded-[3rem] border border-white/5 relative">
        <div ref={chartRef} className="w-full h-48 mb-6" />
        <div className="relative z-10 text-center">
           <div className="w-40 h-40 rounded-full border-8 border-emerald-500/20 flex flex-col items-center justify-center relative mx-auto">
              <div className="text-6xl font-black text-emerald-400">{score}</div>
              <div className="text-[10px] font-black text-slate-600 mt-2 uppercase tracking-widest">Score</div>
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle cx="80" cy="80" r="72" fill="none" stroke="currentColor" strokeWidth="8" className="text-emerald-500" strokeDasharray="452.39" strokeDashoffset={452.39 - (452.39 * score / 100)} strokeLinecap="round" />
              </svg>
           </div>
           <h4 className="text-xl font-black mt-8 mb-3 uppercase">PRECISION STATUS</h4>
           <div className={`px-6 py-2 rounded-full text-[10px] font-black tracking-widest inline-block border ${
             score > 70 ? 'border-emerald-500 text-emerald-500' : score > 40 ? 'border-yellow-500 text-yellow-500' : 'border-rose-500 text-rose-500'
           }`}>
             {score > 70 ? 'HIGH CONVICTION' : score > 40 ? 'CAUTION ADVISED' : 'EXTREME DANGER'}
           </div>
        </div>
      </div>
    </div>
  );
};

const EmotionTracker = () => {
  const [mood, setMood] = useState(7);
  const levels = [
    { label: 'Extreme Fear', color: 'bg-rose-600', range: [0, 2], icon: <IconBrain /> },
    { label: 'Fear', color: 'bg-rose-400', range: [3, 4], icon: <IconBrain /> },
    { label: 'Neutral', color: 'bg-slate-600', range: [5, 5], icon: <IconBrain /> },
    { label: 'Greed', color: 'bg-emerald-400', range: [6, 7], icon: <IconBrain /> },
    { label: 'Extreme Greed', color: 'bg-emerald-600', range: [8, 10], icon: <IconBrain /> }
  ];

  const currentLevel = levels.find(l => mood >= l.range[0] && mood <= l.range[1]);

  return (
    <div className="max-w-2xl mx-auto text-center py-10">
      <h3 className="text-3xl font-black mb-6 uppercase">Market Mood Index</h3>
      <p className="text-slate-500 mb-16 max-w-lg mx-auto">Analyze the psychological aggregate of retail participants to spot contrarian opportunities.</p>
      
      <div className="relative mb-24 px-10">
        <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">
          <span>Capitulation</span>
          <span>Equilibrium</span>
          <span>Euphoria</span>
        </div>
        <div className="relative h-4 bg-slate-950 rounded-full border border-white/5 overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-r from-rose-500 via-slate-500 to-emerald-500 opacity-30" />
           <div 
             className="absolute top-0 h-full w-4 bg-white shadow-[0_0_15px_white] rounded-full transition-all duration-300" 
             style={{ left: `${mood * 10}%`, transform: 'translateX(-50%)' }}
           />
           <input 
              type="range" 
              min="0" max="10" 
              value={mood} 
              onChange={(e) => setMood(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            />
        </div>
      </div>

      <div className="group relative inline-block p-1 bg-gradient-to-br from-white/10 to-transparent rounded-[3rem]">
        <div className={`px-16 py-12 rounded-[2.9rem] ${currentLevel?.color} text-slate-950 transition-all duration-500`}>
          <div className="text-6xl mb-6 scale-125 flex justify-center text-slate-950">{currentLevel?.icon}</div>
          <div className="text-[10px] font-black uppercase tracking-[0.3em] mb-2 opacity-60">Mood Status</div>
          <div className="text-4xl lg:text-5xl font-black">{currentLevel?.label}</div>
        </div>
      </div>
    </div>
  );
};

const PortfolioDoctor = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof google === 'undefined') return;

    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(() => {
      if (!chartRef.current) return;
      const data = google.visualization.arrayToDataTable([
        ['Sector', 'Allocation'],
        ['Cloud Infrastructure', 42],
        ['Biotech', 18],
        ['Commodities', 22],
        ['Fixed Income', 18],
      ]);

      const options = {
        pieHole: 0.6,
        backgroundColor: 'transparent',
        colors: ['#3b82f6', '#10b981', '#f59e0b', '#64748b'],
        legend: { position: 'none' },
        pieSliceBorderColor: 'transparent',
        chartArea: { width: '100%', height: '100%' },
        tooltip: { textStyle: { color: '#000' } }
      };

      const chart = new google.visualization.PieChart(chartRef.current);
      chart.draw(data, options);
    });
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
        <div>
          <h3 className="text-3xl font-black mb-2 uppercase">Portfolio Diagnostics</h3>
          <p className="text-slate-500">Scanning for concentration risk and sector overexposure using real data visualization.</p>
        </div>
        <button className="px-8 py-3 bg-emerald-500 text-slate-950 font-black rounded-xl text-xs hover:bg-emerald-400 transition-colors uppercase tracking-widest">UPLOAD CSV DATA</button>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-16">
        <div className="flex flex-col items-center">
          <div ref={chartRef} className="w-full aspect-square max-w-[400px]" />
          <div className="grid grid-cols-2 gap-4 w-full mt-8">
             {[
              { label: 'Cloud Infrastructure', val: 42, color: 'bg-blue-500' },
              { label: 'Biotech', val: 18, color: 'bg-emerald-500' },
              { label: 'Commodities', val: 22, color: 'bg-yellow-500' },
              { label: 'Fixed Income', val: 18, color: 'bg-slate-500' }
            ].map((sec, i) => (
              <div key={i} className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${sec.color}`} />
                <span className="text-[10px] font-bold text-slate-400 uppercase">{sec.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-950/80 p-10 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-4 right-4 text-emerald-500/10 text-8xl font-black select-none uppercase">Audit</div>
          <h4 className="text-xl font-black mb-8 flex items-center text-white">
            <span className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-500 mr-3">!</span> 
            Critical Finding
          </h4>
          <div className="space-y-6">
            <div className="p-6 bg-slate-900/40 rounded-2xl border-l-4 border-rose-500">
               <h5 className="text-xs font-black text-rose-400 uppercase tracking-widest mb-2">Structural Weakness</h5>
               <p className="text-slate-400 text-sm leading-relaxed font-light">Tech exposure exceeds 40% threshold. You are effectively making a leveraged bet on interest rate stability.</p>
            </div>
            <div className="p-6 bg-slate-900/40 rounded-2xl border-l-4 border-emerald-500">
               <h5 className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-2">Prescription</h5>
               <p className="text-slate-400 text-sm leading-relaxed font-light">Allocate 12% into Fixed Income or Consumer Staples. Target Beta reduction of 0.2 units.</p>
            </div>
          </div>
          <button className="w-full mt-10 py-4 bg-slate-800 text-white font-black rounded-2xl text-[10px] tracking-[0.2em] hover:bg-slate-700 transition-colors uppercase">GENERATE DETAILED REPORT (PDF)</button>
        </div>
      </div>
    </div>
  );
};

export default Tools;
