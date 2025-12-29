import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { Button } from '../components/Button';
import { Quiz, Question } from '../types';
import { ArrowLeft, Plus, Trash2, Save, CheckCircle2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

// Helper simple ID generator
const generateId = () => Math.random().toString(36).substr(2, 9);

export const CreateQuiz: React.FC = () => {
  const navigate = useNavigate();
  const { addQuiz } = useQuiz();

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Easy');
  
  const [questions, setQuestions] = useState<Partial<Question>[]>([
    { id: generateId(), text: '', options: ['', '', '', ''], correctAnswerIndex: 0, explanation: '' }
  ]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { 
      id: generateId(), 
      text: '', 
      options: ['', '', '', ''], 
      correctAnswerIndex: 0, 
      explanation: '' 
    }]);
  };

  const handleRemoveQuestion = (index: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const updateQuestion = (index: number, field: keyof Question, value: any) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setQuestions(newQuestions);
  };

  const updateOption = (qIndex: number, oIndex: number, value: string) => {
    const newQuestions = [...questions];
    const newOptions = [...(newQuestions[qIndex].options || [])];
    newOptions[oIndex] = value;
    newQuestions[qIndex].options = newOptions;
    setQuestions(newQuestions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic Validation
    if (!title || !description || !category) {
      alert('Mohon lengkapi detail kuis.');
      return;
    }

    const isValidQuestions = questions.every(q => 
      q.text && q.options?.every(o => o)
    );

    if (!isValidQuestions) {
      alert('Mohon lengkapi semua pertanyaan dan pilihan jawaban.');
      return;
    }

    const newQuiz: Quiz = {
      id: generateId(),
      title,
      description,
      category,
      difficulty,
      createdAt: Date.now(),
      questions: questions as Question[]
    };

    addQuiz(newQuiz);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="text-slate-500 hover:text-slate-900">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-bold text-slate-900">Buat Kuis Baru</h1>
          </div>
          <Button onClick={handleSubmit} leftIcon={<Save className="w-4 h-4" />}>
            Simpan Kuis
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <form className="space-y-8">
          
          {/* Section 1: Quiz Details */}
          <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2">Informasi Kuis</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Judul Kuis</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Contoh: Sejarah Kemerdekaan RI"
                />
              </div>

              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi Singkat</label>
                <textarea 
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Tentang apa kuis ini?"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Kategori</label>
                <input 
                  type="text" 
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Contoh: Sejarah, Matematika"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tingkat Kesulitan</label>
                <select 
                  value={difficulty}
                  onChange={e => setDifficulty(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="Easy">Mudah</option>
                  <option value="Medium">Menengah</option>
                  <option value="Hard">Sulit</option>
                </select>
              </div>
            </div>
          </section>

          {/* Section 2: Questions */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Daftar Pertanyaan</h2>
              <span className="text-sm text-slate-500">{questions.length} Soal</span>
            </div>

            {questions.map((q, qIndex) => (
              <div key={q.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative group">
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    type="button"
                    onClick={() => handleRemoveQuestion(qIndex)}
                    className="text-slate-400 hover:text-red-600 p-1"
                    title="Hapus Soal"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Pertanyaan #{qIndex + 1}</label>
                  <input 
                    type="text" 
                    value={q.text}
                    onChange={e => updateQuestion(qIndex, 'text', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-lg font-medium"
                    placeholder="Tulis pertanyaan di sini..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {q.options?.map((opt, oIndex) => (
                    <div key={oIndex} className="relative">
                      <div className="flex items-center gap-2 mb-1">
                        <input 
                          type="radio" 
                          name={`correct-${q.id}`}
                          checked={q.correctAnswerIndex === oIndex}
                          onChange={() => updateQuestion(qIndex, 'correctAnswerIndex', oIndex)}
                          className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-xs text-slate-500">Pilihan {String.fromCharCode(65 + oIndex)} {q.correctAnswerIndex === oIndex && '(Jawaban Benar)'}</span>
                      </div>
                      <input 
                        type="text" 
                        value={opt}
                        onChange={e => updateOption(qIndex, oIndex, e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 outline-none ${q.correctAnswerIndex === oIndex ? 'border-green-300 bg-green-50 focus:ring-green-500' : 'border-slate-300 focus:ring-indigo-500'}`}
                        placeholder={`Jawaban ${String.fromCharCode(65 + oIndex)}`}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Penjelasan Jawaban (Opsional)</label>
                  <input 
                    type="text" 
                    value={q.explanation}
                    onChange={e => updateQuestion(qIndex, 'explanation', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm text-slate-600"
                    placeholder="Jelaskan kenapa jawaban tersebut benar..."
                  />
                </div>
              </div>
            ))}

            <button 
              type="button"
              onClick={handleAddQuestion}
              className="w-full py-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 font-medium hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" /> Tambah Pertanyaan Baru
            </button>
          </div>

        </form>
      </main>
    </div>
  );
};