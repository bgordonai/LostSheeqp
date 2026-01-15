
import React, { useState } from 'react';
import { ANCESTRAL_CALENDAR, TRIBE_COLORS } from '../constants';
import { CalendarDay } from '../types';

interface AncestralCalendarProps {
  initialSelection?: CalendarDay | null;
}

export const AncestralCalendar: React.FC<AncestralCalendarProps> = ({ initialSelection }) => {
  const [activeMonth, setActiveMonth] = useState(initialSelection?.month || 'Nissan');
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(initialSelection || null);

  const months = Object.keys(ANCESTRAL_CALENDAR);
  const currentDays = ANCESTRAL_CALENDAR[activeMonth] || [];

  return (
    <div className="space-y-8 animate-fadeIn pb-32 px-2">
      <header className="text-center space-y-2">
        <h2 className="font-cinzel text-2xl text-amber-500 font-black tracking-[0.2em] uppercase">Ancestral Calendar</h2>
        <p className="text-[10px] text-stone-600 font-cinzel tracking-[0.4em] uppercase italic">Lunar Cycles & Tribal Alignments</p>
      </header>

      {/* Month Selection */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {months.map(m => (
          <button
            key={m}
            onClick={() => setActiveMonth(m)}
            className={`px-8 py-3 rounded-full font-cinzel text-[11px] tracking-widest uppercase transition-all border ${
              activeMonth === m ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-gold font-black' : 'bg-stone-900 text-stone-600 border-stone-800'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-5 gap-3">
        {currentDays.map((d) => {
          const tribeColor = TRIBE_COLORS[d.tribe] || '#d4af37';
          const isFeast = !!d.feast;

          return (
            <button
              key={d.day}
              onClick={() => setSelectedDay(d)}
              className={`relative aspect-square flex flex-col items-center justify-center rounded-2xl border transition-all active:scale-95 group overflow-hidden ${
                isFeast ? 'border-amber-500/50 bg-amber-500/[0.03]' : 'border-stone-900 bg-stone-950'
              }`}
            >
              {/* Tribal Aura Effect */}
              <div 
                className={`absolute inset-0 opacity-10 group-hover:opacity-30 transition-all ${d.aura}`}
                style={{ backgroundColor: `${tribeColor}22` }}
              ></div>

              <span className="text-[9px] text-stone-700 font-mono mb-1 relative z-10">{d.day}</span>
              <span className="text-lg mb-0.5 relative z-10">{d.moon}</span>
              
              <div 
                className="w-1.5 h-1.5 rounded-full shadow-sm relative z-10"
                style={{ backgroundColor: tribeColor }}
              ></div>

              {isFeast && (
                <div className="absolute top-1 right-1 w-2 h-2 z-20">
                  <div className="w-full h-full bg-amber-500 rounded-full animate-ping"></div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedDay && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex items-end justify-center backdrop-blur-xl animate-fadeIn">
          <div className="bg-[#0c0a09] border-t border-amber-900/20 rounded-t-[50px] p-10 max-w-lg w-full relative h-[85vh] overflow-y-auto scrollbar-hide">
             {/* Full Screen Aura Background */}
             <div className={`absolute inset-0 opacity-10 pointer-events-none ${selectedDay.aura}`} />
             
            <button 
              onClick={() => setSelectedDay(null)}
              className="absolute top-8 right-10 text-stone-600 hover:text-amber-500 font-cinzel text-xs tracking-widest p-4 transition-colors z-50"
            >
              RETURN
            </button>

            <div className="space-y-12 pt-8 relative z-10">
              <header className="text-center space-y-4">
                <div className="flex justify-center items-center gap-4">
                  <span className="text-4xl">{selectedDay.moon}</span>
                  <div 
                    className="w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl font-cinzel font-black"
                    style={{ borderColor: TRIBE_COLORS[selectedDay.tribe], color: TRIBE_COLORS[selectedDay.tribe] }}
                  >
                    {selectedDay.tribe === 'All Tribes' ? 'A' : selectedDay.tribe.charAt(0)}
                  </div>
                </div>
                <h3 className="font-cinzel text-sm text-amber-500 tracking-[0.5em] uppercase">Day {selectedDay.day} — {activeMonth}</h3>
                <h4 className="font-playfair text-4xl font-black text-stone-100">{selectedDay.tribe}</h4>
                {selectedDay.feast && (
                  <div className="inline-block px-6 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full">
                    <p className="font-cinzel text-[10px] text-amber-500 uppercase tracking-widest font-black">{selectedDay.feast}</p>
                  </div>
                )}
              </header>

              <div className="space-y-10">
                <section className="space-y-4">
                  <h5 className="text-[10px] text-stone-700 uppercase font-cinzel font-black tracking-[0.4em]">Ancestral Lore</h5>
                  <p className="text-xl text-stone-200 leading-relaxed font-playfair italic">
                    "{selectedDay.lore}"
                  </p>
                </section>

                <section className="p-8 rounded-[40px] border border-amber-900/20 bg-stone-900/30 shadow-inner">
                  <h5 className="text-[10px] font-cinzel font-black mb-4 tracking-[0.4em] uppercase text-amber-500">Codex Remedy</h5>
                  <h6 className="font-playfair text-2xl font-bold text-stone-100 mb-2">{selectedDay.remedyName}</h6>
                  <p className="text-sm text-stone-400 leading-relaxed italic">{selectedDay.codex_remedy}</p>
                </section>

                <div className="pt-8 flex gap-4">
                   <button 
                     className="flex-1 py-5 bg-amber-500 text-stone-950 font-cinzel text-[11px] font-black tracking-[0.4em] rounded-2xl shadow-gold active:scale-95 transition-all uppercase"
                   >
                     Commit to Obedience
                   </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
