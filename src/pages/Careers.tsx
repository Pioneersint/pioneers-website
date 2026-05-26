import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Heart, GraduationCap, Sparkles,
  Briefcase, MapPin, Clock, CheckCircle, ArrowRight, X,
  Globe, Award, Coffee, Target, Send,
  User, Mail, Phone, Upload, Check, ChevronDown, AlertCircle
} from 'lucide-react';
import SEO from '@/components/SEO';
import { getEmailError, getPhoneError, getNameError } from '@/lib/validation';

const culturePillars = [
  { icon: Heart, title: 'People First', titleAr: 'الناس أولاً', desc: 'We believe our people are our greatest asset. Every decision considers the human impact.' },
  { icon: Target, title: 'Excellence Driven', titleAr: 'التميز قيمتنا', desc: 'We pursue excellence in everything — from client deliverables to internal processes.' },
  { icon: Globe, title: 'Global Mindset', titleAr: 'عقلية عالمية', desc: 'Local expertise combined with international best practices and standards.' },
  { icon: Award, title: 'Integrity Always', titleAr: 'النزاهة دائماً', desc: 'Honest, transparent, and ethical in every client engagement and internal interaction.' },
  { icon: Sparkles, title: 'Innovation', titleAr: 'الابتكار', desc: 'We embrace change, adopt new technologies, and continuously improve our methodologies.' },
  { icon: Coffee, title: 'Work-Life Balance', titleAr: 'توازن العمل والحياة', desc: 'Flexible working arrangements and a culture that respects personal time.' },
];

const benefits = [
  'Competitive salary packages', 'Health insurance for you and family', 'Professional development budget',
  'Flexible working hours', 'Remote work options', 'Performance bonuses', 'Annual training allowance',
  'Mentorship programs', 'Team building events', 'Career progression paths',
];

const graduateProgram = {
  title: 'Pioneers Graduate Program', titleAr: 'برنامج رواد للخريجين',
  desc: 'A 12-month intensive program designed to develop the next generation of consultants. You will rotate through our core service lines, work on real client projects, and receive mentorship from senior consultants.',
  features: ['3-month rotation cycles', 'Real client project exposure', 'Senior consultant mentorship', 'Professional certification support', 'Guaranteed full-time placement'],
};

const jobs = [
  { id: 1, title: 'Senior Management Consultant', department: 'Consulting', location: 'Amman, Jordan', type: 'Full-time', description: 'Lead client engagements across institutional transformation, quality systems, and strategic planning projects.', requirements: ['8+ years consulting experience', "MBA or relevant Master's degree", 'Proven track record in transformation projects', 'Excellent Arabic and English'], status: 'closed' },
  { id: 2, title: 'ISO Auditor & Quality Specialist', department: 'Quality', location: 'Amman, Jordan', type: 'Full-time', description: 'Conduct ISO certification audits, develop quality management systems, and train client teams.', requirements: ['Lead Auditor certification (ISO 9001)', '5+ years auditing experience', 'Knowledge of ISO 14001/45001 preferred', 'Strong analytical skills'], status: 'closed' },
  { id: 3, title: 'Digital Transformation Consultant', department: 'Digital', location: 'Remote/Amman', type: 'Full-time', description: 'Help organizations navigate digital transformation with focus on AI integration, process automation, and digital strategy.', requirements: ['Experience in digital transformation projects', 'Knowledge of AI/ML applications in business', 'Strong technical background', 'Project management skills'], status: 'closed' },
  { id: 4, title: 'Graduate Consultant', department: 'Consulting', location: 'Amman, Jordan', type: 'Full-time', description: 'Join our Graduate Program and rotate through different consulting practices to find your specialization.', requirements: ['Fresh graduate or 1-2 years experience', 'Business, Engineering, or related degree', 'Strong analytical and communication skills', 'Passion for consulting'], status: 'closed' },
];

const POSITIONS = [
  'Senior Management Consultant', 'ISO Auditor & Quality Specialist', 'Digital Transformation Consultant',
  'Graduate Consultant', 'General Application', 'Graduate Program'
];

interface FormErrors {
  fullName?: string; email?: string; phone?: string; position?: string; education?: string; message?: string;
}

export default function Careers() {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState<typeof jobs[0] | null>(null);
  const [activeTab, setActiveTab] = useState<'jobs' | 'culture' | 'graduates'>('jobs');
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', position: '', experience: '', education: '', message: '', fileName: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const validateField = (field: string, value: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(prev => {
      const next: FormErrors = { ...prev };
      switch (field) {
        case 'fullName':
          next.fullName = getNameError(value) || undefined;
          break;
        case 'email':
          next.email = getEmailError(value) || undefined;
          break;
        case 'phone':
          next.phone = getPhoneError(value) || undefined;
          break;
        case 'position':
          next.position = !value.trim() ? 'Please select a position' : undefined;
          break;
        case 'education':
          next.education = !value.trim() ? 'Education is required' : undefined;
          break;
        case 'message':
          next.message = !value.trim() ? 'Cover letter is required' : value.trim().length < 10 ? 'Cover letter must be at least 10 characters' : undefined;
          break;
      }
      (Object.keys(next) as Array<keyof FormErrors>).forEach(k => { if (!next[k]) delete next[k]; });
      return next;
    });
  };

  const validateAll = (): boolean => {
    const newErrors: FormErrors = {};
    newErrors.fullName = getNameError(form.fullName) || undefined;
    newErrors.email = getEmailError(form.email) || undefined;
    newErrors.phone = getPhoneError(form.phone) || undefined;
    newErrors.position = !form.position ? 'Please select a position' : undefined;
    newErrors.education = !form.education.trim() ? 'Education is required' : undefined;
    newErrors.message = !form.message.trim() ? 'Cover letter is required' : form.message.trim().length < 10 ? 'Cover letter must be at least 10 characters' : undefined;
    (Object.keys(newErrors) as Array<keyof FormErrors>).forEach(k => { if (!newErrors[k]) delete newErrors[k]; });
    setErrors(newErrors);
    setTouched({ fullName: true, email: true, phone: true, position: true, education: true, message: true });
    return Object.keys(newErrors).length === 0;
  };

  const handleInput = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (touched[field]) validateField(field, value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setForm(prev => ({ ...prev, fileName: file.name }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;
    const subject = encodeURIComponent(`Job Application: ${form.position}`);
    const body = encodeURIComponent(
      `Full Name: ${form.fullName}\nEmail: ${form.email}\nPhone: ${form.phone}\nPosition: ${form.position}\nEducation: ${form.education}\nExperience: ${form.experience}\n\nMessage:\n${form.message}\n\nCV: ${form.fileName || 'Attached separately'}`
    );
    window.location.href = `mailto:careers@pioneersint.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setShowApplyForm(false); setForm({ fullName: '', email: '', phone: '', position: '', experience: '', education: '', message: '', fileName: '' }); setTouched({}); setErrors({}); }, 3000);
  };

  const errorClass = (field: string) =>
    errors[field as keyof FormErrors] && touched[field]
      ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-100'
      : 'border-slate-200 focus:border-navy focus:ring-1 focus:ring-navy/20';

  return (
    <div className="min-h-screen bg-offwhite">
      <SEO title="Careers | Pioneers International" description="Join Pioneers International. Explore career opportunities, our culture, graduate programs, and benefits." />

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy via-[#0a3560] to-[#0d4a3a] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl sm:text-5xl font-bold text-white">Build Your Career With Us</h1>
            <h2 className="text-2xl font-bold text-emerald mt-2" dir="rtl">ابنِ مسيرتك المهنية معنا</h2>
            <p className="text-slate-300 mt-4 max-w-2xl">Join a team of exceptional consultants transforming organizations across MENA.</p>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-white border-b border-slate-200 sticky top-16 z-30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1">
            {[{ key: 'jobs', label: 'Open Positions', icon: Briefcase }, { key: 'culture', label: 'Our Culture', icon: Heart }, { key: 'graduates', label: 'Graduate Program', icon: GraduationCap }].map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center gap-2 px-5 py-4 text-sm font-medium border-b-2 transition-all ${activeTab === tab.key ? 'border-navy text-navy' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
                <tab.icon className="w-4 h-4" /><span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs Tab */}
      {activeTab === 'jobs' && (
        <section className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex items-start gap-3">
            <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-800 font-medium">Currently Accepting Applications for Future Openings</p>
              <p className="text-xs text-amber-600 mt-1">All current positions are filled. Submit your application to be considered for upcoming opportunities.</p>
              <p className="text-xs text-amber-600 mt-0.5" dir="rtl">جميع الوظائف مغلقة حالياً. يمكنك تقديم طلبك للوظائف القادمة.</p>
            </div>
          </div>
          <div className="space-y-4">
            {jobs.map((job, i) => (
              <motion.div key={job.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all cursor-pointer"
                onClick={() => setSelectedJob(job)}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-slate-800">{job.title}</h3>
                      <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded-full">CLOSED</span>
                    </div>
                    <p className="text-sm text-slate-500 mb-2">{job.description}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{job.department}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{job.type}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300" />
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <p className="text-sm text-slate-500 mb-4">Don't see a matching position? Submit a general application.</p>
            <button onClick={() => { setShowApplyForm(true); setSelectedJob(null); }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald text-white rounded-full font-semibold hover:bg-emerald-dark transition-all">
              <Send className="w-5 h-5" /> Submit Application
            </button>
          </div>
        </section>
      )}

      {/* Culture Tab */}
      {activeTab === 'culture' && (
        <div>
          <section className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-2xl font-bold text-slate-800 text-center mb-2">Our Culture Pillars</h2>
            <h3 className="text-center text-navy font-medium mb-8" dir="rtl">ركائز ثقافتنا</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {culturePillars.map((pillar, i) => (
                <motion.div key={pillar.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all">
                  <pillar.icon className="w-8 h-8 text-emerald mb-4" />
                  <h3 className="font-semibold text-slate-800 mb-1">{pillar.title}</h3>
                  <p className="text-sm text-navy mb-2" dir="rtl">{pillar.titleAr}</p>
                  <p className="text-sm text-slate-500">{pillar.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>
          <section className="bg-navy py-16">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-2xl font-bold text-white text-center mb-8">What We Offer</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg p-3">
                    <CheckCircle className="w-5 h-5 text-emerald shrink-0" /><span className="text-sm text-white/90">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Graduate Program Tab */}
      {activeTab === 'graduates' && (
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 mb-8">
            <GraduationCap className="w-12 h-12 text-emerald mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 mb-1">{graduateProgram.title}</h2>
            <h3 className="text-lg text-navy mb-4" dir="rtl">{graduateProgram.titleAr}</h3>
            <p className="text-slate-500 mb-6">{graduateProgram.desc}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {graduateProgram.features.map((f, i) => (
                <div key={i} className="flex items-start gap-2 bg-slate-50 rounded-lg p-4">
                  <CheckCircle className="w-5 h-5 text-emerald shrink-0 mt-0.5" /><span className="text-sm text-slate-700">{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center">
            <button onClick={() => { setShowApplyForm(true); setForm(prev => ({ ...prev, position: 'Graduate Program' })); }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald text-white rounded-full font-semibold hover:bg-emerald-dark transition-all">
              <Send className="w-5 h-5" /> Apply for Graduate Program
            </button>
          </div>
        </div>
      )}

      {/* Job Detail Modal */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setSelectedJob(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-xl" onClick={e => e.stopPropagation()}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-slate-800">{selectedJob.title}</h3>
                  <button onClick={() => setSelectedJob(null)} className="p-1 rounded-full hover:bg-slate-100"><X className="w-5 h-5 text-slate-400" /></button>
                </div>
                <div className="flex flex-wrap gap-2 mb-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{selectedJob.department}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{selectedJob.location}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{selectedJob.type}</span>
                  <span className="px-2 py-0.5 bg-red-100 text-red-600 font-bold rounded-full">CLOSED</span>
                </div>
                <p className="text-sm text-slate-600 mb-4">{selectedJob.description}</p>
                <h4 className="font-semibold text-slate-800 mb-2">Requirements:</h4>
                <ul className="space-y-2 mb-6">
                  {selectedJob.requirements.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600"><CheckCircle className="w-4 h-4 text-emerald shrink-0 mt-0.5" />{r}</li>
                  ))}
                </ul>
                <button onClick={() => { setShowApplyForm(true); setForm(prev => ({ ...prev, position: selectedJob.title })); setSelectedJob(null); }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-emerald text-white rounded-xl font-semibold hover:bg-emerald-dark transition-all">
                  <Send className="w-4 h-4" /> Submit Application for Future Openings
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Application Form Modal */}
      <AnimatePresence>
        {showApplyForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowApplyForm(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={e => e.stopPropagation()}>
              <div className="bg-gradient-to-r from-navy to-emerald px-6 py-5 rounded-t-2xl flex items-center justify-between">
                <div><h3 className="text-xl font-bold text-white">Job Application</h3></div>
                <button onClick={() => setShowApplyForm(false)} className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"><X className="w-5 h-5 text-white" /></button>
              </div>
              <div className="p-6">
                {submitted ? (
                  <div className="text-center py-10">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-16 h-16 bg-emerald/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-emerald" />
                    </motion.div>
                    <h4 className="text-lg font-bold text-slate-800 mb-2">Application Submitted!</h4>
                    <p className="text-sm text-slate-500">Thank you. We will review your application and contact you.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Position Dropdown */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Position <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none z-10" />
                        <select value={form.position}
                          onChange={e => handleInput('position', e.target.value)}
                          className={`w-full h-11 pl-10 pr-10 bg-slate-50 border rounded-lg text-sm focus:outline-none focus:ring-1 appearance-none cursor-pointer transition-all ${errorClass('position')}`}>
                          <option value="">-- Select Position --</option>
                          {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      </div>
                      {errors.position && touched.position && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.position}</p>}
                    </div>

                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input type="text" value={form.fullName} onChange={e => handleInput('fullName', e.target.value)} onBlur={e => validateField('fullName', e.target.value)}
                          className={`w-full h-11 pl-10 pr-4 bg-slate-50 border rounded-lg text-sm outline-none focus:ring-1 transition-all ${errorClass('fullName')}`}
                          placeholder="Your full name" />
                      </div>
                      {errors.fullName && touched.fullName && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.fullName}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Email <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input type="email" value={form.email} onChange={e => handleInput('email', e.target.value)} onBlur={e => validateField('email', e.target.value)}
                          className={`w-full h-11 pl-10 pr-4 bg-slate-50 border rounded-lg text-sm outline-none focus:ring-1 transition-all ${errorClass('email')}`}
                          placeholder="your@email.com" />
                      </div>
                      {errors.email && touched.email && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Phone <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input type="tel" value={form.phone} onChange={e => handleInput('phone', e.target.value)} onBlur={e => validateField('phone', e.target.value)}
                            className={`w-full h-11 pl-10 pr-4 bg-slate-50 border rounded-lg text-sm outline-none focus:ring-1 transition-all ${errorClass('phone')}`}
                            placeholder="+962 7X XXX XXXX" />
                        </div>
                        {errors.phone && touched.phone && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.phone}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Years of Experience</label>
                        <input type="text" value={form.experience} onChange={e => handleInput('experience', e.target.value)}
                          className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-navy focus:ring-1 focus:ring-navy/20"
                          placeholder="e.g. 3-5 years" />
                      </div>
                    </div>

                    {/* Education */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Education <span className="text-red-500">*</span></label>
                      <input type="text" value={form.education} onChange={e => handleInput('education', e.target.value)} onBlur={e => validateField('education', e.target.value)}
                        className={`w-full h-11 px-4 bg-slate-50 border rounded-lg text-sm outline-none focus:ring-1 transition-all ${errorClass('education')}`}
                        placeholder="Bachelor's, Master's, PhD..." />
                      {errors.education && touched.education && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.education}</p>}
                    </div>

                    {/* Cover Letter */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Cover Letter <span className="text-red-500">*</span></label>
                      <textarea value={form.message} onChange={e => handleInput('message', e.target.value)} onBlur={e => validateField('message', e.target.value)}
                        placeholder="Tell us why you want to join Pioneers International..." rows={4}
                        className={`w-full px-4 py-2.5 bg-slate-50 border rounded-lg text-sm outline-none focus:ring-1 transition-all resize-none ${errorClass('message')}`} />
                      {errors.message && touched.message && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.message}</p>}
                    </div>

                    {/* CV Upload */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">CV / Resume</label>
                      <label className="flex items-center gap-3 px-4 py-3 border border-dashed border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                        <Upload className="w-5 h-5 text-slate-400" />
                        <div className="flex-1">
                          <p className="text-sm text-slate-600">{form.fileName || 'Click to upload CV (PDF, DOC)'}</p>
                          <p className="text-xs text-slate-400">{form.fileName ? 'File selected' : 'Maximum 5MB'}</p>
                        </div>
                        <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
                      </label>
                    </div>

                    <button type="submit" className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-emerald text-white rounded-xl font-semibold hover:bg-emerald-dark transition-all mt-2">
                      <Send className="w-4 h-4" /> Submit Application
                    </button>
                    <p className="text-xs text-slate-400 text-center mt-2">Your application will be sent to careers@pioneersint.com</p>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
