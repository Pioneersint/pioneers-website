import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Bell, Globe, Save } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'language', label: 'Language', icon: Globe },
];

export default function DashboardSettings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '', company: user?.companyName || '', job: user?.jobTitle || '' });
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [notifications, setNotifications] = useState({ courseUpdates: true, certificates: true, aiResponses: true, marketing: false });
  const [language, setLanguage] = useState('en');

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <DashboardLayout>
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all ${activeTab === t.id ? 'bg-emerald-light text-emerald border-l-3 border-emerald' : 'text-slate-600 hover:bg-slate-50'}`}>
                <t.icon className="w-4 h-4" />{t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <motion.div key={activeTab} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-xl border border-slate-200 p-6">
            {saved && <div className="mb-4 p-3 bg-emerald-light text-emerald rounded-lg text-sm font-medium">Settings saved successfully!</div>}

            {activeTab === 'profile' && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-slate-800">Profile Information</h4>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-emerald flex items-center justify-center text-white text-xl font-bold">
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <button className="text-sm text-emerald font-medium hover:underline">Change Avatar</button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {['name', 'email', 'phone', 'company', 'job'].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-slate-700 mb-1 capitalize">{field === 'job' ? 'Job Title' : field === 'company' ? 'Company' : field}</label>
                      <input type={field === 'email' ? 'email' : 'text'} value={(profile as any)[field]} onChange={e => setProfile({ ...profile, [field]: e.target.value })} className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-lg focus:border-emerald outline-none transition-all text-sm" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-slate-800">Change Password</h4>
                {['current', 'new', 'confirm'].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-slate-700 mb-1 capitalize">{field === 'confirm' ? 'Confirm New Password' : field === 'current' ? 'Current Password' : 'New Password'}</label>
                    <input type="password" value={(passwords as any)[field]} onChange={e => setPasswords({ ...passwords, [field]: e.target.value })} className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-lg focus:border-emerald outline-none transition-all text-sm" placeholder={field === 'current' ? 'Enter current password' : 'Min 6 characters'} />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-slate-800">Notification Preferences</h4>
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between py-3 border-b border-slate-100">
                    <div>
                      <p className="font-medium text-slate-700 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                      <p className="text-xs text-slate-500">Receive notifications about {key.replace(/([A-Z])/g, ' $1').toLowerCase().trim()}</p>
                    </div>
                    <button onClick={() => setNotifications({ ...notifications, [key]: !value })} className={`w-11 h-6 rounded-full transition-colors ${value ? 'bg-emerald' : 'bg-slate-200'}`}>
                      <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${value ? 'translate-x-5' : 'translate-x-0.5'}`} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'language' && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-slate-800">Language & Region</h4>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Interface Language</label>
                  <div className="flex gap-3">
                    {[{ code: 'en', label: 'English' }, { code: 'ar', label: 'العربية' }].map(l => (
                      <button key={l.code} onClick={() => setLanguage(l.code)} className={`px-6 py-3 rounded-lg border text-sm font-medium transition-all ${language === l.code ? 'border-emerald bg-emerald-light text-emerald' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                        {l.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <button onClick={handleSave} className="mt-6 flex items-center gap-2 px-6 py-2.5 bg-emerald text-white rounded-lg text-sm font-medium hover:bg-emerald-dark transition-colors">
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
