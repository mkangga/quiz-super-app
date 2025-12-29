import { Quiz } from '../types';

export const nabiQuiz: Quiz = {
  id: 'q-nabi',
  title: 'Kuis Kisah Nabi',
  description: 'Uji wawasanmu seputar kisah perjalanan para Nabi dan Rasul.',
  category: 'Sejarah Islam',
  difficulty: 'Easy',
  createdAt: Date.now(),
  questions: [
    {
      id: 'qn-1',
      text: 'Nabi manakah yang memiliki mukjizat membelah lautan?',
      options: ['Nabi Nuh AS', 'Nabi Musa AS', 'Nabi Ibrahim AS', 'Nabi Isa AS'],
      correctAnswerIndex: 1,
      explanation: 'Nabi Musa AS membelah Laut Merah dengan tongkatnya atas izin Allah SWT untuk menyelamatkan Bani Israel.'
    },
    {
      id: 'qn-2',
      text: 'Siapakah Nabi yang dijuluki Bapak Para Nabi (Abul Anbiya)?',
      options: ['Nabi Adam AS', 'Nabi Muhammad SAW', 'Nabi Ibrahim AS', 'Nabi Daud AS'],
      correctAnswerIndex: 2,
      explanation: 'Nabi Ibrahim AS disebut Abul Anbiya karena banyak nabi yang merupakan keturunannya.'
    },
    {
      id: 'qn-3',
      text: 'Nabi yang ditelan oleh ikan paus besar adalah...',
      options: ['Nabi Yunus AS', 'Nabi Yusuf AS', 'Nabi Yahya AS', 'Nabi Ayyub AS'],
      correctAnswerIndex: 0,
      explanation: 'Nabi Yunus AS ditelan ikan paus (Nun) saat meninggalkan kaumnya, dan bertobat di dalam perut ikan.'
    }
  ]
};