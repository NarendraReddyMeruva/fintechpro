import React from 'react';
import { useStore } from '../store/useStore';
import { Shield, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const RoleToggle = () => {
  const { role, setRole } = useStore();

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text/40">
        {role}
      </span>
      <div 
        onClick={() => setRole(role === 'admin' ? 'viewer' : 'admin')}
        className={`relative w-14 h-7 rounded-full cursor-pointer transition-colors duration-300 flex items-center p-1 ${
          role === 'admin' ? 'bg-theme' : 'bg-gray-300 dark:bg-gray-700'
        }`}
      >
        <motion.div
          animate={{ x: role === 'admin' ? 28 : 0 }}
          className="w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center"
        >
          {role === 'admin' ? (
            <Shield className="w-3 h-3 text-theme" />
          ) : (
            <Eye className="w-3 h-3 text-gray-400" />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default RoleToggle;
