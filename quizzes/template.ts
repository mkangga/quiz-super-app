import { Quiz } from '../types';

// 1. Copy file ini.
// 2. Rename menjadi nama-kuis-baru.ts (misal: matematika.ts).
// 3. Ubah isi data di bawah ini sesuai kuis yang kamu mau.
// 4. Daftarkan di file 'constants.ts'.

export const templateQuiz: Quiz = {
  id: 'q-template-unik', // ID HARUS UNIK, tidak boleh sama dengan kuis lain
  title: 'Judul Kuis Baru',
  description: 'Deskripsi kuis yang menarik agar orang mau main.',
  category: 'Umum',
  difficulty: 'Medium', // Pilihan: 'Easy', 'Medium', 'Hard'
  createdAt: Date.now(),
  questions: [
    {
      id: 'q-1',
      text: 'Pertanyaan nomor 1 tulis di sini?',
      options: [
        'Jawaban A', // Index 0
        'Jawaban B', // Index 1
        'Jawaban C', // Index 2
        'Jawaban D'  // Index 3
      ],
      correctAnswerIndex: 0, // Kunci Jawaban: 0=A, 1=B, 2=C, 3=D
      explanation: 'Penjelasan kenapa jawaban ini benar (muncul setelah menjawab).'
    },
    {
      id: 'q-2',
      text: 'Pertanyaan nomor 2?',
      options: ['Salah', 'Salah', 'Benar', 'Salah'],
      correctAnswerIndex: 2,
      explanation: 'Karena yang benar adalah C.'
    }
  ]
};