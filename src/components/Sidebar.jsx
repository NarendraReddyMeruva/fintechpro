import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart3, 
  Wallet, 
  ArrowLeftRight, 
  Users, 
  TrendingUp, 
  Menu, 
  X,
  CreditCard,
  LogOut,
  Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';

const Sidebar = () => {
  const { role, authenticatedAdmin, setRole, setAuthenticatedAdmin } = useStore();
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { name: 'Dashboard', path: '/', icon: BarChart3 },
    { name: 'Transactions', path: '/transactions', icon: ArrowLeftRight },
    { name: 'Insights', path: '/insights', icon: TrendingUp },
    { name: 'Wallet', path: '/cards', icon: CreditCard },
    { name: 'Portfolio', path: '/investments', icon: Wallet },
    { name: 'Friends', path: '/friends', icon: Users },
  ];

  const handleLogout = () => {
    setRole('viewer');
    setAuthenticatedAdmin(false);
    setIsOpen(false);
  };

  if (!mounted) return null;

  return (
    <>
     
      <div className="fixed bottom-8 right-8 z-[200] lg:hidden">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-5 bg-theme text-white rounded-full shadow-[0_20px_50px_rgba(37,99,235,0.5)] hover:scale-110 active:scale-95 transition-all backdrop-blur-xl border-4 border-white/20"
        >
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

     
      <motion.aside 
        initial={false}
        animate={{ x: isOpen || window.innerWidth >= 768 ? 0 : '-100%' }}
        className="fixed top-0 left-0 h-screen w-72 glass-card border-none rounded-none z-50 overflow-y-auto lg:translate-x-0 lg:static dark:bg-gray-900 shadow-2xl"
      >
        <div className="flex flex-col h-full p-8">
          
          <div className="flex items-center gap-3 mb-14 px-2">
            <div className="w-12 h-12 rounded-[1.25rem] bg-gradient-to-tr from-theme to-pink-500 flex items-center justify-center shadow-xl shadow-theme/20 transform rotate-6 border-2 border-white/20">
              <Wallet className="text-white w-7 h-7" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-black tracking-tighter bg-gradient-to-r from-theme to-pink-500 bg-clip-text text-transparent">
                FINTECH<span className="text-text">PRO</span>
              </h1>
              <p className="text-[9px] font-black uppercase text-text/30 tracking-[0.3em] font-mono">Premium System</p>
            </div>
          </div>

          <div className="flex-1 space-y-3">
            <p className="text-[10px] font-black uppercase text-text/20 tracking-[0.2em] mb-4 px-4 font-mono">Main Menu</p>
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => window.innerWidth < 768 && setIsOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group relative
                  ${isActive 
                    ? 'bg-gradient-to-r from-theme to-theme/80 text-white shadow-xl shadow-theme/20' 
                    : 'text-text/50 hover:bg-theme/10 hover:text-theme'}
                `}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-bold text-sm tracking-tight">{item.name}</span>
              </NavLink>
            ))}
          </div>

          <div className="mt-auto space-y-4 pt-10">
             <div className="p-6 glass-card border-theme/10 bg-theme/5 relative overflow-hidden group">
                <div className="flex items-center gap-2 mb-2">
                   <Target className="w-4 h-4 text-theme" />
                   <p className="text-[10px] font-black text-theme uppercase tracking-widest">Savings Goal</p>
                </div>
                <h3 className="text-xl font-black text-text mb-2">$12,500.00</h3>
                <div className="w-full h-1.5 bg-text/5 rounded-full overflow-hidden">
                   <div 
                      className="h-full bg-theme w-3/4 rounded-full shadow-lg" 
                      style={{ boxShadow: '0 0 10px rgb(var(--theme-color) / 0.5)' }}
                   ></div>
                </div>
             </div>

            {authenticatedAdmin && (
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-pink-500/10 text-pink-500 rounded-2xl font-black uppercase tracking-widest hover:bg-pink-500 hover:text-white transition-all shadow-lg active:scale-95"
              >
                <LogOut className="w-5 h-5" />
                Logout Admin
              </button>
            )}
          </div>

        </div>
      </motion.aside>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
