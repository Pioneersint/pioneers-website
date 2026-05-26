import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import SEO from '@/components/SEO';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@pioneersint.com' && password === 'WaelS.Alkhatib@2026!') {
      localStorage.setItem('adminAuth', 'true');
      navigate('/admin');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen gradient-navy flex items-center justify-center px-4">
      <SEO title="Admin Login | Pioneers International" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-xl bg-navy flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-8 h-8 text-emerald" />
          </div>
          <h1 className="text-2xl font-bold text-navy">Admin Portal</h1>
          <p className="text-slate-500 text-sm mt-1">Pioneers International Dashboard</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 flex items-center gap-2 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" /> {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Admin Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@pioneersint.com"
              className="w-full h-11 px-4 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/30"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full h-11 px-4 pr-10 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/30"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full h-11 bg-navy text-white rounded-lg font-semibold hover:bg-navy-light transition-colors flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" /> Login to Dashboard
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-slate-500 hover:text-navy transition-colors">
            Back to Website
          </a>
        </div>
      </motion.div>
    </div>
  );
}
