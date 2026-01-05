
import React from 'react';
import { MOCK_STOCKS } from '../constants';

const Ticker: React.FC = () => {
  return (
    <div className="bg-slate-900 border-y border-slate-800 py-3 overflow-hidden whitespace-nowrap">
      <div className="flex animate-scroll-left">
        {[...MOCK_STOCKS, ...MOCK_STOCKS].map((stock, idx) => (
          <div key={`${stock.symbol}-${idx}`} className="inline-flex items-center space-x-4 px-8 border-r border-slate-800">
            <span className="font-bold text-slate-200">{stock.symbol}</span>
            <span className="text-slate-400 font-mono">${stock.price.toLocaleString()}</span>
            <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${
              stock.change >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
            }`}>
              {stock.change >= 0 ? '+' : ''}{stock.percent.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Ticker;
