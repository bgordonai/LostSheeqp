
import React, { useState } from 'react';
import { DAILY_MANNA } from '../constants';
import { MannaSlot } from '../types';

export const DailyManna: React.FC = () => {
  const [activeSlot, setActiveSlot] = useState<MannaSlot>(MannaSlot.MORNING);

  const current = DAILY_MANNA.find(m => m.slot === activeSlot);

  return (
    <div className="bg-stone-900/50 border border-stone-800 rounded-2xl overflow-hidden p-6 animate-fadeIn">
      <div className="flex justify-between mb-8">
        {Object.values(MannaSlot).map((slot) => (
          <button
            key={slot}
            onClick={() => setActiveSlot(slot)}
            className={`px-4 py-1.5 rounded-full text-[10px] font-cinzel tracking-widest uppercase transition-all ${
              activeSlot === slot 
                ? 'bg-amber-500 text-stone-950 shadow-gold' 
                : 'text-stone-500 hover:text-stone-300'
            }`}
          >
            {slot}
          </button>
        ))}
      </div>

      <div className="min-h-[140px] flex flex-col items-center text-center">
        <span className="text-[10px] font-cinzel text-amber-500/50 mb-4 tracking-[0.4em] uppercase">Sacred Manna</span>
        <h3 className="font-playfair italic text-xl text-stone-100 mb-4 leading-relaxed">
          "{current?.prayer}"
        </h3>
        <p className="font-mono text-[10px] text-stone-500 uppercase tracking-tighter">
          — {current?.scripture}
        </p>
      </div>
      
      <div className="mt-8 flex justify-center">
        <button className="text-[10px] font-cinzel text-stone-400 border border-stone-800 px-6 py-2 rounded-full hover:bg-stone-800 transition-colors uppercase tracking-[0.2em]">
          Seal Instruction
        </button>
      </div>
    </div>
  );
};
