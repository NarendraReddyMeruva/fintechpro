import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Plus, CheckCircle2 } from 'lucide-react';

const ATMCard = () => {
  const { cards, setPrimaryCard } = useStore();
  const [showSelector, setShowSelector] = useState(false);
  const primaryCard = cards.find(c => c.primary) || cards[0];

  return (
    <div className="relative w-full max-w-sm mx-auto group">
      
      
      <motion.div 
        whileHover={{ scale: 1.02 }}
        onClick={() => setShowSelector(true)}
        className="relative min-h-[224px] rounded-[2.5rem] p-8 overflow-hidden cursor-pointer shadow-2xl glass-card border-none bg-gradient-to-br from-theme/90 to-pink-500/90 text-white"
      >
        <div className="flex justify-between items-start mb-10">
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Main Balance</p>
            <h2 className="text-4xl font-black">${primaryCard.balance.toLocaleString()}</h2>
          </div>
          <div className="w-12 h-8 bg-white/20 backdrop-blur-md rounded-lg border border-white/30 flex items-center justify-center">
            <span className="text-[10px] font-bold italic tracking-wider">{primaryCard.brand}</span>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-xl font-medium tracking-[0.3em] font-mono">{primaryCard.number}</p>
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase opacity-70 tracking-widest">Expiry Date</p>
              <p className="text-base font-bold">{primaryCard.expiry}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
               <div className="w-8 h-8 bg-yellow-400 border border-white/40 rounded-full shadow-inner"></div>
            </div>
          </div>
        </div>

       
        <div className="absolute top-[-30%] left-[-20%] w-[150%] h-[150%] bg-white/5 skew-y-12 transform-gpu pointer-events-none"></div>
        <div className="absolute top-[10%] left-[80%] w-32 h-32 bg-white/10 blur-[50px] rounded-full pointer-events-none"></div>
      </motion.div>

      
      <AnimatePresence>
        {showSelector && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSelector(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
            />
            <motion.div 
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 glass-card rounded-t-[4rem] p-10 z-[101] shadow-2xl overflow-hidden border-white/10 dark:bg-gray-900/40"
            >
              <div className="max-w-xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                   <div>
                     <h3 className="text-3xl font-black text-text">Select Primary Card</h3>
                     <p className="text-xs font-bold text-text/40 uppercase tracking-widest mt-1">Updates will affect all charts</p>
                   </div>
                   <button onClick={() => setShowSelector(false)} className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full transition-all hover:bg-theme/20 hover:text-theme">
                     <Plus className="w-6 h-6 rotate-45" />
                   </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                  {cards.map((card, idx) => (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, scale: 0.9, x: (idx % 2 === 0 ? -20 : 20) }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      onClick={() => {
                        setPrimaryCard(card.id);
                        setShowSelector(false);
                      }}
                      className={`relative p-8 rounded-3xl cursor-pointer border-2 transition-all duration-300 group ${
                        card.primary 
                        ? 'border-theme bg-theme/5 scale-105 shadow-xl shadow-theme/10' 
                        : 'border-white/10 hover:border-text/20 hover:bg-text/5'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div className={`p-4 rounded-2xl ${card.primary ? 'bg-theme text-white' : 'bg-text/5 text-text/40'} group-hover:bg-theme transition-colors group-hover:text-white`}>
                           <CreditCard className="w-6 h-6" />
                        </div>
                        {card.primary && <CheckCircle2 className="text-theme w-6 h-6 animate-bounce-slow" />}
                      </div>
                      <p className="text-xs font-black text-text/30 mb-1 font-mono uppercase tracking-widest">{card.brand}</p>
                      <p className="text-xl font-black text-text tracking-widest font-mono">{card.number}</p>
                      <div className="mt-6 flex justify-between items-end border-t border-text/5 pt-4">
                        <div>
                          <span className="text-[10px] font-bold text-text/40 block pb-1">Balance</span>
                          <span className="text-lg font-black text-text">${card.balance.toLocaleString()}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ATMCard;
