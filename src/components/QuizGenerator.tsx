import { useState } from 'react';
import { FileQuestion, Sparkles, Loader2, Copy, Check, Eye, EyeOff } from 'lucide-react';
import { generateQuiz } from '../services/gemini';
import { Quiz } from '../types';

export default function QuizGenerator() {
  const [topic, setTopic] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) return;
    
    setLoading(true);
    try {
      const result = await generateQuiz(topic, numQuestions);
      setQuiz(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!quiz) return;
    const text = quiz.questions.map((q, i) => {
      return `${i + 1}. ${q.question}\n${q.options.map((opt, j) => `   ${String.fromCharCode(65 + j)}) ${opt}`).join('\n')}\n`;
    }).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Generador de Cuestionarios</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Crea evaluaciones rápidas y efectivas sobre cualquier tema en segundos.</p>
      </header>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Tema del cuestionario</label>
            <input 
              type="text" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Ej. Revolución Francesa, Fotosíntesis..."
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all dark:text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Número de preguntas</label>
            <input 
              type="number" 
              min="1"
              max="15"
              value={numQuestions}
              onChange={(e) => setNumQuestions(parseInt(e.target.value))}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all dark:text-white"
            />
          </div>
          <div className="md:col-span-3">
            <button 
              disabled={loading || !topic}
              className="w-full bg-indigo-600 dark:bg-indigo-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 dark:hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Redactando preguntas...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Generar Cuestionario
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {quiz && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{quiz.title}</h2>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowAnswers(!showAnswers)}
                className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                {showAnswers ? <EyeOff size={18} /> : <Eye size={18} />}
                {showAnswers ? 'Ocultar Respuestas' : 'Ver Respuestas'}
              </button>
              <button 
                onClick={copyToClipboard}
                className="px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? 'Copiado' : 'Copiar Preguntas'}
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {quiz.questions.map((q, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-lg font-medium text-slate-900 dark:text-white">{q.question}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-12">
                  {q.options.map((option, j) => (
                    <div 
                      key={j} 
                      className={cn(
                        "p-3 rounded-xl border text-sm transition-all",
                        showAnswers && option === q.correctAnswer
                          ? "bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 font-medium"
                          : "bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                      )}
                    >
                      <span className="font-bold mr-2">{String.fromCharCode(65 + j)})</span>
                      {option}
                    </div>
                  ))}
                </div>

                {showAnswers && (
                  <div className="ml-12 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-900/30 text-sm">
                    <p className="text-indigo-900 dark:text-indigo-300 font-semibold mb-1">Explicación:</p>
                    <p className="text-indigo-700 dark:text-indigo-400">{q.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
