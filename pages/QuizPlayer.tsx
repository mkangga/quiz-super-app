import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { Button } from '../components/Button';
import { ArrowLeft, CheckCircle, XCircle, RefreshCw, Trophy, ChevronRight } from 'lucide-react';

export const QuizPlayer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getQuizById } = useQuiz();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  const quiz = getQuizById(id || '');

  useEffect(() => {
    if (!quiz) {
      const timer = setTimeout(() => navigate('/'), 3000);
      return () => clearTimeout(timer);
    }
  }, [quiz, navigate]);

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-900">Kuis tidak ditemukan</h2>
          <p className="text-slate-500">Mengalihkan ke lobi...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / quiz.questions.length) * 100;

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === currentQuestion.correctAnswerIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsFinished(false);
    setIsAnswered(false);
  };

  // --- RESULT SCREEN ---
  if (isFinished) {
    const percentage = Math.round((score / quiz.questions.length) * 100);
    let message = "Usaha Bagus!";
    if (percentage === 100) message = "Sempurna! Kamu Jenius!";
    else if (percentage >= 80) message = "Luar Biasa!";
    else if (percentage >= 50) message = "Lumayan, terus belajar!";

    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-8 text-center border border-slate-100">
          <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-12 h-12 text-yellow-600" />
          </div>
          
          <h2 className="text-3xl font-bold text-slate-900 mb-2">{message}</h2>
          <p className="text-slate-500 mb-8">Kamu menyelesaikan <strong>{quiz.title}</strong></p>

          <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
             <div className="text-4xl font-extrabold text-indigo-600 mb-1">{score} / {quiz.questions.length}</div>
             <div className="text-sm font-medium text-slate-400 uppercase tracking-wide">Skor Akhir</div>
          </div>

          <div className="flex flex-col gap-3">
            <Button onClick={restartQuiz} variant="primary" className="w-full justify-center py-3" leftIcon={<RefreshCw className="w-4 h-4"/>}>
              Main Lagi
            </Button>
            <Button onClick={() => navigate('/')} variant="ghost" className="w-full justify-center py-3">
              Kembali ke Lobi
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // --- PLAYING SCREEN ---
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-200 px-4 py-4 flex items-center justify-between sticky top-0 z-10">
        <button onClick={() => navigate('/')} className="text-slate-500 hover:text-slate-900 transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex flex-col items-center">
          <h2 className="text-sm font-semibold text-slate-900 max-w-[200px] truncate">{quiz.title}</h2>
          <div className="text-xs text-slate-400">Pertanyaan {currentQuestionIndex + 1} dari {quiz.questions.length}</div>
        </div>
        <div className="w-6" /> {/* Spacer for centering */}
      </div>

      {/* Progress Bar */}
      <div className="h-1.5 bg-slate-200 w-full">
        <div 
          className="h-full bg-indigo-600 transition-all duration-500 ease-out" 
          style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }} 
        />
      </div>

      <div className="flex-1 max-w-2xl w-full mx-auto p-4 sm:p-8 flex flex-col justify-center">
        
        <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                {currentQuestion.text}
            </h1>
        </div>

        <div className="space-y-3 mb-8">
          {currentQuestion.options.map((option, idx) => {
            let stateClasses = "border-slate-200 hover:border-indigo-300 hover:bg-slate-50";
            let icon = null;

            if (isAnswered) {
                if (idx === currentQuestion.correctAnswerIndex) {
                    stateClasses = "border-green-500 bg-green-50 text-green-700 ring-1 ring-green-500";
                    icon = <CheckCircle className="w-5 h-5 text-green-600" />;
                } else if (idx === selectedOption) {
                    stateClasses = "border-red-500 bg-red-50 text-red-700 ring-1 ring-red-500";
                    icon = <XCircle className="w-5 h-5 text-red-600" />;
                } else {
                    stateClasses = "border-slate-100 text-slate-400 opacity-50";
                }
            } else if (selectedOption === idx) {
                 stateClasses = "border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600";
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionClick(idx)}
                disabled={isAnswered}
                className={`w-full text-left p-4 sm:p-5 rounded-xl border-2 font-medium transition-all duration-200 flex items-center justify-between group ${stateClasses}`}
              >
                <span className="flex-1">{option}</span>
                {icon}
              </button>
            );
          })}
        </div>

        {isAnswered && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-blue-800 mb-6 text-sm">
                    <strong>Penjelasan:</strong> {currentQuestion.explanation || "Tidak ada penjelasan."}
                </div>
                <div className="flex justify-end">
                    <Button 
                        onClick={handleNext} 
                        className="w-full sm:w-auto text-lg py-3 px-8 shadow-lg shadow-indigo-200"
                    >
                        {currentQuestionIndex === quiz.questions.length - 1 ? 'Selesai' : 'Pertanyaan Selanjutnya'} 
                        <ChevronRight className="w-5 h-5 ml-1" />
                    </Button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};