
import React from 'react';

export const MidnightRevelation: React.FC<{ onAcknowledge: () => void }> = ({ onAcknowledge }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-12 text-center animate-fadeIn">
      <div className="max-w-md space-y-12">
        <span className="font-cinzel text-amber-500 tracking-[0.5em] text-xs uppercase animate-pulse">🌙 Midnight Revelation</span>
        
        <div className="space-y-6">
          <h2 className="font-playfair italic text-3xl text-stone-100 leading-relaxed shadow-gold">
            "Order thy steps in my word: and let not any iniquity have dominion over me."
          </h2>
          <p className="font-mono text-[10px] text-stone-500 tracking-widest">— Psalm 119:133</p>
        </div>

        <div className="p-8 border border-stone-900 bg-stone-950/50 rounded-2xl">
          <p className="text-stone-400 font-cinzel text-xs tracking-[0.2em] leading-relaxed">
            Begin the day restrained. Early obedience walks ahead of judgment. 
            Prepare the vessel for the morning call.
          </p>
        </div>

        <button 
          onClick={onAcknowledge}
          className="w-full py-4 border border-stone-800 font-cinzel text-xs text-stone-500 tracking-[0.4em] hover:text-amber-500 hover:border-amber-900 transition-all"
        >
          I WILL OBEY
        </button>
      </div>
    </div>
  );
};
