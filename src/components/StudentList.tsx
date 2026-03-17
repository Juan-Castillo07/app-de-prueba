import { useState } from 'react';
import { Users, Search, Plus, MoreVertical, Mail, Phone, FileText } from 'lucide-react';

export default function StudentList() {
  const [searchTerm, setSearchTerm] = useState('');

  const students = [
    { id: 1, name: 'Ana García', email: 'ana.garcia@escuela.com', grade: '9º A', status: 'Excelente', avatar: 'AG' },
    { id: 2, name: 'Carlos Ruiz', email: 'carlos.ruiz@escuela.com', grade: '9º A', status: 'Regular', avatar: 'CR' },
    { id: 3, name: 'Elena Beltrán', email: 'elena.b@escuela.com', grade: '9º B', status: 'Excelente', avatar: 'EB' },
    { id: 4, name: 'Javier López', email: 'javi.lopez@escuela.com', grade: '9º A', status: 'En riesgo', avatar: 'JL' },
    { id: 5, name: 'Lucía Méndez', email: 'lucia.m@escuela.com', grade: '9º B', status: 'Bueno', avatar: 'LM' },
    { id: 6, name: 'Mario Duarte', email: 'mario.d@escuela.com', grade: '9º A', status: 'Bueno', avatar: 'MD' },
  ];

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Mis Estudiantes</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Gestiona el progreso y la información de tus alumnos.</p>
        </div>
        <button className="bg-indigo-600 dark:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20">
          <Plus size={20} />
          Nuevo Alumno
        </button>
      </header>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por nombre o grado..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-sm dark:text-white"
            />
          </div>
          <div className="flex items-center gap-2">
            <select className="px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none dark:text-white">
              <option>Todos los grados</option>
              <option>9º A</option>
              <option>9º B</option>
            </select>
            <button className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Estudiante</th>
                <th className="px-6 py-4">Grado</th>
                <th className="px-6 py-4">Desempeño</th>
                <th className="px-6 py-4">Contacto</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
                        {student.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">{student.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{student.grade}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      student.status === 'Excelente' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' :
                      student.status === 'Bueno' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                      student.status === 'Regular' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' :
                      'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-all">
                        <Mail size={16} />
                      </button>
                      <button className="p-2 text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-all">
                        <Phone size={16} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-all">
                        <FileText size={14} />
                        Reporte
                      </button>
                      <button className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredStudents.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={32} className="text-slate-300 dark:text-slate-600" />
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium">No se encontraron estudiantes con esos criterios.</p>
          </div>
        )}
      </div>
    </div>
  );
}
