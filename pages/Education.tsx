
import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { CASE_STUDIES } from '../constants';
import { Lesson } from '../types';

/**
 * Local Video Database to ensure precision modules always have visual documentation.
 * These act as institutional fallbacks if Firestore records are incomplete.
 */
const LOCAL_VIDEOS: Record<string, string> = {
  'Volatility Arbitrage': 'https://www.youtube.com/watch?v=0_uE9Pz6Xsc',
  'Market Mechanics 101': 'https://www.youtube.com/watch?v=p7HKvqRI_Bo',
  'Position Sizing Protocols': 'https://www.youtube.com/watch?v=rE_vA8vH98I'
};

/**
 * Local Knowledge Base to fill in gaps if the database content is missing
 * for specific high-priority modules like Volatility Arbitrage.
 */
const LOCAL_TRANSCRIPTS: Record<string, string> = {
  'Volatility Arbitrage': `Volatility arbitrage (Vol Arb) is a statistical arbitrage strategy that profits from the difference between the forecasted future price volatility of an asset and the implied volatility of options based on that asset.

CONCEPTUAL FRAMEWORK:
1. Implied Volatility (IV): The market's expectation of future volatility, priced into option premiums.
2. Realized Volatility (RV): The actual movement the underlying asset undergoes during a specific period.

STRATEGY EXECUTION:
A trader utilizing volatility arbitrage typically looks for discrepancies where IV is significantly higher or lower than their own quantitative forecast of RV.
- If IV > RV Expected: The trader "sells" volatility by writing options and hedging the directional risk (Delta Neutrality).
- If IV < RV Expected: The trader "buys" volatility by purchasing options and delta-hedging.

THE VOLATILITY SMILE:
In professional environments, traders analyze the "Smile" or "Skew," which represents how IV varies across different strike prices. Arbitrageurs exploit "kinks" in this curve.

RISK VECTORS:
- Gamma Risk: The rate of change in Delta.
- Vega Risk: Sensitivity to changes in IV itself.
- Theta Decay: The cost of holding the position over time.

SUMMARY:
Successful Vol Arb isn't about predicting direction, but predicting the 'amplitude' of price swings relative to what the market currently expects.`,
  'Market Mechanics 101': `The global auction is driven by the interaction between Passive Liquidity and Aggressive Orders. 

1. THE LIMIT ORDER BOOK (LOB):
Every asset has a LOB consisting of 'Bids' (buyers) and 'Asks' (sellers). The 'Spread' is the gap between the highest bid and the lowest ask.

2. MARKET MAKERS:
These participants provide liquidity by simultaneously placing bids and asks. They profit from the spread but take the risk of being 'run over' by aggressive news-driven flow.

3. SLIPPAGE AND IMPACT:
Large orders move markets because they consume the available liquidity at the best price and move into the next level of the book. Masters of market mechanics use 'Iceberg Orders' and 'VWAP' algos to minimize this footprint.`,
  'Position Sizing Protocols': `Risk management is the only holy grail in trading. Without a sizing protocol, even a 90% win rate strategy will eventually go to zero.

THE KELLY CRITERION:
A mathematical formula used to determine the optimal size of a series of bets. It balances the probability of winning against the payoff ratio.

FIXED FRACTIONAL SIZING:
Trading a fixed percentage of total equity on any single trade (usually 1-2%). This allows for geometric growth during winning streaks and slows drawdown during losses.

VOLATILITY-ADJUSTED SIZING:
Standardizing risk based on the asset's ATR (Average True Range). A volatile stock requires a smaller position size to maintain the same dollar-risk as a stable stock.`
};

const Education: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{ code: string; message: string } | null>(null);

  useEffect(() => {
    const lessonsRef = collection(db, "lessons");
    const q = query(lessonsRef, orderBy("order", "asc"));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      try {
        const fetchedLessons = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || 'Untitled Lesson',
            category: data.category || 'Basics',
            description: data.description || '',
            content: data.content || '',
            videoUrl: data.videoUrl || '',
            order: typeof data.order === 'number' ? data.order : 0,
          } as Lesson;
        });
        
        setLessons(fetchedLessons);
        setError(null);
        setLoading(false);
      } catch (err: any) {
        console.error("Data Transformation Error:", err);
      }
    }, (err: any) => {
      console.error("Firestore Connection Error:", err);
      setError({
        code: err.code || 'unknown',
        message: err.message || 'The connection to the central academy database was interrupted.'
      });
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getYouTubeId = (url: string | undefined | null) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const categories = ['Basics', 'Problems', 'Solutions'] as const;
  const lessonsByCategory = categories.reduce((acc, cat) => {
    acc[cat] = lessons.filter(l => l.category === cat);
    return acc;
  }, {} as Record<string, Lesson[]>);

  if (selectedLesson) {
    // Resolve Video URL: DB first, then LOCAL_VIDEOS fallback
    const effectiveVideoUrl = selectedLesson.videoUrl || LOCAL_VIDEOS[selectedLesson.title];
    const videoId = getYouTubeId(effectiveVideoUrl);
    
    // Resolve Content: DB first, then LOCAL_TRANSCRIPTS fallback
    const displayContent = selectedLesson.content || LOCAL_TRANSCRIPTS[selectedLesson.title] || "No detailed content available for this module yet.";

    return (
      <div className="max-w-5xl mx-auto px-6 py-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <button 
          onClick={() => setSelectedLesson(null)}
          className="mb-12 flex items-center space-x-3 text-slate-500 hover:text-emerald-500 transition-colors group uppercase text-[10px] font-black tracking-widest"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          <span>Disconnect / Back to Index</span>
        </button>

        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-4">
             <span className="text-emerald-500 text-[10px] font-black tracking-[0.4em] uppercase">
              {selectedLesson.category} Module
            </span>
            <div className="h-px w-12 bg-emerald-500/20"></div>
            <span className="text-slate-600 text-[9px] font-mono">NODE_ORDER: {selectedLesson.order}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-none text-white">
            {selectedLesson.title}
          </h1>
          <p className="text-xl text-slate-400 font-light leading-relaxed max-w-3xl">
            {selectedLesson.description}
          </p>
        </div>

        {videoId ? (
          <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl mb-16 group">
             <div className="absolute inset-0 bg-emerald-500/5 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
             <iframe
               className="w-full h-full"
               src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`}
               title={selectedLesson.title}
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
               allowFullScreen
             ></iframe>
          </div>
        ) : (
          <div className="bg-slate-900/50 rounded-[2.5rem] p-16 border border-white/5 text-center mb-16 text-slate-600 uppercase text-[10px] font-black tracking-widest">
            Visual Documentation Not Available For This Node
          </div>
        )}

        <div className="glass-card rounded-[3rem] p-10 lg:p-16 border border-white/5 relative shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] pointer-events-none" />
          <h3 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-10 pb-4 border-b border-white/5 flex justify-between items-center">
            <span>Terminal Transcript</span>
            <span className="text-slate-700 font-mono">REF_{selectedLesson.id.slice(0, 6).toUpperCase()}</span>
          </h3>
          <div className="prose prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-slate-300 text-lg leading-relaxed font-light">
              {displayContent}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const LessonSection = ({ catTitle, lessonsList }: { catTitle: string, lessonsList: Lesson[] }) => {
    if (lessonsList.length === 0) return null;
    return (
      <div className="mb-24">
        <div className="flex items-center space-x-6 mb-12">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div>
          <h2 className="text-3xl font-black uppercase tracking-tight text-white">{catTitle}</h2>
          <div className="h-px flex-grow bg-slate-800/50"></div>
          <span className="text-slate-700 text-[10px] font-mono">{lessonsList.length} NODES DISCOVERED</span>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lessonsList.map((lesson) => (
            <div 
              key={lesson.id} 
              onClick={() => setSelectedLesson(lesson)}
              className="glass-card border border-white/5 p-8 rounded-[2.5rem] hover:border-emerald-500/50 transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/5 transition-colors"></div>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.2em] px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                    {lesson.category}
                  </span>
                  <span className="text-[9px] font-mono text-slate-600">ID_{lesson.order.toString().padStart(3, '0')}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-emerald-400 transition-colors uppercase leading-tight">
                  {lesson.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3 font-light">
                  {lesson.description}
                </p>
                <div className="flex items-center space-x-2 text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-white transition-colors">
                  <span>Connect</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="mb-24 relative">
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-emerald-500/5 blur-[120px] pointer-events-none" />
        <span className="text-emerald-500 text-[10px] font-black tracking-[0.4em] uppercase mb-4 block animate-pulse">Neural Academy Active</span>
        <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter uppercase leading-[0.85] text-white">
          Precision <span className="text-slate-800">Modules</span>
        </h1>
        <p className="text-slate-400 max-w-2xl text-xl font-light leading-relaxed">
          Access institutional curriculum synchronized in real-time. Remove the noise and master the technical mechanics of the global auction.
        </p>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 py-20">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="bg-slate-900/40 h-64 rounded-[2.5rem] animate-pulse border border-white/5"></div>
          ))}
        </div>
      ) : error ? (
        <div className="p-12 glass-card rounded-[3rem] border border-rose-500/30 text-center mb-24 bg-rose-500/5 shadow-2xl animate-in zoom-in-95 duration-500">
           <div className="w-16 h-16 bg-rose-500/20 rounded-2xl flex items-center justify-center text-rose-500 mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
           </div>
           <h2 className="text-rose-500 text-3xl font-black uppercase mb-4 tracking-tighter">Database Restricted</h2>
           <p className="text-slate-400 max-w-lg mx-auto mb-10 font-light">
             The Eduvest terminal failed to authorize the read request for the 'lessons' collection. {error.code === 'permission-denied' ? 'This is a security rule violation.' : error.message}
           </p>
           
           <div className="bg-slate-950 p-8 rounded-[2rem] text-[11px] font-mono text-slate-500 text-left border border-white/5 shadow-inner">
             <div className="text-emerald-500 mb-4 uppercase font-black tracking-widest border-b border-white/5 pb-2">Diagnostic Fix:</div>
             <div className="mb-3">1. Go to <span className="text-white">Firebase Console</span> &gt; <span className="text-white">Firestore</span> &gt; <span className="text-white">Rules</span></div>
             <div className="mb-3">2. Ensure the <span className="text-emerald-400">lessons</span> collection is readable.</div>
             <div className="bg-slate-900 p-4 rounded-xl text-slate-300 select-all border border-emerald-500/20 mt-4 overflow-x-auto">
               <pre className="whitespace-pre">
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /lessons/{lessonId} {
      allow read: if true; // Testing only - use auth in production
    }
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}`}
               </pre>
             </div>
           </div>
           <button 
             onClick={() => window.location.reload()}
             className="mt-10 px-10 py-4 bg-emerald-500 text-slate-950 font-black rounded-xl text-[10px] uppercase tracking-[0.2em] hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20"
           >
             Reconnect Terminal
           </button>
        </div>
      ) : (
        <div className="space-y-4">
          <LessonSection catTitle="Core Foundations" lessonsList={lessonsByCategory.Basics} />
          <LessonSection catTitle="Strategic Problems" lessonsList={lessonsByCategory.Problems} />
          <LessonSection catTitle="Precision Solutions" lessonsList={lessonsByCategory.Solutions} />
          
          {lessons.length === 0 && (
            <div className="text-center py-40 glass-card rounded-[4rem] border border-dashed border-white/10 opacity-50">
               <div className="text-slate-800 text-6xl mb-4 font-black uppercase tracking-tighter">No Active Nodes</div>
               <p className="text-slate-600 uppercase tracking-[0.3em] text-[10px] font-black">Scanning central database for 'lessons' collection...</p>
            </div>
          )}
        </div>
      )}

      {/* Case Studies Section */}
      <div className="mt-40 mb-16">
        <div className="flex items-center space-x-6 mb-16">
          <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"></div>
          <h2 className="text-4xl font-black uppercase tracking-tight text-white">Market Forensics</h2>
          <div className="h-px flex-grow bg-slate-800/40"></div>
          <span className="text-slate-700 text-[10px] font-mono">HISTORICAL_LOGS</span>
        </div>
        
        <div className="space-y-16">
          {CASE_STUDIES.map((cs) => (
            <div key={cs.id} className="glass-card rounded-[3rem] overflow-hidden border border-white/5 flex flex-col md:flex-row group transition-all duration-500 hover:border-emerald-500/20 shadow-xl">
              <div className="md:w-1/3 relative overflow-hidden">
                <img src={cs.imageUrl} alt={cs.title} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-110 group-hover:scale-100" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 to-transparent md:hidden"></div>
              </div>
              <div className="md:w-2/3 p-10 lg:p-14 relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] pointer-events-none" />
                <div className="flex justify-between items-start mb-8">
                  <h3 className="text-3xl font-black uppercase tracking-tight text-white group-hover:text-emerald-400 transition-colors">{cs.title}</h3>
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-900 border border-white/5 px-4 py-1.5 rounded-full">{cs.date}</span>
                </div>
                
                <div className="grid md:grid-cols-3 gap-10 mb-10">
                  <div>
                    <h4 className="text-emerald-500 text-[9px] font-black uppercase tracking-[0.2em] mb-3">Event Scenario</h4>
                    <p className="text-slate-500 text-xs leading-relaxed font-light">{cs.scenario}</p>
                  </div>
                  <div>
                    <h4 className="text-emerald-500 text-[9px] font-black uppercase tracking-[0.2em] mb-3">Contextual Logic</h4>
                    <p className="text-slate-500 text-xs leading-relaxed font-light">{cs.context}</p>
                  </div>
                  <div>
                    <h4 className="text-emerald-500 text-[9px] font-black uppercase tracking-[0.2em] mb-3">System Outcome</h4>
                    <p className="text-slate-500 text-xs leading-relaxed font-light">{cs.outcome}</p>
                  </div>
                </div>

                <div className="bg-slate-950/60 p-8 rounded-[2rem] border border-white/5 shadow-inner">
                  <h4 className="text-white text-[9px] font-black uppercase tracking-[0.3em] mb-6 flex items-center">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 shadow-[0_0_5px_#10b981]"></span>
                    Critical Learning Data
                  </h4>
                  <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cs.keyLearnings.map((k, i) => (
                      <li key={i} className="text-[10px] text-slate-500 leading-tight flex items-start group/li">
                        <span className="text-emerald-500 mr-3 group-hover/li:translate-x-1 transition-transform">•</span>
                        {k}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;
