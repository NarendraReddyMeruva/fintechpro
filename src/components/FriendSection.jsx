import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, UserPlus, Check, X, Users, MessageSquare } from 'lucide-react';

const FriendSection = () => {
  const { friends, approveFriend } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  const activeFriends = (friends || []).filter(f => f.status === 'active');
  const pendingRequests = (friends || []).filter(f => f.status === 'pending');
  const filteredFriends = activeFriends.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <motion.div 
      whileHover={{ scale: 1.01 }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-8 glass-card p-10 GlowingBorder hover:border-theme/40 transition-all duration-500 overflow-hidden relative group"
    >
      <div className="absolute inset-0 bg-theme/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      
      <div className="lg:col-span-2 space-y-8 relative z-10">
        <h3 className="text-2xl font-black text-text tracking-tight">Friends</h3>
        <div className="relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-text/40 group-focus-within:text-theme transition-colors" />
          <input 
            type="text" 
            placeholder="Search friends by name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-5 glass-card bg-white/50 dark:bg-gray-800/20 border-white/10 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-theme/10 text-lg font-bold text-text transition-all"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
           {filteredFriends.map((friend, idx) => (
             <motion.div
               key={friend.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.1 }}
               className="glass-card p-6 flex items-center justify-between group hover:border-theme/30 transition-all border-white/10 bg-white/40 dark:bg-gray-800/20"
             >
               <div className="flex items-center gap-4">
                  <div className="relative">
                    <img src={friend.avatar} alt={friend.name} className="w-12 h-12 rounded-full border-2 border-theme/20 group-hover:scale-110 transition-transform" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-text">{friend.name}</h4>
                    <p className="text-[10px] font-bold text-text/40 uppercase tracking-widest">Active Now</p>
                  </div>
               </div>
               <div className="flex gap-2">
                 <button className="p-2 bg-theme/10 hover:bg-theme text-theme hover:text-white rounded-xl transition-all">
                    <MessageSquare className="w-4 h-4" />
                 </button>
               </div>
             </motion.div>
           ))}

           {filteredFriends.length === 0 && (
             <div className="col-span-full py-12 glass-card text-center text-text/40 font-black flex flex-col items-center gap-4 opacity-50">
                <Users className="w-12 h-12" />
                <p>No friends found matching your search</p>
             </div>
           )}
        </div>
      </div>

    
      <div className="space-y-6">
        <h3 className="text-xs font-black uppercase text-text/40 tracking-[0.2em] px-4">Pending Requests</h3>
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {pendingRequests.map((request, idx) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50, scale: 0.9 }}
                className="glass-card p-4 flex items-center justify-between border-theme/20 bg-theme/5"
              >
                 <div className="flex items-center gap-3">
                   <img src={request.avatar} alt={request.name} className="w-10 h-10 rounded-full border border-white/20" />
                   <div>
                     <p className="text-xs font-black text-text">{request.name}</p>
                     <p className="text-[10px] text-text/60 font-bold">12 mutual friends</p>
                   </div>
                 </div>
                 <div className="flex gap-2">
                    <button 
                      onClick={() => approveFriend(request.id)}
                      className="p-2 bg-theme text-white rounded-lg shadow-lg shadow-theme/30 hover:scale-110 active:scale-90 transition-all"
                    >
                       <Check className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-pink-500/10 text-pink-500 rounded-lg hover:bg-pink-500 hover:text-white transition-all">
                       <X className="w-4 h-4" />
                    </button>
                 </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {pendingRequests.length === 0 && (
             <div className="p-12 glass-card text-center border-dashed border-2 border-text/10 bg-transparent opacity-30">
                <p className="text-[10px] font-black uppercase tracking-widest text-text">No New Requests</p>
             </div>
          )}
        </div>

       
        <div className="p-6 rounded-[2rem] bg-gradient-to-tr from-theme to-pink-500 text-white shadow-2xl relative overflow-hidden group">
           <div className="relative z-10 space-y-4">
              <h4 className="text-xl font-black">Invite Friends</h4>
              <p className="text-xs font-medium opacity-80 leading-relaxed">Grow your network and track combined spending with your closest circle.</p>
              <button className="w-full py-4 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-theme transition-all flex items-center justify-center gap-2">
                 <UserPlus className="w-4 h-4" />
                 Send Invite
              </button>
           </div>
           
           <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-white/10 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700"></div>
        </div>
      </div>

    </motion.div>
  );
};

export default FriendSection;
