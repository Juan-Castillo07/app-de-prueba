import { useState } from 'react';
import { GraduationCap, Sparkles, Loader2, Star, AlertCircle, MessageSquare } from 'lucide-react';
import { generateFeedback } from '../services/gemini';
import { Feedback } from '../types';

export default function GradingAssistant() {
  const [work, setWork] = useState('');
  const [criteria, setCriteria] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!work || !criteria) return;
    
    setLoading(true);
    try {
      const result = await generateFeedback(work, criteria);
      setFeedback(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Asistente de Calificación</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Obtén retroalimentación objetiva y constructiva para tus alumnos basada en tus propios criterios.</p>
      </header>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <form onSubmit={handleAnalyze} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Criterios de Evaluación</label>
            <input 
              type="text" 
              value={criteria}
              onChange={(e) => setCriteria(e.target.value)}
              placeholder="Ej. Ortografía, claridad de ideas, uso de fuentes..."
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all dark:text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Trabajo del Estudiante</label>
            <textarea 
              rows={8}
              value={work}
              onChange={(e) => setWork(e.target.value)}
              placeholder="Pega aquí el texto o ensayo del alumno..."
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all resize-none dark:text-white"
            />
          </div>
          <button 
            disabled={loading || !work || !criteria}
            className="w-full bg-indigo-600 dark:bg-indigo-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 dark:hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Analizando trabajo...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Analizar y Generar Feedback
              </>
            )}
          </button>
        </form>
      </div>

      {feedback && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Calificación Sugerida</h3>
              <div className="text-5xl font-black text-indigo-600 dark:text-indigo-400">{feedback.score}</div>
            </div>
            
            <div className="bg-indigo-600 dark:bg-indigo-700 p-6 rounded-2xl text-white shadow-lg shadow-indigo-500/20">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare size={20} />
                <h3 className="font-bold">Comentario para el Alumno</h3>
              </div>
              <p className="text-sm text-indigo-50 dark:text-indigo-100 leading-relaxed italic">
                "{feedback.personalizedComment}"
              </p>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-emerald-600 dark:text-emerald-400">
                <Star size={20} />
                <h3 className="font-bold">Fortalezas</h3>
              </div>
              <ul className="space-y-3">
                {feedback.strengths.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-amber-600 dark:text-amber-400">
                <AlertCircle size={20} />
                <h3 className="font-bold">Áreas de Mejora</h3>
              </div>
              <ul className="space-y-3">
                {feedback.areasForImprovement.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400 mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
