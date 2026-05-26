import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, Eye, EyeOff, AlertCircle, Check } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getEmailError } from '@/lib/validation';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({ email: '', password: '' });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [loading, setLoading] = useState(false);

  const validateField = (field: 'email' | 'password', value: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setFieldErrors(prev => {
      const next = { ...prev };
      if (field === 'email') {
        next.email = getEmailError(value) || '';
      } else {
        next.password = !value ? 'Password is required' : value.length < 6 ? 'Password must be at least 6 characters' : '';
      }
      return next;
    });
  };

  const validateAll = (): boolean => {
    const errors = {
      email: getEmailError(form.email) || '',
      password: !form.password ? 'Password is required' : form.password.length < 6 ? 'Password must be at least 6 characters' : '',
    };
    setFieldErrors(errors);
    setTouched({ email: true, password: true });
    return !errors.email && !errors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!validateAll()) return;

    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Invalid email or password. Please try again.');
    } finally { setLoading(false); }
  };

  const inputClass = (field: 'email' | 'password') =>
    fieldErrors[field] && touched[field]
      ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-100'
      : touched[field] && !fieldErrors[field]
      ? 'border-emerald-300 bg-emerald-50/30 focus:border-emerald focus:ring-emerald/10'
      : 'border-slate-200 focus:border-emerald focus:ring-emerald/10';

  return (
    <div className="min-h-screen flex items-center justify-center gradient-navy px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <img src="/assets/images/logo.png" alt="Pioneers International" className="h-12 mx-auto" />
          </Link>
          <h1 className="text-h2 text-white mt-4">Welcome Back</h1>
          <p className="text-slate-300 mt-2">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />{error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="email" required value={form.email}
                  onChange={(e) => { setForm({ ...form, email: e.target.value }); if (touched.email) validateField('email', e.target.value); }}
                  onBlur={(e) => validateField('email', e.target.value)}
                  className={`w-full h-12 pl-11 pr-4 bg-slate-50 border rounded-lg focus:ring-2 outline-none transition-all ${inputClass('email')}`}
                  placeholder="your@email.com" />
                {touched.email && !fieldErrors.email && form.email && (
                  <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald" />
                )}
              </div>
              {fieldErrors.email && touched.email && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{fieldErrors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type={showPass ? 'text' : 'password'} required value={form.password}
                  onChange={(e) => { setForm({ ...form, password: e.target.value }); if (touched.password) validateField('password', e.target.value); }}
                  onBlur={(e) => validateField('password', e.target.value)}
                  className={`w-full h-12 pl-11 pr-11 bg-slate-50 border rounded-lg focus:ring-2 outline-none transition-all ${inputClass('password')}`}
                  placeholder="Enter your password" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {fieldErrors.password && touched.password && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{fieldErrors.password}</p>}
            </div>

            <button type="submit" disabled={loading}
              className="w-full h-12 bg-emerald text-white rounded-lg font-semibold hover:bg-emerald-dark disabled:opacity-50 flex items-center justify-center gap-2 transition-all">
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <LogIn className="w-5 h-5" />}
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500">
            Don't have an account? <Link to="/register" className="text-emerald font-medium hover:underline">Get Started</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
