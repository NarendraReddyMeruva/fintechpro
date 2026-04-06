import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { Lightbulb, TrendingUp, TrendingDown, Target, BrainCircuit, Wallet } from 'lucide-react';

const InsightCard = ({ icon: Icon, title, desc, color, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ delay: index * 0.15 }}
    className="glass-card p-8 group hover:border-theme/30 hover:shadow-2xl transition-all duration-500 overflow-hidden relative"
  >
    <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-lg`}>
       <Icon className="w-8 h-8 text-white" />
    </div>
    <h3 className="text-xl font-black text-text mb-2">{title}</h3>
    <p className="text-sm font-medium text-text/50 leading-relaxed">{desc}</p>

    {/* Backdrop number */}
    <div className="absolute -bottom-4 -right-2 text-8xl font-black text-text/5 opacity-10 select-none group-hover:translate-y-4 group-hover:opacity-20 transition-all">0{index + 1}</div>
  </motion.div>
);

const InsightsPage = () => {
  const transactions = useStore(state => state.transactions) || [];
  const stocks = useStore(state => state.stocks) || [];
  const savingsGoals = useStore(state => state.savingsGoals) || [];
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleExport = () => {
    try {
      const reportData = {
        timestamp: new Date().toLocaleString(),
        wealthScore: 84,
        portfolioValue: stocks.reduce((acc, s) => acc + ((s.quantity || 0) * (s.price || 0)), 0),
        topGoals: savingsGoals.map(g => `${g.name || 'Goal'}: $${g.current || 0}/$${g.target || 0}`),
        recentTransactions: transactions.slice(0, 10).map(t => `${t.date}: ${t.description} (${t.amount})`)
      };

      const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `FintechPro_Report_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error("Export Error:", e);
      alert("Failed to generate report. Please check your data.");
    }
  };

  const filteredTx = transactions.filter(t => 
    (t.description || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
    (t.category || '').toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 5);

  const insights = [
    { 
      icon: TrendingUp, 
      title: "Saving Potential", 
      desc: "By reducing dining out spending by 15%, you could save an additional $450 this quarter.",
      color: "bg-blue-500" 
    },
    { 
      icon: Target, 
      title: "Investment Outlook", 
      desc: "Your current portfolio is diversified, but consider rebalancing towards sustainability-focused ETFs.",
      color: "bg-theme" 
    },
    { 
      icon: BrainCircuit, 
      title: "Smart Budgeting", 
      desc: "Ai-Insights suggest a recurring expense for 'Streaming Services' has increased. Consider canceling unused subs.",
      color: "bg-pink-500" 
    },
    { 
      icon: Wallet, 
      title: "Wealth Score", 
      desc: "Your financial health score is 84/100, placing you in the top 10% of users in your age group.",
      color: "bg-emerald-500" 
    }
  ];

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="max-w-2xl space-y-4">
          <div className="flex items-center gap-3">
            <Lightbulb className="w-8 h-8 text-yellow-500 animate-pulse" />
            <h2 className="text-4xl font-black text-text tracking-tighter">Intelligent Insights</h2>
          </div>
          <p className="text-base font-medium text-text/60 leading-relaxed">
            Our advanced algorithms analyze your spending patterns across all connected cards to deliver personalized advice for your financial growth.
          </p>
        </div>
        
        {/* Quick Transaction Search */}
        <div className="w-full md:w-80 glass-card p-6 space-y-4 border-theme/20 bg-theme/5">
           <div className="flex items-center gap-2 text-theme mb-2">
              <BrainCircuit className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Rapid Search</span>
           </div>
           <input 
             type="text"
             placeholder="Search transactions..."
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="glass-input w-full py-2.5 text-xs"
           />
           <div className="space-y-2">
              {filteredTx.map(tx => (
                <div key={tx.id} className="flex justify-between items-center text-[10px] font-bold text-text/60 border-b border-white/5 pb-1">
                   <span>{tx.description}</span>
                   <span className={tx.amount > 0 ? 'text-green-500' : 'text-pink-500'}>${tx.amount}</span>
                </div>
              ))}
              {searchTerm && filteredTx.length === 0 && <p className="text-[9px] text-text/30 italic text-center">No matches found</p>}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {insights.map((ins, i) => <InsightCard key={i} {...ins} index={i} />)}
      </div>

      <div className="glass-card p-10 bg-gradient-to-br from-theme/5 to-pink-500/5 relative overflow-hidden GlowingBorder">
         <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
            <div className="md:col-span-2 space-y-4">
               <h4 className="text-2xl font-black text-text tracking-tight">Monthly Growth Summary</h4>
               <p className="text-sm font-medium text-text/60 leading-relaxed">Your net worth has increased by 4.2% compared to last month, primarily due to disciplined expense management and strong market performance.</p>
               <button 
                onClick={handleExport}
                className="px-8 py-4 bg-theme text-white rounded-[2rem] font-black uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all shadow-xl neon-glow flex items-center gap-3"
               >
                 Export Detailed Report
               </button>
            </div>
            <div className="flex flex-col items-center justify-center p-8 glass-card border-none bg-theme/10 rounded-[3rem]">
               <span className="text-[10px] font-black uppercase text-theme tracking-widest text-center mb-1">Health Score</span>
               <span className="text-6xl font-black text-theme">84</span>
            </div>
         </div>
         {/* Backdrop lines */}
         <div className="absolute inset-0 opacity-5 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
               <path d="M0 80 Q 25 20 50 80 T 100 80" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
         </div>
      </div>
    </div>
  );
};

export default InsightsPage;
