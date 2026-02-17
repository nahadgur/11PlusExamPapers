import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, BookOpen, ArrowLeft, ChevronRight, List, CheckSquare, Type, ArrowDownUp } from 'lucide-react';
import { Subject, QuizType } from '../types';
import { Button } from './Button';

interface TopicSelectScreenProps {
  subject: Subject;
  onSelectExamMode: (type: QuizType) => void;
  onSelectPracticeTopic: (topic: string, type: QuizType) => void;
  onBack: () => void;
}

const TOPICS_BY_SUBJECT: Record<Subject, string[]> = {
  [Subject.Maths]: [
    "Number & Place Value", "Addition & Subtraction", "Multiplication & Division",
    "Fractions, Decimals & Percentages", "Geometry & Shapes", "Measurement",
    "Data Handling & Statistics", "Algebra & Sequences"
  ],
  [Subject.English]: [
    "Comprehension", "Synonyms & Antonyms", "Grammar & Punctuation",
    "Spelling", "Vocabulary", "Cloze (Missing Words)", "Shuffled Sentences"
  ],
  [Subject.VerbalReasoning]: [
    "Codes & Sequences", "Analogies", "Odd One Out",
    "Word Making", "Logical Deduction", "Alphabetical Order"
  ],
  [Subject.NonVerbalReasoning]: [
    "Matrices", "Series & Sequences", "Similarities",
    "Reflections & Rotations", "Nets & Cubes", "Codes"
  ]
};

const QUIZ_TYPES: { id: QuizType; label: string; icon: React.ElementType }[] = [
  { id: 'multiple-choice', label: 'Standard', icon: List },
  { id: 'true-false', label: 'True/False', icon: CheckSquare },
  { id: 'fill-in-the-blank', label: 'Fill Blanks', icon: Type },
  { id: 'ordering', label: 'Ordering', icon: ArrowDownUp },
];

export const TopicSelectScreen: React.FC<TopicSelectScreenProps> = ({ 
  subject, 
  onSelectExamMode, 
  onSelectPracticeTopic,
  onBack 
}) => {
  const [quizType, setQuizType] = useState<QuizType>('multiple-choice');

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <Button onClick={onBack} variant="ghost" size="sm" className="mb-4 pl-0 hover:bg-transparent hover:text-indigo-600">
            <ArrowLeft size={16} /> Back to Dashboard
          </Button>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">{subject}</h2>
          <p className="text-slate-500 mt-2 font-medium text-sm sm:text-base">Choose your challenge mode</p>
        </div>

        <div className="bg-slate-100 p-1.5 rounded-xl flex flex-wrap gap-1 sm:gap-0">
          {QUIZ_TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => setQuizType(type.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold transition-all flex-1 sm:flex-none justify-center whitespace-nowrap ${
                quizType === type.id 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <type.icon size={16} /> <span className="hidden sm:inline">{type.label}</span>
              <span className="sm:hidden text-xs">{type.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Mock Exam Option */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-indigo-100/50 border border-indigo-50 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
          
          <div className="relative z-10">
            <div className="bg-gradient-to-br from-indigo-500 to-blue-600 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-indigo-200">
              <Clock size={24} className="sm:w-7 sm:h-7" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3">Mock Exam</h3>
            <p className="text-slate-500 mb-8 leading-relaxed text-sm sm:text-base">
              Simulate real exam conditions. Questions will be mixed from all topics and timed.
              {quizType !== 'multiple-choice' && <span className="block mt-2 font-bold text-indigo-600">Format: {QUIZ_TYPES.find(t => t.id === quizType)?.label}</span>}
            </p>
            <Button onClick={() => onSelectExamMode(quizType)} size="lg" className="w-full justify-between group-hover:shadow-indigo-300">
              Start Exam <ChevronRight size={20} />
            </Button>
          </div>
        </motion.div>

        {/* Practice Mode Option */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-emerald-100/50 border border-emerald-50 relative overflow-hidden"
        >
           <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-8 -mt-8" />

           <div className="relative z-10">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-emerald-200">
              <BookOpen size={24} className="sm:w-7 sm:h-7" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3">Topic Practice</h3>
            <p className="text-slate-500 mb-6 text-sm sm:text-base">
              Master specific skills without the timer pressure.
              {quizType !== 'multiple-choice' && <span className="block mt-1 font-bold text-emerald-600">Format: {QUIZ_TYPES.find(t => t.id === quizType)?.label}</span>}
            </p>
            
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {TOPICS_BY_SUBJECT[subject].map((topic, idx) => (
                <motion.button
                  key={topic}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (idx * 0.05) }}
                  onClick={() => onSelectPracticeTopic(topic, quizType)}
                  className="w-full text-left px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 font-semibold text-sm flex items-center justify-between transition-all group border border-transparent hover:border-emerald-200"
                >
                  <span className="truncate mr-2">{topic}</span>
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm shrink-0">
                    <ChevronRight size={14} />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};