import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeft,
  Loader2,
  Timer,
  AlertCircle,
  BookOpen,
  CheckCircle,
  XCircle,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { Subject, Question, QuizState, QuizResult, QuizMode, QuizType } from '../types';
import { generateQuestions } from '../services/questionService';
import { Button } from './Button';

interface QuizAreaProps {
  subject: Subject;
  schoolType: any;
  mode: QuizMode;
  quizType: QuizType;
  topic?: string;
  onComplete: (result: QuizResult) => void;
  onBackToDashboard: () => void;
}

export const QuizArea: React.FC<QuizAreaProps> = ({
  subject,
  schoolType,
  mode,
  quizType,
  topic,
  onComplete,
  onBackToDashboard,
}) => {
  const [state, setState] = useState<QuizState>({
    questions: [],
    currentIndex: 0,
    score: 0,
    completed: false,
    loading: true,
    selectedAnswer: null,
    isCorrect: null,
    answersHistory: {}
  });

  const [seconds, setSeconds] = useState(0);

  // Specific states for complex question types
  const [orderingItems, setOrderingItems] = useState<string[]>([]);
  const [textInput, setTextInput] = useState('');

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const loadTopic = mode === 'practice' ? topic : undefined;
      const qs = await generateQuestions(subject, schoolType, loadTopic, quizType);
      if (mounted) {
        setState((s) => ({ ...s, questions: qs, loading: false }));
        // Initialize state for the first question if applicable
        if (qs.length > 0) {
          if (quizType === 'ordering') setOrderingItems([...qs[0].options]);
          if (quizType === 'fill-in-the-blank') setTextInput('');
        }
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [subject, schoolType, mode, topic, quizType]);

  useEffect(() => {
    if (state.loading || state.completed) return;
    const timer = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [state.loading, state.completed]);

  // When question changes, reset complex states
  useEffect(() => {
    if (state.questions.length > 0 && state.currentIndex < state.questions.length) {
      const q = state.questions[state.currentIndex];
      if (quizType === 'ordering') {
        setOrderingItems([...q.options]);
      }
      if (quizType === 'fill-in-the-blank') {
        setTextInput('');
      }
    }
  }, [state.currentIndex, state.questions, quizType]);

  const currentQ = state.questions[state.currentIndex];

  const handleStandardAnswer = (option: string) => {
    if (state.selectedAnswer) return;
    const isCorrect = option === currentQ.correctAnswer;
    updateState(option, isCorrect);
  };

  const handleTextSubmit = () => {
    if (state.selectedAnswer) return;

    const normalizedInput = textInput.trim().toLowerCase();
    const normalizedCorrect = currentQ.correctAnswer.trim().toLowerCase();

    const isCorrect =
      normalizedInput === normalizedCorrect ||
      (normalizedCorrect.length > 3 && normalizedInput.includes(normalizedCorrect));

    updateState(textInput, isCorrect);
  };

  const handleOrderSubmit = () => {
    if (state.selectedAnswer) return;

    const userOrderString = orderingItems.join(',');
    const correctOrderString = currentQ.correctAnswer;

    const isCorrect =
      userOrderString.replace(/\s/g, '') === correctOrderString.replace(/\s/g, '');

    updateState(userOrderString, isCorrect);
  };

  const updateState = (answer: string, isCorrect: boolean) => {
    setState((s) => ({
      ...s,
      selectedAnswer: answer,
      isCorrect,
      score: isCorrect ? s.score + 1 : s.score,
      answersHistory: {
        ...s.answersHistory,
        [currentQ.id]: answer
      }
    }));
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (state.selectedAnswer) return;
    const newItems = [...orderingItems];
    if (direction === 'up' && index > 0) {
      [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]];
    } else if (direction === 'down' && index < newItems.length - 1) {
      [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    }
    setOrderingItems(newItems);
  };

  const nextQuestion = () => {
    if (state.currentIndex >= state.questions.length - 1) {
      const timeBonus = mode === 'exam' ? Math.max(0, 100 - seconds) : 0;
      const points = state.score * 10 + timeBonus;

      onComplete({
        score: state.score,
        total: state.questions.length,
        timeTaken: seconds,
        subject,
        pointsEarned: points,
        questions: state.questions,
        userAnswers: state.answersHistory,
        mode: mode
      });
    } else {
      setState((s) => ({
        ...s,
        currentIndex: s.currentIndex + 1,
        selectedAnswer: null,
        isCorrect: null
      }));
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s.toString().padStart(2, '0')}`;
  };

  if (state.loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] px-4">
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-indigo-100 flex flex-col items-center text-center">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
          <p className="text-lg font-bold text-slate-700 animate-pulse">
            {mode === 'practice' ? `Preparing ${topic}...` : 'Constructing Exam...'}
          </p>
        </div>
      </div>
    );
  }

  if (state.questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 p-8 text-center">
        <AlertCircle className="w-12 h-12 text-slate-400 mb-4" />
        <p className="text-lg text-slate-600 mb-6">Unable to load questions at this time.</p>
        <Button onClick={() => window.location.reload()} variant="outline">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-3 sm:p-6 pb-24">
      {/* Back to Dashboard */}
      <button
        onClick={onBackToDashboard}
        className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors mb-4 px-2 py-1 rounded-lg hover:bg-white/60"
      >
        <ArrowLeft size={16} /> Dashboard
      </button>

      {/* HUD */}
      <div className="flex flex-wrap justify-between items-end gap-3 mb-6 bg-white/90 backdrop-blur rounded-2xl p-4 shadow-sm border border-slate-100">
        <div className="flex flex-col min-w-[140px]">
          <div className="flex items-center flex-wrap gap-2 mb-1">
            <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">
              {subject}
            </span>
            {mode === 'practice' && topic && (
              <span
                className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full whitespace-normal break-words max-w-[220px] sm:max-w-[320px]"
                title={topic}
              >
                {topic}
              </span>
            )}
          </div>
          <span className="text-slate-800 font-extrabold text-lg">
            Question {state.currentIndex + 1}{' '}
            <span className="text-slate-300">/ {state.questions.length}</span>
          </span>
        </div>

        {mode === 'exam' ? (
          <div className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl font-mono font-bold text-sm shadow-lg ml-auto sm:ml-0">
            <Timer size={16} className="text-indigo-400" />
            {formatTime(seconds)}
          </div>
        ) : (
          <div className="flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg font-bold text-sm ml-auto sm:ml-0">
            <BookOpen size={16} />
            Practice
          </div>
        )}
      </div>

      {/* Progress */}
      <div className="w-full bg-slate-200 h-2 rounded-full mb-6 sm:mb-8 overflow-hidden">
        <motion.div
          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${((state.currentIndex + 1) / state.questions.length) * 100}%` }}
          transition={{ duration: 0.5, ease: 'circOut' }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <motion.div
            layout
            className="bg-white rounded-3xl p-5 sm:p-10 shadow-xl shadow-indigo-100 border border-white mb-6"
          >
            <motion.h3
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg sm:text-2xl font-bold text-slate-800 mb-6 sm:mb-8 leading-relaxed"
            >
              {currentQ.text}
            </motion.h3>

            {/* RENDER BASED ON QUIZ TYPE */}

            {/* 1. Multiple Choice & True/False */}
            {(quizType === 'multiple-choice' || quizType === 'true-false') && (
              <div className={`grid gap-3 ${quizType === 'true-false' ? 'grid-cols-2' : 'grid-cols-1'}`}>
                {currentQ.options.map((opt, idx) => {
                  const isSelected = state.selectedAnswer === opt;
                  const isCorrectAnswer = opt === currentQ.correctAnswer;

                  let containerClass = 'border-2 border-slate-100 bg-slate-50';
                  let circleClass = 'bg-white border-2 border-slate-200 text-slate-400';
                  let icon = null;

                  if (state.selectedAnswer) {
                    if (isSelected) {
                      if (isCorrectAnswer) {
                        containerClass = 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500 z-10';
                        circleClass = 'bg-emerald-500 border-emerald-500 text-white';
                        icon = <CheckCircle size={20} className="text-emerald-600" />;
                      } else {
                        containerClass = 'bg-red-50 border-red-500 ring-1 ring-red-500 z-10';
                        circleClass = 'bg-red-500 border-red-500 text-white';
                        icon = <XCircle size={20} className="text-red-600" />;
                      }
                    } else if (isCorrectAnswer) {
                      containerClass = 'bg-emerald-50/50 border-emerald-200 z-10';
                      circleClass = 'bg-emerald-100 border-emerald-200 text-emerald-600';
                      icon = <CheckCircle size={20} className="text-emerald-600 opacity-50" />;
                    } else {
                      containerClass = 'opacity-40 border-slate-100 grayscale';
                    }
                  } else {
                    containerClass += ' hover:border-indigo-200 hover:bg-white';
                  }

                  return (
                    <motion.button
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + idx * 0.1, type: 'spring', stiffness: 300, damping: 24 }}
                      whileHover={!state.selectedAnswer ? { scale: 1.02 } : {}}
                      whileTap={!state.selectedAnswer ? { scale: 0.98 } : {}}
                      onClick={() => handleStandardAnswer(opt)}
                      disabled={!!state.selectedAnswer}
                      className={`w-full text-left p-4 rounded-xl transition-colors duration-200 flex items-center gap-4 group ${containerClass} ${
                        quizType === 'true-false' ? 'justify-center flex-col py-8' : ''
                      }`}
                    >
                      {quizType !== 'true-false' && (
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black transition-colors shrink-0 ${circleClass}`}
                        >
                          {String.fromCharCode(65 + idx)}
                        </div>
                      )}
                      <span
                        className={`font-semibold text-slate-700 flex-1 ${
                          quizType === 'true-false' ? 'text-xl sm:text-2xl text-center' : 'text-base sm:text-lg'
                        }`}
                      >
                        {opt}
                      </span>

                      {icon && (
                        <motion.div
                          initial={{ scale: 0, rotate: -45, opacity: 0 }}
                          animate={{ scale: 1, rotate: 0, opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                          className="shrink-0"
                        >
                          {icon}
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* 2. Ordering */}
            {quizType === 'ordering' && (
              <div className="space-y-3">
                <p className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-wide">Tap arrows to reorder</p>
                {orderingItems.map((item, idx) => (
                  <motion.div
                    key={item}
                    layout
                    transition={{ type: 'spring', stiffness: 500, damping: 40, mass: 0.8 }}
                    className={`p-3 sm:p-4 rounded-xl border-2 flex items-center gap-3 sm:gap-4 bg-white ${
                      state.selectedAnswer
                        ? state.isCorrect
                          ? 'border-emerald-200 bg-emerald-50'
                          : 'border-slate-200'
                        : 'border-slate-100 hover:border-indigo-200'
                    }`}
                  >
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => moveItem(idx, 'up')}
                        disabled={!!state.selectedAnswer || idx === 0}
                        className="p-1 sm:p-1.5 text-slate-400 hover:text-indigo-600 disabled:opacity-30 bg-slate-50 rounded"
                      >
                        <ArrowUp size={18} />
                      </button>
                      <button
                        onClick={() => moveItem(idx, 'down')}
                        disabled={!!state.selectedAnswer || idx === orderingItems.length - 1}
                        className="p-1 sm:p-1.5 text-slate-400 hover:text-indigo-600 disabled:opacity-30 bg-slate-50 rounded"
                      >
                        <ArrowDown size={18} />
                      </button>
                    </div>
                    <div className="flex-1 font-semibold text-slate-700 text-base sm:text-lg leading-tight">
                      {item}
                    </div>
                  </motion.div>
                ))}
                {!state.selectedAnswer && (
                  <div className="pt-4">
                    <Button onClick={handleOrderSubmit} className="w-full justify-center">
                      Check Order
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* 3. Fill in the blank */}
            {quizType === 'fill-in-the-blank' && (
              <div className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    disabled={!!state.selectedAnswer}
                    placeholder="Type here..."
                    className={`w-full p-4 sm:p-5 text-lg sm:text-xl font-bold rounded-xl border-2 outline-none focus:ring-4 focus:ring-opacity-20 transition-all ${
                      state.selectedAnswer
                        ? state.isCorrect
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                          : 'border-red-500 bg-red-50 text-red-900'
                        : 'border-slate-200 bg-slate-50 focus:border-indigo-500 focus:ring-indigo-500'
                    }`}
                  />
                  {state.selectedAnswer && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      {state.isCorrect ? (
                        <CheckCircle className="text-emerald-500" size={24} />
                      ) : (
                        <XCircle className="text-red-500" size={24} />
                      )}
                    </div>
                  )}
                </div>

                {/* Word Bank (Optional Hint) */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Word Bank</p>
                  <div className="flex flex-wrap gap-2">
                    {currentQ.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => !state.selectedAnswer && setTextInput(opt)}
                        disabled={!!state.selectedAnswer}
                        className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {!state.selectedAnswer && (
                  <Button onClick={handleTextSubmit} disabled={!textInput.trim()} className="w-full justify-center">
                    Check Answer
                  </Button>
                )}
              </div>
            )}

            {/* Immediate Explanation (smoother) */}
            <AnimatePresence initial={false} mode="wait">
              {mode === 'practice' && state.selectedAnswer && (
                <motion.div
                  key={`${currentQ.id}-${state.isCorrect ? 'correct' : 'wrong'}`}
                  layout
                  initial={{ opacity: 0, y: 8, clipPath: 'inset(0 0 100% 0 round 12px)' }}
                  animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0 round 12px)' }}
                  exit={{ opacity: 0, y: 6, clipPath: 'inset(0 0 100% 0 round 12px)' }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className={`mt-6 p-4 sm:p-5 rounded-xl text-sm border-l-4 overflow-hidden will-change-transform ${
                    state.isCorrect ? 'bg-emerald-50 border-emerald-400 text-emerald-900' : 'bg-rose-50 border-rose-400 text-rose-900'
                  }`}
                >
                  <p className="font-bold mb-2 uppercase tracking-wide text-xs">
                    {state.isCorrect ? 'Correct answer' : 'Not quite'}
                  </p>
                  <p className="leading-relaxed font-medium mb-2">{currentQ.explanation}</p>

                  {!state.isCorrect && quizType === 'fill-in-the-blank' && (
                    <p className="font-bold">Correct answer: {currentQ.correctAnswer}</p>
                  )}
                  {!state.isCorrect && quizType === 'ordering' && (
                    <p className="font-bold">Correct order: {currentQ.correctAnswer}</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="flex justify-end items-center gap-4">
            <AnimatePresence>
              {state.selectedAnswer && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  className="w-full sm:w-auto"
                >
                  <Button
                    onClick={nextQuestion}
                    size="lg"
                    className="px-10 shadow-lg shadow-indigo-300 w-full sm:w-auto justify-center"
                  >
                    {state.currentIndex === state.questions.length - 1 ? 'Finish Exam' : 'Next Question'}{' '}
                    <ArrowRight size={20} />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
