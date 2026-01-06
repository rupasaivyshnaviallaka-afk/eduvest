
import React, { useState, useEffect, useRef } from 'react';
import { BadgeSymbol } from '../components/Icons';
import { QuizQuestion } from '../types';

interface SimulationState {
  type: 'Bull Market' | 'Bear Market';
  balance: number;
  shares: number;
  price: number;
  priceHistory: number[];
  timeRemaining: number;
  tradeSize: number;
  isStarted: boolean;
  isEnded: boolean;
  volatility: 'Low' | 'Medium' | 'High';
}

interface QuizState {
  id: string;
  title: string;
  questions: QuizQuestion[];
  currentIndex: number;
  score: number;
  userAnswers: number[];
  isComplete: boolean;
}

const QUIZ_DATA: Record<string, QuizQuestion[]> = {
  beginner: [
    { id: 'b1', question: 'What does a "Bull Market" signify?', options: ['Rising prices and optimism', 'Falling prices and pessimism', 'Stagnant prices', 'High interest rates'], correctAnswer: 0 },
    { id: 'b2', question: 'What is a "Dividend"?', options: ['A tax on stock sales', 'A share of profit paid to stockholders', 'The cost to buy a stock', 'A type of stock market index'], correctAnswer: 1 },
    { id: 'b3', question: 'What is a "Ticker Symbol"?', options: ['A secret code for brokers', 'The price of a stock', 'A unique series of letters representing a stock', 'The time a trade was made'], correctAnswer: 2 },
    { id: 'b4', question: 'Which of these is a major US stock index?', options: ['The NASDAQ', 'The Dollar', 'The Fed', 'The Treasury'], correctAnswer: 0 },
    { id: 'b5', question: 'What is "Liquidity" in trading?', options: ['The amount of money in your bank', 'How easily an asset can be converted to cash without affecting price', 'The speed of internet connection', 'A type of market crash'], correctAnswer: 1 },
    { id: 'b6', question: 'What is "Market Capitalization"?', options: ['The total profit of a company', 'The total value of a company\'s outstanding shares', 'The city where the stock exchange is located', 'The amount of tax a company pays'], correctAnswer: 1 },
    { id: 'b7', question: 'A "Limit Order" is an order to:', options: ['Buy at any price', 'Buy or sell at a specific price or better', 'Cancel all previous orders', 'Limit your total number of trades'], correctAnswer: 1 },
    { id: 'b8', question: 'What is a "Blue Chip" stock?', options: ['A high-risk startup stock', 'Stock in a well-established, financially sound company', 'A stock that only trades on Tuesdays', 'A stock that has just IPO\'d'], correctAnswer: 1 },
    { id: 'b9', question: 'What does the P/E ratio measure?', options: ['Price vs. Expenses', 'Price vs. Earnings per share', 'Profit vs. Equity', 'Performance vs. Expectations'], correctAnswer: 1 },
    { id: 'b10', question: 'What is "Diversification"?', options: ['Investing all money in one stock', 'Spreading investments across various assets to reduce risk', 'Buying stocks in different currencies only', 'Selling all stocks at once'], correctAnswer: 1 }
  ],
  intermediate: [
    { id: 'i1', question: 'What does RSI stand for in technical analysis?', options: ['Relative Strength Index', 'Random Stock Indicator', 'Rate of Stock Increase', 'Real-time Sentiment Index'], correctAnswer: 0 },
    { id: 'i2', question: 'A "Support Level" is generally where:', options: ['Sellers outnumber buyers', 'Price stops falling and starts rising', 'Price stops rising and starts falling', 'The market closes for the day'], correctAnswer: 1 },
    { id: 'i3', question: 'What is a "Moving Average"?', options: ['The average speed of a trader', 'A smoothed line representing average price over time', 'The total volume of trades', 'The peak price of the year'], correctAnswer: 1 },
    { id: 'i4', question: 'What does "Volume" represent?', options: ['The price of a stock', 'The total number of shares traded in a period', 'The noise level of the trading floor', 'The market cap of a company'], correctAnswer: 1 },
    { id: 'i5', question: 'Which chart pattern is typically "Bullish"?', options: ['Head and Shoulders', 'Double Top', 'Cup and Handle', 'Descending Triangle'], correctAnswer: 2 },
    { id: 'i6', question: 'What is a "Fibonacci Retracement"?', options: ['A tool to find potential support and resistance levels', 'A type of company audit', 'A method for calculating dividends', 'A stock market holiday'], correctAnswer: 0 },
    { id: 'i7', question: 'What does "MACD" stand for?', options: ['Market Analysis and Chart Data', 'Moving Average Convergence Divergence', 'Mean Asset Cost Distribution', 'Monthly Account Credit Detail'], correctAnswer: 1 },
    { id: 'i8', question: 'What is "Implied Volatility"?', options: ['The actual past movement of a stock', 'The market\'s expectation of future price swings', 'The speed of transaction execution', 'The interest rate set by the Fed'], correctAnswer: 1 },
    { id: 'i9', question: 'A "Candlestick" chart shows:', options: ['Only the closing price', 'The open, high, low, and close for a period', 'The number of active traders', 'The historical dividend yield'], correctAnswer: 1 },
    { id: 'i10', question: 'What is a "Gap Up"?', options: ['A sudden drop in stock price', 'When a stock opens at a higher price than it closed the previous day', 'An increase in trading fees', 'A period of no trading'], correctAnswer: 1 },
    { id: 'i11', question: 'What is a "Trailing Stop"?', options: ['A stop order that follows the price up by a set amount', 'A physical stop at the exchange', 'A manual sell order', 'An order that only executes at the end of the day'], correctAnswer: 0 },
    { id: 'i12', question: 'What is "Fundamental Analysis"?', options: ['Studying chart patterns', 'Evaluating a company\'s financial health and economic factors', 'Following social media trends', 'Trading based on news headlines only'], correctAnswer: 1 },
    { id: 'i13', question: 'The "Bid-Ask Spread" is:', options: ['The total price of a stock', 'The difference between the highest buy and lowest sell price', 'The daily trading volume', 'The broker\'s commission'], correctAnswer: 1 },
    { id: 'i14', question: 'What is "Alpha" in investing?', options: ['The first stock in a portfolio', 'The excess return of an investment relative to a benchmark', 'The total market risk', 'A type of trading software'], correctAnswer: 1 },
    { id: 'i15', question: 'What is "Beta"?', options: ['The second version of a stock', 'A measure of a stock\'s volatility relative to the overall market', 'The average price of a stock', 'The number of shares outstanding'], correctAnswer: 1 }
  ],
  advanced: [
    { id: 'a1', question: 'The "Sharpe Ratio" is used to measure:', options: ['The speed of order execution', 'Risk-adjusted return', 'The dividend yield', 'The price-to-earnings growth'], correctAnswer: 1 },
    { id: 'a2', question: 'What is "Delta" in option Greeks?', options: ['Sensitivity to time decay', 'Sensitivity to volatility', 'Sensitivity to the price change of the underlying asset', 'Sensitivity to interest rates'], correctAnswer: 2 },
    { id: 'a3', question: 'What is the "Kelly Criterion" primarily used for?', options: ['Picking stocks', 'Determining optimal position sizing', 'Timing the market bottom', 'Measuring inflation'], correctAnswer: 1 },
    { id: 'a4', question: 'What is "Gamma" in options trading?', options: ['The rate of change in Delta', 'The rate of change in Theta', 'The total cost of the option', 'The expiration date'], correctAnswer: 0 },
    { id: 'a5', question: 'A "Short Squeeze" happens when:', options: ['Everyone buys at once', 'Short sellers are forced to buy back shares as price rises', 'The market is overvalued', 'Brokers increase their fees'], correctAnswer: 1 },
    { id: 'a6', question: 'What is "Theta" in options trading?', options: ['Sensitivity to price change', 'Sensitivity to time decay', 'Sensitivity to volatility', 'Sensitivity to interest rates'], correctAnswer: 1 },
    { id: 'a7', question: 'What is "Contango"?', options: ['A type of dance', 'When the futures price is higher than the spot price', 'When the spot price is higher than the futures price', 'A sudden market crash'], correctAnswer: 1 },
    { id: 'a8', question: 'What does "Vega" measure in options?', options: ['Sensitivity to time', 'Sensitivity to price', 'Sensitivity to changes in implied volatility', 'Sensitivity to the risk-free rate'], correctAnswer: 2 },
    { id: 'a9', question: 'What is a "Gamma Squeeze"?', options: ['A fruit-related market event', 'Rapid buying triggered by options dealers hedging their positions', 'When a CEO sells all their shares', 'A type of dividend cut'], correctAnswer: 1 },
    { id: 'a10', question: 'What is "Statistical Arbitrage"?', options: ['Trading based on rumors', 'Exploiting price inefficiencies between related financial instruments', 'Buying stocks with a high P/E ratio', 'Selling stocks randomly'], correctAnswer: 1 },
    { id: 'a11', question: 'What is "Mean Reversion"?', options: ['When price moves away from the average forever', 'The theory that prices will eventually move back to an average level', 'A math error in trading', 'A period of extreme volatility'], correctAnswer: 1 },
    { id: 'a12', question: 'What is an "Iceberg Order"?', options: ['A trade made in the Arctic', 'A large order split into smaller visible portions to hide true size', 'An order that never executes', 'A trade made on a stock market holiday'], correctAnswer: 1 },
    { id: 'a13', question: 'What is the "Risk-Free Rate"?', options: ['The return on a high-risk tech stock', 'The theoretical rate of return on an investment with zero risk', 'The average return of the S&P 500', 'The interest rate charged by brokers'], correctAnswer: 1 },
    { id: 'a14', question: 'What is "Quantitative Easing"?', options: ['A way to count stocks faster', 'A monetary policy where a central bank buys government securities', 'The process of listing a company on an exchange', 'A method for calculating market cap'], correctAnswer: 1 },
    { id: 'a15', question: 'What is "Rho" in option Greeks?', options: ['Sensitivity to time decay', 'Sensitivity to interest rates', 'Sensitivity to price change', 'Sensitivity to volatility'], correctAnswer: 1 },
    { id: 'a16', question: 'What is "Value at Risk" (VaR)?', options: ['The maximum possible profit', 'A statistical measure of the level of financial risk within a firm or portfolio', 'The current price of a stock', 'The total dividend payout'], correctAnswer: 1 },
    { id: 'a17', question: 'What is a "Dark Pool"?', options: ['A neglected swimming pool', 'A private forum for trading securities that is not accessible to the public', 'A market crash in the energy sector', 'A type of low-liquidity stock'], correctAnswer: 1 },
    { id: 'a18', question: 'What is "Smart Beta"?', options: ['A very intelligent stock', 'An investment style that uses alternative weighting schemes', 'A trading algorithm developed by AI', 'The beta of a highly profitable company'], correctAnswer: 1 },
    { id: 'a19', question: 'What is "Pair Trading"?', options: ['Trading with a partner', 'A strategy that matches a long position with a short position in related assets', 'Buying two shares of the same stock', 'Trading two different currencies only'], correctAnswer: 1 },
    { id: 'a20', question: 'What is "Market Depth"?', options: ['The physical depth of the exchange building', 'The market\'s ability to sustain large orders without price impact', 'The total number of years a stock has traded', 'The depth of a company\'s balance sheet'], correctAnswer: 1 }
  ]
};

const Learning: React.FC = () => {
  const [activeSimulation, setActiveSimulation] = useState<'Bull Market' | 'Bear Market' | null>(null);
  const [sim, setSim] = useState<SimulationState | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<QuizState | null>(null);

  const timerRef = useRef<number | null>(null);
  const priceIntervalRef = useRef<number | null>(null);

  const startQuiz = (level: string, title: string) => {
    setActiveQuiz({
      id: level,
      title,
      questions: QUIZ_DATA[level] || [],
      currentIndex: 0,
      score: 0,
      userAnswers: [],
      isComplete: false
    });
  };

  const handleQuizAnswer = (optionIndex: number) => {
    if (!activeQuiz) return;
    const isCorrect = optionIndex === activeQuiz.questions[activeQuiz.currentIndex].correctAnswer;
    const newAnswers = [...activeQuiz.userAnswers, optionIndex];
    const newScore = isCorrect ? activeQuiz.score + 1 : activeQuiz.score;
    const isLast = activeQuiz.currentIndex === activeQuiz.questions.length - 1;
    setActiveQuiz({
      ...activeQuiz,
      score: newScore,
      userAnswers: newAnswers,
      currentIndex: isLast ? activeQuiz.currentIndex : activeQuiz.currentIndex + 1,
      isComplete: isLast
    });
  };

  const startSimulation = (type: 'Bull Market' | 'Bear Market') => {
    setActiveSimulation(type);
    setSim({
      type,
      balance: 10000,
      shares: 0,
      price: 100,
      priceHistory: [100],
      timeRemaining: 60,
      tradeSize: 10,
      isStarted: false,
      isEnded: false,
      volatility: type === 'Bull Market' ? 'Medium' : 'High'
    });
  };

  const handleLaunch = () => {
    if (sim) {
      setSim({ ...sim, isStarted: true });
    }
  };

  useEffect(() => {
    if (sim?.isStarted && !sim.isEnded) {
      timerRef.current = window.setInterval(() => {
        setSim(prev => {
          if (!prev) return null;
          if (prev.timeRemaining <= 0) {
            if (timerRef.current) clearInterval(timerRef.current);
            if (priceIntervalRef.current) clearInterval(priceIntervalRef.current);
            return { ...prev, isEnded: true };
          }
          return { ...prev, timeRemaining: prev.timeRemaining - 1 };
        });
      }, 1000);

      priceIntervalRef.current = window.setInterval(() => {
        setSim(prev => {
          if (!prev) return null;
          const vol = prev.volatility === 'High' ? 0.015 : 0.008;
          const bias = prev.type === 'Bull Market' ? 0.0025 : -0.0035;
          const change = (Math.random() - 0.5 + bias) * vol;
          const newPrice = Math.max(1, prev.price * (1 + change));
          return {
            ...prev,
            price: newPrice,
            priceHistory: [...prev.priceHistory, newPrice].slice(-60)
          };
        });
      }, 200);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (priceIntervalRef.current) clearInterval(priceIntervalRef.current);
    };
  }, [sim?.isStarted, sim?.isEnded]);

  const handleBuy = () => {
    if (!sim || sim.isEnded) return;
    const cost = sim.tradeSize * sim.price;
    if (sim.balance >= cost) {
      setSim({
        ...sim,
        shares: sim.shares + sim.tradeSize,
        balance: sim.balance - cost
      });
    }
  };

  const handleSell = () => {
    if (!sim || sim.isEnded || sim.shares < sim.tradeSize) return;
    const gain = sim.tradeSize * sim.price;
    setSim({
      ...sim,
      balance: sim.balance + gain,
      shares: sim.shares - sim.tradeSize
    });
  };

  const updateTradeSize = (val: number) => {
    if (!sim) return;
    setSim({ ...sim, tradeSize: Math.max(1, Math.min(100, val)) });
  };

  const currentEquity = sim ? sim.balance + (sim.shares * sim.price) : 0;
  const totalReturn = sim ? ((currentEquity - 10000) / 10000) * 100 : 0;
  const cashPercent = sim ? (sim.balance / currentEquity) * 100 : 100;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 relative">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter">Gamified Learning</h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">Master the markets through practice. Earn tech-inspired badges, complete quizzes, and test your skills in realistic simulations.</p>
      </div>

      <div className="mb-20">
        <h2 className="text-2xl font-bold mb-8 flex items-center">
          <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center mr-3 scale-75">★</span>
          Achievement Badges
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {[
            { name: 'Market Novice', color: 'emerald', xp: '+50 XP', desc: 'Completed first module' },
            { name: 'Quiz Whiz', color: 'blue', xp: '+100 XP', desc: '100% on 5 quizzes' },
            { name: 'Risk Master', color: 'rose', xp: '+150 XP', desc: 'Expert calculator use' },
            { name: 'Daily Reader', color: 'teal', xp: '+30 XP', desc: '7-day digest streak' },
            { name: 'Analyst', color: 'amber', xp: '+200 XP', desc: 'Analyzed 10 stocks' },
            { name: 'Disciplined', color: 'indigo', xp: '+500 XP', desc: 'No emotional trades' }
          ].map((badge, i) => (
            <div key={i} className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl text-center group hover:border-emerald-500 transition-all hover:bg-slate-900">
              <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform">
                <BadgeSymbol color={badge.color as any} />
              </div>
              <h4 className="font-bold text-sm mb-1">{badge.name}</h4>
              <div className={`text-${badge.color}-500 text-[10px] font-black mb-2 uppercase tracking-widest`}>{badge.xp}</div>
              <p className="text-slate-500 text-[10px] uppercase font-bold tracking-tight">{badge.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-2xl font-bold mb-8">Interactive Quizzes</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { id: 'beginner', title: 'Market Basics 101', level: 'Beginner', time: '5m', qCount: 10 },
            { id: 'intermediate', title: 'Technical Analysis', level: 'Intermediate', time: '8m', qCount: 15 },
            { id: 'advanced', title: 'Risk & Portfolio', level: 'Advanced', time: '12m', qCount: 20 }
          ].map((quiz) => (
            <div key={quiz.id} className="glass-card border border-white/5 p-8 rounded-[2rem] hover:border-emerald-500/50 transition-all group">
              <div className="flex justify-between items-start mb-6">
                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${quiz.level === 'Beginner' ? 'bg-emerald-500/10 text-emerald-500' : quiz.level === 'Intermediate' ? 'bg-blue-500/10 text-blue-500' : 'bg-rose-500/10 text-rose-500'}`}>
                  {quiz.level}
                </span>
                <span className="text-[10px] font-mono text-slate-500 uppercase">{quiz.time}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight group-hover:text-emerald-400 transition-colors">{quiz.title}</h3>
              <p className="text-slate-500 text-xs mb-8 uppercase tracking-widest font-bold">{quiz.qCount} Questions</p>
              <button 
                onClick={() => startQuiz(quiz.id, quiz.title)}
                className="w-full py-4 bg-slate-900 border border-slate-800 text-white font-black rounded-xl uppercase tracking-widest text-[10px] hover:bg-emerald-500 hover:text-slate-950 hover:border-emerald-500 transition-all"
              >
                Start Quiz
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-8">Trading Simulations</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden group hover:border-emerald-500/50 transition-all">
            <div className="h-64 relative bg-slate-950">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-emerald-500/5 to-transparent" />
              <div className="absolute bottom-4 left-6">
                <span className="px-3 py-1 bg-emerald-500 text-slate-950 text-[10px] font-black rounded-full uppercase tracking-widest">Growth Protocol</span>
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold mb-2 uppercase tracking-tight text-white">Bull Market Challenge</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">Navigate a high-growth environment. Can you maximize gains while managing inevitable corrections?</p>
              <button 
                onClick={() => startSimulation('Bull Market')}
                className="w-full py-4 bg-emerald-500 text-slate-950 font-black rounded-xl hover:bg-emerald-400 transition-all uppercase tracking-widest text-xs"
              >
                Launch Simulation
              </button>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden group hover:border-rose-500/50 transition-all">
            <div className="h-64 relative bg-slate-950">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-rose-500/5 to-transparent" />
              <div className="absolute bottom-4 left-6">
                <span className="px-3 py-1 bg-rose-500 text-white text-[10px] font-black rounded-full uppercase tracking-widest">Defense Protocol</span>
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold mb-2 uppercase tracking-tight text-white">Bear Market Survival</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">Preserve your capital during a prolonged downturn. Master the art of defensive positioning and capital preservation.</p>
              <button 
                onClick={() => startSimulation('Bear Market')}
                className="w-full py-4 bg-slate-800 border border-slate-700 text-white font-black rounded-xl hover:border-rose-500 hover:text-rose-500 transition-all uppercase tracking-widest text-xs"
              >
                Launch Simulation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Overlay */}
      {activeQuiz && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#020617]/98 backdrop-blur-xl" onClick={() => activeQuiz.isComplete && setActiveQuiz(null)}></div>
          <div className="relative w-full max-w-2xl glass-card rounded-[2.5rem] p-10 lg:p-14 border border-white/10 shadow-2xl animate-in zoom-in-95 duration-300">
            {!activeQuiz.isComplete ? (
              <>
                <div className="flex justify-between items-center mb-10">
                   <div>
                      <span className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em] mb-1 block">{activeQuiz.title}</span>
                      <h4 className="text-sm font-mono text-slate-500 uppercase">Question {activeQuiz.currentIndex + 1} / {activeQuiz.questions.length}</h4>
                   </div>
                   <button onClick={() => setActiveQuiz(null)} className="text-slate-500 hover:text-white transition-colors">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                   </button>
                </div>
                <div className="h-1.5 w-full bg-slate-900 rounded-full mb-12 overflow-hidden">
                   <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${((activeQuiz.currentIndex + 1) / activeQuiz.questions.length) * 100}%` }}></div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-10 leading-snug">{activeQuiz.questions[activeQuiz.currentIndex].question}</h3>
                <div className="space-y-4">
                  {activeQuiz.questions[activeQuiz.currentIndex].options.map((option, idx) => (
                    <button 
                      key={idx}
                      onClick={() => handleQuizAnswer(idx)}
                      className="w-full p-6 bg-slate-900 border border-slate-800 rounded-2xl text-left text-sm font-bold text-slate-300 hover:border-emerald-500/50 hover:bg-slate-800 transition-all active:scale-[0.98]"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center">
                 <div className="w-20 h-20 bg-emerald-500/20 rounded-3xl mx-auto flex items-center justify-center mb-8">
                   <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                 </div>
                 <h2 className="text-4xl font-black uppercase tracking-tighter text-white mb-2">Module Evaluated</h2>
                 <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-10">Verification Results Securely Processed</p>
                 <div className="bg-slate-950 p-8 rounded-3xl border border-white/5 inline-block px-12 mb-10">
                   <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Score</div>
                   <div className="text-5xl font-black text-white">{activeQuiz.score} <span className="text-slate-700">/ {activeQuiz.questions.length}</span></div>
                 </div>
                 <div className="max-h-[300px] overflow-y-auto mb-10 pr-2 space-y-4 text-left custom-scrollbar">
                   {activeQuiz.questions.map((q, i) => {
                     const isCorrect = activeQuiz.userAnswers[i] === q.correctAnswer;
                     return (
                       <div key={i} className={`p-5 rounded-2xl border ${isCorrect ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-rose-500/20 bg-rose-500/5'}`}>
                         <div className="flex justify-between items-start mb-2">
                           <span className="text-[10px] font-black text-slate-500 uppercase">Q{i+1} Result</span>
                           <span className={`text-[10px] font-black uppercase tracking-widest ${isCorrect ? 'text-emerald-500' : 'text-rose-500'}`}>
                             {isCorrect ? 'Correct' : 'Incorrect'}
                           </span>
                         </div>
                         <p className="text-sm font-bold text-white mb-2">{q.question}</p>
                         {!isCorrect && (
                           <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
                             Correct: {q.options[q.correctAnswer]}
                           </div>
                         )}
                       </div>
                     );
                   })}
                 </div>
                 <button 
                   onClick={() => setActiveQuiz(null)}
                   className="w-full py-5 bg-emerald-500 text-slate-950 font-black rounded-2xl uppercase tracking-[0.2em] text-xs hover:bg-emerald-400 transition-all"
                 >
                   Return to Terminal
                 </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Simulation Overlay - Video-Accurate UI */}
      {activeSimulation && sim && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#020617]/98 backdrop-blur-xl" onClick={() => !sim.isStarted && setActiveSimulation(null)}></div>
          
          {!sim.isStarted ? (
            <div className="relative w-full max-w-2xl glass-card rounded-[2rem] p-12 text-center border border-white/10 shadow-2xl animate-in zoom-in-95 duration-300">
              <div className="absolute top-0 right-0 p-8">
                <button onClick={() => setActiveSimulation(null)} className="text-slate-500 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="mb-12">
                 <div className="flex justify-center space-x-2 mb-4">
                    <span className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.4em]">Protocol Active:</span>
                    <span className="text-white text-[10px] font-black uppercase tracking-[0.4em]">{sim.type}</span>
                 </div>
                 <h2 className="text-5xl font-black mb-4 uppercase tracking-tighter text-white">Initializing Environment...</h2>
                 <p className="text-slate-500 text-sm max-w-md mx-auto mb-10 font-medium">
                   Neural market simulation engine is calibrating historical data points for real-time practice.
                 </p>
                 
                 <div className="grid grid-cols-3 gap-6 mb-12">
                    <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 text-center">
                       <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Duration</div>
                       <div className="text-xl font-bold text-white">60 Seconds</div>
                    </div>
                    <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 text-center">
                       <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Starting Balance</div>
                       <div className="text-xl font-bold text-white">$10,000</div>
                    </div>
                    <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 text-center">
                       <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Volatility</div>
                       <div className="text-xl font-bold text-white">{sim.volatility}</div>
                    </div>
                 </div>
              </div>
              <button 
                onClick={handleLaunch}
                className="w-full py-5 bg-emerald-500 text-slate-950 font-black rounded-2xl shadow-2xl shadow-emerald-500/20 uppercase tracking-[0.2em] text-sm hover:bg-emerald-400 transition-all"
              >
                Launch Simulation
              </button>
            </div>
          ) : sim.isEnded ? (
            <div className="relative w-full max-w-2xl glass-card rounded-[2rem] p-12 text-center border border-white/10 shadow-2xl animate-in zoom-in-95 duration-300">
               <div className="mb-8">
                  <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-6 ${totalReturn >= 0 ? 'bg-emerald-500/20 text-emerald-500' : 'bg-rose-500/20 text-rose-500'}`}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {totalReturn >= 0 ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />}
                    </svg>
                  </div>
                  <h2 className="text-4xl font-black uppercase tracking-tighter mb-2 text-white">Analysis Complete</h2>
                  <p className="text-slate-500 uppercase text-[10px] font-black tracking-widest">Portfolio Performance Report</p>
               </div>
               <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-slate-950 p-6 rounded-2xl border border-white/5 text-left">
                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Liquid Equity</div>
                    <div className="text-2xl font-black text-white">${currentEquity.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                  </div>
                  <div className="bg-slate-950 p-6 rounded-2xl border border-white/5 text-left">
                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Net Alpha</div>
                    <div className={`text-2xl font-black ${totalReturn >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {totalReturn >= 0 ? '+' : ''}{totalReturn.toFixed(2)}%
                    </div>
                  </div>
               </div>
               <p className="text-slate-400 mb-10 text-sm leading-relaxed max-w-md mx-auto italic">
                 {sim.type === 'Bull Market' 
                   ? (totalReturn > 5 ? "Superior momentum handling. Capitalized on expansion phases effectively." : "Trend discipline established. Next time, try to build positions earlier in the expansion.")
                   : (totalReturn > -2 ? "Elite capital preservation. You survived the drawdown with minimal impact." : "Focus on earlier exit signals. In bear markets, liquidity is your primary asset.")
                 }
               </p>
               <button onClick={() => setActiveSimulation(null)} className="w-full py-5 bg-slate-900 border border-slate-800 text-white font-black rounded-2xl uppercase tracking-[0.2em] text-xs hover:bg-slate-800 transition-colors">Exit Terminal</button>
            </div>
          ) : (
            <div className="relative w-full max-w-6xl glass-card rounded-[1.5rem] overflow-hidden border border-white/5 shadow-2xl flex flex-col bg-[#020617] animate-in zoom-in-98 duration-300">
              <div className="p-8 flex justify-between items-start">
                 <div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter text-white">{sim.type}</h3>
                    <div className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em]">Real-time data stream</div>
                 </div>
                 <div className="flex items-center space-x-3 text-emerald-500 bg-emerald-500/5 px-4 py-2 rounded-xl border border-emerald-500/10 font-mono text-2xl font-black tracking-tighter">
                   <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest mr-2 mt-1">Time Remaining</span>
                   {sim.timeRemaining}s
                 </div>
              </div>

              <div className="px-8 pb-8 flex gap-8">
                <div className="flex-grow space-y-8">
                   <div className="flex items-end justify-between">
                      <div>
                        <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">Live Asset Price</div>
                        <div className="text-5xl font-black text-white tabular-nums tracking-tighter">${sim.price.toFixed(2)}</div>
                      </div>
                      <div className="text-right">
                         <div className="flex items-center space-x-1 mb-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-[8px] font-black text-emerald-500/50 tracking-widest uppercase">Live Connection</span>
                         </div>
                      </div>
                   </div>

                   {/* Chart Component */}
                   <div className="h-[350px] w-full bg-slate-950/40 rounded-2xl border border-white/5 relative overflow-hidden">
                      <div className="absolute inset-0 bg-grid opacity-5"></div>
                      <svg className="absolute inset-0 w-full h-full overflow-visible p-6" preserveAspectRatio="none">
                        <polyline
                          fill="none"
                          stroke={sim.type === 'Bull Market' ? '#10b981' : '#f43f5e'}
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          points={sim.priceHistory.map((p, i) => {
                            const x = (i / (sim.priceHistory.length - 1)) * 100 + '%';
                            const min = Math.min(...sim.priceHistory) * 0.995;
                            const max = Math.max(...sim.priceHistory) * 1.005;
                            const range = Math.max(0.1, max - min);
                            const y = 100 - ((p - min) / range) * 100 + '%';
                            return `${x},${y}`;
                          }).join(' ')}
                          className="transition-all duration-300"
                        />
                      </svg>
                   </div>

                   {/* Trade Controls */}
                   <div className="grid grid-cols-3 gap-8 items-center bg-slate-900/20 p-8 rounded-[2rem] border border-white/5">
                      <div>
                         <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Trade Size</div>
                         <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-white/5">
                            <button onClick={() => updateTradeSize(sim.tradeSize - 10)} className="text-emerald-500 hover:text-white px-3 font-black text-xl">-</button>
                            <span className="text-[11px] font-black text-white uppercase tracking-widest">{sim.tradeSize} Shares</span>
                            <button onClick={() => updateTradeSize(sim.tradeSize + 10)} className="text-emerald-500 hover:text-white px-3 font-black text-xl">+</button>
                         </div>
                         <div className="flex gap-2 mt-4">
                           <button onClick={handleBuy} disabled={sim.balance < sim.price} className="flex-1 py-3 bg-emerald-500 text-slate-950 font-black rounded-xl uppercase tracking-widest text-[10px] hover:bg-emerald-400 transition-all disabled:opacity-20 active:scale-95">Buy</button>
                           <button onClick={handleSell} disabled={sim.shares < sim.tradeSize} className="flex-1 py-3 bg-slate-800 text-slate-400 border border-white/5 font-black rounded-xl uppercase tracking-widest text-[10px] hover:text-rose-500 transition-all disabled:opacity-20 active:scale-95">Sell</button>
                         </div>
                      </div>

                      <div className="text-center">
                         <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Portfolio Liquid Value</div>
                         <div className="text-3xl font-black text-white tabular-nums tracking-tighter">${currentEquity.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                         <div className={`text-[11px] font-black tracking-widest mt-1 ${totalReturn >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                           {totalReturn >= 0 ? '▲' : '▼'} {Math.abs(totalReturn).toFixed(2)}% Return
                         </div>
                      </div>

                      <div className="text-right">
                        <div className="p-4 bg-slate-950/50 rounded-2xl border border-white/5 italic">
                           <p className="text-slate-600 text-[9px] leading-relaxed uppercase tracking-wider font-bold">
                             {sim.type === 'Bull Market' ? "Trend bias is positive. Look for consolidation to enter. Don't fight the trend." : "Trend bias is negative. Use bounces to exit. Prioritize capital preservation."}
                           </p>
                        </div>
                      </div>
                   </div>
                </div>

                {/* Sidebar Monitor */}
                <div className="w-80 space-y-6">
                   <div className="p-8 bg-slate-950/80 border border-white/5 rounded-[2rem] space-y-10 h-full">
                      <div>
                        <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-8 flex items-center">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 shadow-[0_0_5px_#10b981]"></span>
                          Portfolio Monitor
                        </h4>
                        
                        <div className="space-y-8">
                           <div>
                              <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Cash Available</div>
                              <div className="text-2xl font-black text-white tabular-nums tracking-tight">${sim.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                           </div>
                           <div>
                              <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Owned Position</div>
                              <div className="text-2xl font-black text-white tracking-tight">{sim.shares} Units</div>
                              <div className="text-[10px] text-slate-500 font-mono mt-1 uppercase">VALUE: ${(sim.shares * sim.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                           </div>
                        </div>
                      </div>

                      <div className="pt-8 border-t border-white/5">
                        <h4 className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-4">Risk Exposure</h4>
                        <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden flex">
                           <div className="h-full bg-emerald-500" style={{ width: `${cashPercent}%` }}></div>
                           <div className="h-full bg-slate-700" style={{ width: `${100 - cashPercent}%` }}></div>
                        </div>
                        <div className="flex justify-between mt-3 text-[8px] font-black uppercase tracking-widest">
                           <span className="text-emerald-500">Cash</span>
                           <span className="text-slate-500">{100 - Math.round(cashPercent)}% Equities</span>
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.4);
        }
      `}</style>
    </div>
  );
};

export default Learning;
