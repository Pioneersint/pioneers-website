import { useState } from 'react';

import { Plus, Search, Pencil, Trash2, Eye, BookOpen } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

const courses = [
  { id: '1', title: 'ISO 9001:2015 Fundamentals', category: 'ISO', level: 'Beginner', enrolled: 245, status: 'PUBLISHED', isFree: true },
  { id: '2', title: 'ESG Strategy Development', category: 'ESG', level: 'Intermediate', enrolled: 189, status: 'PUBLISHED', isFree: false, price: 49.99 },
  { id: '3', title: 'Corporate Governance Essentials', category: 'Governance', level: 'Beginner', enrolled: 312, status: 'PUBLISHED', isFree: true },
  { id: '4', title: 'ISO 14001 Environmental Mgmt', category: 'ISO', level: 'Intermediate', enrolled: 156, status: 'PUBLISHED', isFree: false, price: 59.99 },
  { id: '5', title: 'Risk Management ISO 31000', category: 'Risk', level: 'Advanced', enrolled: 98, status: 'DRAFT', isFree: false, price: 79.99 },
];

export default function AdminCourses() {
  const [search, setSearch] = useState('');
  const filtered = courses.filter(c => !search || c.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h3 className="text-xl font-bold text-slate-800">Courses</h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald text-white rounded-lg text-sm font-medium hover:bg-emerald-dark"><Plus className="w-4 h-4" /> New Course</button>
      </div>

      <div className="relative w-full sm:w-80 mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search courses..." className="w-full h-10 pl-10 pr-4 bg-white border border-slate-200 rounded-lg text-sm focus:border-emerald outline-none" />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left px-4 py-3 text-slate-500 font-medium">Course</th>
              <th className="text-left px-4 py-3 text-slate-500 font-medium">Category</th>
              <th className="text-left px-4 py-3 text-slate-500 font-medium">Level</th>
              <th className="text-left px-4 py-3 text-slate-500 font-medium">Enrolled</th>
              <th className="text-left px-4 py-3 text-slate-500 font-medium">Price</th>
              <th className="text-left px-4 py-3 text-slate-500 font-medium">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-3"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded bg-emerald-light flex items-center justify-center"><BookOpen className="w-4 h-4 text-emerald" /></div><span className="font-medium text-slate-700">{c.title}</span></div></td>
                <td className="px-4 py-3"><span className="text-xs bg-emerald-light text-emerald px-2 py-0.5 rounded-full">{c.category}</span></td>
                <td className="px-4 py-3 text-slate-500">{c.level}</td>
                <td className="px-4 py-3 text-slate-500">{c.enrolled}</td>
                <td className="px-4 py-3 font-medium text-slate-700">{c.isFree ? 'Free' : `$${c.price}`}</td>
                <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.status === 'PUBLISHED' ? 'bg-emerald-light text-emerald' : 'bg-slate-100 text-slate-500'}`}>{c.status}</span></td>
                <td className="px-4 py-3"><div className="flex gap-1"><button className="p-1.5 text-slate-400 hover:text-emerald"><Eye className="w-4 h-4" /></button><button className="p-1.5 text-slate-400 hover:text-sky"><Pencil className="w-4 h-4" /></button><button className="p-1.5 text-slate-400 hover:text-red"><Trash2 className="w-4 h-4" /></button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
