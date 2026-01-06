
import { Module, CaseStudy, DigestItem } from './types';

// Educational Modules for general reference
export const EDUCATIONAL_MODULES: Module[] = [
  {
    id: 'm1',
    title: 'Market Mechanics 101',
    description: 'Master the core dynamics of order books, liquidity providers, and the auction process.',
    category: 'Basics',
    icon: 'bank'
  },
  {
    id: 'm2',
    title: 'Volatility Arbitrage',
    description: 'Understand how market swings are measured and how professional traders mitigate variance.',
    category: 'Problems',
    icon: 'chart'
  },
  {
    id: 'm3',
    title: 'Position Sizing Protocols',
    description: 'Algorithmic approaches to risk and portfolio survivability.',
    category: 'Solutions',
    icon: 'shield'
  }
];

// Restored Case Studies with Images
export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs1',
    title: 'The 2010 Flash Crash',
    scenario: 'A trillion-dollar market wipeout triggered by high-frequency algorithmic spoofing in the E-mini S&P 500 futures market.',
    context: 'Extreme order book imbalance caused by a large sell order executed via automated algorithm without price limits.',
    outcome: 'Introduction of market-wide circuit breakers and stricter oversight of high-frequency trading (HFT) firms.',
    keyLearnings: [
      'Understanding Liquidity Black Holes',
      'Execution Speed vs. Order Depth',
      'Systemic Risk in Automated Trading'
    ],
    date: 'MAY 06, 2010',
    imageUrl: 'https://images.unsplash.com/photo-1611974717482-4824252ef56a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'cs2',
    title: 'GameStop Short Squeeze',
    scenario: 'Retail investors coordinated a massive buying campaign that forced institutional short sellers into a multi-billion dollar cover.',
    context: 'Short interest exceeded 140% of the float, creating a technical trap where buy orders had no available sellers.',
    outcome: 'Massive wealth transfer to early retail participants and the collapse of several high-profile hedge funds.',
    keyLearnings: [
      'Short Interest Exposure Metrics',
      'Social Sentiment as Alpha',
      'Technical Liquidity Trap Mechanics'
    ],
    date: 'JAN 2021',
    imageUrl: 'https://images.unsplash.com/photo-1612010167108-3e6b327405f0?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'cs3',
    title: 'Black Monday 1987',
    scenario: 'The largest one-day percentage drop in stock market history, fueled by portfolio insurance and program trading.',
    context: 'Global market panic led to a 22.6% drop in the Dow Jones Industrial Average in a single session.',
    outcome: 'Total overhaul of exchange trading rules and the birth of modern "Circuit Breakers".',
    keyLearnings: [
      'Cascading Programmatic Selling',
      'The Danger of Portfolio Insurance',
      'Global Market Interconnectivity'
    ],
    date: 'OCT 19, 1987',
    imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'cs4',
    title: 'The Nikkei Bubble Burst',
    scenario: 'The collapse of Japan\'s "Everything Bubble" in real estate and stocks leading to decades of stagnation.',
    context: 'Extreme over-valuation where the land under the Imperial Palace was worth more than all of California.',
    outcome: 'A "Lost Decade" of growth and a total shift in Japanese monetary policy (Zero Interest Rates).',
    keyLearnings: [
      'Identifying Asset Bubbles',
      'The Role of Monetary Policy',
      'Long-term Mean Reversion'
    ],
    date: 'DEC 1989',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=800'
  }
];

export const DIGEST_DATA: DigestItem[] = [
  {
    id: 'd1',
    date: 'OCT 24, 2024',
    title: 'Macro Resilience Patterns',
    summary: 'Institutional flows remain stable despite short-term yield volatility. Tech sector maintains support.',
    sentiment: 'Neutral-Bullish',
    headlines: [
      'Tech sector maintains key support levels',
      'Central banks signal extended pause',
      'Manufacturing data beats estimates'
    ],
    impact: 'Focus on quality balance sheets as rate sensitivity persists in small-cap sectors.'
  },
  {
    id: 'd2',
    date: 'OCT 23, 2024',
    title: 'Liquidity Rebalancing',
    summary: 'Major indices undergoing quarterly rebalancing causing end-of-day volatility spikes.',
    sentiment: 'Neutral',
    headlines: [
      'ETF inflows reach yearly peak',
      'VIX shows signs of compression',
      'Credit spreads continue to narrow'
    ],
    impact: 'Execution slippage expected to increase during closing auctions across major tech components.'
  }
];
