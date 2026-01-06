
import React, { useState, useEffect } from 'react';
import { StockData } from '../types';
import { GoogleGenAI } from "@google/genai";

const Ticker: React.FC = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  // Fix: Added sources state to comply with Search Grounding requirements
  const [sources, setSources] = useState<{title?: string, uri?: string}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLivePrices = async () => {
      try {
        // Fix: Creating fresh GoogleGenAI instance inside effect for up-to-date API key
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const querySymbols = ['S&P 500 (SPX)', 'NASDAQ 100 (NDX)', 'Bitcoin (BTC)', 'Ethereum (ETH)', 'Tesla (TSLA)', 'Apple (AAPL)', 'NVIDIA (NVDA)', 'Alphabet (GOOGL)'];
        
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: `Provide the CURRENT stock prices and changes for: ${querySymbols.join(', ')}. 
          Output MUST be a JSON array only, with fields: symbol (ticker only), price (number), change (number), percent (number). 
          No markdown code blocks, no preamble.`,
          config: {
            tools: [{ googleSearch: {} }],
          },
        });

        // Fix: Extract and store URLs from groundingMetadata as required by guidelines
        const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
        if (chunks) {
          const webSources = chunks
            .filter(chunk => chunk.web)
            .map(chunk => ({ title: chunk.web?.title, uri: chunk.web?.uri }));
          setSources(webSources);
        }

        // Fix: Safely handle response text as a property
        const text = response.text;
        if (text) {
          try {
            // Note: Guidelines advise caution when parsing search grounding as JSON.
            // We use defensive cleaning and a try-catch block here.
            const rawText = text.replace(/```json|```/g, '').trim();
            const liveData = JSON.parse(rawText) as StockData[];
            
            if (liveData && liveData.length > 0) {
              setStocks(liveData);
              setLoading(false);
              return;
            }
          } catch (parseError) {
            console.warn("Gemini JSON parse failed, using fallback.", parseError);
          }
        }
        
        throw new Error("Invalid format from AI");
      } catch (error) {
        console.warn("Gemini Sync Interrupted, attempting Cloud Function fallback...", error);
        // Fallback to the provided Cloud Function logic
        try {
          const res = await fetch('/api/stocks');
          if (res.ok) {
            const data = await res.json();
            setStocks(data);
          }
        } catch (apiError) {
          console.error("Critical Data Failure:", apiError);
        }
        setLoading(false);
      }
    };

    fetchLivePrices();
    // Refresh cycle: 2 minutes
    const interval = setInterval(fetchLivePrices, 120000);
    return () => clearInterval(interval);
  }, []);

  if (loading && stocks.length === 0) {
    return (
      <div className="bg-slate-950 border-y border-white/5 py-4 overflow-hidden">
        <div className="flex items-center justify-center space-x-3 text-emerald-500/30 animate-pulse">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div>
          <span className="text-[9px] font-black uppercase tracking-[0.4em]">Establishing Neural Market Feed...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 border-y border-white/5 py-3 overflow-hidden whitespace-nowrap relative group">
      {/* Edge Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none"></div>
      
      <div className="flex animate-scroll-left hover:[animation-play-state:paused] cursor-default">
        {[...stocks, ...stocks].map((stock, idx) => (
          <div key={`${stock.symbol}-${idx}`} className="inline-flex items-center space-x-6 px-12 border-r border-white/5">
            <div className="flex flex-col items-start">
              <span className="font-black text-white text-sm tracking-tighter uppercase">{stock.symbol}</span>
              <div className="flex items-center space-x-1">
                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[7px] font-black text-emerald-500/50 tracking-widest uppercase">Live</span>
              </div>
            </div>
            
            <div className="flex flex-col items-end">
              <span className="text-slate-200 font-mono font-bold text-sm leading-none mb-1">
                ${stock.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <div className={`text-[9px] font-black font-mono leading-none ${
                stock.change >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {stock.change >= 0 ? '+' : ''}{stock.percent.toFixed(2)}%
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fix: Added source listing as required by Google Search grounding guidelines */}
      {sources.length > 0 && (
        <div className="absolute bottom-0 right-4 z-20 flex items-center space-x-2 bg-slate-900/90 px-2 py-0.5 rounded-t-lg border-x border-t border-white/10 shadow-lg">
          <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest">Neural Sources:</span>
          <div className="flex space-x-2 max-w-[300px] overflow-hidden">
            {sources.slice(0, 3).map((s, i) => (
              <a key={i} href={s.uri} target="_blank" rel="noopener noreferrer" className="text-[7px] text-emerald-500 hover:text-white transition-colors truncate max-w-[80px]">
                {s.title || 'Source'}
              </a>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-left {
          animation: scroll-left 25s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Ticker;
