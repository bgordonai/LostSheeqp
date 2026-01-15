
import React, { useState, useRef, useEffect } from 'react';
import { getWatchmanResponse } from '../services/geminiService';
import { Message, Tribe, Gender, LifeStage } from '../types';

interface TheWatchmanProps {
  userContext: { tribe: Tribe, gender: Gender, lifeStage: LifeStage, score: number };
}

export const TheWatchman: React.FC<TheWatchmanProps> = ({ userContext }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: `Peace be unto you, ${userContext.gender === Gender.MALE ? 'Son' : 'Daughter'} of ${userContext.tribe}. I am The Watchman. As a ${userContext.lifeStage} of the Remnant, what breach in your temple do you seek to repair?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input.trim();
    setInput('');
    const newMessages = [...messages, { role: 'user' as const, text: userMsg }];
    setMessages(newMessages);
    setIsLoading(true);

    const response = await getWatchmanResponse(userMsg, messages, userContext);
    setMessages(prev => [...prev, { role: 'model', text: response || 'The silence of exile returns...' }]);
    setIsLoading(false);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyFeedback(index);
      setTimeout(() => setCopyFeedback(null), 2000);
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-220px)] bg-[#0c0a09] border border-stone-900 rounded-3xl overflow-hidden shadow-2xl animate-fadeIn">
      <div className="bg-stone-900/40 p-5 border-b border-stone-900 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full border border-amber-900/30 flex items-center justify-center text-amber-500 font-cinzel font-black text-xl bg-stone-950">W</div>
        <div>
          <h3 className="font-cinzel text-amber-500 font-bold tracking-widest text-sm leading-none">THE WATCHMAN</h3>
          <span className="text-[9px] text-stone-600 uppercase tracking-tighter">Prophetic AI Protocol — {userContext.lifeStage} {userContext.gender} Mode</span>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
        {messages.map((m, i) => (
          <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[90%] p-4 rounded-2xl text-[13px] leading-relaxed shadow-sm relative group ${
              m.role === 'user' 
                ? 'bg-stone-900 text-stone-300 rounded-br-none border border-stone-800 font-medium' 
                : 'bg-stone-950 text-stone-400 border border-stone-900/50 rounded-bl-none font-playfair italic whitespace-pre-wrap'
            }`}>
              {m.text}
              
              {m.role === 'model' && (
                <button 
                  onClick={() => copyToClipboard(m.text, i)}
                  className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-stone-900/80 text-stone-500 hover:text-amber-500 transition-all opacity-0 group-hover:opacity-100"
                  title="Copy Witness"
                >
                  {copyFeedback === i ? (
                    <span className="text-[8px] font-cinzel font-black uppercase px-1">Sealed</span>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  )}
                </button>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-stone-950 p-4 rounded-2xl border border-stone-900 flex gap-2">
              <div className="w-1.5 h-1.5 bg-amber-900 rounded-full animate-pulse"></div>
              <div className="w-1.5 h-1.5 bg-amber-900 rounded-full animate-pulse [animation-delay:200ms]"></div>
              <div className="w-1.5 h-1.5 bg-amber-900 rounded-full animate-pulse [animation-delay:400ms]"></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-stone-950 border-t border-stone-900 flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Speak thy witness..."
          className="flex-1 bg-stone-900 border border-stone-800 rounded-xl px-5 py-3 text-xs focus:outline-none focus:border-amber-900/50 text-stone-300 placeholder:text-stone-700"
        />
        <button 
          onClick={handleSend}
          disabled={isLoading}
          className="bg-stone-900 text-amber-500 w-12 h-12 flex items-center justify-center rounded-xl border border-stone-800 hover:bg-stone-800 transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
};
