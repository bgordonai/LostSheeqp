
import React, { useState } from 'react';
import { VOCAB_CARDS, VocabCard } from '../constants';

export const VocabularyCards: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Hebrew' | 'Greek'>('All');
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const filtered = VOCAB_CARDS.filter(card => filter === 'All' || card.language === filter);

  const copyCard = (card: VocabCard) => {
    const text = `Remnant Vocabulary: ${card.word} (${card.original})\nLanguage: ${card.language}\nMeaning: ${card.meaning}\nDepth: ${card.depth}\nScripture: ${card.scripture}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopyFeedback(card.word);
      setTimeout(() => setCopyFeedback(null), 2000);
    });
  };

  return (
    <div className="space-y-10 animate-fadeIn pb-32">
      <header className="text-center space-y-2 px-4">
        <h2 className="font-cinzel text-2xl text-amber-500 font-black tracking-[0.2em] uppercase">Sacred Lexicon</h2>
        <p className="text-[10px] text-stone-600 font-cinzel tracking-[0.4em] uppercase italic">Comprehensive Study of the Holy Tongue</p>
      </header>

      {/* Language Filter */}
      <div className="flex bg-stone-900/40 p-1 rounded-2xl mx-4">
        {(['All', 'Hebrew', 'Greek'] as const).map(lang => (
          <button
            key={lang}
            onClick={() => setFilter(lang)}
            className={`flex-1 py-3 font-cinzel text-[10px] tracking-widest uppercase rounded-xl transition-all ${
              filter === lang ? 'bg-amber-500 text-stone-950 shadow-lg font-black' : 'text-stone-500'
            }`}
          >
            {lang}
          </button>
        ))}
      </div>

      <div className="grid gap-8 px-4">
        {filtered.map((card) => (
          <div key={card.word} className="bg-stone-950 border border-stone-900 rounded-[40px] p-8 space-y-6 relative overflow-hidden group">
            {/* Background script deco */}
            <div className="absolute -top-4 -right-4 text-7xl opacity-[0.03] text-stone-500 font-serif rotate-12 pointer-events-none group-hover:opacity-[0.08] transition-opacity">
              {card.original}
            </div>
            
            <header className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-[8px] font-cinzel text-amber-900 tracking-[0.4em] uppercase font-black">{card.language} Protocol</span>
                <div className="flex items-baseline gap-4">
                  <h3 className="font-playfair text-3xl font-black text-stone-100">{card.word}</h3>
                  <span className="text-2xl text-amber-500/80 font-serif leading-none">{card.original}</span>
                </div>
                <p className="text-[9px] font-mono text-stone-500 tracking-widest uppercase italic">[{card.transliteration}]</p>
              </div>
              <button 
                onClick={() => copyCard(card)}
                className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center text-stone-500 hover:text-amber-500 transition-colors border border-stone-800"
              >
                {copyFeedback === card.word ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-amber-500">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                )}
              </button>
            </header>

            <div className="space-y-6">
              <section className="space-y-2">
                <h5 className="text-[9px] font-cinzel text-amber-500 tracking-[0.4em] uppercase font-black">Functional Meaning</h5>
                <p className="text-stone-300 font-playfair text-lg italic leading-relaxed">"{card.meaning}"</p>
              </section>

              <section className="p-6 bg-stone-900/40 rounded-3xl border border-stone-900">
                <h5 className="text-[9px] font-cinzel text-stone-500 tracking-[0.4em] uppercase mb-2">Deep Ethos</h5>
                <p className="text-stone-400 text-xs leading-relaxed font-inter">{card.depth}</p>
              </section>

              <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-stone-900"></div>
                <span className="text-[8px] font-mono text-stone-600 uppercase tracking-widest">Witness: {card.scripture}</span>
                <div className="h-px flex-1 bg-stone-900"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
