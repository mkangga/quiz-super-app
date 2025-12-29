import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Quiz } from '../types';
import { INITIAL_QUIZZES } from '../constants';

interface QuizContextType {
  quizzes: Quiz[];
  getQuizById: (id: string) => Quiz | undefined;
  addQuiz: (quiz: Quiz) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Langsung memuat dari constants (Kode) sebagai sumber utama
  // Kita menghapus localStorage agar perubahan kode langsung terlihat tanpa cache lama
  const [quizzes, setQuizzes] = useState<Quiz[]>(INITIAL_QUIZZES);

  const getQuizById = (id: string) => {
    return quizzes.find(q => q.id === id);
  };

  const addQuiz = (quiz: Quiz) => {
    setQuizzes((prev) => [quiz, ...prev]);
  };

  return (
    <QuizContext.Provider value={{ quizzes, getQuizById, addQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};