
import React from 'react';
import { NavItem } from '../types';

interface FooterProps {
  onNavChange: (nav: NavItem) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavChange }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div 
              className="flex items-center space-x-2 mb-6 cursor-pointer"
              onClick={() => onNavChange(NavItem.HOME)}
            >
              <div className="w-6 h-6 bg-emerald-500 rounded flex items-center justify-center font-bold text-white text-xs">E</div>
              <span className="text-lg font-bold">Eduvest</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Empowering investors with clarity, discipline, and smart tools for informed decision-making in the global stock market.
            </p>
            <div className="flex space-x-4">
              {['Twitter', 'LinkedIn', 'YouTube', 'Instagram'].map((social) => (
                <button key={social} className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center hover:bg-emerald-500 transition-colors">
                  <div className="w-4 h-4 bg-slate-400 group-hover:bg-white" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Quick Links</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              {Object.values(NavItem).map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => onNavChange(item)}
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Resources</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><button className="hover:text-emerald-400">Newsletter</button></li>
              <li><button className="hover:text-emerald-400">Terms of Service</button></li>
              <li><button className="hover:text-emerald-400">Privacy Policy</button></li>
              <li><button className="hover:text-emerald-400">GCP Billing Docs</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Connect</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li>info@eduvest.com</li>
              <li>+1 (555) 123-4567</li>
              <li>Support Center</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-10">
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 mb-8">
            <h5 className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-2">Legal Disclaimer</h5>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              *Trading involves risk. All content is for educational purposes only and does not constitute financial or investment advice. Eduvest is not a registered broker or investment advisor. Past performance does not guarantee future results. Users are encouraged to conduct their own research and consult with a qualified professional before making investment decisions.*
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
            <p>© 2024 Eduvest - Stock Market Precision. All rights reserved.</p>
            <p className="mt-4 md:mt-0">Designed for Clarity & Discipline.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
