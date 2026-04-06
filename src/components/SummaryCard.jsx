import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const SummaryCard = ({ title, value, type }) => {
  const Icon = type === 'income' ? TrendingUp : type === 'expense' ? TrendingDown : DollarSign;
  const colorClass = type === 'income' ? 'text-green-500' : type === 'expense' ? 'text-rose-500' : 'text-theme';
  const bgClass = type === 'income' ? 'bg-green-500/10' : type === 'expense' ? 'bg-rose-500/10' : 'bg-theme/10';

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/5 p-6 rounded-3xl flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 min-h-[160px] GlowingBorder relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-theme/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="flex justify-between items-start relative z-10">
        <div className="space-y-1">
          <p className="text-[10px] font-black text-text/40 uppercase tracking-[0.2em]">{title}</p>
          <h3 className="text-3xl font-black text-text font-mono tracking-tighter">
            ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h3>
        </div>
        <div className={`p-2.5 rounded-xl ${bgClass}`}>
          <Icon className={`w-5 h-5 ${colorClass}`} />
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 relative z-10">
        <div className={`flex items-center gap-1 font-black text-[10px] ${colorClass}`}>
           <Icon className="w-3 h-3" />
           <span>12.5%</span>
        </div>
        <span className="text-[10px] text-text/30 font-black uppercase tracking-widest">Since last month</span>
      </div>
    </motion.div>
  );
};

export default SummaryCard;
