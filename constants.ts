import { Quiz } from './types';
import { externalQuizzes } from './quizzes/links';

// --- CARA MENAMBAH LINK KUIS BARU ---
// 1. Buka file 'quizzes/links.ts'
// 2. Tambahkan object baru ke dalam array dengan format yang sama.
// 3. Pastikan isi 'externalUrl' dengan link tujuan.

export const INITIAL_QUIZZES: Quiz[] = [
  ...externalQuizzes
];