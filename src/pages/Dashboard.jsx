import React, { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import SummaryCard from '../components/SummaryCard';
import LineChart from '../components/Charts/LineChart';
import PieChart from '../components/Charts/PieChart';
import TransactionTable from '../components/TransactionTable';
import StockSnapshot from '../components/StockSnapshot';
import FinancialHealth from '../components/FinancialHealth';
import { Sparkles, TrendingUp, Target, Plus, ChevronRight, CreditCard, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const { role, savingsGoals, updateGoal, cards, selectedCardId } = useStore();
  const heroRef = useRef(null);

  const selectedCard = cards.find(c => c.id === selectedCardId) || cards[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.hero-bg', {
        scale: 1.1,
        duration: 30,
        repeat: -1,
        yoyo: true,
        ease: 'none'
      });
    }, heroRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="space-y-10 pb-20">
      
      
      <section className="relative h-64 rounded-[3rem] overflow-hidden flex flex-col justify-center px-12 group GlowingBorder hover:border-theme/20">
        <div className="absolute inset-0 bg-gradient-to-r from-theme to-pink-600 hero-bg origin-center -z-10"></div>
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] transition-all group-hover:backdrop-blur-0 -z-10"></div>
        
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white shadow-xl">
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Real-time Insights</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
            Welcome Home, <span className="opacity-80">Narendra</span>
          </h1>
          <p className="text-white/60 font-black uppercase tracking-[0.4em] text-xs">
            Financial Overview • Current Period
          </p>
        </div>
      </section>

    
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
           <SummaryCard title="Total Net Worth" value={14180} type="income" />
           <SummaryCard title="Monthly Cash In" value={2500} type="income" />
           <SummaryCard title="Monthly Cash Out" value={320} type="expense" />
        </div>
        <div className="lg:col-span-4">
           {/* Active Card Viewer - Simplified as per user request */}
           <div 
             onClick={() => navigate('/cards')}
             className="h-full glass-card p-8 flex flex-col justify-between group cursor-pointer GlowingBorder hover:border-theme/40 relative overflow-hidden"
             style={{ 
               background: selectedCard?.brand === 'Visa' 
                 ? 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' 
                 : 'linear-gradient(135deg, #ea580c 0%, #db2777 100%)'
             }}
           >
              <div className="flex justify-between items-start text-white relative z-10">
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Active Asset</p>
                    <h3 className="text-2xl font-black font-mono tracking-tight">${selectedCard?.balance.toLocaleString()}</h3>
                 </div>
                 <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl">
                    <CreditCard className="w-6 h-6" />
                 </div>
              </div>
              <div className="flex justify-between items-end text-white relative z-10">
                 <p className="text-lg font-black tracking-[0.2em] font-mono opacity-90">{selectedCard?.number}</p>
                 <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </div>
              
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
        <div className="lg:col-span-8 space-y-8">
          <div className="stagger-item">
             <LineChart />
          </div>

          <div className="stagger-item">
            <TransactionTable />
          </div>
        </div>

       
        <div className="lg:col-span-4 space-y-8">
          <div className="stagger-item">
             <StockSnapshot />
          </div>
          
          <div className="stagger-item">
             <FinancialHealth />
          </div>

          <div className="stagger-item">
            <PieChart />
          </div>

         
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="stagger-item glass-card p-10 GlowingBorder hover:border-theme/40 transition-all duration-500 overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-theme/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex justify-between items-center mb-8 relative z-10">
               <div>
                  <h3 className="text-2xl font-black text-text tracking-tight">Wealth Index</h3>
                  <p className="text-[10px] font-black text-text/30 uppercase tracking-widest mt-1">Growth progression</p>
               </div>
               <button className="p-3 bg-theme/10 text-theme rounded-2xl hover:bg-theme hover:text-white transition-all shadow-lg active:scale-95">
                 <Plus className="w-5 h-5" />
               </button>
            </div>

            <div className="space-y-8 relative z-10">
               {savingsGoals.map(goal => (
                 <div key={goal.id} className="space-y-3 group pointer-events-auto">
                    <div className="flex justify-between items-end">
                       <div>
                          <p className="text-[10px] font-black uppercase text-text/40 tracking-[0.2em] mb-1 font-mono">{goal.name}</p>
                          <h4 className="text-xl font-black text-text">${goal.current.toLocaleString()} / <span className="text-text/20">${goal.target.toLocaleString()}</span></h4>
                       </div>
                       <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => updateGoal(goal.id, 100)}
                          className="w-10 h-10 rounded-2xl bg-text/5 border border-white/10 flex items-center justify-center text-text/40 hover:bg-theme/20 hover:text-theme hover:border-theme/20 transition-all pointer-events-auto"
                       >
                          <TrendingUp className="w-5 h-5" />
                       </motion.button>
                    </div>
                    <div className="w-full h-3 bg-text/5 rounded-full overflow-hidden relative border border-white/5">
                       <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(goal.current / goal.target) * 100}%` }}
                          transition={{ duration: 1.5, ease: 'circOut' }}
                          className="h-full bg-gradient-to-r from-theme to-pink-500 relative"
                       >
                          <div className="absolute inset-0 bg-white/20 blur-[4px] -skew-x-12"></div>
                       </motion.div>
                    </div>
                 </div>
               ))}
            </div>
            
            <button className="w-full mt-10 py-5 bg-text/5 border border-dashed border-text/20 rounded-[2.5rem] flex items-center justify-center gap-3 text-text/30 hover:text-theme hover:border-theme/40 hover:bg-theme/5 transition-all group overflow-hidden relative">
               <span className="text-[10px] font-black uppercase tracking-[0.2em] relative z-10">Create New Objective</span>
               <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
               <div className="absolute inset-y-0 left-0 w-0 group-hover:w-full bg-theme/5 transition-all duration-500"></div>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
