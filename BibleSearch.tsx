
import React, { useState } from 'react';
import { searchScripture } from '../services/geminiService';
import { Tribe, Gender } from '../types';

interface BibleSearchProps {
  userContext: { tribe: Tribe, gender: Gender };
}

export const BibleSearch: React.FC<BibleSearchProps> = ({ userContext }) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  const handleSearch = async () => {
    if (!query.trim() || isSearching) return;
    setIsSearching(true);
    setResult(null);
    const response = await searchScripture(query, userContext);
    setResult(response);
    setIsSearching(false);
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result).then(() => {
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    });
  };

  return (
    <div className="space-y-10 animate-fadeIn pb-32">
      <header className="text-center space-y-2">
        <h2 className="font-cinzel text-2xl text-amber-500 font-black tracking-[0.2em] uppercase">Scripture Search</h2>
        <p className="text-[10px] text-stone-600 font-cinzel tracking-[0.4em] uppercase italic">1611 KJV & Apocrypha Scrolls</p>
      </header>

      <section className="px-4">
        <div className="relative group">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Seek the Ancient Words..."
            className="w-full bg-stone-950 border border-stone-900 rounded-[30px] px-8 py-6 text-sm font-cinzel tracking-widest text-stone-100 placeholder:text-stone-800 focus:outline-none focus:border-amber-900/50 shadow-inner transition-all"
          />
          <button 
            onClick={handleSearch}
            disabled={isSearching}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-stone-900 rounded-2xl flex items-center justify-center text-amber-500 hover:text-amber-400 transition-colors border border-stone-800"
          >
            {isSearching ? (
              <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="M21 21l-4.35-4.35"></path>
              </svg>
            )}
          </button>
        </div>
        <div className="flex justify-center mt-4">
          <span className="text-[8px] font-cinzel text-stone-700 tracking-[0.4em] uppercase">Apocrypha Included • Prophetic Witness</span>
        </div>
      </section>

      {result && (
        <div className="px-4 animate-fadeIn">
          <div className="bg-stone-900/40 border border-amber-900/10 rounded-[50px] p-10 space-y-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-[0.02] text-8xl pointer-events-none font-serif">KJV</div>
            
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-cinzel text-amber-500/50 tracking-[0.5em] uppercase">The Holy Witness</span>
                <button 
                  onClick={copyToClipboard}
                  className="p-2 rounded-lg bg-stone-950/50 text-stone-600 hover:text-amber-500 transition-all border border-stone-900"
                >
                  {copyFeedback ? (
                    <span className="text-[8px] font-cinzel font-black uppercase px-2">Sealed</span>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  )}
                </button>
              </div>

              <div className="space-y-6">
                <div className="whitespace-pre-wrap font-playfair text-xl text-stone-100 leading-relaxed italic text-center">
                  {result}
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-stone-900 flex justify-center">
              <p className="text-[8px] font-cinzel text-stone-700 tracking-[0.6em] uppercase">Holy Government Archive — Brandon R. Gordon MIT ©️</p>
            </div>
          </div>
        </div>
      )}

      {!result && !isSearching && (
        <div className="text-center space-y-8 pt-10 px-10">
          <div className="w-20 h-20 mx-auto opacity-10 text-stone-500">
             <svg viewBox="0 0 24 24" fill="currentColor">
               <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5.89 12.5L12 15.83l6.11-3.33L12 9.17 5.89 12.5z" />
             </svg>
          </div>
          <p className="font-playfair text-lg text-stone-600 italic">"Seek ye out of the book of the LORD, and read: no one of these shall fail..."</p>
          <span className="font-mono text-[9px] text-stone-800 uppercase tracking-widest">— Isaiah 34:16</span>
        </div>
      )}
    </div>
  );
};
