
import React from 'react';
import { LifeStage } from '../types';

interface CovenantFlameProps {
  score: number;
  lifeStage?: LifeStage;
}

export const CovenantFlame: React.FC<CovenantFlameProps> = ({ score, lifeStage = LifeStage.ADULT }) => {
  const intensity = Math.min((score / 250) * 100, 100);
  
  // Define flame state visuals
  let flameColor = 'rgba(120, 113, 108, 0.2)'; // Exile gray
  if (score >= 20) flameColor = 'rgba(249, 115, 22, 0.4)'; // Ember
  if (score >= 50) flameColor = 'rgba(245, 158, 11, 0.7)'; // Flame I
  if (score >= 100) flameColor = 'rgba(212, 175, 55, 0.9)'; // Flame II
  if (score >= 200) flameColor = 'rgba(255, 255, 255, 0.9)'; // Seal

  // Adjust pulse based on life stage
  const pulseClass = lifeStage === LifeStage.ELDER 
    ? "animate-[pulse_4s_ease-in-out_infinite]" 
    : lifeStage === LifeStage.YOUTH || lifeStage === LifeStage.CHILD
    ? "animate-[pulse_1s_ease-in-out_infinite]"
    : "animate-pulse";

  return (
    <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
      {/* Outer Glow */}
      <div 
        className={`absolute inset-0 rounded-full blur-3xl transition-all duration-1000 ${pulseClass}`}
        style={{ backgroundColor: flameColor, opacity: 0.3 }}
      ></div>

      {/* Main Flame Core */}
      <div className="relative w-24 h-32 flex flex-col items-center">
        <div 
          className={`w-full h-full bg-gradient-to-t from-transparent via-current to-transparent transition-all duration-1000 ${score > 0 ? pulseClass : ''}`}
          style={{ 
            color: flameColor,
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            filter: `blur(${score < 20 ? '8px' : '4px'})`
          }}
        ></div>
        
        {/* Stone Base */}
        <div className="absolute bottom-0 w-32 h-4 bg-stone-900 border-t border-stone-800 rounded-full"></div>
      </div>

      {/* Score Text Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="font-cinzel text-[8px] text-stone-500 tracking-[0.4em] mb-1">ALIGNMENT</span>
        <span className="font-cinzel text-4xl font-black text-stone-100 transition-all duration-500" style={{ textShadow: score >= 100 ? '0 0 10px rgba(212, 175, 55, 0.5)' : 'none' }}>
          {score}
        </span>
        <span className="font-cinzel text-[7px] text-amber-500/40 tracking-[0.2em] mt-2 uppercase">{lifeStage} FLAME</span>
      </div>
    </div>
  );
};
