
import React from 'react';
import { ScoreTier } from '../types';

interface HeritageScoreProps {
  score: number;
}

export const HeritageScore: React.FC<HeritageScoreProps> = ({ score }) => {
  // Mapping the score to the correct ScoreTier enum keys as defined in types.ts
  const getTier = (s: number): ScoreTier => {
    if (s < 20) return ScoreTier.DIM;
    if (s < 50) return ScoreTier.KINDLED;
    if (s < 100) return ScoreTier.BURNING;
    if (s < 200) return ScoreTier.SEALED;
    return ScoreTier.ETERNAL;
  };

  const tier = getTier(score);
  const progress = Math.min((score / 250) * 100, 100);

  return (
    <div className="bg-gradient-to-br from-stone-900 to-black border border-amber-900/30 p-6 rounded-2xl shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <svg viewBox="0 0 24 24" className="w-24 h-24 fill-amber-500">
           <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      </div>
      
      <div className="relative z-10">
        <h3 className="font-cinzel text-amber-500 text-sm tracking-[0.2em] mb-1">Heritage Health Score™</h3>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="font-cinzel text-5xl font-black gold-gradient">{score}</span>
          <span className="text-stone-500 text-xs font-mono uppercase tracking-tighter">Alignment Units</span>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-[10px] text-stone-500 uppercase font-cinzel mb-1.5">
            <span>{tier}</span>
            <span>250 to Sealing</span>
          </div>
          <div className="h-1.5 w-full bg-stone-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-amber-500 shadow-gold transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1 bg-stone-950/50 p-3 rounded border border-stone-800">
            <p className="text-[10px] text-stone-500 uppercase tracking-widest font-cinzel mb-1">Awakening Streak</p>
            <p className="text-xl font-bold font-cinzel text-orange-500">12 Days</p>
          </div>
          <div className="flex-1 bg-stone-950/50 p-3 rounded border border-stone-800">
            <p className="text-[10px] text-stone-500 uppercase tracking-widest font-cinzel mb-1">Covenant Status</p>
            <p className="text-xl font-bold font-cinzel text-green-500">SEALED</p>
          </div>
        </div>
      </div>
    </div>
  );
};
