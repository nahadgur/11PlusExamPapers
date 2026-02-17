import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, BookOpen, BrainCircuit, Shapes, Trophy, BarChart3, ArrowRight } from 'lucide-react';
import { Subject } from '../types';

interface DashboardProps {
  onSelectSubject: (subject: Subject) => void;
  onShowProgress: () => void;
  onShowLeaderboard: () => void;
}

const subjects = [
  {
    id: Subject.Maths,
    title: 'Maths',
    icon: Calculator,
    gradient: 'from-blue-500 to-cyan-500',
    shadow: 'shadow-blue-200',
    description: 'Arithmetic, geometry, & data.',
  },
  {
    id: Subject.English,
    title: 'English',
    icon: BookOpen,
    gradient: 'from-emerald-500 to-teal-500',
    shadow: 'shadow-emerald-200',
    description: 'Comprehension & vocabulary.',
  },
  {
    id: Subject.VerbalReasoning,
    title: 'Verbal Reasoning',
    icon: BrainCircuit,
    gradient: 'from-violet-500 to-purple-500',
    shadow: 'shadow-violet-200',
    description: 'Logic with words & codes.',
  },
  {
    id: Subject.NonVerbalReasoning,
    title: 'Non-Verbal',
    icon: Shapes,
    gradient: 'from-orange-500 to-amber-500',
    shadow: 'shadow-orange-200',
    description: 'Patterns & spatial problem solving.',
  }
];

export const Dashboard: React.FC<DashboardProps> = ({ onSelectSubject, onShowProgress, onShowLeaderboard }) => {
  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <div className="mb-8 pl-2">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Dashboard</h2>
        <p className="text-slate-500 font-medium">Select a subject to level up your skills.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        {subjects.map((sub, idx) => (
          <motion.button
            key={sub.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -4, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectSubject(sub.id)}
            className="relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-left group transition-shadow hover:shadow-xl"
          >
            <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${sub.gradient}`} />
            
            <div className="flex items-start gap-5">
              <div className={`p-4 rounded-xl bg-gradient-to-br ${sub.gradient} text-white shadow-lg ${sub.shadow}`}>
                <sub.icon size={28} strokeWidth={2.5} />
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">
                  {sub.title}
                </h3>
                <p className="text-slate-500 text-sm mt-1 font-medium">{sub.description}</p>
              </div>
              <div className="self-center">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                  <ArrowRight size={20} />
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onShowProgress}
          className="flex items-center justify-between p-6 bg-slate-800 text-white rounded-2xl shadow-lg shadow-slate-300 overflow-hidden relative"
        >
          <div className="absolute right-0 top-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
              <BarChart3 size={24} className="text-indigo-300" />
            </div>
            <div className="text-left">
              <div className="font-bold text-lg">My Analytics</div>
              <div className="text-xs text-slate-400 font-medium">View detailed progress</div>
            </div>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onShowLeaderboard}
          className="flex items-center justify-between p-6 bg-white border border-slate-200 text-slate-800 rounded-2xl shadow-sm hover:shadow-md hover:border-amber-200"
        >
          <div className="flex items-center gap-4">
             <div className="p-3 bg-amber-50 rounded-xl text-amber-500">
              <Trophy size={24} />
            </div>
            <div className="text-left">
              <div className="font-bold text-lg">Leaderboard</div>
              <div className="text-xs text-slate-500 font-medium">See global rankings</div>
            </div>
          </div>
          <ArrowRight size={20} className="text-slate-300" />
        </motion.button>
      </div>
    </div>
  );
};
