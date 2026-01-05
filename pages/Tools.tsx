
import React, { useState } from 'react';

const Tools: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'calculator' | 'score' | 'tracker' | 'doctor'>('calculator');

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black mb-4">Smart Investment Tools</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">AI-powered calculators and diagnostic tools to help you make informed, disciplined investment decisions.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {[
          { id: 'calculator', label: 'Risk Calculator', icon: '💰' },
          { id: 'score', label: 'Precision Score', icon: '📈' },
          { id: 'tracker', label: 'Emotion Tracker', icon: '🧠' },
          { id: 'doctor', label: 'Portfolio Doctor', icon: '🏥' }
        ].map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id as any)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold transition-all border ${
              activeTool === tool.id 
                ? 'bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/20' 
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <span>{tool.icon}</span>
            <span>{tool.label}</span>
          </button>
        ))}
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 min-h-[500px]">
        {activeTool === 'calculator' && <RiskCalculator />}
        {activeTool === 'score' && <PrecisionScore />}
        {activeTool === 'tracker' && <EmotionTracker />}
        {activeTool === 'doctor' && <PortfolioDoctor />}
      </div>
    </div>
  );
};

const RiskCalculator = () => {
  const [entry, setEntry] = useState(100);
  const [stopLoss, setStopLoss] = useState(95);
  const [risk, setRisk] = useState(500);
  
  const riskPerShare = entry - stopLoss;
  const shares = riskPerShare > 0 ? Math.floor(risk / riskPerShare) : 0;
  const totalInvestment = shares * entry;

  return (
    <div className="max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold mb-8 text-center">Risk Calculator</h3>
      <div className="grid gap-6">
        <div>
          <label className="block text-sm text-slate-400 mb-2">Entry Price ($)</label>
          <input 
            type="number" 
            value={entry} 
            onChange={(e) => setEntry(Number(e.target.value))}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:border-emerald-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-2">Stop Loss ($)</label>
          <input 
            type="number" 
            value={stopLoss} 
            onChange={(e) => setStopLoss(Number(e.target.value))}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:border-emerald-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-2">Total Risk Amount ($)</label>
          <input 
            type="number" 
            value={risk} 
            onChange={(e) => setRisk(Number(e.target.value))}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:border-emerald-500 outline-none"
          />
        </div>
      </div>
      
      <div className="mt-10 p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center">
        <div className="text-sm text-emerald-400 uppercase font-bold tracking-widest mb-2">Recommended Position Size</div>
        <div className="text-5xl font-black text-white mb-2">{shares} Shares</div>
        <div className="text-slate-400 text-sm">Total Investment: ${totalInvestment.toLocaleString()}</div>
      </div>
    </div>
  );
};

const PrecisionScore = () => {
  const [fundamental, setFundamental] = useState(70);
  const [sentiment, setSentiment] = useState(50);
  const [volatility, setVolatility] = useState(40);
  
  const score = Math.round((fundamental + sentiment + (100 - volatility)) / 3);

  return (
    <div className="max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold mb-2 text-center">Precision Score</h3>
      <p className="text-slate-400 text-center mb-10 text-sm">AI-driven analysis combining fundamentals, sentiment, and volatility.</p>
      
      <div className="space-y-8">
        {[
          { label: 'Fundamental Score', val: fundamental, set: setFundamental, color: 'bg-emerald-500' },
          { label: 'Sentiment Score', val: sentiment, set: setSentiment, color: 'bg-blue-500' },
          { label: 'Volatility Score', val: volatility, set: setVolatility, color: 'bg-rose-500' }
        ].map((item, idx) => (
          <div key={idx}>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">{item.label}</span>
              <span className="text-sm font-bold">{item.val}%</span>
            </div>
            <input 
              type="range" 
              min="0" max="100" 
              value={item.val} 
              onChange={(e) => item.set(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <div className="text-6xl font-black text-emerald-400 mb-2">{score}</div>
        <div className="text-xl font-bold mb-4">Overall Precision Score</div>
        <p className="text-sm text-slate-400">
          {score > 70 ? 'Excellent investment potential with high precision.' : score > 40 ? 'Moderate investment profile. Proceed with standard caution.' : 'Low precision. High risk detected in current parameters.'}
        </p>
      </div>
    </div>
  );
};

const EmotionTracker = () => {
  const [mood, setMood] = useState(5);
  const levels = [
    { label: 'Extreme Fear', color: 'bg-rose-600', range: [0, 2] },
    { label: 'Fear', color: 'bg-rose-400', range: [3, 4] },
    { label: 'Neutral', color: 'bg-slate-500', range: [5, 5] },
    { label: 'Greed', color: 'bg-emerald-400', range: [6, 7] },
    { label: 'Extreme Greed', color: 'bg-emerald-600', range: [8, 10] }
  ];

  const currentLevel = levels.find(l => mood >= l.range[0] && mood <= l.range[1]);

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h3 className="text-2xl font-bold mb-8">Market Mood Meter</h3>
      
      <div className="relative pt-10 pb-12">
        <input 
          type="range" 
          min="0" max="10" 
          value={mood} 
          onChange={(e) => setMood(Number(e.target.value))}
          className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 mb-12"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase tracking-widest -mt-8">
          <span>Extreme Fear</span>
          <span>Neutral</span>
          <span>Extreme Greed</span>
        </div>
      </div>

      <div className={`inline-block px-10 py-6 rounded-3xl ${currentLevel?.color} text-white`}>
        <div className="text-sm font-bold uppercase tracking-widest mb-1">Current Market Mood</div>
        <div className="text-4xl font-black">{currentLevel?.label}</div>
      </div>
      
      <p className="mt-8 text-slate-400 text-sm">
        {mood <= 2 ? 'Opportunity alert: Market is in extreme fear. Historically a good entry point.' : 
         mood >= 8 ? 'Caution: Extreme greed detected. Be wary of a potential correction.' : 
         'Market is balanced. Focus on individual asset fundamentals.'}
      </p>
    </div>
  );
};

const PortfolioDoctor = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold mb-8 text-center">Portfolio Doctor</h3>
      <div className="space-y-6 mb-10">
        {[
          { label: 'Technology', val: 45, color: 'bg-blue-500' },
          { label: 'Healthcare', val: 20, color: 'bg-emerald-500' },
          { label: 'Finance', val: 20, color: 'bg-yellow-500' },
          { label: 'Energy', val: 15, color: 'bg-rose-500' }
        ].map((sec, i) => (
          <div key={i}>
            <div className="flex justify-between text-sm mb-2">
              <span>{sec.label}</span>
              <span>{sec.val}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full">
              <div className={`h-full rounded-full ${sec.color}`} style={{ width: `${sec.val}%` }}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
        <h4 className="text-lg font-bold mb-4 flex items-center">
          <span className="text-yellow-500 mr-2">⚠️</span> Diagnosis
        </h4>
        <div className="text-sm text-slate-300 space-y-4">
          <p><strong>Risk Level:</strong> Medium-High</p>
          <p><strong>Concentration Risk:</strong> High exposure to Technology sector (45%). A downturn in tech could significantly impact your portfolio.</p>
          <p><strong>Recommendation:</strong> Consider rebalancing 10-15% of your tech holdings into defensive sectors like Utilities or Consumer Staples to improve diversification.</p>
        </div>
      </div>
    </div>
  );
};

export default Tools;
