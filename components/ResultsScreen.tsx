import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, CheckCircle2, RotateCcw, Home, ListChecks } from 'lucide-react';
import { QuizResult, Badge } from '../types';
import { Button } from './Button';

interface ResultsScreenProps {
  result: QuizResult;
  newBadges: Badge[];
  onHome: () => void;
  onRetry: () => void;
  onReview: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({ result, newBadges, onHome, onRetry, onReview }) => {
  const percentage = Math.round((result.score / result.total) * 100);
  
  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-100 text-center"
      >
        <div className="mb-6 inline-flex p-4 rounded-full bg-indigo-50 text-indigo-600">
          <Trophy size={48} />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
          {percentage >= 80 ? 'Excellent Work!' : percentage >= 50 ? 'Good Effort!' : 'Practice Makes Perfect'}
        </h2>
        <p className="text-slate-500 mb-8">You completed the {result.subject} module.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
          <div className="p-4 bg-slate-50 rounded-xl flex sm:block items-center justify-between sm:justify-center">
            <div className="flex items-center gap-3 sm:block">
               <CheckCircle2 className="sm:mx-auto text-emerald-500 mb-0 sm:mb-2" size={24} />
               <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide sm:hidden">Score</div>
            </div>
            <div>
                <div className="text-2xl font-bold text-slate-900">{result.score}/{result.total}</div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide hidden sm:block">Score</div>
            </div>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl flex sm:block items-center justify-between sm:justify-center">
             <div className="flex items-center gap-3 sm:block">
                <Clock className="sm:mx-auto text-blue-500 mb-0 sm:mb-2" size={24} />
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide sm:hidden">Time</div>
             </div>
             <div>
                <div className="text-2xl font-bold text-slate-900">{result.timeTaken}s</div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide hidden sm:block">Time</div>
             </div>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl flex sm:block items-center justify-between sm:justify-center">
             <div className="flex items-center gap-3 sm:block">
                <Trophy className="sm:mx-auto text-amber-500 mb-0 sm:mb-2" size={24} />
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide sm:hidden">XP Earned</div>
             </div>
             <div>
                <div className="text-2xl font-bold text-slate-900">+{result.pointsEarned}</div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide hidden sm:block">XP Earned</div>
             </div>
          </div>
        </div>

        {newBadges.length > 0 && (
          <div className="mb-8 bg-amber-50 border border-amber-100 p-4 rounded-xl">
            <h3 className="text-amber-800 font-bold mb-3 flex items-center justify-center gap-2">
              <Trophy size={16} /> New Badges Unlocked
            </h3>
            <div className="flex justify-center gap-3 flex-wrap">
              {newBadges.map(badge => (
                <span key={badge.id} className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full text-xs font-bold text-amber-700 shadow-sm">
                  {badge.name}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <Button onClick={onReview} variant="outline" className="w-full justify-center order-2 sm:order-1">
            <ListChecks size={18} /> Review Answers
          </Button>
          <div className="flex flex-col sm:flex-row gap-3 order-1 sm:order-2">
            <Button onClick={onHome} variant="ghost" className="flex-1 justify-center">
              <Home size={18} /> Dashboard
            </Button>
            <Button onClick={onRetry} variant="primary" className="flex-1 justify-center">
              <RotateCcw size={18} /> Try Again
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};