import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { LayoutDashboard, Users, BookOpen, Award, FileText, Settings, Menu, X, ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const navGroups = [
  { label: 'Platform', items: [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/users', icon: Users, label: 'Users' },
  ]},
  { label: 'Content', items: [
    { path: '/admin/articles', icon: FileText, label: 'Articles' },
    { path: '/admin/courses', icon: BookOpen, label: 'Courses' },
    { path: '/admin/certificates', icon: Award, label: 'Certificates' },
  ]},
  { label: 'System', items: [
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
  ]},
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex bg-slate-50">
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-navy/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
        )}
      </AnimatePresence>

      <aside className={`fixed lg:sticky top-0 left-0 h-screen bg-navy z-50 transition-all duration-300 flex flex-col ${collapsed ? 'w-20' : 'w-64'} ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          <Link to="/admin" className={`flex items-center gap-2 ${collapsed ? 'justify-center w-full' : ''}`}>
            <span className="text-lg font-bold text-white">P<span className="text-emerald">.</span></span>
            {!collapsed && <span className="text-xs font-medium text-emerald uppercase tracking-wider">Admin</span>}
          </Link>
          <button onClick={() => setMobileOpen(false)} className="lg:hidden text-white/60"><X className="w-5 h-5" /></button>
          <button onClick={() => setCollapsed(!collapsed)} className="hidden lg:block text-white/40 hover:text-white/80">
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-6 overflow-y-auto">
          {navGroups.map(group => (
            <div key={group.label}>
              {!collapsed && <span className="text-[10px] uppercase text-slate-500 tracking-wider px-3 mb-2 block">{group.label}</span>}
              <div className="space-y-1">
                {group.items.map(item => (
                  <button key={item.path} onClick={() => { navigate(item.path); setMobileOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive(item.path) ? 'bg-emerald text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white'} ${collapsed ? 'justify-center' : ''}`}>
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {!collapsed && <span>{item.label}</span>}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10">
          <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
            <div className="w-9 h-9 rounded-full bg-red flex items-center justify-center text-white font-bold text-xs flex-shrink-0">A</div>
            {!collapsed && <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name}</p>
              <p className="text-xs text-emerald">Administrator</p>
            </div>}
            {!collapsed && <button onClick={logout} className="text-slate-400 hover:text-red transition-colors"><LogOut className="w-4 h-4" /></button>}
          </div>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 text-slate-600"><Menu className="w-5 h-5" /></button>
          <h2 className="text-lg font-semibold text-slate-800">Admin Panel</h2>
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="text-sm text-slate-500 hover:text-slate-700">Client View</Link>
            <Link to="/" className="text-sm text-slate-500 hover:text-slate-700">Website</Link>
          </div>
        </header>
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
