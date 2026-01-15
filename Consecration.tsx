
import React, { useState } from 'react';
import { ConsecrationType } from '../types';

export const Consecration: React.FC = () => {
  const [active, setActive] = useState<ConsecrationType | null>(null);

  const rites = [
    { type: ConsecrationType.RESET_3, scripture: 'Ezra 8:21', rules: 'Complete fast from dawn to dusk. No digital defilement.' },
    { type: ConsecrationType.FOOD_7, scripture: 'Daniel 1:12', rules: 'Only Edenic foods. No processed Babylonian sugars.' },
    { type: ConsecrationType.DISCIPLINE_14, scripture: '1 Corinthians 9:27', rules: 'Silence during noon hours. Early rising at dawn.' }
  ];

  if (active) {
    return (
      <div className="p-8 text-center space-y-10 animate-fadeIn">
        <h2 className="font-cinzel text-orange-500 tracking-[0.3em] uppercase">Under Consecration</h2>
        <div className="p-10 border border-orange-900/30 rounded-3xl bg-orange-950/5">
          <h3 className="font-playfair text-3xl font-bold mb-4">{active}</h3>
          <p className="text-stone-500 font-playfair italic mb-6">"Order is maintained through limitation."</p>
          <button 
            onClick={() => setActive(null)}
            className="text-[10px] font-cinzel text-stone-700 hover:text-orange-500 underline tracking-widest"
          >
            END CONSECRATION EARLY
          </button>
        </div>
        <p className="text-[10px] text-stone-600 font-cinzel tracking-widest uppercase">Other challenges remain sealed.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <h2 className="font-cinzel text-xl text-amber-500 tracking-widest font-black mb-2">CONSECRATION PERIODS</h2>
        <p className="text-stone-500 font-playfair italic text-sm">Voluntary periods of heightened discipline.</p>
      </div>

      <div className="grid gap-4">
        {rites.map((r) => (
          <button
            key={r.type}
            onClick={() => setActive(r.type)}
            className="p-6 bg-stone-900 border border-stone-800 rounded-2xl text-left hover:border-amber-900 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-playfair font-bold text-lg text-stone-200">{r.type}</h4>
              <span className="text-[10px] font-mono text-stone-600">{r.scripture}</span>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed italic">{r.rules}</p>
            <div className="mt-6 text-[10px] font-cinzel text-amber-500 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">Enter Consecration</div>
          </button>
        ))}
      </div>
    </div>
  );
};
