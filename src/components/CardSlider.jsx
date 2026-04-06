import React, { useRef, useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, ChevronRight, ChevronLeft, CreditCard } from 'lucide-react';
import AddCardModal from './AddCardModal';

const CardSlider = () => {
  const { cards, selectedCardId, setSelectedCardId, deleteCard, role } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollRef = useRef(null);

  const handleSelect = (id) => {
    setSelectedCardId(id);
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full py-10 overflow-visible group">
      <div className="flex justify-between items-center mb-8 px-2">
        <div>
          <h3 className="text-3xl font-black text-text tracking-tight">Your Cards</h3>
          <p className="text-[10px] font-black uppercase text-text/40 tracking-[0.2em] mt-1">Select to view transactions</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-2 mr-4">
             <button onClick={() => scroll('left')} className="p-3 glass-card rounded-full hover:bg-theme/20 hover:text-theme shadow-md border-white/20 transition-all active:scale-95">
                <ChevronLeft className="w-5 h-5" />
             </button>
             <button onClick={() => scroll('right')} className="p-3 glass-card rounded-full hover:bg-theme/20 hover:text-theme shadow-md border-white/20 transition-all active:scale-95">
                <ChevronRight className="w-5 h-5" />
             </button>
          </div>
          {role === 'admin' && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-3 px-6 py-3 bg-theme text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-theme/20 hover:scale-105 transition-all"
            >
              <Plus className="w-5 h-5" />
              Add Card
            </button>
          )}
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto no-scrollbar pb-10 px-2 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {cards.map((card, idx) => (
          <motion.div
            key={card.id}
            layoutId={card.id}
            onClick={() => handleSelect(card.id)}
            whileHover={{ y: -10, scale: 1.02 }}
            className={`
              relative flex-shrink-0 w-[340px] md:w-[380px] h-56 rounded-[2.5rem] p-8 cursor-pointer 
              snap-center transition-all duration-500 overflow-hidden shadow-2xl border-2
              ${selectedCardId === card.id 
                ? 'border-theme/40 scale-100 shadow-theme/10' 
                : 'border-transparent opacity-60 grayscale-[0.5] scale-95 hover:opacity-100 hover:grayscale-0'}
            `}
          >
            
            <div className={`absolute inset-0 z-0 transition-opacity duration-700 ${
              card.brand === 'Visa' ? 'bg-gradient-to-br from-theme to-pink-500' :
              card.brand === 'Mastercard' ? 'bg-gradient-to-br from-[#FF5F00] to-[#EB001B]' :
              'bg-gradient-to-br from-[#0070CE] to-[#00AEEF]'
            }`}></div>

           
            <div className="absolute inset-0 border-2 border-white/20 rounded-[2.5rem] z-10 pointer-events-none"></div>

            <div className="relative z-20 flex flex-col h-full justify-between text-white">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Card Balance</p>
                  <h2 className="text-3xl font-black">${card.balance.toLocaleString()}</h2>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <div className="w-12 h-8 bg-white/20 backdrop-blur-md rounded-lg border border-white/30 flex items-center justify-center">
                    <span className="text-[10px] font-bold italic tracking-wider uppercase">{card.brand}</span>
                  </div>
                  {role === 'admin' && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteCard(card.id);
                      }}
                      className="p-2.5 bg-white/10 hover:bg-red-500/80 rounded-xl transition-all border border-white/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-lg font-medium tracking-[0.3em] font-mono">{card.number}</p>
                <div className="flex justify-between items-end">
                   <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase opacity-70 tracking-widest">Expiry Date</p>
                      <p className="text-base font-bold">{card.expiry}</p>
                   </div>
                   <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30">
                      <CreditCard className="w-6 h-6 text-white" />
                   </div>
                </div>
              </div>
            </div>

           
            <div className="absolute top-[-50%] left-[-20%] w-[150%] h-[150%] bg-white/10 skew-y-12 transform-gpu pointer-events-none opacity-50"></div>
          </motion.div>
        ))}
      </div>

      <AddCardModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default CardSlider;
