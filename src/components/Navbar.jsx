import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Search, Bell, Menu, Sun, Moon, Palette, User, ChevronDown, Shield, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const { mode, toggleMode, themeColor, setThemeColor, role, authenticatedAdmin, searchTerm, setSearchTerm } = useStore();
  const [showPalette, setShowPalette] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const paletteRef = useRef(null);

  const colors = [
    { name: 'Blue',    hex: '#2563eb' },
    { name: 'Pink',    hex: '#db2777' },
    { name: 'Orange',  hex: '#ea580c' },
    { name: 'Purple',  hex: '#7c3aed' },
    { name: 'Cyan',    hex: '#0891b2' },
    { name: 'Emerald', hex: '#059669' },
  ];

  
  useEffect(() => {
    if (!showPalette) return;
    const handler = (e) => {
      if (paletteRef.current && !paletteRef.current.contains(e.target)) {
        setShowPalette(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showPalette]);

  return (
    <nav className="sticky top-4 left-0 right-0 z-40 mx-4 md:mx-10 mt-4 rounded-[2rem] glass-card border-white/10 dark:bg-gray-900/60 p-3 h-20 flex items-center shadow-2xl backdrop-blur-3xl overflow-visible">
      
    
      <div className={`flex items-center gap-3 px-4 md:px-6 h-full transition-all duration-500 ease-in-out ${isSearchOpen ? 'w-full absolute inset-0 z-50 bg-background/95 rounded-[2rem] px-8' : 'w-auto md:max-w-md md:flex-1 bg-text/[0.03] shadow-inner rounded-2xl mx-1 md:mx-2 border-r border-white/10 group'}`}>
        <button
          onClick={() => window.innerWidth < 768 && setIsSearchOpen(!isSearchOpen)}
          className="p-2 text-text/60 hover:text-theme flex-shrink-0"
        >
          <Search className="w-5 h-5 transition-colors group-focus-within:text-theme" />
        </button>

        <input
          type="text"
          placeholder="Search insights..."
          value={searchTerm || ''}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`bg-transparent border-none focus:outline-none text-sm text-text placeholder:text-text/60 font-black transition-all ${isSearchOpen ? 'block w-full opacity-100' : 'hidden md:block w-32 focus:w-full opacity-0 md:opacity-100'}`}
        />

        {(isSearchOpen || searchTerm) && (
          <button
            onClick={() => {
              setSearchTerm('');
              if (isSearchOpen && !searchTerm) setIsSearchOpen(false);
            }}
            className="p-2 text-text/40 hover:text-pink-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className={`flex-1 h-full px-2 md:px-6 flex items-center justify-end gap-2 md:gap-8 min-w-0 transition-opacity ${isSearchOpen ? 'opacity-0 md:opacity-100 pointer-events-none md:pointer-events-auto' : 'opacity-100'}`}>

        
        <div className="flex items-center gap-2 p-1.5 bg-text/5 rounded-2xl relative" ref={paletteRef}>
          <button
            onClick={toggleMode}
            className="p-2.5 rounded-xl hover:bg-white/10 transition-all text-text/60 hover:text-theme"
          >
            {mode === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setShowPalette(!showPalette)}
            className="p-2.5 rounded-xl transition-all shadow-lg active:scale-95"
            style={{ backgroundColor: `rgb(var(--theme-color) / 1)` }}
          >
            <Palette className="w-5 h-5 text-white" />
          </button>

         
          <AnimatePresence>
            {showPalette && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
              
                className="absolute top-full left-0 mt-4 p-4 glass-card shadow-2xl z-[999] border-white/20 bg-white/95 dark:bg-gray-900/95 flex flex-wrap gap-3 justify-center rounded-[2rem] overflow-hidden"
                style={{ minWidth: 200, maxWidth: 'calc(100vw - 2rem)' }}
              >
                <div className="w-full pb-3 border-b border-text/5 mb-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text/40 text-center">Select Accent Color</p>
                </div>
                {colors.map((c) => (
                  <motion.button
                    key={c.hex}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    onClick={() => {
                      setThemeColor(c.hex);
                      setShowPalette(false);
                    }}
                    className="w-10 h-10 rounded-2xl shadow-lg border-2 border-white/30 cursor-pointer"
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
                <div className="absolute top-[-20%] left-[-20%] w-[150%] h-[150%] bg-theme/5 rotate-45 pointer-events-none blur-3xl"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

       
        <div className="flex items-center gap-2">
          <button className="p-3 rounded-2xl text-text/40 hover:bg-theme/10 hover:text-theme transition-all relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-pink-500 rounded-full border-2 border-white"></span>
          </button>
        </div>

      
        <div
          onClick={() => !authenticatedAdmin && navigate('/login')}
          className="flex items-center gap-4 pl-6 border-l border-white/10 group cursor-pointer transition-all hover:bg-theme/5 rounded-3xl py-2 px-4 ml-2"
        >
          <div className="text-right hidden sm:block">
            {authenticatedAdmin ? (
              <>
                <p className="text-[10px] font-black uppercase text-theme tracking-[0.2em] mb-0.5">Administrator</p>
                <h4 className="text-sm font-black text-text font-mono tracking-tight">Admin System</h4>
              </>
            ) : (
              <>
                <p className="text-[10px] font-black uppercase text-text/40 tracking-[0.2em] mb-0.5">Verified Account</p>
                <h4 className="text-sm font-black text-text font-mono tracking-tight">Narendra</h4>
              </>
            )}
          </div>
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-theme/20 to-theme/40 flex items-center justify-center border border-white group-hover:border-theme transition-colors shadow-lg overflow-hidden">
              {authenticatedAdmin ? <Shield className="w-6 h-6 text-theme" /> : <User className="w-6 h-6 text-theme" />}
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <ChevronDown className="w-4 h-4 text-text/40 group-hover:text-theme transition-transform group-hover:rotate-180" />
        </div>

      </div>
    </nav>
  );
};

export default Navbar;