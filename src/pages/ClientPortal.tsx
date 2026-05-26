import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FolderOpen, Clock, CheckCircle, AlertTriangle, FileText,
  MessageSquare, Calendar, Mail, Phone, MapPin, Lock, Download
} from 'lucide-react';
import SEO from '@/components/SEO';

interface Project {
  id: string;
  title: string;
  client: string;
  standard: string;
  status: 'active' | 'completed' | 'onhold' | 'planning';
  progress: number;
  startDate: string;
  endDate: string;
  phase: string;
  nextMilestone: string;
  documents: { name: string; status: string }[];
}

const projects: Project[] = [
  {
    id: 'P-2026-001', title: 'ISO 9001 QMS Implementation', client: 'Royal Medical Center', standard: 'ISO 9001:2015',
    status: 'active', progress: 65, startDate: '2026-01-15', endDate: '2026-06-30',
    phase: 'Phase 3: Documentation Development', nextMilestone: 'Internal Audit - June 5',
    documents: [
      { name: 'Quality Manual v2.1', status: 'approved' },
      { name: 'Procedure QMS-01', status: 'under-review' },
      { name: 'Internal Audit Plan', status: 'pending' },
    ],
  },
  {
    id: 'P-2026-002', title: 'ISO 14001 EMS Implementation', client: 'Jordan Cement Factory', standard: 'ISO 14001:2015',
    status: 'active', progress: 40, startDate: '2026-03-01', endDate: '2026-08-15',
    phase: 'Phase 2: Aspect & Impact Assessment', nextMilestone: 'Legal Compliance Matrix - May 25',
    documents: [
      { name: 'Environmental Policy', status: 'approved' },
      { name: 'Aspect Register', status: 'under-review' },
      { name: 'Legal Register', status: 'pending' },
    ],
  },
  {
    id: 'P-2026-003', title: 'ISO 45001 OH&S Implementation', client: 'Petra Construction Co.', standard: 'ISO 45001:2018',
    status: 'planning', progress: 15, startDate: '2026-05-01', endDate: '2026-10-30',
    phase: 'Phase 1: Gap Analysis', nextMilestone: 'Gap Analysis Report - May 30',
    documents: [
      { name: 'Gap Analysis Checklist', status: 'under-review' },
    ],
  },
  {
    id: 'P-2025-004', title: 'IMS Integration (Q+E+OHS)', client: 'ABC Manufacturing', standard: 'IMS (9001+14001+45001)',
    status: 'completed', progress: 100, startDate: '2025-06-01', endDate: '2025-12-15',
    phase: 'Completed - Certified', nextMilestone: 'Surveillance Audit - Dec 2026',
    documents: [
      { name: 'Integrated Manual', status: 'approved' },
      { name: 'Surveillance Plan', status: 'approved' },
    ],
  },
];

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  active: { label: 'Active', color: 'text-emerald', bg: 'bg-emerald-light', icon: Clock },
  completed: { label: 'Completed', color: 'text-blue-600', bg: 'bg-blue-50', icon: CheckCircle },
  onhold: { label: 'On Hold', color: 'text-amber', bg: 'bg-amber-light', icon: AlertTriangle },
  planning: { label: 'Planning', color: 'text-purple-600', bg: 'bg-purple-50', icon: Calendar },
};

export default function ClientPortal() {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<'projects' | 'documents' | 'messages'>('projects');
  const [loginMode, setLoginMode] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <SEO title="Client Portal | Pioneers International" description="Access your consulting projects, documents, and track progress." />
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl border border-slate-200 p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-emerald-light flex items-center justify-center mx-auto mb-4">
              <FolderOpen className="w-8 h-8 text-emerald" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Client Portal</h2>
            <p className="text-sm text-slate-500 mt-1">Access your projects and track progress</p>
          </div>

          {loginMode ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input type="email" placeholder="your@email.com"
                  className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald/30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                <input type="password" placeholder="••••••••"
                  className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald/30" />
              </div>
              <button onClick={() => setLoggedIn(true)}
                className="w-full py-3 bg-navy text-white rounded-xl font-semibold hover:bg-navy-light transition-colors flex items-center justify-center gap-2">
                <Lock className="w-4 h-4" /> Sign In
              </button>
              <p className="text-center text-sm text-slate-500">
                Don't have an account?{' '}
                <button onClick={() => setLoginMode(false)} className="text-emerald font-medium hover:underline">
                  Register
                </button>
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input placeholder="Your name"
                  className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald/30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input type="email" placeholder="your@email.com"
                  className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald/30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
                <input placeholder="Company name"
                  className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald/30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                <input placeholder="+962..."
                  className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald/30" />
              </div>
              <button onClick={() => setLoggedIn(true)}
                className="w-full py-3 bg-emerald text-white rounded-xl font-semibold hover:bg-emerald-dark transition-colors">
                Create Account
              </button>
              <p className="text-center text-sm text-slate-500">
                Already have an account?{' '}
                <button onClick={() => setLoginMode(true)} className="text-emerald font-medium hover:underline">
                  Sign In
                </button>
              </p>
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO title="Client Portal | Pioneers International" noindex />

      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-light flex items-center justify-center">
            <FolderOpen className="w-5 h-5 text-emerald" />
          </div>
          <div>
            <h1 className="font-semibold text-slate-800">Client Portal</h1>
            <p className="text-xs text-slate-400">4 Active Projects</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {(['projects', 'documents', 'messages'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab ? 'bg-emerald text-white' : 'text-slate-500 hover:bg-slate-100'}`}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Active Projects', value: '2', icon: FolderOpen, color: 'text-emerald' },
            { label: 'Completed', value: '1', icon: CheckCircle, color: 'text-blue-600' },
            { label: 'Documents', value: '8', icon: FileText, color: 'text-amber' },
            { label: 'Next Audit', value: '12 Days', icon: Calendar, color: 'text-purple-600' },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center gap-3 mb-2">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-sm text-slate-500">{stat.label}</span>
              </div>
              <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Projects List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-200">
                <h3 className="font-semibold text-slate-800">Your Projects</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {projects.map(project => {
                  const cfg = statusConfig[project.status];
                  const CfgIcon = cfg.icon;
                  return (
                    <div key={project.id}
                      onClick={() => setSelectedProject(project)}
                      className={`p-5 cursor-pointer transition-colors hover:bg-slate-50 ${selectedProject?.id === project.id ? 'bg-emerald-light' : ''}`}>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color} flex items-center gap-1`}>
                              <CfgIcon className="w-3 h-3" /> {cfg.label}
                            </span>
                            <span className="text-xs text-slate-400">{project.id}</span>
                          </div>
                          <h4 className="font-semibold text-slate-800">{project.title}</h4>
                          <p className="text-xs text-slate-500">{project.client} | {project.standard}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-slate-800">{project.progress}%</div>
                          <div className="text-xs text-slate-400">complete</div>
                        </div>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald rounded-full" style={{ width: `${project.progress}%` }} />
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {project.startDate}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {project.phase}</span>
                        {project.status === 'active' && (
                          <span className="flex items-center gap-1 text-amber"><AlertTriangle className="w-3 h-3" /> Next: {project.nextMilestone}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Detail */}
            {selectedProject && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-200">
                  <h3 className="font-semibold text-slate-800">Project Details</h3>
                </div>
                <div className="p-5 space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-slate-500">Project ID</span><span className="font-medium text-slate-700">{selectedProject.id}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Standard</span><span className="font-medium text-slate-700">{selectedProject.standard}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Start Date</span><span className="font-medium text-slate-700">{selectedProject.startDate}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Target End</span><span className="font-medium text-slate-700">{selectedProject.endDate}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Current Phase</span><span className="font-medium text-emerald">{selectedProject.phase}</span></div>
                    {selectedProject.status === 'active' && (
                      <div className="flex justify-between"><span className="text-slate-500">Next Milestone</span><span className="font-medium text-amber">{selectedProject.nextMilestone}</span></div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <h4 className="text-sm font-medium text-slate-700 mb-3">Documents</h4>
                    <div className="space-y-2">
                      {selectedProject.documents.map((doc, i) => (
                        <div key={i} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-slate-400" />
                            <span className="text-sm text-slate-700">{doc.name}</span>
                          </div>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            doc.status === 'approved' ? 'bg-emerald-light text-emerald' :
                            doc.status === 'under-review' ? 'bg-amber-light text-amber' :
                            'bg-slate-100 text-slate-500'
                          }`}>{doc.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="w-full py-2.5 bg-emerald text-white rounded-lg text-sm font-medium hover:bg-emerald-dark transition-colors flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" /> Download Report
                  </button>
                </div>
              </motion.div>
            )}

            {/* Contact */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-800 mb-4">Your Consultant</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-emerald flex items-center justify-center text-white font-bold">W</div>
                <div>
                  <p className="font-medium text-slate-800">Wael S. Alkhatib</p>
                  <p className="text-xs text-slate-400">Lead Consultant & Managing Director</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-600"><Mail className="w-4 h-4 text-slate-400" /> info@pioneersint.com</div>
                <div className="flex items-center gap-2 text-slate-600"><Phone className="w-4 h-4 text-slate-400" /> +962 7 8159 5846</div>
                <div className="flex items-center gap-2 text-slate-600"><MapPin className="w-4 h-4 text-slate-400" /> Wadi Saqra, Amman</div>
              </div>
              <button onClick={() => navigate('/contact')}
                className="mt-4 w-full py-2.5 border-2 border-emerald text-emerald rounded-lg text-sm font-medium hover:bg-emerald hover:text-white transition-colors flex items-center justify-center gap-2">
                <MessageSquare className="w-4 h-4" /> Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
