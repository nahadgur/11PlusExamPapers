import { Subject, Question, SchoolType, QuizType } from '../types';
import { getRandomQuestions } from '../data/questionBank';

// Static question selection — no AI or API calls
export const generateQuestions = async (
  subject: Subject,
  schoolType: SchoolType | null,
  topic?: string,
  quizType: QuizType = 'multiple-choice'
): Promise<Question[]> => {
  // Simulate slight loading delay for better UX
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Get 5 random questions from the question bank
  return getRandomQuestions(subject, quizType, 5, topic);
};
