import { motion } from 'framer-motion';
import { BookOpen, Award, MessageSquare, Clock, TrendingUp } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const stats = [
  { label: 'Courses Enrolled', value: '5', change: '+2', icon: BookOpen, color: 'bg-emerald-light text-emerald' },
  { label: 'Certificates', value: '3', change: '+1', icon: Award, color: 'bg-sky-light text-sky' },
  { label: 'Learning Hours', value: '47.5', change: '+12.3', icon: Clock, color: 'bg-amber-light text-amber' },
  { label: 'AI Consultations', value: '28', change: '+8', icon: MessageSquare, color: 'bg-purple-100 text-purple-600' },
];

const courses = [
  { title: 'ISO 9001:2015 Fundamentals', progress: 75, thumbnail: '/assets/images/service-iso.jpg', category: 'ISO' },
  { title: 'ESG Strategy Development', progress: 45, thumbnail: '/assets/images/service-esg.jpg', category: 'ESG' },
  { title: 'Corporate Governance Essentials', progress: 90, thumbnail: '/assets/images/service-governance.jpg', category: 'Governance' },
];

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="gradient-navy rounded-2xl p-6 mb-8 text-white"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-xl font-bold">Welcome back, {user?.name?.split(' ')[0] || 'User'}</h3>
            <p className="text-slate-300 mt-1">Here's your learning progress this week.</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">3</div>
            <div className="text-sm text-slate-300">courses in progress</div>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl p-5 border border-slate-200"
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`w-10 h-10 rounded-lg ${s.color} flex items-center justify-center`}>
                <s.icon className="w-5 h-5" />
              </span>
              <span className="text-xs font-medium text-emerald flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" />{s.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-800">{s.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Courses in Progress */}
      <h4 className="text-lg font-semibold text-slate-800 mb-4">Continue Learning</h4>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {courses.map((course, i) => (
          <motion.div
            key={course.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <img src={course.thumbnail} alt={course.title} className="w-full h-32 object-cover" />
            <div className="p-4">
              <span className="text-xs font-medium text-emerald bg-emerald-light px-2 py-0.5 rounded-full">{course.category}</span>
              <h5 className="font-semibold text-slate-800 mt-2 mb-3">{course.title}</h5>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald rounded-full transition-all" style={{ width: `${course.progress}%` }} />
                </div>
                <span className="text-xs font-medium text-slate-600">{course.progress}%</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-slate-200 p-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-light flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-emerald" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-slate-800">AI Consulting Assistant</h4>
            <p className="text-sm text-slate-500">Ask about ISO standards, ESG frameworks, or governance best practices.</p>
          </div>
          <a href="/dashboard/ai-agent" className="px-5 py-2 bg-emerald text-white rounded-full text-sm font-medium hover:bg-emerald-dark transition-colors">
            Open AI Assistant
          </a>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
