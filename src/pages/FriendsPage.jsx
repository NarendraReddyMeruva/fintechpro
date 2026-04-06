import React from 'react';
import FriendSection from '../components/FriendSection';
import { motion } from 'framer-motion';

const FriendsPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-10"
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-black text-text tracking-tight">Social Network</h2>
        <p className="text-[10px] font-bold text-text/40 uppercase tracking-[0.4em]">Connect and share financial insights with your circle</p>
      </div>

      <FriendSection />
      
    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
         <div className="glass-card p-8 border-none bg-gradient-to-br from-theme/5 to-pink-500/5">
            <h4 className="text-lg font-black text-text mb-4">Community Milestone</h4>
            <p className="text-sm font-medium text-text/60 leading-relaxed">Your friend group has collectively saved $12,400 this month. You are currently ranked #1 in saving efficiency!</p>
            <div className="mt-6 flex -space-x-4 overflow-hidden">
               <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-gray-800" src="https://i.pravatar.cc/100?u=1" alt="" />
               <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-gray-800" src="https://i.pravatar.cc/100?u=2" alt="" />
               <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-gray-800" src="https://i.pravatar.cc/100?u=3" alt="" />
               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-theme text-white border-2 border-white dark:border-gray-800 text-[10px] font-bold">+12</div>
            </div>
         </div>

         <div className="glass-card p-8 border-none bg-theme/5 border-theme/10">
            <h4 className="text-lg font-black text-text mb-4">Request Dashboard Access</h4>
            <p className="text-sm font-medium text-text/60 mb-6 font-mono leading-relaxed uppercase tracking-tighter">Securely share your real-time financial stats with authorized friends for collaborative budgeting. Highly encrypted.</p>
            <button className="w-full py-4 border-2 border-theme text-theme rounded-2xl font-black text-xs hover:bg-theme hover:text-white transition-all uppercase tracking-widest">Manage Privacy Settings</button>
         </div>
      </div>
    </motion.div>
  );
};

export default FriendsPage;
