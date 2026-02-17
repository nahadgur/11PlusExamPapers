import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { Theme } from '../types';

interface ThemeSelectorProps {
  isOpen: boolean;
  currentTheme: Theme;
  onSelect: (theme: Theme) => void;
  onClose: () => void;
}

const THEME_OPTIONS: { id: Theme; name: string; colors: string }[] = [
  { 
    id: 'default', 
    name: 'Whiz', 
    colors: 'bg-gradient-to-br from-indigo-400 via-purple-300 to-pink-200' 
  },
  { 
    id: 'ocean', 
    name: 'Ocean', 
    colors: 'bg-gradient-to-br from-cyan-400 via-blue-300 to-sky-200' 
  },
  { 
    id: 'jungle', 
    name: 'Jungle', 
    colors: 'bg-gradient-to-br from-emerald-400 via-green-300 to-lime-200' 
  },
  { 
    id: 'sunset', 
    name: 'Sunset', 
    colors: 'bg-gradient-to-br from-orange-400 via-rose-300 to-amber-200' 
  },
  { 
    id: 'midnight', 
    name: 'Midnight', 
    colors: 'bg-gradient-to-br from-slate-800 via-indigo-900 to-slate-900' 
  },
];

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ isOpen, currentTheme, onSelect, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="fixed top-20 right-4 left-4 sm:left-auto sm:right-auto sm:top-24 sm:w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 z-[70] sm:origin-top-right origin-center sm:absolute sm:translate-x-0"
            style={{ 
              maxWidth: '100%',
              // Center horizontally on desktop if we wanted, but sticking to button anchor logic usually better.
              // For simplicity in this standalone app without anchor refs, we center on mobile, fix position near top right on desktop.
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
             {/* Desktop override via classes to position near the button usually requires refs. 
                 Here we'll just center it on mobile and keep it fixed top-center/rightish on desktop
              */}
             <div className="absolute inset-0 pointer-events-none sm:hidden"></div> {/* Spacer */}
             
             {/* Actual content wrapper to handle the positioning properly with Tailwind classes over style prop */}
             <div className="relative w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-800">Pick a Theme</h3>
                  <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                    <X size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {THEME_OPTIONS.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => onSelect(theme.id)}
                      className={`flex items-center gap-3 p-2 rounded-xl transition-all ${
                        currentTheme === theme.id 
                          ? 'bg-slate-100 ring-2 ring-indigo-500 ring-offset-1' 
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-lg shadow-sm ${theme.colors} flex items-center justify-center`}>
                        {currentTheme === theme.id && <Check className="text-white drop-shadow-md" size={20} strokeWidth={3} />}
                      </div>
                      <span className="font-semibold text-slate-700">{theme.name}</span>
                    </button>
                  ))}
                </div>
             </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};