import { useState } from 'react';
import { BookOpen, Sparkles, Loader2, Download, Copy, Check } from 'lucide-react';
import { generateLessonPlan } from '../services/gemini';
import { LessonPlan } from '../types';

export default function LessonPlanner() {
  const [topic, setTopic] = useState('');
  const [grade, setGrade] = useState('');
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<LessonPlan | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || !grade) return;
    
    setLoading(true);
    try {
      const result = await generateLessonPlan(topic, grade);
      setPlan(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!plan) return;
    const text = `
Plan de Lección: ${plan.title}
Objetivo: ${plan.objective}
Duración: ${plan.duration}

Materiales:
${plan.materials.map(m => `- ${m}`).join('\n')}

Actividades:
${plan.activities.map(a => `${a.time}: ${a.description}`).join('\n')}

Evaluación:
${plan.assessment}
    `;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Planificador de Lecciones</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Genera estructuras de clase completas y creativas con inteligencia artificial.</p>
      </header>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Tema de la lección</label>
            <input 
              type="text" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Ej. El ciclo del agua, Ecuaciones cuadráticas..."
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all dark:text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Nivel / Grado</label>
            <select 
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all dark:text-white"
            >
              <option value="">Seleccionar nivel</option>
              <option value="Primaria">Primaria</option>
              <option value="Secundaria">Secundaria</option>
              <option value="Preparatoria">Preparatoria</option>
              <option value="Universidad">Universidad</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <button 
              disabled={loading || !topic || !grade}
              className="w-full bg-indigo-600 dark:bg-indigo-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 dark:hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Generando plan maestro...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Generar Plan con IA
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {plan && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
                <BookOpen size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">{plan.title}</h2>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={copyToClipboard}
                className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
              >
                {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                {copied ? 'Copiado' : 'Copiar'}
              </button>
              <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium">
                <Download size={18} />
                PDF
              </button>
            </div>
          </div>

          <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section className="space-y-3">
                <h3 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Objetivo</h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{plan.objective}</p>
              </section>
              <section className="space-y-3">
                <h3 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Duración</h3>
                <p className="text-slate-700 dark:text-slate-300">{plan.duration}</p>
              </section>
            </div>

            <section className="space-y-4">
              <h3 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Materiales Necesarios</h3>
              <div className="flex flex-wrap gap-2">
                {plan.materials.map((item, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-sm">
                    {item}
                  </span>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Secuencia Didáctica</h3>
              <div className="space-y-4">
                {plan.activities.map((activity, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-100 dark:border-slate-800">
                    <div className="font-bold text-indigo-600 dark:text-indigo-400 whitespace-nowrap">{activity.time}</div>
                    <div className="text-slate-700 dark:text-slate-300">{activity.description}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-3 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-900/30">
              <h3 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Evaluación Sugerida</h3>
              <p className="text-slate-700 dark:text-slate-300 italic">{plan.assessment}</p>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
