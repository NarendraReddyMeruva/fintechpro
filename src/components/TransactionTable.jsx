import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Filter, ArrowUpRight, ArrowDownLeft, Trash2, Plus, ArrowLeftRight, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AddTransactionModal from './AddTransactionModal';

const TransactionTable = () => {
  const { transactions, deleteTransaction, role, selectedCardId, setSelectedCardId, cards, searchTerm } = useStore();
  const [filterType, setFilterType] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredTransactions = (transactions || []).filter(tx => {
    const matchesCard = !selectedCardId || tx.cardId === selectedCardId;
    const desc = tx.description?.toLowerCase() || '';
    const cat = tx.category?.toLowerCase() || '';
    const search = (searchTerm || '').toLowerCase();
    const matchesSearch = !search || desc.includes(search) || cat.includes(search);
    const matchesType = filterType === 'all' || tx.type === filterType;
    return matchesCard && matchesSearch && matchesType;
  });

  const getCardInfo = (cardId) => {
    const card = (cards || []).find(c => c.id === cardId);
    if (!card) return { last4: '????', brand: 'Unknown' };
    const last4 = card.number?.split(' ').pop() || '????';
    return { last4, brand: card.brand };
  };

  const displayLabel = selectedCardId
    ? (cards || []).find(c => c.id === selectedCardId)?.number || selectedCardId
    : 'All Cards';

  return (
    <motion.div
      whileHover={{ scale: 1.005 }}
      className="w-full glass-card p-4 md:p-10 GlowingBorder hover:border-theme/40 transition-all duration-500 overflow-visible relative group border-none"
    >
      <div className="absolute inset-0 bg-theme/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[inherit] pointer-events-none"></div>

     
      <div className="flex flex-col gap-4 mb-8 relative z-10">

        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-black text-text tracking-tight">Recent Ledger</h3>
            <p className="text-[10px] font-black uppercase text-theme tracking-widest mt-1">
              Showing {filteredTransactions.length} logs for {displayLabel}
            </p>
          </div>
          {role === 'admin' && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-theme text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-theme/20 hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          )}
        </div>

        
        <div className="flex flex-wrap items-center gap-2 w-full">

          
          <div className="flex md:hidden items-center gap-1.5 px-3 py-1.5 bg-theme/10 text-theme rounded-full text-[8px] font-black uppercase tracking-widest animate-pulse">
            <ArrowLeftRight className="w-3 h-3" /> Swipe
          </div>

          
          <select
            value={selectedCardId || ''}
            onChange={(e) => setSelectedCardId(e.target.value || null)}
            className="flex-1 min-w-0 px-3 py-2.5 bg-text/5 border border-white/10 rounded-2xl focus:outline-none text-[11px] font-black uppercase tracking-widest text-text/60 cursor-pointer"
          >
            <option value="">All Cards</option>
            {(cards || []).map(card => (
              <option key={card.id} value={card.id}>
                {card.brand} ···· {card.number?.split(' ').pop()}
              </option>
            ))}
          </select>

          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="flex-1 min-w-0 px-3 py-2.5 bg-text/5 border border-white/10 rounded-2xl focus:outline-none text-[11px] font-black uppercase tracking-widest text-text/60 cursor-pointer"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

         
          {(searchTerm || '').trim() && (
            <div className="flex items-center gap-2 px-3 py-2 bg-theme/10 text-theme rounded-full border border-theme/20 whitespace-nowrap">
              <div className="w-2 h-2 bg-theme rounded-full animate-pulse flex-shrink-0"></div>
              <span className="text-[10px] font-black uppercase tracking-widest truncate max-w-[100px]">{searchTerm}</span>
            </div>
          )}
        </div>
      </div>

      
      <div
        className="w-full max-w-full overflow-x-auto pb-6 custom-scrollbar scroll-smooth"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <table className="w-full min-w-[1100px] text-left border-separate border-spacing-y-4 table-auto">
          <thead>
            <tr className="text-[10px] font-black uppercase text-text/30 tracking-[0.2em] whitespace-nowrap">
              <th className="pb-2 pl-4 pr-10">Transaction</th>
              <th className="pb-2 pr-10">Category</th>
              <th className="pb-2 pr-10">Card</th>
              <th className="pb-2 pr-10">Date</th>
              <th className="pb-2 pr-10">Amount</th>
              {role === 'admin' && <th className="pb-2 text-right pr-4">Action</th>}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filteredTransactions.map((tx) => {
                const { last4, brand } = getCardInfo(tx.cardId);
                return (
                  <motion.tr
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    key={tx.id}
                    className="group hover:bg-theme/5 transition-all duration-300"
                  >
                    
                    <td className="py-5 pl-4 rounded-l-3xl bg-white/20 dark:bg-gray-800/40 border-y border-l border-white/10 whitespace-nowrap pr-10">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-2xl ${tx.type === 'income' ? 'bg-green-500/10 text-green-500' : 'bg-pink-500/10 text-pink-500'}`}>
                          {tx.type === 'income' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="font-black text-text tracking-tight">{tx.description}</p>
                          <p className="text-[10px] font-bold text-text/30 uppercase tracking-widest">ID: #{tx.id}</p>
                        </div>
                      </div>
                    </td>

                    
                    <td className="py-5 bg-white/20 dark:bg-gray-800/40 border-y border-white/10 whitespace-nowrap pr-10">
                      <span className="px-3 py-1.5 bg-text/5 rounded-full text-[10px] font-black uppercase tracking-widest text-text/60">
                        {tx.category}
                      </span>
                    </td>

                    
                    <td className="py-5 bg-white/20 dark:bg-gray-800/40 border-y border-white/10 whitespace-nowrap pr-10">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-xl bg-theme/10 text-theme">
                          <CreditCard className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="text-[11px] font-black text-text/80 tracking-widest font-mono">···· {last4}</p>
                          <p className="text-[9px] font-bold text-text/30 uppercase tracking-widest">{brand}</p>
                        </div>
                      </div>
                    </td>

                   
                    <td className="py-5 bg-white/20 dark:bg-gray-800/40 border-y border-white/10 text-sm font-bold text-text/40 font-mono whitespace-nowrap pr-10">
                      {tx.date}
                    </td>

                    
                    <td className={`py-5 bg-white/20 dark:bg-gray-800/40 border-y border-white/10 text-lg font-black font-mono whitespace-nowrap pr-10 ${tx.type === 'income' ? 'text-green-500' : 'text-pink-500'}`}>
                      {tx.type === 'income' ? '+' : '-'}${Math.abs(tx.amount).toLocaleString()}
                    </td>

                    {/* Action */}
                    {role === 'admin' && (
                      <td className="py-5 pr-4 rounded-r-3xl bg-white/20 dark:bg-gray-800/40 border-y border-r border-white/10 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteTransaction(tx.id);
                          }}
                          className="p-3 text-text/20 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all relative z-20"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    )}
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>

        {filteredTransactions.length === 0 && (
          <div className="py-20 text-center space-y-4">
            <div className="w-20 h-20 bg-text/5 rounded-[2rem] flex items-center justify-center mx-auto opacity-20">
              <Filter className="w-10 h-10" />
            </div>
            <p className="text-sm font-black text-text/20 uppercase tracking-[0.3em]">No logs found for this filter</p>
          </div>
        )}
      </div>

      <AddTransactionModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </motion.div>
  );
};

export default TransactionTable;