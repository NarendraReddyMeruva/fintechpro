import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { BarChart3, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft, ArrowRight } from 'lucide-react';

const StockSnapshot = () => {
  const navigate = useNavigate();
  const { stocks, searchTerm } = useStore();
  
  
  const stockList = Array.isArray(stocks) ? stocks : [];
  
  
  const filteredStocks = stockList.filter(s => {
    const search = (searchTerm || '').toLowerCase();
    if (!search) return true;
    return s.symbol?.toLowerCase().includes(search) || s.name?.toLowerCase().includes(search);
  });

  if (!stockList.length) return null; 
  return (
    <motion.div 
      whileHover={{ scale: 1.01 }}
      className="glass-card p-10 GlowingBorder hover:border-theme/40 transition-all duration-500 overflow-hidden relative group"
    >
       <div className="absolute inset-0 bg-theme/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
       <div className="absolute top-0 right-0 w-32 h-32 bg-theme/5 blur-3xl -mr-16 -mt-16 group-hover:bg-theme/10 transition-all"></div>
       
       <div className="flex justify-between items-center mb-8 relative z-10">
          <div>
             <h3 className="text-2xl font-black text-text tracking-tight">Market Pulse</h3>
             <p className="text-[10px] font-black text-text/30 uppercase tracking-[0.3em] mt-1">Portfolio Snapshot</p>
          </div>
          <div className="p-3 bg-theme/10 text-theme rounded-2xl">
             <BarChart3 className="w-6 h-6" />
          </div>
       </div>

        <div className="grid grid-cols-2 gap-4 relative z-10">
           {filteredStocks.length > 0 ? (
             filteredStocks.slice(0, 4).map((stock) => (
               <div key={stock.symbol} className="p-4 bg-text/[1.5%] border border-text/5 rounded-[1.5rem] hover:bg-text/[3%] transition-colors group">
                  <div className="flex justify-between items-start mb-2">
                     <span className="text-sm font-black text-text">{stock.symbol || '???'}</span>
                     {(stock.change || 0) >= 0 ? <ArrowUpRight className="w-3 h-3 text-green-500" /> : <ArrowDownLeft className="w-3 h-3 text-red-500" />}
                  </div>
                  <div className="flex justify-between items-end">
                     <p className="text-lg font-black font-mono tracking-tight text-text/80">${(stock.price || 0).toFixed(0)}</p>
                     <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded-lg ${(stock.change || 0) >= 0 ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}>
                       {(stock.change || 0) >= 0 ? '+' : ''}{stock.change || 0}%
                     </span>
                  </div>
               </div>
             ))
           ) : (
             <div className="col-span-2 py-8 text-center bg-text/5 rounded-2xl border border-dashed border-text/10">
                <p className="text-[10px] font-black uppercase text-text/20 tracking-widest">No securities found</p>
             </div>
           )}
        </div>

       <button 
         onClick={() => navigate('/investments')}
         className="w-full mt-6 py-4 bg-text/5 border border-dashed border-text/20 rounded-2xl flex items-center justify-center gap-2 text-text/30 hover:text-theme hover:border-theme/40 hover:bg-theme/5 transition-all text-[10px] font-black uppercase tracking-widest group/btn"
       >
          <span className="relative z-10">View Portfolio Portal</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
       </button>
    </motion.div>
  );
};

export default StockSnapshot;
