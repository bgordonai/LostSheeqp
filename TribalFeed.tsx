
import React, { useState } from 'react';
import { Tribe, Gender, Testimony } from '../types';

export const TribalFeed: React.FC<{ userTribe: Tribe, userGender: Gender }> = ({ userTribe, userGender }) => {
  const [testimonies, setTestimonies] = useState<Testimony[]>([
    {
      id: '1',
      tribe: Tribe.JUDAH,
      gender: Gender.MALE,
      text: "Observed the 3-day fast of reset. Clarity has returned to the bloodline.",
      timestamp: Date.now() - 3600000,
      type: 'Obedience'
    },
    {
      id: '2',
      tribe: Tribe.LEVI,
      gender: Gender.FEMALE,
      text: "Sanctified the household with Hyssop and prayer. The temple is still.",
      timestamp: Date.now() - 7200000,
      type: 'Restoration'
    }
  ]);
  const [newText, setNewText] = useState('');

  const postTestimony = () => {
    if (!newText.trim()) return;
    const t: Testimony = {
      id: Math.random().toString(36).substr(2, 9),
      tribe: userTribe,
      gender: userGender,
      text: newText,
      timestamp: Date.now(),
      type: 'Obedience'
    };
    setTestimonies([t, ...testimonies]);
    setNewText('');
  };

  return (
    <div className="space-y-10 pb-32 animate-fadeIn">
      <header className="text-center space-y-2">
        <h2 className="font-cinzel text-2xl text-amber-500 font-black tracking-[0.2em] uppercase">Tribal Feed</h2>
        <p className="text-[10px] text-stone-600 font-cinzel tracking-[0.4em] uppercase italic">Testimonies of the Elect</p>
      </header>

      <section className="bg-stone-950 border border-stone-900 p-6 rounded-[30px] shadow-inner">
        <textarea
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="Record thy testimony of obedience..."
          className="w-full bg-transparent border-none text-stone-300 font-playfair italic text-sm focus:ring-0 min-h-[80px]"
        />
        <div className="flex justify-end pt-4 border-t border-stone-900">
          <button 
            onClick={postTestimony}
            className="px-8 py-2 bg-amber-500 text-stone-950 font-cinzel text-[10px] font-black tracking-widest rounded-full uppercase shadow-gold"
          >
            Post Witness
          </button>
        </div>
      </section>

      <div className="space-y-6">
        {testimonies.map(t => (
          <div key={t.id} className="bg-stone-900/30 border border-stone-900 p-6 rounded-[30px] space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-stone-950 border border-amber-900/30 flex items-center justify-center text-[10px] font-cinzel text-amber-500">
                  {t.tribe.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-cinzel text-stone-300 tracking-widest uppercase">{t.tribe} {t.gender}</span>
                  <span className="text-[8px] text-stone-600 font-mono">
                    {new Date(t.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
              <span className="text-[8px] font-cinzel px-2 py-0.5 border border-stone-800 text-stone-500 rounded uppercase tracking-tighter">
                {t.type}
              </span>
            </div>
            <p className="text-stone-400 font-playfair italic text-sm leading-relaxed">"{t.text}"</p>
            <div className="pt-2">
               <p className="text-[9px] font-cinzel text-amber-900 tracking-widest uppercase">AI Witnessed ✅</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
