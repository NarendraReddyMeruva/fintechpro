import React from 'react';
import TransactionTable from '../components/TransactionTable';
import { motion } from 'framer-motion';

const Transactions = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-black text-text tracking-tight">Transactions History</h2>
        <p className="text-[10px] font-bold text-text/40 uppercase tracking-[0.4em]">Review and manage your financial activity</p>
      </div>

      <div className="glass-card p-1 border-none bg-white/20 dark:bg-gray-800/10 backdrop-blur-xl">
         <TransactionTable />
      </div>
    </motion.div>
  );
};

export default Transactions;
