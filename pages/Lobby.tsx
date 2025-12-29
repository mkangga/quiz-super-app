import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { QuizCard } from '../components/QuizCard';
import { Search, LayoutGrid } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Lobby: React.FC = () => {
  const { quizzes } = useQuiz();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredQuizzes = quizzes.filter(q => 
    q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleQuizClick = (id: string) => {
    const quiz = quizzes.find(q => q.id === id);
    if (quiz?.externalUrl) {
      // Buka link eksternal di tab baru
      window.open(quiz.externalUrl, '_blank');
    } else {
      // Fallback jika masih ada kuis internal (opsional)
      navigate(`/play/${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-200 transform rotate-3 transition-transform hover:rotate-0">
              <LayoutGrid className="w-6 h-6 text-white" />
            </div>
            <div>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-none">
                  Quiz Super App
                </h1>
                <p className="text-xs text-slate-500 font-medium">by mkangga_</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             {/* Simple User Avatar Placeholder */}
             <div className="w-10 h-10 bg-slate-200 rounded-full border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                <span className="text-slate-500 font-bold text-sm">MKA</span>
             </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Dashboard Title & Search */}
        <div className="mb-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Pilih Kuis</h2>
          </div>
          
          <div className="relative w-full md:w-80 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder="Cari kuis..." 
              className="block w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm shadow-sm transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Categories / Quiz Grid */}
        {filteredQuizzes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredQuizzes.map(quiz => (
              <QuizCard 
                key={quiz.id} 
                quiz={quiz} 
                onPlay={handleQuizClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-300">
            <div className="mx-auto w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <Search className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Kuis tidak ditemukan</h3>
            <p className="text-slate-500 mb-4">Belum ada kuis yang cocok.</p>
          </div>
        )}
      </main>
    </div>
  );
};