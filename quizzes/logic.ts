import { Quiz } from '../types';

export const logicQuiz: Quiz = {
  id: 'q-soon',
  title: 'Kuis Logika Matematika',
  description: 'Tantangan logika tingkat tinggi untuk mengasah otak kiri kamu.',
  category: 'Logika',
  difficulty: 'Hard',
  createdAt: Date.now(),
  isLocked: true, // Locked status
  questions: []
};