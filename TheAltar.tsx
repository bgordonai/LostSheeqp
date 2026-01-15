
import React, { useState, useMemo } from 'react';
import { WitnessRecord, ScoreTier, HerbCategory, Herb, LifeStage, CalendarDay } from '../types';
import { DailyManna } from './DailyManna';
import { WitnessEngine, WitnessCard } from './WitnessEngine';
import { CovenantFlame } from './CovenantFlame';
import { HERBS, ANCESTRAL_CALENDAR } from '../constants';
import { LordsPrayer } from './LordsPrayer';

interface TheAltarProps {
  score: number;
  lifeStage: LifeStage;
  onObserve: () => void;
  onNavigateToCalendar: (day: CalendarDay) => void;
  onNavigateToTimeline: () => void;
}

export const TheAltar: React.FC<TheAltarProps> = ({ score, lifeStage, onObserve, onNavigateToCalendar, onNavigateToTimeline }) => {
  const [isRecordingWitness, setIsRecordingWitness] = useState(false);
  const [activeWitness, setActiveWitness] = useState<WitnessRecord | null>(null);
  const [selectedHerb, setSelectedHerb] = useState<Herb | null>(null);

  const tier = useMemo(() => {
    if (score < 20) return ScoreTier.DIM;
    if (score < 50) return ScoreTier.KINDLED;
    if (score < 100) return ScoreTier.BURNING;
    if (score < 200) return ScoreTier.SEALED;
    return ScoreTier.ETERNAL;
  }, [score]);

  const upcomingFeast = useMemo(() => {
    // Find the next feast from the calendar
    const months = Object.keys(ANCESTRAL_CALENDAR);
    for (const m of months) {
      const feast = ANCESTRAL_CALENDAR[m].find(d => !!d.feast);
      if (feast) return feast;
    }
    return null;
  }, []);

  const dailyHerb = useMemo(() => {
    const day = new Date().getDate();
    return HERBS[day % HERBS.length];
  }, []);

  return (
    <div className="space-y-10 animate-fadeIn pb-10">
      {/* Dashboard Top */}
      <section className="text-center pt-4">
        <h2 className="font-cinzel text-[10px] text-stone-500 tracking-[0.5em] uppercase mb-10">Altar of the Remnant</h2>
        <CovenantFlame score={score} lifeStage={lifeStage} />
        
        <div className="mt-8 space-y-2">
          <p className="font-cinzel text-xs text-amber-500/80 tracking-[0.3em] uppercase">{tier} Rank</p>
          <button 
            onClick={onNavigateToTimeline}
            className="text-[9px] font-cinzel text-stone-600 tracking-[0.4em] uppercase hover:text-amber-500 transition-colors"
          >
            [ VIEW SCROLL OF AGES ]
          </button>
        </div>
      </section>

      {/* Upcoming Appointed Time */}
      {upcomingFeast && (
        <section 
          onClick={() => onNavigateToCalendar(upcomingFeast)}
          className="bg-stone-900 border border-amber-900/30 p-8 rounded-[40px] relative overflow-hidden group cursor-pointer hover:border-amber-500 transition-all"
        >
          <div className="absolute top-0 right-0 p-6 opacity-[0.05] text-4xl group-hover:scale-125 transition-transform">🏺</div>
          <div className="space-y-4">
            <span className="text-[10px] font-cinzel text-amber-500/50 tracking-[0.6em] uppercase">Upcoming Appointed Time</span>
            <div className="flex justify-between items-end">
              <div>
                <h3 className="font-playfair text-3xl font-black text-stone-100">{upcomingFeast.feast}</h3>
                <p className="text-[9px] font-mono text-stone-500 uppercase tracking-widest mt-1">
                  Gate of {upcomingFeast.tribe} • 2026-03-25
                </p>
              </div>
              <span className="text-[10px] font-cinzel text-amber-500 font-bold uppercase tracking-widest mb-1">[ SEEK ]</span>
            </div>
          </div>
        </section>
      )}

      {/* Primary Directive */}
      <section className="bg-stone-950/80 backdrop-blur-xl border border-stone-900 p-8 rounded-[40px] relative overflow-hidden group shadow-2xl">
        <div className="relative z-10 text-center space-y-6">
          <span className="text-[10px] font-cinzel text-stone-600 tracking-[0.6em] uppercase">Today's Sacred Instruction</span>
          <h3 className="font-playfair text-2xl font-bold text-stone-100">Maintain Digital Silence.</h3>
          <p className="text-stone-500 italic font-playfair text-sm leading-relaxed max-w-[240px] mx-auto">
            "Be still, and know that I am the Father of the Tribes."
          </p>
          <div className="pt-4">
            <button 
              onClick={() => setIsRecordingWitness(true)}
              className="w-full py-5 font-cinzel text-[10px] tracking-[0.4em] rounded-2xl bg-amber-500 text-stone-950 shadow-gold font-black transition-all active:scale-95"
            >
              RECORD WITNESS
            </button>
          </div>
        </div>
      </section>

      <DailyManna />
      <LordsPrayer />

      {/* Daily Codex Suggestion */}
      <section 
        onClick={() => setSelectedHerb(dailyHerb)}
        className="bg-stone-900/40 backdrop-blur-xl border border-amber-900/10 p-8 rounded-[40px] flex items-center gap-6 group cursor-pointer hover:bg-stone-800/60 transition-all"
      >
        <div className="w-16 h-16 bg-stone-950 rounded-2xl border border-stone-800 flex items-center justify-center text-3xl shadow-gold group-hover:scale-110 transition-transform">
           {dailyHerb.category === HerbCategory.OILS ? '🏺' : dailyHerb.category === HerbCategory.SEEDS ? '🌾' : '🌿'}
        </div>
        <div className="flex-1">
          <span className="text-[8px] font-cinzel text-amber-500/50 tracking-widest uppercase mb-1 block">Daily Revelation</span>
          <h4 className="font-playfair font-bold text-stone-100 text-lg leading-tight">{dailyHerb.name}</h4>
          <p className="text-[9px] text-stone-500 font-mono tracking-widest uppercase mt-1 italic">
            {dailyHerb.scriptures[0]}
          </p>
        </div>
      </section>

      {isRecordingWitness && (
        <WitnessEngine 
          onComplete={(r) => { setIsRecordingWitness(false); setActiveWitness(r); }} 
          onCancel={() => setIsRecordingWitness(false)} 
        />
      )}

      {activeWitness && (
        <WitnessCard record={activeWitness} onDismiss={() => setActiveWitness(null)} />
      )}
    </div>
  );
};
