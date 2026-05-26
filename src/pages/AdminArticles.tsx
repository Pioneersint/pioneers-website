import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Pencil, Trash2, Eye, Sparkles } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

const articles = [
  { id: '1', title: 'ISO 9001:2015 Implementation Guide', category: 'ISO Standards', author: 'Dr. Ahmad Hassan', status: 'PUBLISHED', views: 1247, date: 'May 15, 2025', aiGenerated: false },
  { id: '2', title: 'ESG Strategy Development Framework', category: 'ESG', author: 'Sarah Al-Rashid', status: 'PUBLISHED', views: 892, date: 'May 10, 2025', aiGenerated: false },
  { id: '3', title: 'AI-Generated: ISO 14001 Environmental Guide', category: 'ISO Standards', author: 'AI Assistant', status: 'PENDING_REVIEW', views: 0, date: 'May 16, 2025', aiGenerated: true },
  { id: '4', title: 'Corporate Governance in GCC', category: 'Governance', author: 'Mohammed Al-Farsi', status: 'PUBLISHED', views: 654, date: 'May 5, 2025', aiGenerated: false },
  { id: '5', title: 'AI-Generated: Risk Management Guide', category: 'Risk Management', author: 'AI Assistant', status: 'DRAFT', views: 0, date: 'May 16, 2025', aiGenerated: true },
];

const tabs = ['All', 'Published', 'Draft', 'Pending'];

export default function AdminArticles() {
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  const [showGenerate, setShowGenerate] = useState(false);
  const [genTopic, setGenTopic] = useState('');
  const [generating, setGenerating] = useState(false);

  const filtered = articles.filter(a => {
    const matchesTab = activeTab === 'All' || a.status === activeTab.toUpperCase() || (activeTab === 'Pending' && a.status === 'PENDING_REVIEW');
    return matchesTab && (!search || a.title.toLowerCase().includes(search.toLowerCase()));
  });

  const handleGenerate = async () => {
    if (!genTopic.trim()) return;
    setGenerating(true);
    await new Promise(r => setTimeout(r, 2000));
    setGenerating(false);
    setShowGenerate(false);
    setGenTopic('');
  };

  const statusBadge = (s: string) => {
    const map: Record<string, string> = { PUBLISHED: 'bg-emerald-light text-emerald', PENDING_REVIEW: 'bg-amber-light text-amber', DRAFT: 'bg-slate-100 text-slate-600' };
    return map[s] || 'bg-slate-100 text-slate-600';
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h3 className="text-xl font-bold text-slate-800">Articles</h3>
        <div className="flex gap-2">
          <button onClick={() => setShowGenerate(true)} className="flex items-center gap-2 px-4 py-2 bg-sky text-white rounded-lg text-sm font-medium hover:bg-sky-dark transition-colors">
            <Sparkles className="w-4 h-4" /> Generate with AI
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald text-white rounded-lg text-sm font-medium hover:bg-emerald-dark transition-colors">
            <Plus className="w-4 h-4" /> New Article
          </button>
        </div>
      </div>

      {/* Generate Modal */}
      {showGenerate && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-navy/50 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white rounded-2xl p-6 w-full max-w-lg">
            <h4 className="text-lg font-semibold text-slate-800 mb-4">Generate Article with AI</h4>
            <label className="block text-sm font-medium text-slate-700 mb-2">Topic</label>
            <input value={genTopic} onChange={e => setGenTopic(e.target.value)} placeholder="e.g., ISO 9001 implementation in healthcare" className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-lg focus:border-emerald outline-none text-sm mb-4" />
            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowGenerate(false)} className="px-4 py-2 text-slate-600 text-sm">Cancel</button>
              <button onClick={handleGenerate} disabled={generating} className="px-5 py-2 bg-emerald text-white rounded-lg text-sm font-medium flex items-center gap-2 disabled:opacity-50">
                {generating ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Generating...</> : <><Sparkles className="w-4 h-4" /> Generate</>}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <div className="flex gap-2">
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === t ? 'bg-emerald text-white' : 'bg-white text-slate-600 border border-slate-200'}`}>{t}</button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles..." className="w-full h-10 pl-10 pr-4 bg-white border border-slate-200 rounded-lg text-sm focus:border-emerald outline-none" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left px-4 py-3 text-slate-500 font-medium w-8"><input type="checkbox" className="rounded" /></th>
              <th className="text-left px-4 py-3 text-slate-500 font-medium">Title</th>
              <th className="text-left px-4 py-3 text-slate-500 font-medium">Category</th>
              <th className="text-left px-4 py-3 text-slate-500 font-medium">Author</th>
              <th className="text-left px-4 py-3 text-slate-500 font-medium">Status</th>
              <th className="text-left px-4 py-3 text-slate-500 font-medium">Views</th>
              <th className="text-left px-4 py-3 text-slate-500 font-medium">Date</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(a => (
              <tr key={a.id} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3"><input type="checkbox" className="rounded" /></td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-700">{a.title}</span>
                    {a.aiGenerated && <span className="text-[10px] bg-sky-light text-sky px-1.5 py-0.5 rounded font-medium">AI</span>}
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-500">{a.category}</td>
                <td className="px-4 py-3 text-slate-500">{a.author}</td>
                <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusBadge(a.status)}`}>{a.status.replace('_', ' ')}</span></td>
                <td className="px-4 py-3 text-slate-500">{a.views.toLocaleString()}</td>
                <td className="px-4 py-3 text-slate-500">{a.date}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button className="p-1.5 text-slate-400 hover:text-emerald transition-colors"><Eye className="w-4 h-4" /></button>
                    <button className="p-1.5 text-slate-400 hover:text-sky transition-colors"><Pencil className="w-4 h-4" /></button>
                    <button className="p-1.5 text-slate-400 hover:text-red transition-colors"><Trash2 className="w-4 h-4" /></button>
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
