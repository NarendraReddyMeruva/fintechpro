import React, { useMemo } from 'react';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowRight, 
  Activity, 
  Globe,
  DollarSign,
  Briefcase
} from 'lucide-react';

const PortfolioPortal = () => {
  
  const stocks = useStore(state => state.stocks) || [];
  const stockPredictions = useStore(state => state.stockPredictions) || [];
  const themeColor = useStore(state => state.themeColor) || '#2563eb';

  
  const { totalInvestment, currentValuation, totalPnL, pnlPercent } = useMemo(() => {

    const stockList = Array.isArray(stocks) ? stocks : [];
    
    try {
      const inv = stockList.reduce((acc, stock) => acc + ((stock.quantity || 0) * (stock.avgPrice || 0)), 0);
      const val = stockList.reduce((acc, stock) => acc + ((stock.quantity || 0) * (stock.price || 0)), 0);
      const pnl = val - inv;
      const pct = inv > 0 ? (pnl / inv) * 100 : 0;
      return { totalInvestment: inv, currentValuation: val, totalPnL: pnl, pnlPercent: pct };
    } catch (e) {
      console.error("Investment Calculation Error:", e);
      return { totalInvestment: 0, currentValuation: 0, totalPnL: 0, pnlPercent: 0 };
    }
  }, [stocks]);

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-700">
      
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
        <div>
           <h1 className="text-5xl font-black text-text tracking-tighter">Investment Portal</h1>
           <p className="text-sm font-black uppercase tracking-[0.4em] text-text/40 mt-2">AI-Driven Portfolio Engine</p>
        </div>
        
        <div className="flex gap-8 items-center bg-theme/5 p-8 rounded-[3rem] border border-theme/20 shadow-xl overflow-hidden relative group">
           <div className="absolute inset-0 bg-theme/5 blur-3xl pointer-events-none group-hover:bg-theme/10 transition-all"></div>
           <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-text/40 mb-1">Portfolio Value</p>
              <h2 className="text-4xl font-black text-text font-mono tracking-tighter">
                ${(currentValuation || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </h2>
           </div>
           <div className="w-px h-12 bg-text/10 mx-4 hidden md:block"></div>
           <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-text/40 mb-1">Unrealized P&L</p>
              <div className={`flex items-center gap-2 text-2xl font-black font-mono ${totalPnL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                 {totalPnL >= 0 ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />}
                 ${Math.abs(totalPnL || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })} 
                 <span className="text-xs ml-1 opacity-60">({(pnlPercent || 0).toFixed(2)}%)</span>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        
        <div className="lg:col-span-8 glass-card p-10 overflow-hidden GlowingBorder relative">
           <div className="flex justify-between items-center mb-10">
              <div>
                 <h3 className="text-2xl font-black text-text tracking-tight">Active Holdings</h3>
                 <p className="text-[10px] font-black text-text/30 uppercase tracking-[0.2em] mt-1">Real-time Performance</p>
              </div>
              <button className="flex items-center gap-2 text-theme font-black uppercase tracking-widest text-[10px] hover:translate-x-1 transition-transform">
                 Market Explorer <ArrowRight className="w-4 h-4" />
              </button>
           </div>

           <div className="overflow-x-auto no-scrollbar">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="border-b border-text/5">
                   <th className="pb-6 text-[10px] font-black uppercase tracking-[0.2em] text-text/40">Asset</th>
                   <th className="pb-6 text-[10px] font-black uppercase tracking-[0.2em] text-text/40 text-right">Qty</th>
                   <th className="pb-6 text-[10px] font-black uppercase tracking-[0.2em] text-text/40 text-right">Price</th>
                   <th className="pb-6 text-[10px] font-black uppercase tracking-[0.2em] text-text/40 text-right">Daily %</th>
                   <th className="pb-6 text-[10px] font-black uppercase tracking-[0.2em] text-text/40 text-right">Total P&L</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-text/[0.03]">
                 {stocks.map((stock) => {
                   const sPrice = stock.price || 0;
                   const sAvg = stock.avgPrice || 0;
                   const sQty = stock.quantity || 0;
                   const stockPnL = (sPrice - sAvg) * sQty;
                   return (
                     <tr key={stock.symbol} className="group hover:bg-text/[1.5%] transition-colors">
                       <td className="py-6 pr-4">
                         <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black ${stockPnL >= 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                               {(stock.symbol || 'S').charAt(0)}
                            </div>
                            <div>
                               <p className="text-sm font-black text-text tracking-tight">{stock.name || 'Stock'}</p>
                               <span className="text-[9px] font-bold text-text/30 uppercase tracking-[0.2em]">{stock.symbol}</span>
                            </div>
                         </div>
                       </td>
                       <td className="py-6 text-right font-black text-sm text-text/80">{sQty}</td>
                       <td className="py-6 text-right font-black font-mono text-sm text-text/80">${sPrice.toFixed(2)}</td>
                       <td className="py-6 text-right font-black font-mono">
                          <span className={`${(stock.change || 0) >= 0 ? 'text-green-500' : 'text-red-500'} text-[10px] bg-current/10 px-2 py-1 rounded-lg`}>
                            {(stock.change || 0) >= 0 ? '+' : ''}{stock.change || 0}%
                          </span>
                       </td>
                       <td className="py-6 text-right font-black font-mono">
                          <p className={`text-sm ${stockPnL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                             {stockPnL >= 0 ? '+' : '-'}${Math.abs(stockPnL).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </p>
                       </td>
                     </tr>
                   );
                 })}
               </tbody>
             </table>
             {!stocks.length && (
                <div className="py-20 text-center text-text/20 font-black uppercase tracking-[0.5em]">No Assets Found</div>
             )}
           </div>
        </div>

       
        <div className="lg:col-span-4 space-y-8">
           <div className="glass-card p-10 bg-theme/5 border-theme/20 shadow-xl overflow-hidden relative group GlowingBorder">
              <div className="absolute top-0 right-0 w-40 h-40 bg-theme/10 blur-3xl -mr-10 -mt-10 animate-pulse-slow"></div>
              <div className="flex items-center gap-3 mb-10 text-theme">
                 <Globe className="w-6 h-6 animate-spin-slow" />
                 <h3 className="text-2xl font-black text-text tracking-tight">AI Predictions</h3>
              </div>

              <div className="space-y-6 relative z-10">
                  {stockPredictions.slice(0, 5).map((prediction) => (
                    <div key={prediction.symbol} className="p-6 bg-white/95 dark:bg-gray-900/80 rounded-3xl border border-white/20 dark:border-white/5 transition-all hover:scale-[1.02] shadow-sm relative overflow-hidden group/card">
                       <div className="absolute inset-0 bg-theme/5 opacity-0 group-hover/card:opacity-100 transition-opacity pointer-events-none"></div>
                       <div className="flex justify-between items-start mb-4 relative z-10">
                          <div className="flex items-center gap-3">
                             <span className="w-10 h-10 bg-theme text-white rounded-xl flex items-center justify-center font-black text-xs shadow-lg shadow-theme/20">{prediction.symbol}</span>
                             <div>
                                <p className="text-[9px] font-black uppercase text-text/60 tracking-widest">Confidence</p>
                                <span className="text-xs font-black text-text">{prediction.confidence}%</span>
                             </div>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-sm ${prediction.outlook === 'Bullish' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'}`}>
                             {prediction.outlook}
                          </div>
                       </div>
                       <p className="text-sm font-bold text-text leading-relaxed italic relative z-10">
                         "{prediction.advice}"
                       </p>
                    </div>
                  ))}
                 
                 <button className="w-full py-5 border border-dashed border-theme/30 rounded-3xl flex items-center justify-center gap-3 text-theme/60 hover:text-theme hover:bg-theme/5 transition-all group overflow-hidden relative">
                    <span className="text-[10px] font-black uppercase tracking-widest relative z-10">Scout New Opportunities</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
                 </button>
              </div>
           </div>

          
           <div className="glass-card p-10 GlowingBorder">
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-3 text-text">
                    <Activity className="w-6 h-6 text-theme" />
                    <h3 className="text-xl font-black tracking-tight">Portfolio Health</h3>
                 </div>
              </div>

              <div className="space-y-8">
                 <div>
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-3 text-text/40">
                       <span>Market Exposure</span>
                       <span className="text-theme">Balanced</span>
                    </div>
                    <div className="w-full h-2.5 bg-text/5 rounded-full overflow-hidden border border-white/5">
                       <motion.div initial={{ width: 0 }} animate={{ width: '65%' }} className="h-full bg-gradient-to-r from-theme to-theme/60"></motion.div>
                    </div>
                 </div>
                 <div>
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-3 text-text/40">
                       <span>Risk Index</span>
                       <span className="text-pink-500">Moderate</span>
                    </div>
                    <div className="w-full h-2.5 bg-text/5 rounded-full overflow-hidden border border-white/5">
                       <motion.div initial={{ width: 0 }} animate={{ width: '42%' }} className="h-full bg-gradient-to-r from-pink-500 to-theme"></motion.div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPortal;
