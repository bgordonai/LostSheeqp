
import React, { useState } from 'react';
import { WitnessShift, WitnessEase, WitnessRecord } from '../types';

interface WitnessEngineProps {
  onComplete: (record: WitnessRecord) => void;
  onCancel: () => void;
}

export const WitnessEngine: React.FC<WitnessEngineProps> = ({ onComplete, onCancel }) => {
  const [shift, setShift] = useState<WitnessShift | null>(null);
  const [ease, setEase] = useState<WitnessEase | null>(null);
  const [note, setNote] = useState('');

  const handleSubmit = () => {
    if (!shift || !ease) return;
    const record: WitnessRecord = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      shift,
      ease,
      note: note.trim() || undefined,
      scriptureRef: 'Ecclesiastes 12:13' // Default for now
    };
    onComplete(record);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950 flex flex-col p-8 animate-fadeIn">
      <div className="flex justify-between items-center mb-10">
        <h2 className="font-cinzel text-amber-500 tracking-widest text-lg">RECORD WITNESS</h2>
        <button onClick={onCancel} className="text-stone-500 font-cinzel text-xs">CLOSE</button>
      </div>

      <div className="space-y-10 overflow-y-auto pb-20">
        <section>
          <h3 className="font-cinzel text-xs text-stone-500 tracking-widest uppercase mb-4">What shifted?</h3>
          <div className="grid grid-cols-2 gap-3">
            {Object.values(WitnessShift).map((s) => (
              <button
                key={s}
                onClick={() => setShift(s)}
                className={`p-4 rounded-xl border font-cinzel text-[10px] tracking-widest uppercase transition-all ${
                  shift === s ? 'border-amber-500 bg-amber-500/10 text-amber-500' : 'border-stone-900 text-stone-600'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </section>

        <section>
          <h3 className="font-cinzel text-xs text-stone-500 tracking-widest uppercase mb-4">Was obedience easy or resisted?</h3>
          <div className="grid gap-3">
            {Object.values(WitnessEase).map((e) => (
              <button
                key={e}
                onClick={() => setEase(e)}
                className={`p-4 rounded-xl border font-cinzel text-[10px] tracking-widest uppercase text-left transition-all ${
                  ease === e ? 'border-amber-500 bg-amber-500/10 text-amber-500' : 'border-stone-900 text-stone-600'
                }`}
              >
                {e}
              </button>
            ))}
          </div>
        </section>

        <section>
          <h3 className="font-cinzel text-xs text-stone-500 tracking-widest uppercase mb-4">Note (Optional)</h3>
          <textarea
            maxLength={280}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Record thy witness in brief..."
            className="w-full bg-stone-900 border border-stone-800 rounded-xl p-4 text-stone-300 focus:outline-none focus:border-amber-500 min-h-[100px] text-sm italic font-playfair"
          />
        </section>
      </div>

      <div className="mt-auto pt-6">
        <button
          onClick={handleSubmit}
          disabled={!shift || !ease}
          className={`w-full py-4 rounded font-cinzel text-sm font-black tracking-[0.3em] transition-all ${
            shift && ease ? 'bg-amber-500 text-stone-950 shadow-gold' : 'bg-stone-900 text-stone-800'
          }`}
        >
          SUBMIT WITNESS
        </button>
      </div>
    </div>
  );
};

export const WitnessCard: React.FC<{ record: WitnessRecord; onDismiss: () => void }> = ({ record, onDismiss }) => {
  return (
    <div className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-8 backdrop-blur-md">
      <div className="bg-stone-950 border border-stone-800 w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl animate-scaleIn">
        <div className="p-8 text-center space-y-6">
          <div className="flex justify-center mb-2">
            <div className="w-12 h-12 border border-amber-900/30 rounded-full flex items-center justify-center text-amber-500/50">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                <path d="M12 2v20M2 12h20" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          <span className="text-[10px] font-cinzel text-stone-600 tracking-[0.4em] uppercase">Witness of Obedience</span>
          <h3 className="font-cinzel text-amber-500 text-xl font-black tracking-widest">{record.shift.toUpperCase()} ALIGNMENT</h3>
          
          <div className="space-y-4 py-4 border-y border-stone-900">
            <p className="text-stone-400 font-playfair italic text-sm leading-relaxed">
              {record.note ? `"${record.note}"` : `Shift acknowledged in ${record.shift.toLowerCase()}.`}
            </p>
            <p className="font-mono text-[9px] text-stone-600 uppercase tracking-tighter">— {record.scriptureRef}</p>
          </div>

          <p className="text-[9px] font-cinzel text-stone-700 tracking-[0.2em] uppercase italic">Obedience acknowledged through {record.ease.toLowerCase()}.</p>
          
          <div className="pt-6 space-y-3">
            <button className="w-full py-3 bg-stone-900 text-stone-100 font-cinzel text-xs tracking-widest rounded-lg hover:bg-stone-800">SAVE WITNESS</button>
            <button onClick={onDismiss} className="w-full py-3 text-stone-500 font-cinzel text-[10px] tracking-widest">RETURN TO ORDER</button>
          </div>
        </div>
      </div>
    </div>
  );
};
