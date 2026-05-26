import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Users, BookOpen, ShoppingCart, FileText,
  Settings, Edit3, Save, Eye, Trash2,
  LogOut, DollarSign, Lock, Globe, Phone,
  CheckCircle, XCircle, Clock, GraduationCap,
  Briefcase, Search,
  ChevronDown, ChevronUp, ShieldCheck, KeyRound,
  Palette, Smartphone, MapPin, Star,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';

type Tab = 'overview' | 'courses' | 'students' | 'orders' | 'applications' | 'content' | 'website' | 'settings' | 'security';

// Course curriculum data
const courseCurriculum: Record<string, { modules: { title: string; duration: string; content: string }[] }> = {
  'iso-9001-la': {
    modules: [
      { title: 'Module 1: Introduction to ISO 9001 & Quality Principles', duration: '60 min', content: 'Overview of ISO 9001:2015, history of quality management, benefits of certification, course structure and objectives.' },
      { title: 'Module 2: The Seven Quality Management Principles', duration: '45 min', content: 'Customer focus, leadership, engagement of people, process approach, improvement, evidence-based decisions, relationship management.' },
      { title: 'Module 3: Annex SL High Level Structure (HLS)', duration: '40 min', content: 'Universal framework for management systems, common terminology, identical core text across all ISO standards.' },
      { title: 'Module 4: Context of the Organization (Clause 4)', duration: '50 min', content: 'Understanding internal/external issues, needs of interested parties, scope of the QMS.' },
      { title: 'Module 5: Leadership & Commitment (Clause 5)', duration: '45 min', content: 'Top management responsibilities, quality policy, organizational roles and authorities.' },
      { title: 'Module 6: Planning (Clause 6)', duration: '50 min', content: 'Risks and opportunities, quality objectives, planning for changes.' },
      { title: 'Module 7: Support (Clause 7)', duration: '55 min', content: 'Resources, competence, awareness, communication, documented information.' },
      { title: 'Module 8: Operation (Clause 8)', duration: '60 min', content: 'Operational planning, requirements review, design and development, production and service provision.' },
      { title: 'Module 9: Performance Evaluation (Clause 9)', duration: '50 min', content: 'Monitoring, measurement, analysis, internal audit, management review.' },
      { title: 'Module 10: Improvement (Clause 10)', duration: '40 min', content: 'Nonconformity, corrective action, continual improvement, PDCA cycle.' },
      { title: 'Module 11: Auditing Principles & Types', duration: '45 min', content: 'First, second, third party audits, audit criteria, audit evidence, audit findings.' },
      { title: 'Module 12: Audit Planning & Preparation', duration: '50 min', content: 'Audit program, audit plan, checklists, sampling methods, document review.' },
      { title: 'Module 13: Opening Meeting', duration: '30 min', content: 'Setting expectations, establishing communication, confirming scope, audit methodology.' },
      { title: 'Module 14: Gathering Evidence & Interview Techniques', duration: '55 min', content: 'Questioning techniques, observation, sampling, document review, note-taking.' },
      { title: 'Module 15: Nonconformities & Writing Findings', duration: '50 min', content: 'Major vs minor nonconformities, objective evidence, writing clear findings.' },
      { title: 'Module 16: Audit Report Writing', duration: '45 min', content: 'Report structure, summary of findings, conclusions, recommendations.' },
      { title: 'Module 17: Closing Meeting', duration: '30 min', content: 'Presenting findings, discussing corrective actions, next steps.' },
      { title: 'Module 18: Corrective Action & Follow-up', duration: '40 min', content: 'Root cause analysis, corrective action plans, verification, follow-up audits.' },
      { title: 'Module 19: Case Study: Manufacturing Audit', duration: '60 min', content: 'Real-world manufacturing audit simulation, document review, process audit.' },
      { title: 'Module 20: Case Study: Service Organization Audit', duration: '60 min', content: 'Service organization audit simulation, customer interaction processes.' },
      { title: 'Module 21: Final Exam Preparation', duration: '45 min', content: 'Exam format, sample questions, study tips, certification process overview.' },
    ],
  },
  'iso-14001-la': {
    modules: [
      { title: 'Module 1: Introduction to Environmental Management', duration: '60 min', content: 'Environmental management fundamentals, ISO 14001 history, EMS benefits.' },
      { title: 'Module 2: Environmental Policy & Leadership', duration: '45 min', content: 'Environmental policy, leadership commitment, organizational roles.' },
      { title: 'Module 3: Environmental Aspects & Impacts', duration: '50 min', content: 'Identifying environmental aspects, evaluating significance, impact assessment.' },
      { title: 'Module 4: Legal & Compliance Obligations', duration: '55 min', content: 'Legal requirements, compliance evaluation, regulatory framework.' },
      { title: 'Module 5: Environmental Auditing Techniques', duration: '60 min', content: 'EMS audit planning, environmental audit checklists, report writing.' },
    ],
  },
  'iso-45001-la': {
    modules: [
      { title: 'Module 1: Introduction to OH&S Management', duration: '60 min', content: 'OH&S fundamentals, ISO 45001:2018 overview, safety culture.' },
      { title: 'Module 2: Hazard Identification & Risk Assessment', duration: '55 min', content: 'Hazard types, risk matrix, control hierarchy, incident investigation.' },
      { title: 'Module 3: OH&S Auditing', duration: '60 min', content: 'Safety audit planning, workplace inspections, audit reporting.' },
    ],
  },
  'iso-22000-la': {
    modules: [
      { title: 'Module 1: Food Safety Management Introduction', duration: '60 min', content: 'FSMS fundamentals, ISO 22000:2018 overview, prerequisite programs.' },
      { title: 'Module 2: HACCP Principles', duration: '55 min', content: 'Seven HACCP principles, CCP determination, critical limits, monitoring.' },
    ],
  },
  'iso-27001-la': {
    modules: [
      { title: 'Module 1: Information Security Management', duration: '60 min', content: 'ISMS fundamentals, ISO 27001:2022 overview, CIA triad.' },
      { title: 'Module 2: Annex A Controls', duration: '55 min', content: '93 security controls, risk treatment, Statement of Applicability.' },
    ],
  },
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [selectedCourse, setSelectedCourse] = useState('iso-9001-la');
  const [selectedModule, setSelectedModule] = useState(0);
  const [expandedCourse, setExpandedCourse] = useState<string | null>('iso-9001-la');
  const [editingContent, setEditingContent] = useState(false);
  const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const [siteContent, setSiteContent] = useState({
    homeTitle: 'Leading Business Transformation\nAcross the MENA Region',
    homeSubtitle: 'Pioneers International provides world-class consulting services in ISO certification, ESG advisory, corporate governance, and business transformation across 8 countries.',
    aboutTitle: 'About Pioneers International',
    aboutText: 'Founded in 2015, Pioneers International (رواد الفكر الدولية لاستشارات الأعمال) has grown to become a trusted partner for organizations seeking excellence in quality management, environmental sustainability, occupational health and safety, food safety, and information security.',
    servicesTitle: 'Our Services',
    contactEmail: 'info@pioneersint.com',
    contactPhone: '+962 6 123 4567',
    whatsappNumber: '+962 78 159 5846',
    address: 'Khalda - Wasfi At-Tall St. 183\nAl-Qaswa Complex, Office 203\nAmman, Jordan',
    metaDescription: 'Pioneers International - Leading ISO certification and business consulting firm in the MENA region.',
    primaryColor: '#0f1f33',
    accentColor: '#0ca750',
  });

  useEffect(() => {
    if (localStorage.getItem('adminAuth') !== 'true') {
      navigate('/admin-login');
    }
    const saved = localStorage.getItem('siteContent');
    if (saved) setSiteContent(JSON.parse(saved));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin-login');
  };

  const handleSaveContent = () => {
    localStorage.setItem('siteContent', JSON.stringify(siteContent));
    setEditingContent(false);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    if (passwordData.current !== 'WaelS.Alkhatib@2026!') {
      setPasswordError('Current password is incorrect');
      return;
    }
    if (passwordData.new.length < 8) {
      setPasswordError('New password must be at least 8 characters');
      return;
    }
    if (passwordData.new !== passwordData.confirm) {
      setPasswordError('Passwords do not match');
      return;
    }
    setPasswordSuccess(true);
    setTimeout(() => { setPasswordSuccess(false); }, 2000);
  };

  const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: 'overview', label: 'Overview', icon: LayoutDashboard },
    { key: 'courses', label: 'Course Content', icon: BookOpen },
    { key: 'students', label: 'Students', icon: Users },
    { key: 'orders', label: 'Orders', icon: ShoppingCart },
    { key: 'applications', label: 'Job Applications', icon: Briefcase },
    { key: 'content', label: 'Edit Content', icon: Edit3 },
    { key: 'website', label: 'Website Pages', icon: Globe },
    { key: 'settings', label: 'Settings', icon: Settings },
    { key: 'security', label: 'Security', icon: ShieldCheck },
  ];

  const coursesList = [
    { id: 'iso-9001-la', title: 'ISO 9001:2015 Lead Auditor', students: 1250, price: 299, modules: 21, status: 'active' },
    { id: 'iso-14001-la', title: 'ISO 14001:2015 Lead Auditor', students: 890, price: 299, modules: 5, status: 'active' },
    { id: 'iso-45001-la', title: 'ISO 45001:2018 Lead Auditor', students: 1100, price: 299, modules: 3, status: 'active' },
    { id: 'iso-22000-la', title: 'ISO 22000 + HACCP Lead Auditor', students: 720, price: 299, modules: 2, status: 'active' },
    { id: 'iso-27001-la', title: 'ISO 27001:2022 Lead Auditor', students: 680, price: 299, modules: 2, status: 'active' },
    { id: 'iso-21001-la', title: 'ISO 21001:2018 Lead Auditor', students: 350, price: 249, modules: 1, status: 'active' },
    { id: 'iso-50001-la', title: 'ISO 50001:2018 Lead Auditor', students: 280, price: 249, modules: 1, status: 'active' },
    { id: 'ims-la', title: 'IMS Lead Auditor', students: 540, price: 399, modules: 1, status: 'active' },
  ];

  const stats = [
    { label: 'Total Students', value: '5,710', change: '+12%', icon: Users, color: 'bg-blue-50 text-blue-600' },
    { label: 'Active Courses', value: '8', change: '+0%', icon: BookOpen, color: 'bg-emerald/5 text-emerald' },
    { label: 'Total Revenue', value: '$84,700', change: '+18%', icon: DollarSign, color: 'bg-amber/5 text-amber' },
    { label: 'Course Modules', value: '36', change: '+8%', icon: GraduationCap, color: 'bg-purple-50 text-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO title="Admin Dashboard | Pioneers International" />
      {/* Header */}
      <header className="bg-navy text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-[1440px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald flex items-center justify-center">
              <span className="font-black text-navy text-sm">PI</span>
            </div>
            <div>
              <h1 className="font-bold text-sm leading-tight">Pioneers International</h1>
              <p className="text-[10px] text-slate-400">Admin Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-300">Wael S. Alkhatib</span>
            <div className="w-8 h-8 rounded-full bg-emerald/20 flex items-center justify-center">
              <span className="text-emerald font-bold text-xs">WA</span>
            </div>
            <button onClick={handleLogout} className="p-2 hover:bg-white/10 rounded-lg transition-colors" title="Logout">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1440px] mx-auto px-4 py-6 flex gap-6">
        {/* Sidebar */}
        <aside className="w-64 shrink-0">
          <nav className="space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.key
                    ? 'bg-navy text-white shadow-md'
                    : 'text-slate-600 hover:bg-white hover:shadow-sm'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {tab.key === 'applications' && (
                  <span className="ml-auto bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">3</span>
                )}
              </button>
            ))}
          </nav>

          {/* Quick Links */}
          <div className="mt-8 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Quick Links</h3>
            <div className="space-y-2">
              {['/', '/lms', '/store', '/careers', '/contact'].map(path => (
                <a key={path} href={path} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-slate-600 hover:text-navy transition-colors py-1">
                  <Eye className="w-3 h-3" /> View {path === '/' ? 'Home' : path.replace('/', '')}
                </a>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-bold text-navy mb-6">Dashboard Overview</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 rounded-lg ${stat.color.split(' ')[0]} flex items-center justify-center`}>
                        <stat.icon className={`w-5 h-5 ${stat.color.split(' ')[1]}`} />
                      </div>
                      <span className="text-xs font-medium text-emerald bg-emerald/10 px-2 py-0.5 rounded-full">{stat.change}</span>
                    </div>
                    <div className="text-2xl font-bold text-navy">{stat.value}</div>
                    <div className="text-xs text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Charts Row */}
              <div className="grid lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                  <h3 className="font-semibold text-slate-800 mb-4">Monthly Revenue (2026)</h3>
                  <div className="space-y-3">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, i) => (
                      <div key={month} className="flex items-center gap-3">
                        <span className="text-xs text-slate-500 w-8">{month}</span>
                        <div className="flex-1 h-6 bg-slate-50 rounded-full overflow-hidden">
                          <div className="h-full bg-navy rounded-full flex items-center px-2 transition-all" style={{ width: `${[45, 52, 48, 61, 58, 70][i]}%` }}>
                            <span className="text-[10px] text-white font-medium">${[8200, 9500, 8800, 11200, 10600, 12800][i]}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                  <h3 className="font-semibold text-slate-800 mb-4">Course Enrollment Distribution</h3>
                  <div className="space-y-3">
                    {coursesList.map(c => (
                      <div key={c.id} className="flex items-center gap-3">
                        <span className="text-xs text-slate-600 w-24 truncate">{c.title.split(' ')[1]}</span>
                        <div className="flex-1 h-5 bg-slate-50 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald rounded-full" style={{ width: `${(c.students / 1250) * 100}%` }} />
                        </div>
                        <span className="text-xs text-slate-500 w-10 text-right">{c.students}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                <h3 className="font-semibold text-slate-800 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {[
                    { action: 'New student enrolled', detail: 'ISO 9001 Lead Auditor — Ahmad Hassan', time: '2h ago', icon: Users },
                    { action: 'Payment received', detail: 'Order #PI-124 — $299 (ISO 9001)', time: '4h ago', icon: DollarSign },
                    { action: 'Job application', detail: 'Senior ISO Consultant — Sarah Khalil', time: '1d ago', icon: Briefcase },
                    { action: 'Module completed', detail: 'ISO 14001 M3 — Mohammad Ali', time: '1d ago', icon: CheckCircle },
                  ].map((a, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                      <div className="w-8 h-8 rounded-lg bg-emerald/10 flex items-center justify-center shrink-0">
                        <a.icon className="w-4 h-4 text-emerald" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-700">{a.action}</p>
                        <p className="text-xs text-slate-500">{a.detail}</p>
                      </div>
                      <span className="text-xs text-slate-400 shrink-0">{a.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* COURSES TAB — Full Course Content Viewer */}
          {activeTab === 'courses' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-navy">Course Content Manager</h2>
                <span className="text-sm text-slate-500">{Object.values(courseCurriculum).reduce((s, c) => s + c.modules.length, 0)} total modules</span>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Course List */}
                <div className="space-y-2">
                  {coursesList.map(course => (
                    <div key={course.id}>
                      <button
                        onClick={() => { setSelectedCourse(course.id); setExpandedCourse(expandedCourse === course.id ? null : course.id); setSelectedModule(0); }}
                        className={`w-full text-left p-4 rounded-xl transition-all ${
                          selectedCourse === course.id ? 'bg-navy text-white shadow-md' : 'bg-white hover:bg-slate-50 border border-slate-100'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-sm">{course.title}</span>
                          {expandedCourse === course.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                        <div className={`flex items-center gap-3 mt-2 text-xs ${selectedCourse === course.id ? 'text-slate-300' : 'text-slate-500'}`}>
                          <span>{course.modules} modules</span>
                          <span>{course.students} students</span>
                          <span>${course.price}</span>
                        </div>
                      </button>

                      {/* Module List */}
                      {expandedCourse === course.id && courseCurriculum[course.id] && (
                        <div className="ml-4 mt-1 space-y-1">
                          {courseCurriculum[course.id].modules.map((mod, i) => (
                            <button
                              key={i}
                              onClick={() => { setSelectedCourse(course.id); setSelectedModule(i); }}
                              className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center gap-2 ${
                                selectedCourse === course.id && selectedModule === i
                                  ? 'bg-emerald/10 text-emerald font-medium'
                                  : 'text-slate-600 hover:bg-slate-50'
                              }`}
                            >
                              <BookOpen className="w-3 h-3" />
                              <span className="truncate">{mod.title}</span>
                              <span className="ml-auto text-slate-400 shrink-0">{mod.duration}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Module Content Viewer */}
                <div className="lg:col-span-2">
                  {selectedCourse && courseCurriculum[selectedCourse] && (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                      {/* Module Header */}
                      <div className="bg-navy px-6 py-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-emerald text-xs font-semibold uppercase tracking-wider">
                              {coursesList.find(c => c.id === selectedCourse)?.title}
                            </span>
                            <h3 className="text-white font-bold mt-1">
                              {courseCurriculum[selectedCourse].modules[selectedModule]?.title}
                            </h3>
                          </div>
                          <span className="text-slate-400 text-sm flex items-center gap-1">
                            <Clock className="w-4 h-4" /> {courseCurriculum[selectedCourse].modules[selectedModule]?.duration}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="prose max-w-none">
                          <h4 className="text-lg font-semibold text-navy mb-3">Module Overview</h4>
                          <p className="text-slate-600 leading-relaxed mb-6">
                            {courseCurriculum[selectedCourse].modules[selectedModule]?.content}
                          </p>

                          <h4 className="text-lg font-semibold text-navy mb-3">Learning Objectives</h4>
                          <ul className="space-y-2 mb-6">
                            {[
                              'Understand the key concepts and requirements',
                              'Apply the principles in real-world audit scenarios',
                              'Demonstrate competence as a Lead Auditor',
                              'Pass the certification examination',
                            ].map((obj, i) => (
                              <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                                <CheckCircle className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
                                {obj}
                              </li>
                            ))}
                          </ul>

                          <h4 className="text-lg font-semibold text-navy mb-3">Key Topics Covered</h4>
                          <div className="grid grid-cols-2 gap-2 mb-6">
                            {[
                              'Standard requirements',
                              'Audit planning',
                              'Evidence gathering',
                              'Nonconformity reporting',
                              'Corrective actions',
                              'Management review',
                            ].map((topic, i) => (
                              <div key={i} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg text-sm text-slate-600">
                                <Star className="w-3 h-3 text-amber" /> {topic}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Navigation */}
                      <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
                        <button
                          onClick={() => setSelectedModule(Math.max(0, selectedModule - 1))}
                          disabled={selectedModule === 0}
                          className="px-4 py-2 text-sm text-slate-600 hover:text-navy disabled:opacity-30 transition-colors"
                        >
                          Previous Module
                        </button>
                        <span className="text-xs text-slate-400">
                          Module {selectedModule + 1} of {courseCurriculum[selectedCourse].modules.length}
                        </span>
                        <button
                          onClick={() => setSelectedModule(Math.min(courseCurriculum[selectedCourse].modules.length - 1, selectedModule + 1))}
                          disabled={selectedModule === courseCurriculum[selectedCourse].modules.length - 1}
                          className="px-4 py-2 bg-emerald text-white rounded-lg text-sm font-medium hover:bg-emerald-dark disabled:opacity-30 transition-colors"
                        >
                          Next Module
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* STUDENTS */}
          {activeTab === 'students' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-bold text-navy mb-6">Student Management</h2>
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center gap-4">
                  <div className="flex-1 relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input placeholder="Search students..." className="w-full h-10 pl-10 pr-4 border border-slate-200 rounded-lg text-sm" />
                  </div>
                  <select className="h-10 px-3 border border-slate-200 rounded-lg text-sm">
                    <option>All Courses</option>
                    {coursesList.map(c => <option key={c.id}>{c.title}</option>)}
                  </select>
                  <select className="h-10 px-3 border border-slate-200 rounded-lg text-sm">
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Completed</option>
                  </select>
                </div>
                <table className="w-full text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-slate-600">Student</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-600">Course</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-600">Progress</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-600">Status</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-600">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Ahmad Hassan', email: 'ahmad@email.com', course: 'ISO 9001', progress: 65, status: 'active', date: 'May 2026' },
                      { name: 'Sarah Khalil', email: 'sarah@email.com', course: 'ISO 14001', progress: 80, status: 'active', date: 'Apr 2026' },
                      { name: 'Mohammad Ali', email: 'mohammad@email.com', course: 'ISO 9001', progress: 100, status: 'completed', date: 'Mar 2026' },
                      { name: 'Lina Saeed', email: 'lina@email.com', course: 'ISO 27001', progress: 30, status: 'active', date: 'May 2026' },
                      { name: 'Omar Farouk', email: 'omar@email.com', course: 'ISO 45001', progress: 45, status: 'active', date: 'Feb 2026' },
                    ].map((s, i) => (
                      <tr key={i} className="border-t border-slate-50">
                        <td className="px-4 py-3">
                          <p className="font-medium text-slate-700">{s.name}</p>
                          <p className="text-xs text-slate-400">{s.email}</p>
                        </td>
                        <td className="px-4 py-3 text-slate-600">{s.course}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald rounded-full" style={{ width: `${s.progress}%` }} />
                            </div>
                            <span className="text-xs text-slate-500">{s.progress}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                            s.status === 'completed' ? 'bg-emerald/10 text-emerald' : 'bg-blue-50 text-blue-600'
                          }`}>{s.status}</span>
                        </td>
                        <td className="px-4 py-3 text-slate-500">{s.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* ORDERS */}
          {activeTab === 'orders' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-bold text-navy mb-6">Order Management</h2>
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-slate-600">Order ID</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-600">Customer</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-600">Items</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-600">Amount</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-600">Status</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-600">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 'PI-2026-0125', customer: 'Ahmad Hassan', items: ['ISO 9001 Course'], amount: 299, status: 'paid', date: 'May 18, 2026' },
                      { id: 'PI-2026-0124', customer: 'Sarah Khalil', items: ['ISO 14001 + PPT'], amount: 349, status: 'paid', date: 'May 16, 2026' },
                      { id: 'PI-2026-0123', customer: 'Mohammad Ali', items: ['ISO 45001 Course'], amount: 149.5, status: 'pending', date: 'May 15, 2026' },
                      { id: 'PI-2026-0122', customer: 'Lina Saeed', items: ['Complete Bundle'], amount: 999, status: 'paid', date: 'May 12, 2026' },
                    ].map(o => (
                      <tr key={o.id} className="border-t border-slate-50">
                        <td className="px-4 py-3 font-medium text-navy">{o.id}</td>
                        <td className="px-4 py-3 text-slate-700">{o.customer}</td>
                        <td className="px-4 py-3 text-slate-500">{o.items.join(', ')}</td>
                        <td className="px-4 py-3 font-medium">${o.amount}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                            o.status === 'paid' ? 'bg-emerald/10 text-emerald' : o.status === 'pending' ? 'bg-amber/10 text-amber' : 'bg-red-100 text-red-600'
                          }`}>{o.status}</span>
                        </td>
                        <td className="px-4 py-3 text-slate-500">{o.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* APPLICATIONS */}
          {activeTab === 'applications' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-bold text-navy mb-6">Job Applications</h2>
              {[
                { name: 'Sarah Khalil', email: 'sarah@email.com', phone: '+962 79 123 4567', position: 'Senior ISO 9001 Lead Auditor', experience: '5-10 years', education: "Master's Degree", cv: 'Sarah_Khalil_CV.pdf', status: 'new', date: 'May 15, 2026' },
                { name: 'Omar Farouk', email: 'omar@email.com', phone: '+962 78 987 6543', position: 'ESG & Corporate Governance Advisor', experience: '10+ years', education: 'PhD', cv: 'Omar_Farouk_CV.pdf', status: 'reviewed', date: 'May 12, 2026' },
                { name: 'Lina Saeed', email: 'lina@email.com', phone: '+962 77 456 7890', position: 'Business Development Manager', experience: '2-5 years', education: "Bachelor's Degree", cv: 'Lina_Saeed_CV.pdf', status: 'shortlisted', date: 'May 8, 2026' },
              ].map((app, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 mb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-slate-800">{app.name}</h3>
                      <p className="text-sm text-slate-500">{app.email} | {app.phone}</p>
                      <p className="text-xs text-slate-400 mt-1">Applied: {app.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <select defaultValue={app.status} className="text-xs border border-slate-200 rounded-lg px-2 py-1">
                        <option value="new">New</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                      <button className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 text-sm mb-4">
                    <div><span className="font-medium text-slate-600">Position:</span> <span className="text-slate-700">{app.position}</span></div>
                    <div><span className="font-medium text-slate-600">Experience:</span> <span className="text-slate-700">{app.experience}</span></div>
                    <div><span className="font-medium text-slate-600">Education:</span> <span className="text-slate-700">{app.education}</span></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full flex items-center gap-1">
                      <FileText className="w-3 h-3" /> CV: {app.cv}
                    </span>
                    <button className="text-xs text-emerald hover:underline">View CV</button>
                    <button className="text-xs text-navy hover:underline">Download CV</button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* EDIT CONTENT */}
          {activeTab === 'content' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-navy">Edit Site Content</h2>
                <div className="flex items-center gap-2">
                  {editingContent && (
                    <button onClick={() => setEditingContent(false)} className="px-4 py-2 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50">
                      Cancel
                    </button>
                  )}
                  <button
                    onClick={editingContent ? handleSaveContent : () => setEditingContent(true)}
                    className="px-4 py-2 bg-navy text-white rounded-lg text-sm font-medium hover:bg-navy-light transition-colors flex items-center gap-2"
                  >
                    {editingContent ? <><Save className="w-4 h-4" /> Save Changes</> : <><Edit3 className="w-4 h-4" /> Edit Content</>}
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {/* Home Page */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                  <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2"><Globe className="w-5 h-5 text-emerald" /> Home Page</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Hero Title</label>
                      <textarea
                        value={siteContent.homeTitle} onChange={e => setSiteContent({ ...siteContent, homeTitle: e.target.value })}
                        disabled={!editingContent} rows={2}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm disabled:bg-slate-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Hero Subtitle</label>
                      <textarea
                        value={siteContent.homeSubtitle} onChange={e => setSiteContent({ ...siteContent, homeSubtitle: e.target.value })}
                        disabled={!editingContent} rows={3}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm disabled:bg-slate-50"
                      />
                    </div>
                  </div>
                </div>

                {/* About Page */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                  <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-blue-500" /> About Page</h3>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">About Text</label>
                    <textarea
                      value={siteContent.aboutText} onChange={e => setSiteContent({ ...siteContent, aboutText: e.target.value })}
                      disabled={!editingContent} rows={5}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm disabled:bg-slate-50"
                    />
                  </div>
                </div>

                {/* Contact Info */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                  <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2"><Phone className="w-5 h-5 text-amber" /> Contact Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                      <input
                        value={siteContent.contactEmail} onChange={e => setSiteContent({ ...siteContent, contactEmail: e.target.value })}
                        disabled={!editingContent}
                        className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm disabled:bg-slate-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                      <input
                        value={siteContent.contactPhone} onChange={e => setSiteContent({ ...siteContent, contactPhone: e.target.value })}
                        disabled={!editingContent}
                        className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm disabled:bg-slate-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">WhatsApp</label>
                      <input
                        value={siteContent.whatsappNumber} onChange={e => setSiteContent({ ...siteContent, whatsappNumber: e.target.value })}
                        disabled={!editingContent}
                        className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm disabled:bg-slate-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                      <textarea
                        value={siteContent.address} onChange={e => setSiteContent({ ...siteContent, address: e.target.value })}
                        disabled={!editingContent} rows={3}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm disabled:bg-slate-50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* WEBSITE PAGES */}
          {activeTab === 'website' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-bold text-navy mb-6">Website Pages</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { page: 'Home', path: '/', desc: 'Main landing page with hero, services, stats', status: 'published' },
                  { page: 'About', path: '/about', desc: 'Company history, team, mission, vision', status: 'published' },
                  { page: 'Services', path: '/services', desc: 'All consulting services with details', status: 'published' },
                  { page: 'LMS', path: '/lms', desc: 'Learning management system, 8 courses', status: 'published' },
                  { page: 'PDF Store', path: '/store', desc: 'Training materials store with checkout', status: 'published' },
                  { page: 'Gap Analysis', path: '/gap-analysis', desc: 'Free ISO gap analysis tool', status: 'published' },
                  { page: 'Training Calendar', path: '/training-calendar', desc: 'Upcoming training events', status: 'published' },
                  { page: 'Certificate Verify', path: '/verify-certificate', desc: 'Certificate verification system', status: 'published' },
                  { page: 'Brand Index', path: '/brand-index', desc: 'MENA benchmarking reports', status: 'published' },
                  { page: 'Gallery', path: '/gallery', desc: 'Photo gallery (40 images)', status: 'published' },
                  { page: 'Careers', path: '/careers', desc: 'Job listings with application form', status: 'published' },
                  { page: 'Contact', path: '/contact', desc: 'Contact form and information', status: 'published' },
                  { page: 'Blog', path: '/blog', desc: 'AI-generated insights articles', status: 'published' },
                ].map((p, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-800">{p.page}</h3>
                      <p className="text-xs text-slate-500">{p.desc}</p>
                      <span className="text-[10px] text-slate-400">{p.path}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-emerald/10 text-emerald px-2 py-0.5 rounded-full">{p.status}</span>
                      <a href={p.path} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-navy">
                        <Eye className="w-4 h-4" />
                      </a>
                      <button className="p-2 text-slate-400 hover:text-navy"><Edit3 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* SETTINGS */}
          {activeTab === 'settings' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-bold text-navy mb-6">Settings</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                  <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2"><DollarSign className="w-5 h-5 text-emerald" /> Payment Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-slate-600 mb-1">Default Currency</label>
                      <select className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm">
                        <option value="USD">USD ($)</option>
                        <option value="JOD">Jordanian Dinar (JD)</option>
                        <option value="SAR">Saudi Riyal (SR)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-600 mb-1">Installment Payments</label>
                      <select className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm">
                        <option>Enabled (50% minimum)</option>
                        <option>Disabled (Full payment only)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-600 mb-1">Payment Gateway</label>
                      <select className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm">
                        <option>PayTabs (Active)</option>
                        <option>PayPal</option>
                        <option>Bank Transfer</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                  <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2"><Palette className="w-5 h-5 text-purple-500" /> Appearance</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-slate-600 mb-1">Primary Color</label>
                      <div className="flex items-center gap-2">
                        <input type="color" defaultValue="#0f1f33" className="w-10 h-10 rounded border border-slate-200" />
                        <span className="text-sm text-slate-500">#0f1f33 (Navy Blue)</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-600 mb-1">Accent Color</label>
                      <div className="flex items-center gap-2">
                        <input type="color" defaultValue="#0ca750" className="w-10 h-10 rounded border border-slate-200" />
                        <span className="text-sm text-slate-500">#0ca750 (Emerald Green)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                  <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2"><Smartphone className="w-5 h-5 text-blue-500" /> Features</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Enable WhatsApp Chat', checked: true },
                      { label: 'Enable Certificate Verification', checked: true },
                      { label: 'Enable Student Registration', checked: true },
                      { label: 'Enable Job Applications', checked: true },
                      { label: 'Enable AI Chatbot', checked: true },
                      { label: 'Enable PayTabs Payment', checked: true },
                    ].map((f, i) => (
                      <label key={i} className="flex items-center justify-between py-2">
                        <span className="text-sm text-slate-600">{f.label}</span>
                        <input type="checkbox" defaultChecked={f.checked} className="w-4 h-4 rounded text-emerald" />
                      </label>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                  <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2"><MapPin className="w-5 h-5 text-red-500" /> Business Info</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-slate-600 mb-1">Company Name (EN)</label>
                      <input defaultValue="Pioneers International" className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-600 mb-1">Company Name (AR)</label>
                      <input defaultValue="رواد الفكر الدولية لاستشارات الأعمال" className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-600 mb-1">Meta Description (SEO)</label>
                      <textarea defaultValue="Pioneers International - Leading ISO certification and business consulting firm in the MENA region." rows={3} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* SECURITY — CHANGE PASSWORD */}
          {activeTab === 'security' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-bold text-navy mb-6">Security Settings</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Change Password */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                  <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2"><KeyRound className="w-5 h-5 text-navy" /> Change Admin Password</h3>

                  {passwordSuccess && (
                    <div className="bg-emerald/10 border border-emerald rounded-xl p-3 mb-4 flex items-center gap-2 text-emerald text-sm">
                      <CheckCircle className="w-4 h-4 shrink-0" /> Password changed successfully!
                    </div>
                  )}
                  {passwordError && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 flex items-center gap-2 text-red-600 text-sm">
                      <XCircle className="w-4 h-4 shrink-0" /> {passwordError}
                    </div>
                  )}

                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
                      <input
                        type="password"
                        value={passwordData.current}
                        onChange={e => { setPasswordData({ ...passwordData, current: e.target.value }); setPasswordError(''); }}
                        className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                      <input
                        type="password"
                        value={passwordData.new}
                        onChange={e => setPasswordData({ ...passwordData, new: e.target.value })}
                        className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm"
                        required
                        minLength={8}
                      />
                      <p className="text-xs text-slate-400 mt-1">Minimum 8 characters</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
                      <input
                        type="password"
                        value={passwordData.confirm}
                        onChange={e => setPasswordData({ ...passwordData, confirm: e.target.value })}
                        className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-navy text-white rounded-lg font-semibold hover:bg-navy-light transition-colors flex items-center justify-center gap-2"
                    >
                      <Lock className="w-4 h-4" /> Change Password
                    </button>
                  </form>
                </div>

                {/* Admin Info */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                  <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-emerald" /> Admin Profile</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                      <div className="w-16 h-16 rounded-full bg-navy flex items-center justify-center">
                        <span className="text-white font-bold text-xl">WA</span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">Wael S. Alkhatib</p>
                        <p className="text-sm text-slate-500">Managing Director & Lead Consultant</p>
                        <p className="text-xs text-emerald">admin@pioneersint.com</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between py-2 border-b border-slate-50">
                        <span className="text-slate-600">Role</span>
                        <span className="font-medium text-slate-800">Super Admin</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-slate-50">
                        <span className="text-slate-600">Last Login</span>
                        <span className="font-medium text-slate-800">May 21, 2026</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-slate-50">
                        <span className="text-slate-600">Account Created</span>
                        <span className="font-medium text-slate-800">Jan 1, 2025</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-slate-600">Status</span>
                        <span className="text-xs bg-emerald/10 text-emerald px-2 py-0.5 rounded-full">Active</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security Log */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 md:col-span-2">
                  <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2"><Clock className="w-5 h-5 text-amber" /> Login Activity</h3>
                  <div className="space-y-2">
                    {[
                      { action: 'Successful login', ip: '188.161.XXX.XXX', time: 'May 21, 2026 - 10:30 AM', status: 'success' },
                      { action: 'Password change', ip: '188.161.XXX.XXX', time: 'May 20, 2026 - 03:15 PM', status: 'success' },
                      { action: 'Content updated', ip: '188.161.XXX.XXX', time: 'May 19, 2026 - 11:45 AM', status: 'success' },
                    ].map((log, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0 text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald" />
                          <span className="text-slate-700">{log.action}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-slate-400">{log.ip}</span>
                          <span className="text-slate-500">{log.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
