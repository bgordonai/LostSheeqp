
import React, { useState, useRef, useEffect } from 'react';
import { ALIGNMENT_QUESTIONS } from '../constants';
import { Tribe, Gender, LifeStage } from '../types';

interface OnboardingProps {
  onComplete: (tribe: Tribe, gender: Gender, lifeStage: LifeStage, initialScore: number) => void;
}

const TRIBAL_MANIFESTO: Record<Tribe, { symbol: string; motto: string; description: string; color: string }> = {
  [Tribe.JUDAH]: { symbol: '🦁', motto: 'The Royal Lion', description: 'Leadership, strength, and the scepter of authority.', color: '#d4af37' },
  [Tribe.REUBEN]: { symbol: '🌊', motto: 'The Firstborn Power', description: 'The beginning of strength and the dignity of the lineage.', color: '#ef4444' },
  [Tribe.SIMEON]: { symbol: '⚔️', motto: 'The Sword of Zeal', description: 'Bound by discipline and the fierce protection of the Law.', color: '#22c55e' },
  [Tribe.LEVI]: { symbol: '🕯️', motto: 'The Temple Guardian', description: 'Set apart for ritual, purification, and sacred instruction.', color: '#3b82f6' },
  [Tribe.DAN]: { symbol: '⚖️', motto: 'The Watchful Judge', description: 'Vigilance, wisdom, and the discernment of the serpent.', color: '#14b8a6' },
  [Tribe.NAPHTALI]: { symbol: '🦌', motto: 'The Swift Hind', description: 'Agility of spirit and the bearer of pleasant words.', color: '#0ea5e9' },
  [Tribe.GAD]: { symbol: '⛺', motto: 'The Fortress Troop', description: 'Strength in numbers and the overcoming of obstacles.', color: '#4d7c0f' },
  [Tribe.ASHER]: { symbol: '🏺', motto: 'The Royal Bread', description: 'Abundance, richness, and the sweetness of the land.', color: '#10b981' },
  [Tribe.ISSACHAR]: { symbol: '🌅', motto: 'The Wise Burden', description: 'Understanding the times and the labor of wisdom.', color: '#ffffff' },
  [Tribe.ZEBULUN]: { symbol: '⛵', motto: 'The Haven of Ships', description: 'Stability in the storm and the wisdom of navigation.', color: '#4f46e5' },
  [Tribe.JOSEPH]: { symbol: '🏹', motto: 'The Fruitful Bough', description: 'Abundant growth and the resilience of the bow.', color: '#a855f7' },
  [Tribe.EPHRAIM]: { symbol: '🐂', motto: 'The Crowned Strength', description: 'The push of the bull and the increase of the field.', color: '#a855f7' },
  [Tribe.MANASSEH]: { symbol: '🌾', motto: 'The Fruitful Vine', description: 'The legacy of increase and the planning of nations.', color: '#3b82f6' },
  [Tribe.BENJAMIN]: { symbol: '🐺', motto: 'The Morning Wolf', description: 'The ravenous guardian and the fierce protector of the night.', color: '#1c1917' },
  [Tribe.UNKNOWN]: { symbol: '🌫️', motto: 'Still Seeking / In Exile', description: 'The Lost Sheep, wandering yet destined for the ancestral alignment of the bloodline.', color: '#78716c' }
};

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [agreed, setAgreed] = useState({ auth: false, resp: false, align: false });
  const [selectedTribe, setSelectedTribe] = useState<Tribe>(Tribe.UNKNOWN);
  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);
  const [selectedLifeStage, setSelectedLifeStage] = useState<LifeStage | null>(null);
  const [scanAnswers, setScanAnswers] = useState<Record<string, number>>({});

  const scrollRef = useRef<HTMLDivElement>(null);
  const allAgreed = agreed.auth && agreed.resp && agreed.align;

  const handleScanAnswer = (id: string, score: number) => {
    setScanAnswers(prev => ({ ...prev, [id]: score }));
  };

  const calculateScore = () => {
    const total = (Object.values(scanAnswers) as number[]).reduce((a, b) => a + b, 0);
    if (selectedTribe && selectedGender && selectedLifeStage) {
      onComplete(selectedTribe, selectedGender, selectedLifeStage, total);
    }
  };

  if (step === 1) {
    return (
      <div className="min-h-screen flex flex-col justify-center p-10 bg-[#0c0a09] animate-fadeIn text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none" />
        <div className="relative z-10">
          <div className="mb-12">
            <h1 className="font-cinzel text-4xl font-black gold-gradient tracking-[0.4em] uppercase mb-4">Covenant Gate</h1>
            <p className="text-[10px] text-stone-600 font-cinzel tracking-[0.6em] uppercase">Holy Government Enterprise</p>
          </div>
          
          <div className="space-y-4 mb-12 text-left">
            {[
              { key: 'auth', text: 'I seek instruction according to Torah, not modern tradition.' },
              { key: 'resp', text: 'I accept the authority of the Watchman and the Covenant.' },
              { key: 'align', text: 'I acknowledge this as a Digital Restoration Engine.' }
            ].map(item => (
              <label key={item.key} className="flex items-center gap-4 p-6 bg-stone-900/40 border border-stone-800 rounded-3xl cursor-pointer group hover:border-amber-900/50 transition-all">
                <input 
                  type="checkbox" 
                  checked={(agreed as any)[item.key]} 
                  onChange={() => setAgreed(prev => ({ ...prev, [item.key]: !(prev as any)[item.key] }))}
                  className="w-6 h-6 accent-amber-500 bg-stone-950 border-stone-700 focus:ring-0 rounded-lg"
                />
                <span className="text-[10px] font-cinzel text-stone-500 tracking-widest uppercase group-hover:text-stone-300 leading-relaxed">
                  {item.text}
                </span>
              </label>
            ))}
          </div>

          <button 
            onClick={() => allAgreed && setStep(2)}
            disabled={!allAgreed}
            className={`w-full py-6 font-cinzel text-sm font-black tracking-[0.4em] rounded-3xl transition-all shadow-2xl ${
              allAgreed ? 'bg-amber-500 text-stone-950 shadow-amber-500/20 active:scale-95' : 'bg-stone-900 text-stone-800'
            }`}
          >
            APPROACH THE GATES
          </button>
          
          <footer className="mt-12">
             <p className="text-[8px] text-stone-800 font-cinzel tracking-[0.4em] uppercase">Brandon R. Gordon MIT ©️</p>
          </footer>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="h-screen w-screen bg-[#0c0a09] overflow-hidden flex flex-col animate-fadeIn">
        <header className="p-8 text-center bg-stone-950/80 border-b border-stone-900 z-20">
          <span className="text-[10px] font-cinzel text-amber-500/50 tracking-[0.8em] uppercase">The 12 Gates + Exile Watch</span>
          <h2 className="text-stone-400 font-cinzel text-xs tracking-[0.3em] uppercase mt-2 italic">Scroll to find thy gate</h2>
        </header>

        <div 
          ref={scrollRef}
          className="flex-1 overflow-x-auto snap-x snap-mandatory flex scrollbar-hide"
        >
          {Object.entries(TRIBAL_MANIFESTO).map(([tribe, info]) => (
            <div 
              key={tribe} 
              className="min-w-full h-full snap-start flex flex-col items-center justify-center p-8 text-center relative"
            >
              <div 
                className="absolute inset-0 opacity-10 pointer-events-none" 
                style={{ background: `radial-gradient(circle at center, ${info.color}33 0%, transparent 70%)` }}
              />
              
              <div className="w-full max-w-sm aspect-[3/4] border-[12px] border-amber-900/10 rounded-[60px] flex flex-col items-center justify-center p-10 space-y-8 relative group bg-stone-950/40 backdrop-blur-sm">
                {/* Gate Visual */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-stone-950 border border-amber-900/30 rounded-full shadow-gold">
                  <span className="text-[10px] font-cinzel text-amber-500 tracking-[0.5em] uppercase">Gate of</span>
                </div>
                
                <div className="text-8xl animate-pulse filter drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]">{info.symbol}</div>
                
                <div className="space-y-4">
                  <h3 className="font-cinzel text-4xl font-black text-stone-100 tracking-widest uppercase">{tribe}</h3>
                  <p className="text-amber-500/70 font-cinzel text-[10px] tracking-[0.4em] uppercase font-black">{info.motto}</p>
                </div>
                
                <p className="text-stone-500 font-playfair italic text-sm leading-relaxed max-w-[220px]">
                  "{info.description}"
                </p>

                <button 
                  onClick={() => {
                    setSelectedTribe(tribe as Tribe);
                    setStep(3);
                  }}
                  className="w-full py-5 bg-stone-900 border border-amber-900/40 text-stone-100 font-cinzel text-[11px] font-black tracking-[0.4em] rounded-2xl hover:bg-amber-500 hover:text-stone-950 transition-all uppercase active:scale-95 shadow-lg"
                >
                  Enter Gate
                </button>
              </div>
            </div>
          ))}
        </div>

        <footer className="p-8 flex flex-col items-center gap-4 bg-stone-950/80 border-t border-stone-900 z-20">
          <div className="flex gap-2">
            {Object.keys(TRIBAL_MANIFESTO).map((_, i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === 0 ? 'bg-amber-500' : 'bg-stone-800'}`} />
            ))}
          </div>
          <p className="text-[8px] font-cinzel text-stone-700 tracking-[0.4em] uppercase">Swipe horizontally to navigate the Gates</p>
        </footer>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen flex flex-col justify-center p-10 bg-[#0c0a09] animate-fadeIn text-center relative">
        <button onClick={() => setStep(2)} className="absolute top-10 left-10 text-stone-600 font-cinzel text-[10px] tracking-[0.2em] uppercase">Back</button>
        
        <span className="text-[10px] font-cinzel text-amber-500/50 tracking-[0.8em] uppercase mb-12 block">Seal of Identity</span>
        <h2 className="font-cinzel text-2xl text-stone-100 tracking-[0.3em] mb-12 uppercase">Declare Thy Gender</h2>
        
        <div className="grid grid-cols-1 gap-4 max-w-sm mx-auto w-full">
          {Object.values(Gender).map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGender(g)}
              className={`p-8 rounded-3xl border-2 font-cinzel text-sm tracking-[0.5em] uppercase transition-all shadow-lg ${
                selectedGender === g ? 'border-amber-500 bg-amber-500/5 text-amber-500 font-black' : 'border-stone-900 bg-stone-950 text-stone-600 hover:border-stone-800'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        <button 
          onClick={() => selectedGender && setStep(4)}
          className={`mt-16 w-full py-6 rounded-3xl font-cinzel text-xs tracking-[0.5em] transition-all uppercase ${
            selectedGender ? 'bg-amber-500 text-stone-950 shadow-gold font-black' : 'bg-stone-900 text-stone-800'
          }`}
        >
          Proceed to the Watch
        </button>
      </div>
    );
  }

  if (step === 4) {
    return (
      <div className="min-h-screen flex flex-col justify-center p-10 bg-[#0c0a09] animate-fadeIn text-center relative">
        <button onClick={() => setStep(3)} className="absolute top-10 left-10 text-stone-600 font-cinzel text-[10px] tracking-[0.2em] uppercase">Back</button>
        
        <span className="text-[10px] font-cinzel text-amber-500/50 tracking-[0.8em] uppercase mb-12 block">The Watch of Time</span>
        <h2 className="font-cinzel text-2xl text-stone-100 tracking-[0.3em] mb-12 uppercase">Current Life Stage</h2>
        
        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto w-full">
          {Object.values(LifeStage).map((l) => (
            <button
              key={l}
              onClick={() => setSelectedLifeStage(l)}
              className={`p-6 rounded-3xl border-2 font-cinzel text-[11px] tracking-[0.4em] uppercase transition-all ${
                selectedLifeStage === l ? 'border-amber-500 bg-amber-500/5 text-amber-500 font-black' : 'border-stone-900 bg-stone-950 text-stone-600'
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        <button 
          onClick={() => selectedLifeStage && setStep(5)}
          className={`mt-16 w-full py-6 rounded-3xl font-cinzel text-xs tracking-[0.5em] transition-all uppercase ${
            selectedLifeStage ? 'bg-amber-500 text-stone-950 shadow-gold font-black' : 'bg-stone-900 text-stone-800'
          }`}
        >
          Begin Alignment Scan
        </button>
      </div>
    );
  }

  if (step === 5) {
    return (
      <div className="min-h-screen flex flex-col p-10 bg-[#0c0a09] animate-fadeIn">
        <div className="mt-12 text-center mb-12">
           <span className="text-[10px] font-cinzel text-amber-500 tracking-[0.8em] uppercase block mb-4">Final Alignment</span>
           <div className="h-1.5 w-full bg-stone-900 rounded-full overflow-hidden shadow-inner">
             <div 
               className="h-full bg-amber-500 transition-all duration-500 shadow-gold" 
               style={{ width: `${(Object.keys(scanAnswers).length / ALIGNMENT_QUESTIONS.length) * 100}%` }}
             ></div>
           </div>
        </div>

        <div className="flex-1 space-y-16 overflow-y-auto pb-20 scrollbar-hide px-2">
          {ALIGNMENT_QUESTIONS.map((q) => (
            <div key={q.id} className="space-y-8">
              <h3 className="font-playfair text-2xl text-stone-100 leading-relaxed italic text-center">"{q.text}"</h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Exile', val: 0 },
                  { label: 'Seeking', val: 5 },
                  { label: 'Aligned', val: 10 }
                ].map(opt => (
                  <button
                    key={opt.label}
                    onClick={() => handleScanAnswer(q.id, opt.val)}
                    className={`py-4 rounded-xl border-2 font-cinzel text-[10px] tracking-widest uppercase transition-all ${
                      scanAnswers[q.id] === opt.val ? 'border-amber-500 bg-amber-500/10 text-amber-500 font-black shadow-lg' : 'border-stone-900 text-stone-600 bg-stone-950'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={calculateScore}
          disabled={Object.keys(scanAnswers).length < ALIGNMENT_QUESTIONS.length}
          className={`py-6 mt-6 font-cinzel text-sm font-black tracking-[0.5em] rounded-3xl transition-all uppercase shadow-2xl ${
            Object.keys(scanAnswers).length === ALIGNMENT_QUESTIONS.length ? 'bg-amber-500 text-stone-950 shadow-gold' : 'bg-stone-900 text-stone-800'
          }`}
        >
          Seal Covenant
        </button>
      </div>
    );
  }

  return null;
};
