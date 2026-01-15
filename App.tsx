
import React, { useState, useEffect, useMemo } from 'react';
import { Onboarding } from './components/Onboarding';
import { TheAltar } from './components/TheAltar';
import { TheWatchman } from './components/TheWatchman';
import { HerbCodex } from './components/HerbCodex';
import { AncestralCalendar } from './components/AncestralCalendar';
import { MidnightRevelation } from './components/MidnightRevelation';
import { TribalFeed } from './components/TribalFeed';
import { VocabularyCards } from './components/VocabularyCards';
import { BibleSearch } from './components/BibleSearch';
import { PropheticTimeline } from './components/PropheticTimeline';
import { Icons } from './constants';
import { Tribe, Gender, LifeStage, ScoreTier, CalendarDay } from './types';

const App: React.FC = () => {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'ai' | 'feed' | 'codex' | 'calendar' | 'lexicon' | 'bible' | 'timeline'>('home');
  const [showSplash, setShowSplash] = useState(true);
  const [selectedCalendarDay, setSelectedCalendarDay] = useState<CalendarDay | null>(null);
  
  // User Profile
  const [tribe, setTribe] = useState<Tribe>(Tribe.UNKNOWN);
  const [gender, setGender] = useState<Gender>(Gender.MALE);
  const [lifeStage, setLifeStage] = useState<LifeStage>(LifeStage.ADULT);
  const [score, setScore] = useState(0);

  const [isDayMode, setIsDayMode] = useState(false);
  const [showMidnight, setShowMidnight] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    const now = new Date();
    if (now.getHours() >= 6 && now.getHours() < 19) {
      setIsDayMode(true);
    } else {
      setIsDayMode(false);
    }
    return () => clearTimeout(timer);
  }, []);

  const handleOnboardingComplete = (t: Tribe, g: Gender, l: LifeStage, initialScore: number) => {
    setTribe(t);
    setGender(g);
    setLifeStage(l);
    setScore(initialScore);
    setIsOnboarded(true);
  };

  const userContext = useMemo(() => ({
    tribe, gender, lifeStage, score
  }), [tribe, gender, lifeStage, score]);

  const tier = useMemo(() => {
    if (score < 20) return ScoreTier.DIM;
    if (score < 50) return ScoreTier.KINDLED;
    if (score < 100) return ScoreTier.BURNING;
    if (score < 200) return ScoreTier.SEALED;
    return ScoreTier.ETERNAL;
  }, [score]);

  const celestialElements = useMemo(() => {
    if (isDayMode) {
      return (
        <>
          <div className="god-ray" />
          {Array.from({ length: 6 }).map((_, i) => (
            <div 
              key={`cloud-${i}`} 
              className="cloud" 
              style={{ 
                top: `${Math.random() * 60}%`, 
                left: `${Math.random() * 100}%`,
                width: `${150 + Math.random() * 400}px`,
                height: `${80 + Math.random() * 200}px`,
                animationDuration: `${40 + Math.random() * 80}s`,
                animationDelay: `${-Math.random() * 100}s`
              }} 
            />
          ))}
        </>
      );
    } else {
      return Array.from({ length: 50 }).map((_, i) => (
        <div 
          key={`star-${i}`} 
          className="star" 
          style={{ 
            top: `${Math.random() * 90}%`, 
            left: `${Math.random() * 100}%`,
            width: `${1 + Math.random() * 2}px`,
            height: `${1 + Math.random() * 2}px`,
            // @ts-ignore
            '--duration': `${1.5 + Math.random() * 3}s`
          }} 
        />
      ));
    }
  }, [isDayMode]);

  if (showSplash) {
    return (
      <div className="fixed inset-0 bg-[#0c0a09] flex flex-col items-center justify-center z-[100] p-10 text-center animate-fadeIn">
        <div className="w-24 h-24 mb-12 text-amber-500 animate-pulse">
           <Icons.Menorah />
        </div>
        <h1 className="font-cinzel text-xl font-black text-stone-300 tracking-[0.8em] mb-4 uppercase">Remnant</h1>
        <p className="text-stone-700 font-cinzel text-[10px] tracking-widest uppercase">Holy Government Enterprise</p>
        <p className="mt-8 text-[8px] text-stone-900 font-cinzel tracking-widest">Brandon R. Gordon MIT ©️</p>
      </div>
    );
  }

  if (!isOnboarded) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className={`ritual-container transition-all duration-1000 ${isDayMode ? 'day-bg' : 'night-bg'}`}>
      <div className="flex-1 w-full max-w-lg mx-auto relative flex flex-col">
        {/* Celestial Background Layer */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {celestialElements}
          
          <div className={`absolute top-20 right-10 w-32 h-32 rounded-full transition-all duration-1000 ${
            isDayMode 
              ? 'bg-amber-100 blur-[60px] opacity-80 shadow-[0_0_120px_rgba(251,191,36,0.5)]' 
              : 'bg-orange-600 blur-[1px] opacity-90 shadow-[0_0_60px_rgba(234,88,12,0.6)] border-r-4 border-orange-400'
          }`} />
        </div>

        {/* Header */}
        <header className={`px-8 py-6 flex justify-between items-center sticky top-0 z-40 transition-colors duration-500 ${
          isDayMode ? 'bg-amber-50/60 backdrop-blur-xl border-b border-amber-900/10' : 'bg-[#0c0a09]/60 backdrop-blur-xl border-b border-stone-900/50'
        }`}>
          <div className="flex items-center gap-4">
            <div className={`w-8 h-8 ${isDayMode ? 'text-amber-600' : 'text-amber-500'}`}>
              <Icons.Lion />
            </div>
            <div className="flex flex-col">
              <span className={`font-cinzel font-black tracking-[0.2em] text-[11px] uppercase ${isDayMode ? 'text-stone-900' : 'text-stone-100'}`}>
                {tribe} {lifeStage}
              </span>
              <span className={`text-[8px] font-mono uppercase tracking-tighter ${isDayMode ? 'text-stone-500' : 'text-stone-600'}`}>
                {tier}
              </span>
            </div>
          </div>

          <button 
            onClick={() => setIsDayMode(!isDayMode)}
            className={`relative w-16 h-8 rounded-full border p-1 transition-all duration-500 flex items-center ${
              isDayMode ? 'bg-amber-100 border-amber-300' : 'bg-stone-900 border-stone-800'
            }`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500 transform ${
              isDayMode ? 'translate-x-8 bg-amber-500 shadow-gold' : 'translate-x-0 bg-orange-600'
            }`}>
              <span className="text-[10px]">{isDayMode ? '☀️' : '🌙'}</span>
            </div>
          </button>
        </header>

        {/* Content Area */}
        <main className="flex-1 px-8 pt-8 pb-40 relative z-10 overflow-y-auto scrollbar-hide">
          {activeTab === 'home' && (
            <TheAltar 
              score={score} 
              lifeStage={lifeStage} 
              onObserve={() => setScore(s => s + 5)} 
              onNavigateToCalendar={(day) => { setSelectedCalendarDay(day); setActiveTab('calendar'); }}
              onNavigateToTimeline={() => setActiveTab('timeline')}
            />
          )}
          {activeTab === 'ai' && <TheWatchman userContext={userContext} />}
          {activeTab === 'calendar' && <AncestralCalendar initialSelection={selectedCalendarDay} />}
          {activeTab === 'codex' && <HerbCodex userContext={userContext} />}
          {activeTab === 'feed' && <TribalFeed userTribe={tribe} userGender={gender} />}
          {activeTab === 'lexicon' && <VocabularyCards />}
          {activeTab === 'bible' && <BibleSearch userContext={userContext} />}
          {activeTab === 'timeline' && <PropheticTimeline />}
          
          <div className="mt-12 text-center opacity-20 hover:opacity-100 transition-opacity pb-20">
             <p className="text-[8px] font-cinzel tracking-[0.5em] text-stone-500 uppercase">Holy Government Enterprise</p>
             <p className="text-[7px] font-cinzel tracking-[0.3em] text-stone-600 uppercase mt-1">Brandon R. Gordon MIT ©️</p>
          </div>
        </main>

        {/* Persistent Nav */}
        <nav className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg px-2 pt-6 pb-10 flex justify-around items-center z-[60] transition-colors duration-500 ${
          isDayMode ? 'bg-white/90' : 'bg-[#0c0a09]/95'
        }`}>
          <NavItem active={activeTab === 'home'} onClick={() => setActiveTab('home')} label="Altar" icon="⚖️" isDayMode={isDayMode} />
          <NavItem active={activeTab === 'lexicon'} onClick={() => setActiveTab('lexicon')} label="Lexicon" icon="📜" isDayMode={isDayMode} />
          <NavItem active={activeTab === 'bible'} onClick={() => setActiveTab('bible')} label="Scrolls" icon="📖" isDayMode={isDayMode} />
          <NavItem active={activeTab === 'ai'} onClick={() => setActiveTab('ai')} label="Watch" icon="🔥" isDayMode={isDayMode} />
          <NavItem active={activeTab === 'codex'} onClick={() => setActiveTab('codex')} label="Codex" icon="🎲" isDayMode={isDayMode} />
          <NavItem active={activeTab === 'calendar'} onClick={() => setActiveTab('calendar')} label="Cycle" icon="🌑" isDayMode={isDayMode} />
        </nav>
      </div>

      {showMidnight && <MidnightRevelation onAcknowledge={() => setShowMidnight(false)} />}
    </div>
  );
};

const NavItem: React.FC<{ active: boolean; onClick: () => void; label: string; icon: string; isDayMode: boolean }> = ({ active, onClick, label, icon, isDayMode }) => (
  <button 
    onClick={onClick}
    className={`flex-1 flex flex-col items-center gap-1.5 transition-all duration-300 group ${active ? 'scale-110' : 'opacity-40 hover:opacity-80'}`}
  >
    <div className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${
      active 
        ? (isDayMode ? 'bg-amber-500 text-white shadow-lg' : 'bg-amber-500 text-stone-950 shadow-gold')
        : (isDayMode ? 'bg-stone-100 text-stone-400 group-hover:bg-stone-200' : 'bg-stone-900/50 text-stone-400 group-hover:bg-stone-800')
    }`}>
      <span className="text-lg">{icon}</span>
    </div>
    <span className={`text-[7px] font-cinzel uppercase tracking-[0.1em] transition-colors ${
      active 
        ? (isDayMode ? 'text-amber-600 font-black' : 'text-amber-500 font-black') 
        : (isDayMode ? 'text-stone-400' : 'text-stone-600')
    }`}>
      {label}
    </span>
  </button>
);

export default App;
