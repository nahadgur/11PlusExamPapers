import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Medal, ArrowLeft } from 'lucide-react';
import { Button } from './Button';
import { UserStats } from '../types';

interface LeaderboardScreenProps {
  currentUserStats: UserStats;
  onBack: () => void;
}

export const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ currentUserStats, onBack }) => {
  // Mock data mixed with current user
  const leaderboardData = [
    { name: "Sophie M.", stars: Math.max(1200, currentUserStats.stars + 500), streak: 12 },
    { name: "James R.", stars: Math.max(950, currentUserStats.stars + 200), streak: 5 },
    { name: "You", stars: currentUserStats.stars, streak: currentUserStats.streak, isUser: true },
    { name: "Amelia K.", stars: Math.max(0, currentUserStats.stars - 150), streak: 3 },
    { name: "Oliver P.", stars: Math.max(0, currentUserStats.stars - 400), streak: 8 },
  ].sort((a, b) => b.stars - a.stars);

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
       <div className="mb-6">
        <Button onClick={onBack} size="sm" variant="secondary" className="bg-slate-200 text-slate-700 hover:bg-slate-300 border-0">
          <ArrowLeft size={16} /> Back
        </Button>
      </div>

      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl overflow-hidden shadow-xl"
      >
        <div className="bg-indigo-600 p-8 text-center text-white">
          <BarChart3 className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
          <h2 className="text-3xl font-black">Weekly Progress</h2>
          <p className="text-indigo-200">A simple comparison of recent activity.</p>
        </div>

        <div className="p-4 sm:p-6">
          {leaderboardData.map((user, index) => (
            <div 
              key={index}
              className={`flex items-center gap-4 p-4 rounded-2xl mb-2 transition-transform hover:scale-[1.01] ${
                user.isUser ? 'bg-indigo-50 border-2 border-indigo-200' : 'bg-white border-b border-slate-100'
              }`}
            >
              <div className={`w-10 h-10 flex items-center justify-center font-black text-xl rounded-full ${
                index === 0 ? 'bg-yellow-100 text-yellow-600' :
                index === 1 ? 'bg-slate-200 text-slate-600' :
                index === 2 ? 'bg-orange-100 text-orange-600' :
                'text-slate-400'
              }`}>
                {index + 1}
              </div>
              
              <div className="flex-1">
                <div className={`font-bold text-lg ${user.isUser ? 'text-indigo-900' : 'text-slate-700'}`}>
                  {user.name} {user.isUser && '(You)'}
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Active days: {user.streak}
                </div>
              </div>

              <div className="font-black text-xl text-yellow-500 flex items-center gap-1">
                {user.stars} <Medal size={16} />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};