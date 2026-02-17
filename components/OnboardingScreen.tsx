import React from 'react';
import { motion } from 'framer-motion';
import { School, BookOpen, Building2, Check, ArrowLeft } from 'lucide-react';
import { SchoolType } from '../types';

interface OnboardingScreenProps {
  onSelect: (type: SchoolType) => void;
  onBack: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onSelect, onBack }) => {
  const options = [
    {
      id: SchoolType.Grammar,
      title: 'Grammar School',
      icon: School,
      desc: 'Focus on GL Assessment and CEM styles.',
      color: 'indigo',
      gradient: 'from-indigo-500 to-blue-600'
    },
    {
      id: SchoolType.Private,
      title: 'Private School',
      icon: Building2,
      desc: 'Preparation for Common Entrance & Scholarships.',
      color: 'emerald',
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      id: SchoolType.State,
      title: 'State School',
      icon: BookOpen,
      desc: 'Master Key Stage 2 core subjects.',
      color: 'amber',
      gradient: 'from-amber-500 to-orange-600'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Minimal navbar */}
      <nav className="w-full px-4 sm:px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center text-white font-black text-base shadow-md">
            11+
          </div>
          <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">
            Whiz<span className="text-indigo-600">Prep</span>
          </h1>
        </div>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors px-3 py-2 rounded-lg hover:bg-slate-100"
        >
          <ArrowLeft size={16} /> Back
        </button>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-black text-slate-800 mb-6 tracking-tight">
          Level Up Your <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">11+ Prep</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-lg mx-auto font-medium">
          Select your target school to customize your learning path.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
        {options.map((opt, idx) => (
          <motion.button
            key={opt.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={() => onSelect(opt.id)}
            className="flex flex-col items-center text-center bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-white hover:border-indigo-100 transition-all group relative overflow-hidden"
          >
            <div className={`absolute top-0 inset-x-0 h-2 bg-gradient-to-r ${opt.gradient}`} />
            
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${opt.gradient} flex items-center justify-center text-white mb-8 shadow-lg group-hover:shadow-xl transition-shadow`}>
              <opt.icon size={36} />
            </div>
            
            <h3 className="text-2xl font-bold text-slate-800 mb-3">{opt.title}</h3>
            <p className="text-slate-500 leading-relaxed font-medium mb-8">
              {opt.desc}
            </p>
            
            <div className="mt-auto w-full py-3 rounded-xl bg-slate-50 text-slate-600 font-bold group-hover:bg-slate-800 group-hover:text-white transition-colors flex items-center justify-center gap-2">
              Select Path <Check size={16} />
            </div>
          </motion.button>
        ))}
      </div>
      </div>
    </div>
  );
};
