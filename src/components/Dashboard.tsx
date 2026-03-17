import { 
  BookOpen, 
  FileQuestion, 
  GraduationCap, 
  Users, 
  ArrowRight,
  Clock,
  Calendar,
  Star
} from 'lucide-react';
import { View } from '../types';

interface DashboardProps {
  onNavigate: (view: View) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const stats = [
    { label: 'Clases Hoy', value: '4', icon: Clock, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Planes Creados', value: '12', icon: BookOpen, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
    { label: 'Tareas Pendientes', value: '28', icon: GraduationCap, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20' },
    { label: 'Total Alumnos', value: '124', icon: Users, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
  ];

  const recentActivity = [
    { title: 'Plan de Lección: Álgebra II', type: 'Planificador', time: 'Hace 2 horas' },
    { title: 'Cuestionario: Historia Universal', type: 'Cuestionarios', time: 'Hace 5 horas' },
    { title: 'Retroalimentación: Ensayo Literario', type: 'Calificador', time: 'Ayer' },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">¡Hola, Prof. Martínez! 👋</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Aquí tienes un resumen de tu actividad para hoy.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className="text-xs font-medium text-slate-400 dark:text-slate-500">Este mes</span>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button 
              onClick={() => onNavigate('lesson-planner')}
              className="group p-6 bg-indigo-600 dark:bg-indigo-700 rounded-2xl text-white text-left hover:bg-indigo-700 dark:hover:bg-indigo-800 transition-all"
            >
              <BookOpen className="mb-4 opacity-80" size={32} />
              <h3 className="text-lg font-bold mb-1">Crear Plan de Lección</h3>
              <p className="text-indigo-100 dark:text-indigo-200 text-sm mb-4">Genera una estructura completa con IA en segundos.</p>
              <div className="flex items-center gap-2 text-sm font-medium">
                Empezar <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <button 
              onClick={() => onNavigate('quiz-generator')}
              className="group p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-left hover:border-indigo-300 dark:hover:border-indigo-500 transition-all"
            >
              <FileQuestion className="mb-4 text-indigo-600 dark:text-indigo-400" size={32} />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Generar Cuestionario</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">Crea preguntas y respuestas sobre cualquier tema.</p>
              <div className="flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                Empezar <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>

          {/* Calendar/Schedule (Mock) */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-900 dark:text-white">Horario de Hoy</h3>
              <Calendar size={18} className="text-slate-400 dark:text-slate-500" />
            </div>
            <div className="space-y-4">
              {[
                { time: '08:00 - 09:30', subject: 'Matemáticas A', room: 'Aula 102', status: 'Completada' },
                { time: '10:00 - 11:30', subject: 'Álgebra II', room: 'Aula 204', status: 'En curso' },
                { time: '12:00 - 13:30', subject: 'Geometría', room: 'Aula 105', status: 'Pendiente' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="w-24 text-sm font-medium text-slate-500 dark:text-slate-400">{item.time}</div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 dark:text-white">{item.subject}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{item.room}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    item.status === 'Completada' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' :
                    item.status === 'En curso' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' : 
                    'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    {item.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Activity */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Actividad Reciente</h2>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                  <Star size={18} className="text-slate-400 dark:text-slate-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{activity.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{activity.type} • {activity.time}</p>
                </div>
              </div>
            ))}
            <button className="w-full py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
              Ver todo el historial
            </button>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-6 rounded-2xl text-white shadow-lg shadow-indigo-500/20">
            <h3 className="font-bold mb-2">Consejo del Día</h3>
            <p className="text-sm text-purple-100 leading-relaxed">
              "Usa el generador de cuestionarios para crear evaluaciones rápidas al final de cada clase y medir el progreso real."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
