import { useState } from 'react';

import { Search, Shield, UserX } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

const users = [
  { id: '1', name: 'Ahmad Hassan', email: 'ahmad@example.com', role: 'ADMIN', plan: 'Enterprise', status: 'ACTIVE', joined: 'Jan 2024' },
  { id: '2', name: 'Sarah Al-Rashid', email: 'sarah@example.com', role: 'CLIENT', plan: 'Pro', status: 'ACTIVE', joined: 'Mar 2025' },
  { id: '3', name: 'Mohammed Khalil', email: 'mkhalil@example.com', role: 'CLIENT', plan: 'Free', status: 'ACTIVE', joined: 'Apr 2025' },
  { id: '4', name: 'Layla Mansour', email: 'layla@example.com', role: 'CLIENT', plan: 'Pro', status: 'INACTIVE', joined: 'Feb 2025' },
  { id: '5', name: 'Omar Farouk', email: 'omar@example.com', role: 'CLIENT', plan: 'Enterprise', status: 'ACTIVE', joined: 'Jan 2025' },
];

export default function AdminUsers() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  const filtered = users.filter(u => {
    const matchesSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h3 className="text-xl font-bold text-slate-800">Users</h3>
        <div className="flex gap-2">
          {['All', 'ADMIN', 'CLIENT'].map(r => (
            <button key={r} onClick={() => setRoleFilter(r)} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${roleFilter === r ? 'bg-emerald text-white' : 'bg-white text-slate-600 border border-slate-200'}`}>{r}</button>
          ))}
        </div>
      </div>

      <div className="relative w-full sm:w-80 mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." className="w-full h-10 pl-10 pr-4 bg-white border border-slate-200 rounded-lg text-sm focus:border-emerald outline-none" />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left px-4 py-3 text-slate-500 font-medium">User</th>
              <th className="text-left px-4 py-3 text-slate-500 font-medium">Role</th>
              <th className="text-left px-4 py-3 text-slate-500 font-medium">Plan</th>
              <th className="text-left px-4 py-3 text-slate-500 font-medium">Status</th>
              <th className="text-left px-4 py-3 text-slate-500 font-medium">Joined</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">{u.name[0]}</div>
                    <div>
                      <p className="font-medium text-slate-700">{u.name}</p>
                      <p className="text-xs text-slate-400">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${u.role === 'ADMIN' ? 'bg-red-light text-red' : 'bg-slate-100 text-slate-600'}`}>{u.role}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs font-medium bg-emerald-light text-emerald px-2 py-0.5 rounded-full">{u.plan}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${u.status === 'ACTIVE' ? 'bg-emerald-light text-emerald' : 'bg-slate-100 text-slate-500'}`}>{u.status}</span>
                </td>
                <td className="px-4 py-3 text-slate-500">{u.joined}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button className="p-1.5 text-slate-400 hover:text-emerald"><Shield className="w-4 h-4" /></button>
                    <button className="p-1.5 text-slate-400 hover:text-red"><UserX className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
