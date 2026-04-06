import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Settings, Moon, Sun, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggler = () => {
  const { theme, setTheme, themeColor, setThemeColor } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [alignRight, setAlignRight] = useState(false);
  const buttonRef = useRef(null);

  const colors = [
    '#2563eb', 
    '#7c3aed', 
    '#db2777', 
    '#059669', 
    '#ea580c', 
    '#4b5563', 
  ];

  
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  
  useEffect(() => {
    if (!isOpen || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const dropdownWidth = 200; 
    const spaceRight = window.innerWidth - rect.left;

    setAlignRight(spaceRight < dropdownWidth);
  }, [isOpen]);

  return (
    <div className="relative" ref={buttonRef}>
     
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 glass-card hover:bg-theme/10 transition-colors"
      >
        <Settings className="w-5 h-5 text-theme animate-spin-slow" />
      </button>

      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className={`absolute top-full mt-2 ${
              alignRight ? 'right-0' : 'left-0'
            } glass-card p-4 shadow-2xl z-[999] pointer-events-auto`}
            style={{
              width: 192,
              maxWidth: 'calc(100vw - 2rem)',
            }}
          >
            <div className="flex flex-col gap-4">
              {/* Theme Mode */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-text/60">
                  Theme Mode
                </span>
                <button
                  onClick={() =>
                    setTheme(theme === 'dark' ? 'light' : 'dark')
                  }
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Theme Colors */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase text-text/60">
                  Theme Color
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setThemeColor(color)}
                      style={{ background: color }}
                      className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95"
                    >
                      {themeColor === color && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeToggler;