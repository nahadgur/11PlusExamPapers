import React from 'react';
import { motion } from 'framer-motion';
import { Star, Medal, Zap, Trophy, Brain, Rocket, ArrowLeft } from 'lucide-react';
import { UserStats, Badge, Subject } from '../types';
import { Button } from './Button';

interface ProgressScreenProps {
  stats: UserStats;
  onBack: () => void;
}

const IconMap: Record<string, React.ElementType> = {
  star: Star,
  medal: Medal,
  zap: Zap,
  trophy: Trophy,
  brain: Brain,
  rocket: Rocket
};

export const ProgressScreen: React.FC<ProgressScreenProps> = ({ stats, onBack }) => {
  const subjects = Object.values(Subject);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <Button onClick={onBack} size="sm" variant="secondary" className="bg-slate-200 text-slate-700 hover:bg-slate-300 border-0">
          <ArrowLeft size={16} /> Back
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stats Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-3xl p-6 shadow-xl"
        >
          <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
            <Brain className="text-indigo-500" /> Subject Mastery
          </h2>
          
          <div className="space-y-6">
            {subjects.map(sub => {
              const prog = stats.progress[sub] || { totalQuestions: 0, correctAnswers: 0 };
              const percent = prog.totalQuestions > 0 
                ? Math.round((prog.correctAnswers / prog.totalQuestions) * 100) 
                : 0;
              
              return (
                <div key={sub}>
                  <div className="flex justify-between text-sm font-bold text-slate-600 mb-2">
                    <span>{sub}</span>
                    <span>{percent}% ({prog.correctAnswers}/{prog.totalQuestions})</span>
                  </div>
                  <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${percent}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full rounded-full ${
                        percent >= 80 ? 'bg-green-500' : percent >= 50 ? 'bg-yellow-500' : 'bg-indigo-500'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Badges Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-6 shadow-xl"
        >
          <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
            <Trophy className="text-yellow-500" /> Badges
          </h2>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
            {stats.badges.map(badge => {
              const Icon = IconMap[badge.iconName] || Star;
              return (
                <div key={badge.id} className="flex flex-col items-center text-center group relative">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-2 transition-all ${
                    badge.unlocked 
                      ? `bg-${badge.color}-100 text-${badge.color}-500 shadow-sm` 
                      : 'bg-slate-100 text-slate-300 grayscale'
                  }`}>
                    <Icon size={32} strokeWidth={badge.unlocked ? 2.5 : 2} />
                  </div>
                  <span className={`text-xs font-bold leading-tight ${badge.unlocked ? 'text-slate-700' : 'text-slate-400'}`}>
                    {badge.name}
                  </span>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 bg-slate-800 text-white text-xs p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity w-32 pointer-events-none z-10">
                    {badge.description}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};