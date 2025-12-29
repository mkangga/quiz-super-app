import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Wand2, BrainCircuit } from 'lucide-react';
import { Button } from '../components/Button';
import { generateQuizByTopic } from '../services/geminiService';
import { useQuiz } from '../context/QuizContext';

export const AiGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addQuiz } = useQuiz();
  const navigate = useNavigate();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsGenerating(true);
    setError(null);

    try {
      const newQuiz = await generateQuizByTopic(topic);
      addQuiz(newQuiz);
      navigate('/');
    } catch (err) {
      setError('Failed to generate quiz. Please check your API key and try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="flex-1 max-w-2xl w-full mx-auto px-4 py-12 flex flex-col justify-center">
        
        <button 
          onClick={() => navigate('/')} 
          className="self-start mb-8 text-slate-500 hover:text-indigo-600 flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Lobby
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

            <div className="relative z-10 text-center mb-8">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg transform rotate-3">
                    <Wand2 className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">AI Quiz Wizard</h1>
                <p className="text-slate-500">Enter a topic, and I'll generate a unique quiz for you instantly.</p>
            </div>

            <form onSubmit={handleGenerate} className="space-y-6 relative z-10">
                <div>
                    <label htmlFor="topic" className="block text-sm font-medium text-slate-700 mb-2">
                        What should the quiz be about?
                    </label>
                    <div className="relative">
                        <BrainCircuit className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            id="topic"
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="e.g. History of Rome, Javascript Arrays, 90s Music..."
                            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow outline-none text-lg"
                            autoFocus
                        />
                    </div>
                </div>

                {error && (
                    <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                        {error}
                    </div>
                )}

                <Button 
                    type="submit" 
                    className="w-full py-4 text-lg rounded-xl shadow-lg shadow-indigo-200"
                    isLoading={isGenerating}
                    disabled={!topic.trim()}
                    leftIcon={<Sparkles className="w-5 h-5" />}
                >
                    {isGenerating ? 'Dreaming up questions...' : 'Generate Quiz'}
                </Button>
            </form>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
            Powered by Google Gemini 3 Flash. Results may vary.
        </p>
      </div>
    </div>
  );
};