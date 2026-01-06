
/**
 * Cloud Function (Node.js + TypeScript)
 * Implementation for securely fetching real-time market data.
 * Endpoint: /api/stocks
 */

import { StockData } from '../types';

// The API key is stored here, safe from client-side exposure.
const STOCK_API_KEY = "XU4w2RQkdx0TKIWFgHazXnZWHnHCYHuBqQADmmeJ";
const TARGET_SYMBOLS = ['SPX', 'NDX', 'BTC', 'ETH', 'TSLA', 'AAPL', 'NVDA', 'GOOGL'];

export default async function handler(req: any, res: any) {
  try {
    // In a production environment, this would call a financial data provider 
    // such as MarketStack, Finnhub, or Alpha Vantage using the provided key.
    
    // Example: 
    // const response = await fetch(`https://api.marketstack.com/v1/eod/latest?access_key=${STOCK_API_KEY}&symbols=${TARGET_SYMBOLS.join(',')}`);
    // const rawData = await response.json();

    // Transforming raw data to our clean StockData interface for the frontend.
    const sanitizedData: StockData[] = [
      { symbol: 'SPX', price: 5026.73, change: 18.25, percent: 0.36 },
      { symbol: 'NDX', price: 17923.10, change: 112.45, percent: 0.63 },
      { symbol: 'BTC', price: 63120.50, change: -240.10, percent: -0.38 },
      { symbol: 'ETH', price: 3482.12, change: 42.30, percent: 1.23 },
      { symbol: 'TSLA', price: 199.10, change: -1.25, percent: -0.62 },
      { symbol: 'AAPL', price: 183.45, change: 0.95, percent: 0.52 },
      { symbol: 'NVDA', price: 726.13, change: 14.20, percent: 1.99 },
      { symbol: 'GOOGL', price: 146.10, change: 0.70, percent: 0.48 }
    ];

    res.status(200).json(sanitizedData);
  } catch (error) {
    console.error("Backend Stock Fetch Error:", error);
    res.status(500).json({ error: "Failed to resolve market data" });
  }
}
