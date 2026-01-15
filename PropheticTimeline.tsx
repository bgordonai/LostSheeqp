
import React from 'react';
import { TIMELINE_DATA } from '../constants';

export const PropheticTimeline: React.FC = () => {
  return (
    <div className="space-y-12 animate-fadeIn pb-40 px-4">
      <header className="text-center space-y-4">
        <h2 className="font-cinzel text-3xl text-amber-500 font-black tracking-[0.3em] uppercase">Scroll of Ages</h2>
        <p className="text-[10px] text-stone-600 font-cinzel tracking-[0.4em] uppercase italic">Prophetic Pulse from Creation to 2026</p>
      </header>

      <div className="relative space-y-16 py-10">
        {/* Timeline Thread */}
        <div className="absolute left-[20px] top-0 bottom-0 w-px bg-stone-900" />
        
        {TIMELINE_DATA.map((event, i) => (
          <div key={i} className="relative pl-12 group">
            {/* Timeline Node */}
            <div className={`absolute left-0 top-1.5 w-10 h-10 -translate-x-1/2 rounded-full border border-stone-800 flex items-center justify-center transition-all ${event.era === 'Tipping Point' ? 'bg-amber-500 border-amber-500 shadow-gold z-10 scale-125' : 'bg-stone-950'}`}>
              <div className={`w-2 h-2 rounded-full ${event.era === 'Tipping Point' ? 'bg-stone-950' : 'bg-stone-800'}`} />
            </div>

            <div className="space-y-3">
              <header className="flex justify-between items-baseline">
                <span className={`text-[10px] font-cinzel tracking-[0.4em] uppercase font-black ${event.era === 'Tipping Point' ? 'text-amber-500' : 'text-stone-700'}`}>
                  {event.era}
                </span>
                <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest">{event.year}</span>
              </header>
              
              <div className={`p-6 rounded-[30px] border transition-all ${event.era === 'Tipping Point' ? 'bg-amber-500/5 border-amber-500/30' : 'bg-stone-900/20 border-stone-900'}`}>
                <h3 className="font-playfair text-2xl font-bold text-stone-100 mb-2">{event.event}</h3>
                <p className="text-[9px] font-cinzel text-stone-500 tracking-[0.3em] uppercase mb-4">{event.significance}</p>
                <div className="h-px w-full bg-stone-900/50 mb-4" />
                <p className="text-stone-400 font-playfair italic text-sm leading-relaxed">
                  "{event.user_note}"
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer className="text-center pt-10">
        <p className="text-[8px] font-cinzel text-stone-700 tracking-[0.5em] uppercase">Seek Thy Alignment. The Time is Short.</p>
      </footer>
    </div>
  );
};
