import React from 'react';
import { Quiz } from '../types';
import { ExternalLink, Lock, Globe } from 'lucide-react';

interface QuizCardProps {
  quiz: Quiz;
  onPlay: (id: string) => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({ quiz, onPlay }) => {
  const isLocked = quiz.isLocked;
  const isExternal = !!quiz.externalUrl;

  return (
    <div 
      onClick={() => !isLocked && onPlay(quiz.id)}
      className={`
        group relative rounded-2xl border transition-all duration-300 p-6 flex flex-col justify-between h-full cursor-pointer
        ${isLocked 
          ? 'bg-slate-50 border-slate-200 opacity-70' 
          : 'bg-white border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-indigo-200'
        }
      `}
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <span className={`
            px-2 py-1 rounded text-xs font-medium border
            ${quiz.difficulty === 'Easy' ? 'bg-green-50 text-green-700 border-green-200' : 
              quiz.difficulty === 'Medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
              'bg-red-50 text-red-700 border-red-200'}
          `}>
            {quiz.difficulty === 'Easy' ? 'Mudah' : quiz.difficulty === 'Medium' ? 'Menengah' : 'Sulit'}
          </span>

          {isLocked ? (
             <Lock className="w-5 h-5 text-slate-400" />
          ) : (
             <span className="text-xs text-slate-500 flex items-center bg-slate-100 px-2 py-1 rounded-md border border-slate-200">
                {isExternal ? (
                  <>
                    <Globe className="w-3 h-3 mr-1.5" />
                    Website
                  </>
                ) : (
                  <>Soal Internal</>
                )}
             </span>
          )}
        </div>
        
        <h3 className={`text-xl font-bold mb-2 leading-tight transition-colors ${isLocked ? 'text-slate-500' : 'text-slate-900 group-hover:text-indigo-600'}`}>
          {quiz.title}
        </h3>

        <p className="text-slate-500 text-sm mb-4 line-clamp-2">
          {quiz.description}
        </p>
      </div>

      <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {quiz.category}
        </span>
        
        <div className="flex gap-2">
          {!isLocked && (
            <div 
              className="w-9 h-9 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-200 transform transition-transform group-hover:scale-110"
            >
              <ExternalLink className="w-4 h-4" />
            </div>
          )}
          {isLocked && (
             <span className="text-xs font-medium text-slate-400 bg-slate-200 px-2 py-1 rounded">Locked</span>
          )}
        </div>
      </div>
    </div>
  );
};