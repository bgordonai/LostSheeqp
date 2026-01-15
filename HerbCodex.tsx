
import React, { useState, useMemo } from 'react';
import { HERBS } from '../constants';
import { Herb, HerbCategory, Tribe, Gender, LifeStage } from '../types';
import { generateFormulaInsight } from '../services/geminiService';

interface HerbCodexProps {
  userContext: { tribe: Tribe, gender: Gender, lifeStage: LifeStage };
}

export const HerbCodex: React.FC<HerbCodexProps> = ({ userContext }) => {
  const [selected, setSelected] = useState<Herb | null>(null);
  const [search, setSearch] = useState('');
  const [isCastingLot, setIsCastingLot] = useState(true); // Default to synergy mode
  
  // Synergy State
  const [lotResult, setLotResult] = useState<{ base: Herb, additive: Herb, finisher: Herb } | null>(null);
  const [generatedInsight, setGeneratedInsight] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Filtered Library for Search
  const filteredHerbs = useMemo(() => {
    if (!search) return [];
    return HERBS.filter(herb => {
      const lowerSearch = search.toLowerCase();
      return (
        herb.name.toLowerCase().includes(lowerSearch) || 
        herb.spiritualFunction.toLowerCase().includes(lowerSearch) ||
        herb.curseBroken.toLowerCase().includes(lowerSearch)
      );
    });
  }, [search]);

  const castTheLots = async () => {
    setIsGenerating(true);
    setLotResult(null);
    setGeneratedInsight(null);
    
    // Categorize pools with fallback logic to prevent black screen (undefined access)
    const bases = HERBS.filter(h => h.category === HerbCategory.OILS || h.category === HerbCategory.WATER);
    const additives = HERBS.filter(h => h.category === HerbCategory.HERBS || h.category === HerbCategory.SEEDS);
    const finishers = HERBS.filter(h => h.category === HerbCategory.FRUITS || h.category === HerbCategory.FERMENTS || h.category === HerbCategory.MINERALS);

    // Safety fallback: if a pool is empty, draw from the entire HERBS list
    const getSafeRand = (arr: Herb[]) => arr.length > 0 ? arr[Math.floor(Math.random() * arr.length)] : HERBS[Math.floor(Math.random() * HERBS.length)];

    const base = getSafeRand(bases);
    const additive = getSafeRand(additives);
    const finisher = getSafeRand(finishers);

    // If for some reason HERBS is empty (shouldn't happen), prevent crash
    if (!base || !additive || !finisher) {
      setIsGenerating(false);
      return;
    }

    // Brief delay for visual effect
    await new Promise(r => setTimeout(r, 800));
    setLotResult({ base, additive, finisher });

    // Generate AI Synergy Insight
    const insight = await generateFormulaInsight(base, additive, finisher, userContext);
    setGeneratedInsight(insight);
    setIsGenerating(false);
  };

  const resetLots = () => {
    setLotResult(null);
    setGeneratedInsight(null);
  };

  return (
    <div className="space-y-10 animate-fadeIn pb-32">
      <header className="text-center space-y-2">
        <h2 className="font-cinzel text-2xl text-amber-500 font-black tracking-[0.2em] uppercase">The Lot Casting</h2>
        <p className="text-[10px] text-stone-600 font-cinzel tracking-[0.4em] uppercase italic">Urim & Thummim Synergy Engine</p>
      </header>

      {/* Mode Toggle */}
      <div className="flex bg-stone-900/40 p-1 rounded-2xl mx-2">
        <button 
          onClick={() => setIsCastingLot(true)}
          className={`flex-1 py-3 font-cinzel text-[10px] tracking-widest uppercase rounded-xl transition-all ${isCastingLot ? 'bg-amber-500 text-stone-950 shadow-gold font-black' : 'text-stone-500'}`}
        >
          Cast Synergy
        </button>
        <button 
          onClick={() => setIsCastingLot(false)}
          className={`flex-1 py-3 font-cinzel text-[10px] tracking-widest uppercase rounded-xl transition-all ${!isCastingLot ? 'bg-amber-500 text-stone-950 shadow-gold font-black' : 'text-stone-500'}`}
        >
          Library
        </button>
      </div>

      {!isCastingLot ? (
        <div className="space-y-8 px-2">
          {/* Library Search */}
          <div className="px-2">
            <input 
              type="text" 
              placeholder="Search Ancestral Wisdom..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              className="w-full bg-stone-950 border border-stone-900 rounded-[20px] px-8 py-5 text-xs font-cinzel tracking-widest text-stone-300 placeholder:text-stone-800 shadow-inner" 
            />
          </div>

          {search ? (
            <div className="grid grid-cols-2 gap-5">
              {filteredHerbs.map((herb) => (
                <button key={herb.name} onClick={() => setSelected(herb)} className="p-6 bg-stone-950 border border-stone-900 rounded-[30px] text-left hover:border-amber-900/20 transition-all group active:scale-95">
                  <h4 className="font-playfair font-black text-stone-200 text-base leading-tight mb-2">{herb.name}</h4>
                  <span className="text-[8px] text-stone-700 font-cinzel tracking-widest uppercase">{herb.category}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-4xl opacity-10 mb-4">📜</div>
              <p className="text-[10px] text-stone-700 font-cinzel tracking-widest uppercase">Search to reveal the Law</p>
            </div>
          )}
        </div>
      ) : (
        /* The Lot Casting Interface */
        <div className="space-y-12 px-4 pb-20">
          <div className="relative aspect-square max-w-[300px] mx-auto flex items-center justify-center">
             <div className={`absolute inset-0 border-[20px] border-amber-900/5 rounded-[60px] ${isGenerating ? 'animate-spin opacity-50' : 'animate-pulse'}`} />
             <div className="text-center space-y-6 relative z-10">
                <button 
                  onClick={castTheLots}
                  disabled={isGenerating}
                  className={`w-32 h-32 bg-stone-950 border-2 border-amber-900/30 rounded-full flex flex-col items-center justify-center shadow-gold transition-all active:scale-90 ${isGenerating ? 'rotate-[360deg]' : 'hover:scale-105'}`}
                >
                  <span className="text-5xl mb-2">{isGenerating ? '⏳' : '🎲'}</span>
                  <span className="text-[8px] font-cinzel font-black text-amber-500 tracking-[0.2em] uppercase">Roll Lot</span>
                </button>
                {!lotResult && !isGenerating && (
                   <p className="text-[9px] font-cinzel text-stone-600 tracking-[0.4em] uppercase">One tap for synergy</p>
                )}
             </div>
          </div>

          {(lotResult || isGenerating) && (
            <div className="animate-fadeIn space-y-10">
              <div className="bg-stone-950 border border-amber-900/20 p-10 rounded-[50px] space-y-8 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-8xl pointer-events-none">✨</div>
                
                {lotResult && (
                  <div className="grid grid-cols-3 gap-6">
                    {[
                      { h: lotResult.base, label: 'BASE' },
                      { h: lotResult.additive, label: 'ACTIVE' },
                      { h: lotResult.finisher, label: 'SEAL' }
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 bg-stone-900 rounded-[20px] border border-stone-800 flex items-center justify-center text-3xl shadow-inner group cursor-help" onClick={() => setSelected(item.h)}>
                           {item.h.category === HerbCategory.OILS ? '🏺' : item.h.category === HerbCategory.SEEDS ? '🌰' : item.h.category === HerbCategory.WATER ? '💧' : '🌿'}
                        </div>
                        <div className="text-center">
                          <span className="text-[7px] font-cinzel text-stone-600 tracking-widest uppercase block mb-1">{item.label}</span>
                          <span className="text-[9px] font-cinzel text-amber-500 font-black uppercase leading-tight">{item.h.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-8 space-y-6 border-t border-stone-900">
                  <span className="text-[10px] font-cinzel text-amber-500/50 tracking-[0.5em] uppercase text-center block">Prophetic Revelation</span>
                  {isGenerating ? (
                    <div className="flex flex-col items-center gap-6 py-10">
                      <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin shadow-gold" />
                      <p className="text-[10px] font-cinzel text-stone-500 tracking-widest uppercase italic animate-pulse">The Sage is interpreting the Covenant Synergy...</p>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      <p className="text-lg text-stone-200 leading-relaxed font-playfair italic text-center whitespace-pre-wrap px-4">
                        {generatedInsight}
                      </p>
                      <div className="flex justify-center gap-4">
                        <button onClick={resetLots} className="px-8 py-3 border border-stone-800 text-stone-600 font-cinzel text-[9px] tracking-[0.3em] uppercase rounded-2xl hover:bg-stone-900 transition-colors">Reset</button>
                        <button className="px-8 py-3 bg-amber-500 text-stone-950 font-cinzel text-[9px] font-black tracking-[0.3em] uppercase rounded-2xl shadow-gold active:scale-95 transition-all">Seal Remedy</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {!lotResult && !isGenerating && (
            <div className="text-center space-y-6 pt-10 px-8">
               <h3 className="font-playfair text-2xl text-stone-500 italic leading-relaxed">"The lot is cast into the lap; but the whole disposing thereof is of the Lord."</h3>
               <p className="font-mono text-[10px] text-stone-700 uppercase tracking-[0.4em]">— Proverbs 16:33</p>
            </div>
          )}
        </div>
      )}

      {/* Detail Overlay */}
      {selected && (
        <div className="fixed inset-0 bg-black/98 z-[100] flex items-end justify-center backdrop-blur-xl animate-fadeIn">
          <div className="bg-[#0c0a09] border-t border-amber-900/20 rounded-t-[50px] p-10 max-w-lg w-full relative h-[92vh] overflow-y-auto scrollbar-hide">
            <button onClick={() => setSelected(null)} className="absolute top-8 right-10 text-stone-600 hover:text-amber-500 font-cinzel text-xs tracking-widest p-4 transition-colors">RETURN</button>
            <div className="space-y-12 pt-8">
              <header className="text-center space-y-6">
                <span className="text-[10px] font-cinzel text-amber-500 tracking-[0.8em] uppercase block">{selected.category}</span>
                <h3 className="font-playfair text-5xl font-black text-stone-100 leading-tight">{selected.name}</h3>
                <div className="inline-block px-4 py-1.5 bg-stone-900 rounded-full">
                   <p className="font-mono text-[10px] text-amber-500 uppercase tracking-widest leading-none">{selected.scriptures[0]}</p>
                </div>
              </header>
              <div className="space-y-10">
                <section className="p-8 bg-stone-900/20 rounded-[40px] border border-stone-900/50 shadow-inner">
                  <h5 className="text-[10px] text-amber-500 uppercase font-cinzel font-black mb-4 tracking-[0.4em]">Spiritual Law</h5>
                  <p className="text-lg text-stone-200 leading-relaxed font-playfair italic">"{selected.spiritualFunction}"</p>
                </section>
                <section className="bg-amber-500/[0.03] p-10 border border-amber-500/20 rounded-[40px] shadow-gold">
                  <h5 className="text-[10px] text-amber-500 uppercase font-cinzel font-black mb-3 tracking-[0.4em]">Curse Broken</h5>
                  <p className="text-xl text-amber-100 font-black leading-tight tracking-wide uppercase">{selected.curseBroken}</p>
                </section>
                <section className="p-8 border border-stone-900 rounded-[40px]">
                  <h5 className="text-[10px] text-stone-600 uppercase font-cinzel font-black mb-3 tracking-[0.4em]">Ancient Prep</h5>
                  <p className="text-sm text-stone-400 font-inter leading-relaxed italic">{selected.preparation}</p>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
