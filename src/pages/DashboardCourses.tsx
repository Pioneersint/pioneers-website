import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Search } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const allCourses = [
  { id: '1', title: 'ISO 9001:2015 Fundamentals', category: 'ISO', level: 'Beginner', duration: 12, modules: 8, enrolled: true, progress: 75, thumbnail: '/assets/images/service-iso.jpg', isFree: true },
  { id: '2', title: 'ESG Strategy Development', category: 'ESG', level: 'Intermediate', duration: 18, modules: 12, enrolled: true, progress: 45, thumbnail: '/assets/images/service-esg.jpg', isFree: false, price: 49.99 },
  { id: '3', title: 'Corporate Governance Essentials', category: 'Governance', level: 'Beginner', duration: 10, modules: 6, enrolled: true, progress: 90, thumbnail: '/assets/images/service-governance.jpg', isFree: true },
  { id: '4', title: 'ISO 14001 Environmental Management', category: 'ISO', level: 'Intermediate', duration: 15, modules: 10, enrolled: false, progress: 0, thumbnail: '/assets/images/service-iso.jpg', isFree: false, price: 59.99 },
  { id: '5', title: 'Risk Management with ISO 31000', category: 'Risk', level: 'Advanced', duration: 20, modules: 14, enrolled: false, progress: 0, thumbnail: '/assets/images/insight-1.jpg', isFree: false, price: 79.99 },
  { id: '6', title: 'ISO 21001 for Educational Excellence', category: 'ISO', level: 'Intermediate', duration: 14, modules: 9, enrolled: false, progress: 0, thumbnail: '/assets/images/case-education.jpg', isFree: true },
];

const tabs = ['All', 'Enrolled', 'Available'];

export default function DashboardCourses() {
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = allCourses.filter(c => {
    const matchesTab = activeTab === 'All' || (activeTab === 'Enrolled' ? c.enrolled : !c.enrolled);
    const matchesSearch = !search || c.title.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex gap-2">
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === t ? 'bg-emerald text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>
              {t}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search courses..." className="w-full h-10 pl-10 pr-4 bg-white border border-slate-200 rounded-lg text-sm focus:border-emerald focus:ring-2 focus:ring-emerald/10 outline-none" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((course, i) => (
          <motion.div key={course.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
            <img src={course.thumbnail} alt={course.title} className="w-full h-36 object-cover" />
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium bg-emerald-light text-emerald px-2 py-0.5 rounded-full">{course.category}</span>
                <span className="text-xs text-slate-400">{course.level}</span>
              </div>
              <h5 className="font-semibold text-slate-800 mb-2">{course.title}</h5>
              <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{course.duration}h</span>
                <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />{course.modules} modules</span>
              </div>
              {course.enrolled ? (
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-600">{course.progress}% complete</span>
                    <span className="text-emerald font-medium">Continue</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald rounded-full" style={{ width: `${course.progress}%` }} />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800">{course.isFree ? 'Free' : `$${course.price}`}</span>
                  <button className="px-4 py-1.5 bg-emerald text-white rounded-full text-sm font-medium hover:bg-emerald-dark transition-colors">
                    {course.isFree ? 'Enroll Free' : 'Enroll Now'}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </DashboardLayout>
  );
}
