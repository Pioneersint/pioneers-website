import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ClipboardCheck, ChevronLeft, RotateCcw, Award,
  CheckCircle, AlertTriangle, ArrowRight, FileText, Mail
} from 'lucide-react';
import SEO from '@/components/SEO';

interface Question {
  id: string;
  text: string;
  textAr: string;
  category: string;
  weight: number;
}

const gapQuestions: Question[] = [
  // ISO 9001 - Quality
  { id: 'q1', text: 'Does your organization have a documented Quality Policy?', textAr: 'هل تمتلك مؤسستك سياسة جودة موثقة؟', category: 'ISO 9001 Quality', weight: 3 },
  { id: 'q2', text: 'Are there defined quality objectives at all relevant functions?', textAr: 'هل توجد أهداف جودة محددة في جميع الوظائف المعنية؟', category: 'ISO 9001 Quality', weight: 3 },
  { id: 'q3', text: 'Is there a process for internal audits of the QMS?', textAr: 'هل توجد عملية لتدقيق نظام إدارة الجودة داخليًا؟', category: 'ISO 9001 Quality', weight: 3 },
  { id: 'q4', text: 'Are customer complaints tracked and analyzed?', textAr: 'هل يتم تتبع وتحليل شكاوى العملاء؟', category: 'ISO 9001 Quality', weight: 2 },
  { id: 'q5', text: 'Is there a documented management review process?', textAr: 'هل توجد عملية مراجعة إدارية موثقة؟', category: 'ISO 9001 Quality', weight: 2 },
  // ISO 14001 - Environment
  { id: 'q6', text: 'Has your organization identified environmental aspects?', textAr: 'هل حددت مؤسستك الجوانب البيئية؟', category: 'ISO 14001 Environment', weight: 3 },
  { id: 'q7', text: 'Are there procedures for handling environmental emergencies?', textAr: 'هل توجد إجراءات للتعامل مع حالات الطوارئ البيئية؟', category: 'ISO 14001 Environment', weight: 3 },
  { id: 'q8', text: 'Does your organization comply with environmental legal requirements?', textAr: 'هل تلتزم مؤسستك بالمتطلبات القانونية البيئية؟', category: 'ISO 14001 Environment', weight: 2 },
  { id: 'q9', text: 'Is there an environmental monitoring program?', textAr: 'هل يوجد برنامج مراقبة بيئية؟', category: 'ISO 14001 Environment', weight: 2 },
  // ISO 45001 - OH&S
  { id: 'q10', text: 'Has a hazard identification and risk assessment been conducted?', textAr: 'هل تم إجراء تحديد المخاطر وتقييم المخاطر؟', category: 'ISO 45001 OH&S', weight: 3 },
  { id: 'q11', text: 'Are there OH&S objectives and targets defined?', textAr: 'هل تم تحديد أهداف ومؤشرات السلامة والصحة المهنية؟', category: 'ISO 45001 OH&S', weight: 3 },
  { id: 'q12', text: 'Is there an incident investigation procedure?', textAr: 'هل توجد إجراءات للتحقيق في الحوادث؟', category: 'ISO 45001 OH&S', weight: 2 },
  { id: 'q13', text: 'Are workers consulted on OH&S matters?', textAr: 'هل يتم استشارة العمال في شؤون السلامة والصحة المهنية؟', category: 'ISO 45001 OH&S', weight: 2 },
  // ISO 22000 - Food Safety
  { id: 'q14', text: 'Has a HACCP plan been developed?', textAr: 'هل تم تطوير خطة HACCP؟', category: 'ISO 22000 Food Safety', weight: 3 },
  { id: 'q15', text: 'Are prerequisite programs (PRPs) documented?', textAr: 'هل تم توثيق البرامج المسبقة؟', category: 'ISO 22000 Food Safety', weight: 3 },
  { id: 'q16', text: 'Is there a traceability system in place?', textAr: 'هل يوجد نظام تتبع؟', category: 'ISO 22000 Food Safety', weight: 2 },
  // ISO 27001 - Information Security
  { id: 'q17', text: 'Has an information security risk assessment been performed?', textAr: 'هل تم إجراء تقييم مخاطر أمن المعلومات؟', category: 'ISO 27001 InfoSec', weight: 3 },
  { id: 'q18', text: 'Is there a documented Information Security Policy?', textAr: 'هل توجد سياسة أمن معلومات موثقة؟', category: 'ISO 27001 InfoSec', weight: 3 },
  { id: 'q19', text: 'Are access controls implemented for sensitive information?', textAr: 'هل تم تنفيذ ضوابط الوصول للمعلومات الحساسة؟', category: 'ISO 27001 InfoSec', weight: 2 },
  { id: 'q20', text: 'Is there a business continuity plan?', textAr: 'هل يوجد خطة استمرارية أعمال؟', category: 'ISO 27001 InfoSec', weight: 2 },
];

const categoryColors: Record<string, string> = {
  'ISO 9001 Quality': 'bg-emerald',
  'ISO 14001 Environment': 'bg-green-600',
  'ISO 45001 OH&S': 'bg-orange-500',
  'ISO 22000 Food Safety': 'bg-red-500',
  'ISO 27001 InfoSec': 'bg-indigo-600',
};

export default function GapAnalysis() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'intro' | 'quiz' | 'form' | 'result'>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, 'yes' | 'no' | 'partial'>>({});
  const [userInfo, setUserInfo] = useState({ name: '', email: '', company: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [lang, setLang] = useState<'en' | 'ar'>('en');

  const progress = ((currentQ + 1) / gapQuestions.length) * 100;
  const answeredCount = Object.keys(answers).length;

  const handleAnswer = (value: 'yes' | 'no' | 'partial') => {
    setAnswers(prev => ({ ...prev, [gapQuestions[currentQ].id]: value }));
    if (currentQ < gapQuestions.length - 1) {
      setTimeout(() => setCurrentQ(prev => prev + 1), 300);
    }
  };

  const calculateResults = () => {
    const categories: Record<string, { yes: number; partial: number; no: number; total: number; weight: number }> = {};
    gapQuestions.forEach(q => {
      if (!categories[q.category]) categories[q.category] = { yes: 0, partial: 0, no: 0, total: 0, weight: 0 };
      const ans = answers[q.id];
      categories[q.category].total += q.weight;
      categories[q.category].weight += q.weight;
      if (ans === 'yes') categories[q.category].yes += q.weight;
      else if (ans === 'partial') categories[q.category].partial += q.weight * 0.5;
      else categories[q.category].no += q.weight;
    });
    return Object.entries(categories).map(([name, data]) => ({
      name,
      score: Math.round(((data.yes + data.partial) / data.weight) * 100),
      color: categoryColors[name] || 'bg-slate-500',
    }));
  };

  const overallScore = Math.round(
    gapQuestions.reduce((sum, q) => {
      const ans = answers[q.id];
      if (ans === 'yes') return sum + q.weight;
      if (ans === 'partial') return sum + q.weight * 0.5;
      return sum;
    }, 0) / gapQuestions.reduce((sum, q) => sum + q.weight, 0) * 100
  );

  const getGrade = () => {
    if (overallScore >= 80) return { label: 'Excellent', labelAr: 'ممتاز', color: 'text-emerald', bg: 'bg-emerald-light', border: 'border-emerald' };
    if (overallScore >= 60) return { label: 'Good', labelAr: 'جيد', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' };
    if (overallScore >= 40) return { label: 'Needs Improvement', labelAr: 'يحتاج تحسين', color: 'text-amber', bg: 'bg-amber-light', border: 'border-amber' };
    return { label: 'Critical', labelAr: 'حرج', color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200' };
  };

  const handleSubmitReport = () => {
    setSubmitted(true);
    const reportData = {
      user: userInfo,
      answers,
      results: calculateResults(),
      overallScore,
      date: new Date().toISOString(),
    };
    localStorage.setItem('gapAnalysisReport', JSON.stringify(reportData));
  };

  if (step === 'intro') {
    return (
      <div>
        <SEO title="Free ISO Gap Analysis | Pioneers International" description="Free ISO gap analysis tool. Assess your organization's readiness for ISO certification in 5 minutes." />
        <section className="relative min-h-[60vh] flex items-center justify-center gradient-navy">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.1) 39px, rgba(255,255,255,0.1) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.1) 39px, rgba(255,255,255,0.1) 40px)` }} />
          <div className="relative z-10 content-container text-center px-4">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="w-20 h-20 rounded-full bg-emerald/20 flex items-center justify-center mx-auto mb-6">
              <ClipboardCheck className="w-10 h-10 text-emerald" />
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-h1 text-white mb-4">Free ISO Gap Analysis</motion.h1>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="text-body-lg text-slate-300 max-w-2xl mx-auto mb-8">
              Assess your organization's readiness for ISO certification in 5 minutes. 
              Get a detailed PDF report with actionable recommendations.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-4">
              <button onClick={() => setStep('quiz')}
                className="inline-flex items-center gap-2 px-8 py-3 bg-emerald text-white rounded-full font-semibold hover:bg-emerald-dark transition-colors">
                Start Assessment <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white rounded-full font-medium hover:bg-white/10 transition-colors">
                Book Consultation
              </button>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-8 mt-10 text-sm text-slate-400">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald" /> 20 Questions</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald" /> 5 ISO Standards</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald" /> Free PDF Report</span>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  if (step === 'quiz') {
    const q = gapQuestions[currentQ];
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-slate-500">Question {currentQ + 1} of {gapQuestions.length}</span>
              <span className="text-slate-500">{answeredCount}/{gapQuestions.length} answered</span>
            </div>
            <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
              <motion.div className="h-full bg-emerald rounded-full" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
            </div>
          </div>

          {/* Language Toggle */}
          <div className="flex justify-end mb-4">
            <button onClick={() => setLang(l => l === 'en' ? 'ar' : 'en')}
              className="text-sm text-slate-500 hover:text-emerald transition-colors px-3 py-1 bg-white rounded-full border border-slate-200">
              {lang === 'en' ? 'العربية' : 'English'}
            </button>
          </div>

          {/* Question Card */}
          <motion.div key={currentQ} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }}
            className="bg-white rounded-2xl border border-slate-200 p-8">
            <div className="mb-2">
              <span className={`inline-block text-xs text-white px-3 py-1 rounded-full ${categoryColors[q.category] || 'bg-slate-500'}`}>{q.category}</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-6">{lang === 'en' ? q.text : q.textAr}</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'yes' as const, label: lang === 'en' ? 'Yes' : 'نعم', color: 'bg-emerald hover:bg-emerald-dark' },
                { value: 'partial' as const, label: lang === 'en' ? 'Partial' : 'جزئي', color: 'bg-amber hover:bg-amber-dark' },
                { value: 'no' as const, label: lang === 'en' ? 'No' : 'لا', color: 'bg-red-500 hover:bg-red-600' },
              ].map(opt => (
                <button key={opt.value} onClick={() => handleAnswer(opt.value)}
                  className={`py-4 px-4 ${opt.color} text-white rounded-xl font-medium transition-colors text-lg`}>
                  {opt.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <button onClick={() => setCurrentQ(Math.max(0, currentQ - 1))} disabled={currentQ === 0}
              className="flex items-center gap-2 text-slate-500 text-sm font-medium hover:text-slate-700 disabled:opacity-30 transition-colors">
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            {answeredCount === gapQuestions.length && (
              <motion.button initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                onClick={() => setStep('form')}
                className="flex items-center gap-2 px-6 py-2.5 bg-emerald text-white rounded-full font-medium hover:bg-emerald-dark transition-colors">
                View Results <ArrowRight className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (step === 'form') {
    const results = calculateResults();
    const grade = getGrade();
    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-slate-200 p-8">
            {/* Overall Score */}
            <div className="text-center mb-8">
              <div className={`w-24 h-24 rounded-full ${grade.bg} border-4 ${grade.border} flex items-center justify-center mx-auto mb-4`}>
                <span className={`text-3xl font-bold ${grade.color}`}>{overallScore}%</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800">{grade.label}</h2>
              <p className="text-slate-500">{grade.labelAr} - Overall Readiness Score</p>
            </div>

            {/* Category Breakdown */}
            <div className="space-y-4 mb-8">
              {results.map((cat, i) => (
                <motion.div key={cat.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4">
                  <span className={`w-3 h-3 rounded-full ${cat.color} shrink-0`} />
                  <span className="text-sm font-medium text-slate-700 flex-1">{cat.name}</span>
                  <div className="w-32 h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${cat.score}%` }} />
                  </div>
                  <span className={`text-sm font-bold ${cat.score >= 80 ? 'text-emerald' : cat.score >= 60 ? 'text-blue-600' : cat.score >= 40 ? 'text-amber' : 'text-red-500'}`}>{cat.score}%</span>
                </motion.div>
              ))}
            </div>

            {/* Recommendations */}
            <div className="bg-slate-50 rounded-xl p-5 mb-8">
              <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-amber" /> Recommendations</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                {results.filter(r => r.score < 60).map(r => (
                  <li key={r.name} className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber shrink-0 mt-0.5" />
                    <span>Priority: Implement {r.name} improvements (currently at {r.score}%)</span>
                  </li>
                ))}
                {overallScore < 80 && (
                  <li className="flex items-start gap-2">
                    <Award className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
                    <span>Consider our <strong>Lead Auditor Training</strong> for your team to accelerate certification readiness.</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Email Form */}
            {!submitted ? (
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2"><FileText className="w-5 h-5 text-emerald" /> Get Your Free PDF Report</h3>
                <div className="grid grid-cols-2 gap-3">
                  <input value={userInfo.name} onChange={e => setUserInfo({ ...userInfo, name: e.target.value })}
                    placeholder="Full Name" className="h-11 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald/30" />
                  <input value={userInfo.email} onChange={e => setUserInfo({ ...userInfo, email: e.target.value })}
                    type="email" placeholder="Email Address" className="h-11 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald/30" />
                  <input value={userInfo.company} onChange={e => setUserInfo({ ...userInfo, company: e.target.value })}
                    placeholder="Company Name" className="h-11 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald/30" />
                  <input value={userInfo.phone} onChange={e => setUserInfo({ ...userInfo, phone: e.target.value })}
                    placeholder="Phone" className="h-11 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald/30" />
                </div>
                <button onClick={handleSubmitReport}
                  className="w-full py-3 bg-emerald text-white rounded-xl font-semibold hover:bg-emerald-dark transition-colors flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" /> Send My Free Report
                </button>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="bg-emerald-light border border-emerald rounded-xl p-6 text-center">
                <CheckCircle className="w-12 h-12 text-emerald mx-auto mb-3" />
                <h4 className="font-semibold text-emerald mb-2">Report Generated!</h4>
                <p className="text-sm text-slate-600 mb-4">
                  Your gap analysis report has been saved. We'll email your detailed PDF report to {userInfo.email || 'your email'} within 24 hours.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button onClick={() => setStep('intro')}
                    className="px-6 py-2.5 bg-white text-slate-700 rounded-full text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" /> Retake Assessment
                  </button>
                  <button onClick={() => navigate('/contact')}
                    className="px-6 py-2.5 bg-navy text-white rounded-full text-sm font-medium hover:bg-navy-light transition-colors flex items-center gap-2">
                    <ArrowRight className="w-4 h-4" /> Book Consultation
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  return null;
}
