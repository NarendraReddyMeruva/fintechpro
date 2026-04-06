import React from 'react';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, BrainCircuit, Heart, Zap, Award } from 'lucide-react';

const FinancialHealth = () => {
  const mode = useStore(state => state.mode);
  const score = 84; 
  
  return (
    <motion.div 
      whileHover={{ scale: 1.01 }}
      className="glass-card p-10 GlowingBorder hover:border-theme/40 transition-all duration-500 overflow-hidden relative group"
    >
       <div className="absolute inset-0 bg-theme/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
       <div className="absolute top-0 right-0 w-32 h-32 bg-theme/5 blur-4xl -mr-16 -mt-16 group-hover:bg-theme/10 transition-all"></div>
       
       <div className="flex justify-between items-center mb-10 relative z-10">
          <div>
             <h3 className="text-2xl font-black text-text tracking-tight">Financial Health</h3>
             <p className="text-[10px] font-black text-text/30 uppercase tracking-[0.3em] mt-1">AI Financial DNA</p>
          </div>
          <div className="p-3 bg-theme/10 text-theme rounded-2xl animate-pulse">
             <Activity className="w-6 h-6" />
          </div>
       </div>

       <div className="flex-1 flex flex-col items-center justify-center space-y-8 relative z-10">
          <div className="relative w-48 h-48 flex items-center justify-center">
             <svg className="w-full h-full -rotate-90">
                <circle 
                  cx="96" cy="96" r="88" 
                  className="fill-none stroke-text/5 stroke-[12px]" 
                />
                <motion.circle 
                  cx="96" cy="96" r="88" 
                  className="fill-none stroke-theme stroke-[12px]" 
                  strokeDasharray="552.92"
                  initial={{ strokeDashoffset: 552.92 }}
                  animate={{ strokeDashoffset: 552.92 * (1 - score / 100) }}
                  transition={{ duration: 2, ease: "circOut" }}
                  strokeLinecap="round"
                />
             </svg>
             <div className="absolute text-center">
                <span className="text-5xl font-black text-text font-mono">{score}</span>
                <p className="text-[10px] font-black uppercase text-theme tracking-widest mt-1">Excellent</p>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full pt-6">
             <div className="p-4 bg-text/5 rounded-3xl flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-green-500" />
                <div className="text-left">
                   <p className="text-[8px] font-black uppercase text-text/40 tracking-widest">Reserve Status</p>
                   <p className="text-xs font-black text-text">Solid</p>
                </div>
             </div>
             <div className="p-4 bg-text/5 rounded-3xl flex items-center gap-3">
                <BrainCircuit className="w-5 h-5 text-theme" />
                <div className="text-left">
                   <p className="text-[8px] font-black uppercase text-text/40 tracking-widest">AI Strategy</p>
                   <p className="text-xs font-black text-text">Active</p>
                </div>
             </div>
          </div>
       </div>

       <div className="mt-10 p-6 bg-theme text-white rounded-[2rem] shadow-xl shadow-theme/30 relative overflow-hidden group/cta">
          <div className="relative z-10 flex items-center justify-between">
             <div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Next Recommendation</p>
                <h4 className="text-sm font-black text-white/90">Diversify into emerging tech ETF</h4>
             </div>
             <Award className="w-6 h-6 group-hover/cta:scale-125 transition-transform" />
          </div>
          <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover/cta:translate-x-0 transition-transform duration-700 blur-2xl"></div>
       </div>
    </motion.div>
  );
};

export default FinancialHealth;
