import { useState } from 'react';

import { Plus, Search, Upload, Download, Pencil, Trash2, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

const certificates = [
  { id: '1', certificateId: 'PI-ISO-2025-001', clientName: 'ABC Healthcare', type: 'ISO_9001', issueDate: '2025-01-15', expiryDate: '2028-01-14', status: 'ACTIVE' },
  { id: '2', certificateId: 'PI-ISO-2024-089', clientName: 'Jordan Manufacturing', type: 'ISO_14001', issueDate: '2024-03-10', expiryDate: '2025-03-09', status: 'EXPIRED' },
  { id: '3', certificateId: 'PI-ISO-2024-156', clientName: 'GCC Education', type: 'ISO_21001', issueDate: '2024-06-20', expiryDate: '2027-06-19', status: 'ACTIVE' },
  { id: '4', certificateId: 'PI-ISO-2024-203', clientName: 'MENA Logistics', type: 'ISO_45001', issueDate: '2024-09-01', expiryDate: '2027-08-31', status: 'ACTIVE' },
  { id: '5', certificateId: 'PI-REVOKED-001', clientName: 'Sample Co Ltd', type: 'ISO_9001', issueDate: '2024-06-01', expiryDate: '2027-05-31', status: 'REVOKED' },
];

export default function AdminCertificates() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [, setShowAdd] = useState(false);

  const filtered = certificates.filter(c => {
    const matchesSearch = !search || c.clientName.toLowerCase().includes(search.toLowerCase()) || c.certificateId.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusIcon = (s: string) => {
    if (s === 'ACTIVE') return <CheckCircle className="w-4 h-4 text-emerald" />;
    if (s === 'EXPIRED') return <AlertTriangle className="w-4 h-4 text-amber" />;
    return <XCircle className="w-4 h-4 text-red" />;
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h3 className="text-xl font-bold text-slate-800">Certificates</h3>
        <div className="flex gap-2 flex-wrap">
          <button className="flex items-center gap-2 px-3 py-2 bg-white text-slate-600 border border-slate-200 rounded-lg text-sm hover:bg-slate-50"><Upload className="w-4 h-4" /> Bulk Upload</button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white text-slate-600 border border-slate-200 rounded-lg text-sm hover:bg-slate-50"><Download className="w-4 h-4" /> Export</button>
          <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-4 py-2 bg-emerald text-white rounded-lg text-sm font-medium hover:bg-emerald-dark"><Plus className="w-4 h-4" /> New</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {['All', 'ACTIVE', 'EXPIRED'].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)} className={`p-4 rounded-xl border text-center transition-all ${statusFilter === s ? 'border-emerald bg-emerald-light' : 'border-slate-200 bg-white'}`}>
            <div className="text-2xl font-bold text-slate-800">{s === 'All' ? certificates.length : certificates.filter(c => c.status === s).length}</div>
            <div className="text-xs text-slate-500 mt-1">{s === 'All' ? 'Total' : s}</div>
          </button>
        ))}
      </div>

      <div className="relative w-full sm:w-80 mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search certificates..." className="w-full h-10 pl-10 pr-4 bg-white border border-slate-200 rounded-lg text-sm focus:border-emerald outline-none" />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left px-4 py-3 text-slate-500 font-medium">Certificate ID</th>
              <th className="text-left px-4 py-3 text-slate-500 font-medium">Client</th>
              <th className="text-left px-4 py-3 text-slate-500 font-medium">Type</th>
              <th className="text-left px-4 py-3 text-slate-500 font-medium">Issue Date</th>
              <th className="text-left px-4 py-3 text-slate-500 font-medium">Expiry</th>
              <th className="text-left px-4 py-3 text-slate-500 font-medium">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-3 font-mono text-xs text-slate-700">{c.certificateId}</td>
                <td className="px-4 py-3 font-medium text-slate-700">{c.clientName}</td>
                <td className="px-4 py-3 text-xs bg-slate-100 rounded-full w-fit">{c.type.replace('_', ' ')}</td>
                <td className="px-4 py-3 text-slate-500">{c.issueDate}</td>
                <td className="px-4 py-3 text-slate-500">{c.expiryDate}</td>
                <td className="px-4 py-3"><div className="flex items-center gap-1.5">{statusIcon(c.status)}<span className="text-xs font-medium">{c.status}</span></div></td>
                <td className="px-4 py-3"><div className="flex gap-1"><button className="p-1.5 text-slate-400 hover:text-sky"><Pencil className="w-4 h-4" /></button><button className="p-1.5 text-slate-400 hover:text-red"><Trash2 className="w-4 h-4" /></button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
