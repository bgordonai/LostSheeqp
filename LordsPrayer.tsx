
import React, { useState } from 'react';
import { LORDS_PRAYER } from '../constants';

export const LordsPrayer: React.FC = () => {
  const [copyFeedback, setCopyFeedback] = useState(false);

  const copyPrayer = () => {
    navigator.clipboard.writeText(LORDS_PRAYER.text).then(() => {
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    });
  };

  return (
    <div className="bg-stone-950/80 backdrop-blur-xl border border-stone-900 p-8 rounded-[40px] relative overflow-hidden group shadow-2xl animate-fadeIn">
      <div className="absolute top-0 right-0 p-6 opacity-[0.02] text-amber-500 pointer-events-none scale-150">🙏</div>
      
      <div className="relative z-10 space-y-6 text-center">
        <header className="space-y-2">
          <span className="text-[10px] font-cinzel text-amber-500 tracking-[0.6em] uppercase">Sacred Recitation</span>
          <h3 className="font-cinzel text-xl font-black text-stone-100 uppercase tracking-[0.2em]">{LORDS_PRAYER.title}</h3>
          <p className="text-[9px] font-mono text-stone-600 tracking-widest">{LORDS_PRAYER.scripture}</p>
        </header>

        <div className="py-6 border-y border-stone-900">
          <p className="text-stone-300 font-playfair italic text-sm leading-[2.2] whitespace-pre-line tracking-wide">
            {LORDS_PRAYER.text}
          </p>
        </div>

        <button 
          onClick={copyPrayer}
          className={`w-full py-4 font-cinzel text-[10px] tracking-[0.5em] rounded-2xl transition-all font-black uppercase shadow-lg ${
            copyFeedback ? 'bg-amber-500 text-stone-950' : 'bg-stone-900 text-stone-500 hover:text-stone-200'
          }`}
        >
          {copyFeedback ? 'SEALED TO MEMORY' : 'COPY SACRED PRAYER'}
        </button>
      </div>
    </div>
  );
};
