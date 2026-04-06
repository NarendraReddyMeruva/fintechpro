import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, CreditCard, ChevronRight } from 'lucide-react';

const AddCardModal = ({ isOpen, onClose }) => {
  const { addCard } = useStore();
  const [formData, setFormData] = useState({
    brand: 'Visa',
    number: '',
    balance: '',
    expiry: '12/28'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addCard({
      ...formData,
      balance: parseFloat(formData.balance) || 0,
      number: `**** **** **** ${formData.number.slice(-4)}`
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="fixed inset-0 m-auto w-full max-w-md h-fit glass-card p-10 z-[101] shadow-2xl border-white/20"
          >
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-3xl font-black text-text">New Card</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-text/40 mt-1">Issue a new digital card</p>
              </div>
              <button onClick={onClose} className="p-3 bg-text/5 rounded-full hover:bg-theme/20 hover:text-theme transition-all">
                <X className="w-5 h-5 flex items-center justify-center" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text/40 pl-4">Network</label>
                <div className="flex gap-4">
                  {['Visa', 'Mastercard', 'Amex'].map((brand) => (
                    <button
                      key={brand}
                      type="button"
                      onClick={() => setFormData({ ...formData, brand })}
                      className={`flex-1 py-3 rounded-2xl font-bold transition-all border-2 ${
                        formData.brand === brand 
                        ? 'bg-theme text-white border-theme shadow-lg shadow-theme/20' 
                        : 'bg-text/5 border-transparent text-text hover:bg-text/10'
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text/40 pl-4">Full Card Number</label>
                <div className="relative">
                   <div className="absolute inset-y-0 left-4 flex items-center text-text/30">
                     <CreditCard className="w-5 h-5" />
                   </div>
                   <input
                     required
                     type="text"
                     value={formData.number}
                     onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                     className="glass-input w-full pl-12 h-14"
                     placeholder="4589 1024 9012 3456"
                   />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text/40 pl-4">Initial Balance</label>
                  <input
                    required
                    type="number"
                    value={formData.balance}
                    onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                    className="glass-input w-full h-14"
                    placeholder="2500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text/40 pl-4">Expiry</label>
                  <input
                    required
                    type="text"
                    value={formData.expiry}
                    onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                    className="glass-input w-full h-14"
                    placeholder="MM/YY"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-14 bg-theme text-white rounded-2xl font-black uppercase tracking-widest shadow-[0_15px_30px_rgba(37,99,235,0.3)] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all mt-4"
              >
                Create Digital Card
                <ChevronRight className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddCardModal;
