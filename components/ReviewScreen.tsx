import React from 'react';
import { CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { QuizResult } from '../types';
import { Button } from './Button';

interface ReviewScreenProps {
  result: QuizResult;
  onBack: () => void;
}

export const ReviewScreen: React.FC<ReviewScreenProps> = ({ result, onBack }) => {
  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 pb-20">
      <div className="flex items-center justify-between mb-8">
        <Button onClick={onBack} variant="outline" size="sm">
          <ArrowLeft size={16} /> <span className="hidden sm:inline">Back to Results</span><span className="sm:hidden">Back</span>
        </Button>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">Review Answers</h2>
      </div>

      <div className="space-y-6">
        {result.questions.map((q, idx) => {
          const userAnswer = result.userAnswers[q.id];
          const isCorrect = userAnswer === q.correctAnswer;

          return (
            <div key={q.id} className={`p-4 sm:p-6 rounded-xl border ${isCorrect ? 'border-emerald-100 bg-emerald-50/30' : 'border-red-100 bg-red-50/30'}`}>
              <div className="flex items-start gap-3 sm:gap-4 mb-4">
                <span className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-white border border-slate-200 text-xs sm:text-sm font-bold text-slate-500 mt-1 sm:mt-0">
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 text-base sm:text-lg mb-2">{q.text}</p>
                  <div className="flex items-center gap-2 text-sm">
                    {isCorrect ? (
                      <span className="flex items-center gap-1 text-emerald-700 font-medium">
                        <CheckCircle size={16} /> Correct
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-600 font-medium">
                        <XCircle size={16} /> Incorrect
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Adjusted padding/indentation for mobile vs desktop */}
              <div className="pl-0 sm:pl-12 space-y-2 mb-4 mt-2 sm:mt-0">
                {q.options.map((opt) => {
                  const isSelected = userAnswer === opt;
                  const isThisCorrect = opt === q.correctAnswer;
                  
                  let style = "text-slate-600";
                  let icon = null;

                  if (isThisCorrect) {
                    style = "text-emerald-700 font-bold";
                    icon = <CheckCircle size={14} className="ml-2 inline text-emerald-600" />;
                  } else if (isSelected && !isThisCorrect) {
                    style = "text-red-600 font-semibold line-through decoration-red-300";
                  }

                  return (
                    <div key={opt} className={`text-sm p-2 rounded-lg ${style} ${isSelected || isThisCorrect ? 'bg-white/50' : ''}`}>
                       • {opt} {icon}
                    </div>
                  );
                })}
              </div>
              
              <div className="sm:ml-12 text-sm text-slate-500 bg-white/60 p-3 rounded-lg border border-slate-100">
                <span className="font-bold text-slate-700">Explanation:</span> {q.explanation}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};