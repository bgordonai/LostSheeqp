
import React, { useState } from 'react';
import { PROTOCOLS } from '../constants';

interface LawEngineProps {
  onComplete: (points: number) => void;
}

export const LawEngine: React.FC<LawEngineProps> = ({ onComplete }) => {
  const [completed, setCompleted] = useState<string[]>([]);

  const handleObserve = (id: string, points: number) => {
    if (completed.includes(id)) return;
    setCompleted([...completed, id]);
    onComplete(points);
    
    // Simulate ceremonial vibration
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <h2 className="font-cinzel text-xl text-amber-500 font-black tracking-[0.2em] mb-2 uppercase">Law Engine</h2>
        <p className="text-[10px] text-stone-500 font-cinzel tracking-widest uppercase italic">Obedience > Information</p>
      </div>

      <div className="grid gap-6">
        {PROTOCOLS.map((protocol) => (
          <div 
            key={protocol.id} 
            className={`p-6 rounded-3xl border transition-all duration-700 relative overflow-hidden group ${
              completed.includes(protocol.id) 
                ? 'border-amber-500/50 bg-stone-900/30' 
                : 'border-stone-900 bg-stone-950'
            }`}
          >
            {completed.includes(protocol.id) && (
              <div className="absolute inset-0 bg-amber-500/5 pointer-events-none animate-pulse"></div>
            )}
            
            <div className="flex justify-between items-start mb-4">
              <span className="text-[9px] font-cinzel text-amber-500/50 uppercase tracking-[0.3em]">{protocol.category}</span>
              <span className="text-[10px] font-mono text-stone-700">{protocol.scripture}</span>
            </div>
            
            <h3 className="font-playfair text-xl font-bold text-stone-200 mb-3 group-hover:text-stone-100 transition-colors">
              {protocol.title}
            </h3>
            
            <p className="text-xs text-stone-500 leading-relaxed italic mb-8">
              {protocol.description}
            </p>
            
            <button
              onClick={() => handleObserve(protocol.id, protocol.points)}
              disabled={completed.includes(protocol.id)}
              className={`w-full py-4 font-cinzel text-xs tracking-[0.4em] rounded-xl transition-all ${
                completed.includes(protocol.id)
                  ? 'text-amber-500 cursor-default uppercase font-black'
                  : 'bg-stone-900 text-stone-600 hover:text-stone-300 hover:bg-stone-800'
              }`}
            >
              {completed.includes(protocol.id) ? 'Law Observed' : 'MARK OBEDIENCE'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
