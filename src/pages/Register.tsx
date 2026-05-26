import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User, Building2, Briefcase, Eye, EyeOff, Phone, AlertCircle, Check } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { isValidEmail, getEmailError, getPhoneError, getPasswordStrength, getNameError } from '@/lib/validation';
import OTPVerification from '@/components/shared/OTPVerification';

interface FieldErrors {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
}

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', companyName: '', jobTitle: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const validateField = (field: keyof FieldErrors, value: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setFieldErrors(prev => {
      const next = { ...prev };
      switch (field) {
        case 'name':
          next.name = getNameError(value) || undefined;
          break;
        case 'email':
          next.email = getEmailError(value) || undefined;
          if (emailVerified) next.email = undefined;
          break;
        case 'password':
          next.password = !value ? 'Password is required' : value.length < 6 ? 'Password must be at least 6 characters' : undefined;
          break;
        case 'phone':
          if (value.trim()) next.phone = getPhoneError(value) || undefined;
          else delete next.phone;
          break;
      }
      if (!next[field]) delete next[field];
      return next;
    });
  };

  const validateAll = (): boolean => {
    const errors: FieldErrors = {};
    errors.name = getNameError(form.name) || undefined;
    errors.email = getEmailError(form.email) || undefined;
    if (!emailVerified && form.email && isValidEmail(form.email)) {
      errors.email = 'Please verify your email with the OTP code';
    }
    errors.password = !form.password ? 'Password is required' : form.password.length < 6 ? 'Password must be at least 6 characters' : undefined;
    if (form.phone.trim()) errors.phone = getPhoneError(form.phone) || undefined;

    (Object.keys(errors) as Array<keyof FieldErrors>).forEach(k => { if (!errors[k]) delete errors[k]; });
    setFieldErrors(errors);
    setTouched({ name: true, email: true, password: true, phone: true });
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!validateAll()) return;

    setLoading(true);
    try {
      await register(form);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally { setLoading(false); }
  };

  const passStrength = getPasswordStrength(form.password);
  const passBarColor = passStrength === 'weak' ? 'bg-red-400' : passStrength === 'medium' ? 'bg-amber-400' : 'bg-emerald';
  const passBarWidth = passStrength === 'weak' ? '33%' : passStrength === 'medium' ? '66%' : '100%';

  const inputClass = (field: keyof FieldErrors) =>
    fieldErrors[field] && touched[field]
      ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-100'
      : touched[field] && !fieldErrors[field] && form[field]
      ? 'border-emerald-300 bg-emerald-50/30 focus:border-emerald focus:ring-emerald/10'
      : 'border-slate-200 focus:border-emerald focus:ring-emerald/10';

  return (
    <div className="min-h-screen flex items-center justify-center gradient-navy px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <img src="/assets/images/logo.png" alt="Pioneers International" className="h-12 mx-auto" />
          </Link>
          <h1 className="text-h2 text-white mt-4">Create Account</h1>
          <p className="text-slate-300 mt-2">Start your journey with Pioneers</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />{error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name <span className="text-red-500">*</span></label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="text" required value={form.name}
                  onChange={e => { setForm({ ...form, name: e.target.value }); if (touched.name) validateField('name', e.target.value); }}
                  onBlur={e => validateField('name', e.target.value)}
                  className={`w-full h-12 pl-11 pr-4 bg-slate-50 border rounded-lg focus:ring-2 outline-none transition-all ${inputClass('name')}`}
                  placeholder="John Smith" />
                {touched.name && !fieldErrors.name && form.name && <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald" />}
              </div>
              {fieldErrors.name && touched.name && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{fieldErrors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email <span className="text-red-500">*</span></label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="email" required value={form.email}
                  onChange={e => { setForm({ ...form, email: e.target.value }); setEmailVerified(false); if (touched.email) validateField('email', e.target.value); }}
                  onBlur={e => validateField('email', e.target.value)}
                  className={`w-full h-12 pl-11 pr-4 bg-slate-50 border rounded-lg focus:ring-2 outline-none transition-all ${inputClass('email')}`}
                  placeholder="john@company.com" />
              </div>
              {fieldErrors.email && touched.email && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{fieldErrors.email}</p>}
            </div>

            {/* OTP Verification */}
            {form.email && isValidEmail(form.email) && !emailVerified && (
              <OTPVerification email={form.email} onVerified={setEmailVerified} isVerified={emailVerified} />
            )}
            {emailVerified && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-emerald text-sm">
                <Check className="w-4 h-4" /> Email verified successfully
              </motion.div>
            )}

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="tel" value={form.phone}
                  onChange={e => { setForm({ ...form, phone: e.target.value }); if (touched.phone) validateField('phone', e.target.value); }}
                  onBlur={e => validateField('phone', e.target.value)}
                  className={`w-full h-12 pl-11 pr-4 bg-slate-50 border rounded-lg focus:ring-2 outline-none transition-all ${inputClass('phone')}`}
                  placeholder="+962 7xxxxxxx" />
              </div>
              {fieldErrors.phone && touched.phone && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{fieldErrors.phone}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password <span className="text-red-500">*</span></label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type={showPass ? 'text' : 'password'} required value={form.password}
                  onChange={e => { setForm({ ...form, password: e.target.value }); if (touched.password) validateField('password', e.target.value); }}
                  onBlur={e => validateField('password', e.target.value)}
                  className={`w-full h-12 pl-11 pr-11 bg-slate-50 border rounded-lg focus:ring-2 outline-none transition-all ${inputClass('password')}`}
                  placeholder="Min 6 characters" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {/* Password strength meter */}
              {form.password && (
                <div className="mt-2">
                  <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className={`h-full ${passBarColor} transition-all duration-300`} style={{ width: passBarWidth }} />
                  </div>
                  <p className={`text-xs mt-1 ${passStrength === 'weak' ? 'text-red-500' : passStrength === 'medium' ? 'text-amber-500' : 'text-emerald'}`}>
                    Password strength: {passStrength.charAt(0).toUpperCase() + passStrength.slice(1)}
                  </p>
                </div>
              )}
              {fieldErrors.password && touched.password && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{fieldErrors.password}</p>}
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="text" value={form.companyName}
                  onChange={e => setForm({ ...form, companyName: e.target.value })}
                  className="w-full h-12 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-lg focus:border-emerald focus:ring-2 focus:ring-emerald/10 outline-none transition-all"
                  placeholder="Your company" />
              </div>
            </div>

            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Job Title</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="text" value={form.jobTitle}
                  onChange={e => setForm({ ...form, jobTitle: e.target.value })}
                  className="w-full h-12 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-lg focus:border-emerald focus:ring-2 focus:ring-emerald/10 outline-none transition-all"
                  placeholder="e.g. Quality Manager" />
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full h-12 bg-emerald text-white rounded-lg font-semibold hover:bg-emerald-dark disabled:opacity-50 flex items-center justify-center gap-2 transition-all">
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <UserPlus className="w-5 h-5" />}
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500">
            Already have an account? <Link to="/login" className="text-emerald font-medium hover:underline">Sign In</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
