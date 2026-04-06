import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, DollarSign, Calendar, Tag, FileText, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { useStore } from '../store/useStore';

const AddTransactionModal = ({ isOpen, onClose }) => {
  const { addTransaction, selectedCardId } = useStore();
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'Food',
    type: 'expense',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const categories = ['Food', 'Shopping', 'Transport', 'Ent', 'Technology', 'Health', 'Travel', 'Sub', 'Housing', 'Education', 'Income'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return;

    addTransaction({
      ...formData,
      amount: formData.type === 'expense' ? -Math.abs(parseFloat(formData.amount)) : Math.abs(parseFloat(formData.amount))
    });
    
    setFormData({
      description: '',
      amount: '',
      category: 'Food',
      type: 'expense',
      date: new Date().toISOString().split('T')[0]
    });
    onClose();
  };

  if (!mounted || !document.getElementById('portal-root')) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10 pointer-events-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            className="relative w-full max-w-xl glass-card p-8 md:p-12 z-10 shadow-[0_50px_100px_rgba(0,0,0,0.6)] border-white/20 overflow-hidden bg-white/95 dark:bg-gray-900/95"
          >
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-theme/20 blur-[100px] rounded-full"></div>
            
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 p-3 bg-text/5 rounded-full hover:bg-theme/20 hover:text-theme transition-all active:scale-90 z-20"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-10 relative z-10">
              <div className="w-20 h-20 bg-theme/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 border border-theme/20 shadow-xl shadow-theme/10 relative group overflow-hidden">
                <Plus className="w-10 h-10 text-theme relative z-10 transition-transform group-hover:rotate-90 duration-500" />
                <div className="absolute inset-0 bg-theme/5 scale-0 group-hover:scale-150 transition-transform duration-700 rounded-full"></div>
              </div>
              <h2 className="text-4xl font-black text-text tracking-tighter">New Transaction</h2>
              <p className="text-[11px] font-black uppercase tracking-[0.4em] text-text/30 mt-2">Neural Ledger Protocol</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              
              <div className="flex p-2 bg-text/5 rounded-[2rem] border border-white/10 shadow-inner">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'expense' })}
                  className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[11px] transition-all duration-300 ${formData.type === 'expense' ? 'bg-white text-rose-500 shadow-xl scale-100' : 'text-text/40 hover:text-text'}`}
                >
                  <ArrowUpRight className="w-5 h-5" /> Expense
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'income' })}
                  className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[11px] transition-all duration-300 ${formData.type === 'income' ? 'bg-white text-green-500 shadow-xl scale-100' : 'text-text/40 hover:text-text'}`}
                >
                  <ArrowDownLeft className="w-5 h-5" /> Income
                </button>
              </div>

              <div className="space-y-5">
                <div className="relative group">
                   <div className="absolute left-6 top-1/2 -translate-y-1/2 text-text/30 group-focus-within:text-theme transition-colors z-10">
                      <FileText className="w-5 h-5" />
                   </div>
                   <input 
                     type="text" 
                     placeholder="Transaction Description"
                     value={formData.description}
                     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                     className="glass-input w-full pl-16 py-5 rounded-2xl text-lg"
                     required
                   />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="relative group">
                     <div className="absolute left-6 top-1/2 -translate-y-1/2 text-text/30 group-focus-within:text-theme transition-colors z-10">
                        <DollarSign className="w-6 h-6" />
                     </div>
                     <input 
                       type="number" 
                       placeholder="0.00"
                       value={formData.amount}
                       onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                       className="glass-input w-full pl-16 py-5 rounded-2xl text-2xl font-mono"
                       required
                     />
                  </div>
                  <div className="relative group">
                     <div className="absolute left-6 top-1/2 -translate-y-1/2 text-text/30 group-focus-within:text-theme transition-colors z-10">
                        <Calendar className="w-6 h-6" />
                     </div>
                     <input 
                       type="date" 
                       value={formData.date}
                       onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                       className="glass-input w-full pl-16 py-5 rounded-2xl text-sm font-bold"
                       required
                     />
                  </div>
                </div>

                <div className="relative group">
                   <div className="absolute left-6 top-1/2 -translate-y-1/2 text-text/30 group-focus-within:text-theme transition-colors z-10">
                      <Tag className="w-6 h-6" />
                   </div>
                   <select 
                     value={formData.category}
                     onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                     className="glass-input w-full pl-16 py-5 rounded-2xl appearance-none cursor-pointer font-bold text-text/80"
                   >
                     {categories.map(cat => (
                       <option key={cat} value={cat} className="bg-background text-text">{cat}</option>
                     ))}
                   </select>
                   <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                      <div className="w-2 h-2 border-r-2 border-b-2 border-text/20 rotate-45"></div>
                   </div>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-6 bg-theme text-white rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-xs shadow-[0_20px_50px_rgba(var(--theme-color),0.4)] hover:scale-[1.03] active:scale-95 transition-all mt-6 GlowingBorder"
              >
                Execute Transaction
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.getElementById('portal-root')
  );
};

export default AddTransactionModal;
