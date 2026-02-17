
export enum Subject {
  Maths = 'Maths',
  English = 'English',
  VerbalReasoning = 'Verbal Reasoning',
  NonVerbalReasoning = 'Non-Verbal Reasoning'
}

export enum SchoolType {
  Grammar = 'Grammar School',
  Private = 'Private School',
  State = 'State School'
}

export type QuizMode = 'exam' | 'practice';
export type QuizType = 'multiple-choice' | 'true-false' | 'fill-in-the-blank' | 'ordering';
export type Theme = 'default' | 'ocean' | 'jungle' | 'sunset' | 'midnight';

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  topic: string;
}

export interface QuizState {
  questions: Question[];
  currentIndex: number;
  score: number;
  completed: boolean;
  loading: boolean;
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  answersHistory: Record<string, string>;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconName: 'star' | 'medal' | 'zap' | 'trophy' | 'brain' | 'rocket';
  color: string;
  unlocked: boolean;
}

export interface SubjectProgress {
  totalQuestions: number;
  correctAnswers: number;
}

export interface UserStats {
  targetSchool: SchoolType | null;
  stars: number;
  streak: number;
  completedQuizzes: number;
  totalTimePlayed: number;
  badges: Badge[];
  progress: Record<string, SubjectProgress>;
}

export interface QuizResult {
  score: number;
  total: number;
  timeTaken: number;
  subject: Subject;
  pointsEarned: number;
  questions: Question[];
  userAnswers: Record<string, string>;
  mode: QuizMode;
}

export type Screen = 'onboarding' | 'dashboard' | 'topic-select' | 'quiz' | 'tutor' | 'progress' | 'leaderboard' | 'results' | 'review';
