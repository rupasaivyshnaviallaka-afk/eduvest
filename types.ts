
export enum NavItem {
  HOME = 'Home',
  EDUCATION = 'Education',
  TOOLS = 'Tools',
  LEARNING = 'Learning',
  COMMUNITY = 'Community',
  DIGEST = 'Digest',
  PROFILE = 'Profile'
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  photoURL: string | null;
  createdAt: string;
}

export interface Lesson {
  id: string;
  title: string;
  category: 'Basics' | 'Problems' | 'Solutions';
  description: string;
  content: string;
  videoUrl: string;
  order: number;
}

export interface StockData {
  symbol: string;
  price: number;
  change: number;
  percent: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  category: 'Basics' | 'Problems' | 'Solutions';
  icon: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  scenario: string;
  context: string;
  outcome: string;
  keyLearnings: string[];
  date: string;
  imageUrl: string;
}

export interface DigestItem {
  id: string;
  date: string;
  title: string;
  summary: string;
  sentiment: 'Bullish' | 'Bearish' | 'Neutral-Bullish' | 'Neutral-Bearish' | 'Neutral';
  headlines: string[];
  impact: string;
}
