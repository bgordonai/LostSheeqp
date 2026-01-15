
import React, { useState } from 'react';
import { PROTOCOLS } from '../constants';
import { ProtocolStatus } from '../types';

interface ProtocolEngineProps {
  onComplete: (points: number) => void;
}

export const ProtocolEngine: React.FC<ProtocolEngineProps> = ({ onComplete }) => {
  const [completed, setCompleted] = useState<string[]>([]);

  const handleToggle = (id: string, points: number) => {
    if (completed.includes(id)) return;
    setCompleted([...completed, id]);
    onComplete(points);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="font-cinzel text-2xl text-amber-500 font-bold border-b border-amber-900/50 pb-2">Sacred Protocols</h2>
      <div className="grid gap-4">
        {PROTOCOLS.map((protocol) => (
          <div 
            key={protocol.id} 
            className={`p-4 rounded-lg border bg-stone-900/50 transition-all ${
              completed.includes(protocol.id) 
                ? 'border-amber-500 shadow-gold' 
                : 'border-stone-800'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-cinzel text-amber-500 uppercase tracking-widest">{protocol.category}</span>
              <span className="text-xs font-mono text-stone-500">{protocol.scripture}</span>
            </div>
            <h3 className="font-playfair text-xl font-bold mb-2">{protocol.title}</h3>
            <p className="text-sm text-stone-400 mb-4">{protocol.description}</p>
            
            <button
              onClick={() => handleToggle(protocol.id, protocol.points)}
              disabled={completed.includes(protocol.id)}
              className={`w-full py-2 font-cinzel text-sm rounded transition-all ${
                completed.includes(protocol.id)
                  ? 'bg-amber-500 text-stone-900 cursor-default'
                  : 'border border-amber-500/50 text-amber-500 hover:bg-amber-500/10'
              }`}
            >
              {completed.includes(protocol.id) ? ProtocolStatus.ROYAL_STANDARD_UPHELD : 'Observe Law'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
