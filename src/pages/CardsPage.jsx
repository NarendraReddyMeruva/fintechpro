import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Plus, Trash2, CheckCircle2, ShieldCheck, AlertCircle, X } from 'lucide-react';

const CardsPage = () => {
  const { cards, addCard, deleteCard, selectedCardId, setSelectedCardId, authenticatedAdmin } = useStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCard, setNewCard] = useState({ brand: 'Visa', number: '', balance: '', expiry: '' });

  const handleAddCard = (e) => {
    e.preventDefault();
    addCard({ ...newCard, balance: parseFloat(newCard.balance) });
    setShowAddModal(false);
    setNewCard({ brand: 'Visa', number: '', balance: '', expiry: '' });
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-5xl font-black text-text tracking-tighter">Your Wallet</h1>
           <p className="text-sm font-black uppercase tracking-[0.4em] text-text/40 mt-2">Manage Digital & Physical Assets</p>
        </div>
        {authenticatedAdmin && (
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-3 px-8 py-4 bg-theme text-white rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-xl shadow-theme/30 hover:scale-105 active:scale-95 transition-all"
          >
            <Plus className="w-5 h-5" />
            Add New Card
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card) => (
          <motion.div 
            key={card.id}
            layoutId={card.id}
            onClick={() => setSelectedCardId(card.id)}
            className={`relative group cursor-pointer h-64 rounded-[2.5rem] p-8 overflow-hidden transition-all duration-500 GlowingBorder ${
              selectedCardId === card.id ? 'ring-4 ring-theme ring-offset-4 dark:ring-offset-gray-900 shadow-2xl' : 'opacity-80 grayscale-[0.2]'
            }`}
            style={{ 
              background: card.brand === 'Visa' 
                ? 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' 
                : card.brand === 'Mastercard'
                ? 'linear-gradient(135deg, #ea580c 0%, #db2777 100%)'
                : 'linear-gradient(135deg, #0891b2 0%, #0d9488 100%)'
            }}
          >
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>

            <div className="relative z-10 h-full flex flex-col justify-between text-white">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                   <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Card Balance</p>
                   <h2 className="text-3xl font-black font-mono tracking-tight">${card.balance.toLocaleString()}</h2>
                </div>
                <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl flex flex-col items-center gap-1">
                   <CreditCard className="w-6 h-6" />
                   <span className="text-[8px] font-bold uppercase">{card.brand}</span>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xl font-black tracking-[0.2em] font-mono opacity-90">{card.number}</p>
                <div className="flex justify-between items-end">
                   <div>
                      <p className="text-[8px] font-black uppercase opacity-60 mb-1">Expiry Date</p>
                      <p className="text-xs font-black font-mono">{card.expiry}</p>
                   </div>
                   {selectedCardId === card.id && (
                     <div className="bg-white text-theme px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3" />
                        Selected
                     </div>
                   )}
                   {authenticatedAdmin && (
                     <button 
                       onClick={(e) => {
                         e.stopPropagation();
                         deleteCard(card.id);
                       }}
                       className="p-3 bg-white/10 hover:bg-red-500 text-white rounded-2xl transition-all shadow-lg border border-white/10"
                     >
                       <Trash2 className="w-4 h-4" />
                     </button>
                   )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {!authenticatedAdmin && (
        <div className="glass-card p-10 flex flex-col md:flex-row items-center gap-8 border-theme/20 bg-theme/5">
           <div className="w-20 h-20 rounded-[2.5rem] bg-theme/20 flex items-center justify-center text-theme shadow-inner">
              <ShieldCheck className="w-10 h-10" />
           </div>
           <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-black text-text tracking-tight">Need to add more cards?</h3>
              <p className="text-sm font-bold text-text/50 mt-1 uppercase tracking-wider">Elevation to Administrator status is required for wallet expansion.</p>
           </div>
           <button className="px-8 py-4 bg-theme text-white rounded-[2rem] font-black uppercase tracking-widest text-xs transition-all hover:scale-105 active:scale-95 shadow-xl shadow-theme/30">
              Upgrade Account
           </button>
        </div>
      )}

      {/* Add Card Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />
            <motion.div 
               initial={{ scale: 0.9, opacity: 0, y: 20 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.9, opacity: 0, y: 20 }}
               className="relative w-full max-w-lg glass-card p-10 z-10 border-white/20 bg-white/95 dark:bg-gray-900/95"
            >
               <button onClick={() => setShowAddModal(false)} className="absolute top-6 right-6 p-2 text-text/40 hover:text-theme transition-all">
                  <X className="w-5 h-5" />
               </button>

               <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-theme/10 rounded-3xl flex items-center justify-center mx-auto mb-4">
                     <CreditCard className="w-8 h-8 text-theme" />
                  </div>
                  <h2 className="text-3xl font-black text-text tracking-tight">New Digital Asset</h2>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-text/30 mt-1">Add a new bank card to your secure vault</p>
               </div>

               <form onSubmit={handleAddCard} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-text/40 tracking-widest ml-4">Card Brand</label>
                       <select 
                         value={newCard.brand} 
                         onChange={(e) => setNewCard({...newCard, brand: e.target.value})}
                         className="w-full bg-text/5 border-none rounded-2xl p-4 text-sm font-black focus:ring-2 focus:ring-theme"
                       >
                         <option value="Visa">Visa</option>
                         <option value="Mastercard">Mastercard</option>
                         <option value="Amex">Amex</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-text/40 tracking-widest ml-4">Initial Balance</label>
                       <input 
                         type="number" 
                         required
                         placeholder="0.00"
                         value={newCard.balance}
                         onChange={(e) => setNewCard({...newCard, balance: e.target.value})}
                         className="w-full bg-text/5 border-none rounded-2xl p-4 text-sm font-black focus:ring-2 focus:ring-theme"
                       />
                    </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase text-text/40 tracking-widest ml-4">Card Number</label>
                     <input 
                       type="text" 
                       required
                       placeholder="**** **** **** ****"
                       value={newCard.number}
                       onChange={(e) => setNewCard({...newCard, number: e.target.value})}
                       className="w-full bg-text/5 border-none rounded-2xl p-4 text-sm font-black focus:ring-2 focus:ring-theme"
                     />
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase text-text/40 tracking-widest ml-4">Expiry Date</label>
                     <input 
                       type="text" 
                       required
                       placeholder="MM/YY"
                       value={newCard.expiry}
                       onChange={(e) => setNewCard({...newCard, expiry: e.target.value})}
                       className="w-full bg-text/5 border-none rounded-2xl p-4 text-sm font-black focus:ring-2 focus:ring-theme"
                     />
                  </div>

                  <button className="w-full py-5 bg-theme text-white rounded-3xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-theme/30 hover:scale-105 active:scale-95 transition-all mt-4">
                     Confirm Card Initialization
                  </button>
               </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CardsPage;
