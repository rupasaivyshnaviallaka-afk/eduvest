
import React from 'react';
import { Module, CaseStudy, DigestItem, StockData } from './types';

export const MOCK_STOCKS: StockData[] = [
  { symbol: 'SPX', price: 4781.56, change: 32.12, percent: 0.68 },
  { symbol: 'NDX', price: 16823.45, change: 112.30, percent: 0.67 },
  { symbol: 'BTC', price: 42321.10, change: -120.40, percent: -0.28 },
  { symbol: 'ETH', price: 2518.20, change: 45.10, percent: 1.82 },
  { symbol: 'TSLA', price: 210.15, change: -5.30, percent: -2.46 },
  { symbol: 'AAPL', price: 185.60, change: 1.25, percent: 0.68 },
  { symbol: 'NVDA', price: 547.10, change: 12.45, percent: 2.33 },
];

export const EDUCATIONAL_MODULES: Module[] = [
  {
    id: 'm1',
    title: 'Introduction to Stock Market',
    description: 'Learn the fundamental concepts of the stock market, how it works, and why it exists.',
    category: 'Basics',
    icon: '📊'
  },
  {
    id: 'm2',
    title: 'Understanding Market Volatility',
    description: 'Explore the concept of market volatility, its causes, and how to manage it.',
    category: 'Problems',
    icon: '📉'
  },
  {
    id: 'm3',
    title: 'Diversification Strategies',
    description: 'Learn how to reduce risk and build a more resilient portfolio through diversification.',
    category: 'Solutions',
    icon: '🛡️'
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs1',
    title: 'The Volatile Tech Stock: A Lesson in Risk',
    scenario: 'An enthusiastic investor, swayed by media hype, invested a significant portion of their capital into a high-flying tech stock at its peak.',
    context: 'During a period of market euphoria for technology stocks, the investor ignored traditional valuation metrics and purchased shares at an all-time high.',
    outcome: 'Shortly after the purchase, the tech sector experienced a sharp correction, and the stock plummeted by over 40%. The investor, panicked by the rapid decline, sold their shares at a substantial loss.',
    keyLearnings: [
      'Avoid emotional trading and FOMO.',
      'Always use stop-loss orders.',
      'Fundamental analysis is crucial before investing.'
    ],
    date: '2023-10-15',
    imageUrl: 'https://picsum.photos/seed/tech/800/400'
  },
  {
    id: 'cs2',
    title: 'Diversification Dilemma: The Single-Sector Bet',
    scenario: 'A seasoned investor, confident in the long-term prospects of the renewable energy sector, allocated 80% of their portfolio to companies within this single industry.',
    context: 'The investor believed that renewable energy was an unstoppable future trend and that individual stock selection would mitigate risk.',
    outcome: 'Sudden policy changes and a global supply chain disruption impacted the renewable energy sector, causing a widespread downturn. The investor\'s highly concentrated portfolio suffered a substantial loss.',
    keyLearnings: [
      'Diversify across different sectors.',
      'Avoid over-concentration even in "safe" bets.',
      'Monitor macroeconomic factors.'
    ],
    date: '2023-11-20',
    imageUrl: 'https://picsum.photos/seed/energy/800/400'
  }
];

export const DIGEST_DATA: DigestItem[] = [
  {
    id: 'd1',
    date: '2024-07-22',
    title: 'Tech Rally Continues Amidst Strong Earnings',
    summary: 'Major tech indices saw significant gains today as several large-cap technology companies reported better-than-expected quarterly earnings.',
    sentiment: 'Bullish',
    headlines: [
      'Tech Giants Beat Earnings Estimates',
      'AI Demand Drives Growth in Chipmaker Stocks',
      'Broad Market Indices Reach New Highs'
    ],
    impact: 'Market confidence remains high in the tech sector\'s growth prospects.'
  },
  {
    id: 'd2',
    date: '2024-07-21',
    title: 'Energy Sector Volatility on Geopolitical Tensions',
    summary: 'Oil prices surged, then retreated, as new geopolitical developments in the Middle East created uncertainty in global energy supply.',
    sentiment: 'Neutral-Bearish',
    headlines: [
      'Geopolitical Tensions Drive Oil Price Spikes',
      'Energy Sector Reacts to Global Supply News',
      'Analysts Weigh Potential Impact on Global Markets'
    ],
    impact: 'Energy stocks offer defensive qualities during market uncertainty.'
  }
];
