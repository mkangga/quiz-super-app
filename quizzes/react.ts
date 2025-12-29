import { Quiz } from '../types';

export const reactQuiz: Quiz = {
  id: 'q-react',
  title: 'Jago React JS',
  description: 'Tes kemampuan coding frontend kamu dengan soal-soal React modern.',
  category: 'Teknologi',
  difficulty: 'Medium',
  createdAt: Date.now(),
  questions: [
    {
      id: 'q1-1',
      text: 'Hook apa yang digunakan untuk side-effects?',
      options: ['useState', 'useEffect', 'useMemo', 'useRef'],
      correctAnswerIndex: 1,
      explanation: 'useEffect digunakan untuk menangani side-effects seperti data fetching atau langganan event.'
    },
    {
      id: 'q1-2',
      text: 'Apa kepanjangan dari JSX?',
      options: ['Javascript XML', 'Java Syntax Extension', 'JSON Xtreme', 'Javascript X-tier'],
      correctAnswerIndex: 0,
      explanation: 'JSX adalah ekstensi sintaks untuk JavaScript yang memungkinkan kita menulis HTML di dalam React.'
    }
  ]
};