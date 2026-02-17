import React from 'react';
import { BarChart3, CalendarDays, Target, Palette } from 'lucide-react';
import { UserStats } from '../types';
import { Button } from './Button';

interface HeaderProps {
  stats: UserStats;
  onLogoClick: () => void;
  onOpenThemeSelector: () => void;
}

export const Header: React.FC<HeaderProps> = ({ stats, onLogoClick, onOpenThemeSelector }) => {
  return (
    <header className="w-full sticky top-2 sm:top-4 z-50 px-2 sm:px-4 mb-4 sm:mb-6">
      <div className="max-w-5xl mx-auto h-14 sm:h-16 bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-sm border border-white/50 flex justify-between items-center px-3 sm:px-6">
        <div 
          onClick={onLogoClick}
          className="cursor-pointer flex items-center gap-2 group shrink-0"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white font-black text-base sm:text-lg shadow-md group-hover:scale-105 transition-transform">
            11+
          </div>
          <h1 className="text-lg sm:text-xl font-extrabold text-slate-800 tracking-tight flex flex-col sm:block leading-none">
            <span>11 Plus</span><span className="text-indigo-600">Exam Papers</span>
          </h1>
        </div>

        <div className="flex gap-1.5 sm:gap-3 items-center ml-auto">
          {stats.targetSchool && (
            <div className="hidden lg:flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-indigo-50 rounded-full border border-indigo-100 text-[10px] sm:text-xs font-bold text-indigo-700 uppercase tracking-wide shadow-inner">
              <Target size={14} />
              <span className="truncate max-w-[80px] sm:max-w-none">{stats.targetSchool} Prep</span>
            </div>
          )}

          <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 bg-slate-50 rounded-lg border border-slate-200">
  <BarChart3 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600" />
  <span className="text-slate-800 font-bold text-xs sm:text-sm">{stats.stars}</span>
</div>
<div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 bg-slate-50 rounded-lg border border-slate-200">
  <CalendarDays className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600" />
  <span className="text-slate-800 font-bold text-xs sm:text-sm">{stats.streak}</span>
</div>
          
          <div className="w-px h-6 sm:h-8 bg-slate-200 mx-0.5 sm:mx-1"></div>

          <button 
            onClick={onOpenThemeSelector}
            className="p-1.5 sm:p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-indigo-600 transition-colors"
            title="Change Theme"
          >
            <Palette size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
