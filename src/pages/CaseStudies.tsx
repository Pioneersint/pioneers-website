import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, BarChart3, CheckCircle, TrendingUp, ArrowRight,
  Award, Building2, Stethoscope, GraduationCap, Factory, Landmark,
  UtensilsCrossed, ChevronDown, ChevronUp
} from 'lucide-react';
import SEO from '@/components/SEO';

const caseStudies = [
  {
    id: 1, sector: 'Healthcare', icon: Stethoscope, color: 'from-rose-500 to-pink-600',
    industry: 'Hospital Group', location: 'Saudi Arabia', duration: '14 months',
    challenge: 'Major hospital group needed JCI accreditation within 18 months with significant gaps in patient safety protocols, quality management systems, and staff competency frameworks.',
    solution: 'Implemented comprehensive quality management system covering all 127 JCI standards. Trained 450+ medical and administrative staff. Established continuous monitoring dashboards and patient safety reporting systems.',
    results: [
      'Achieved JCI accreditation in 14 months (4 months ahead of schedule)',
      'Patient safety incidents reduced by 62%',
      'Staff competency scores increased from 68% to 94%',
      'Patient satisfaction scores improved from 3.2 to 4.6 out of 5',
    ],
    testimonial: 'Pioneers International transformed our approach to quality. Their systematic methodology and hands-on support made the impossible possible.',
  },
  {
    id: 2, sector: 'Manufacturing', icon: Factory, color: 'from-orange-500 to-amber-600',
    industry: 'Industrial Facility', location: 'Jordan', duration: '10 months',
    challenge: 'Manufacturing plant faced high defect rates (12%), excessive energy costs, and ISO 9001/14001 compliance gaps affecting competitiveness in export markets.',
    solution: 'Implemented integrated ISO 9001 and ISO 14001 management systems. Deployed Lean Six Sigma methodology with Kaizen events. Established energy management program and supplier quality system.',
    results: [
      'Defect rate reduced from 12% to 4.1% — a 65% improvement',
      'Energy costs decreased by 23% saving $180K annually',
      'Achieved dual ISO 9001/14001 certification on first attempt',
      'Production efficiency increased by 31%',
    ],
    testimonial: 'The operational transformation exceeded our expectations. We are now more competitive than ever in export markets.',
  },
  {
    id: 3, sector: 'Education', icon: GraduationCap, color: 'from-blue-500 to-indigo-600',
    industry: 'University', location: 'GCC Region', duration: '18 months',
    challenge: 'University needed international accreditation to attract foreign students and research funding. Significant gaps in academic quality assurance, governance structure, and administrative efficiency.',
    solution: 'Developed comprehensive quality assurance framework aligned with international standards. Restructured governance board and academic committees. Implemented ISO 21001 educational management system.',
    results: [
      'Achieved international institutional accreditation',
      'Foreign student enrollment increased by 40%',
      'Research funding applications success rate improved from 15% to 38%',
      'Administrative process efficiency improved by 45%',
    ],
    testimonial: 'Pioneers understood the unique challenges of higher education. Their approach was both strategic and practical.',
  },
  {
    id: 4, sector: 'Banking', icon: Landmark, color: 'from-emerald-500 to-teal-600',
    industry: 'Regional Bank', location: 'Jordan', duration: '12 months',
    challenge: 'Regional bank needed to comply with new central bank risk management regulations while modernizing governance structure and implementing robust AML framework.',
    solution: 'Implemented ISO 31000 enterprise risk management framework. Redesigned board governance structure with independent committees. Deployed comprehensive AML compliance program with transaction monitoring.',
    results: [
      'Full regulatory compliance achieved with zero findings',
      'Risk incidents reduced by 45% within first year',
      'AML false positive rate reduced from 85% to 32%',
      'Board effectiveness score improved from 2.8 to 4.2 out of 5',
    ],
    testimonial: 'Their banking expertise was evident from day one. The governance transformation has positioned us for sustainable growth.',
  },
  {
    id: 5, sector: 'Government', icon: Building2, color: 'from-navy to-blue-700',
    industry: 'Ministry', location: 'Jordan', duration: '24 months',
    challenge: 'Government ministry needed to improve service delivery, achieve institutional excellence certification, and digitize 80+ citizen services.',
    solution: 'Implemented EFQM excellence model across all departments. Redesigned 120+ processes using Lean methodology. Established KPI dashboards and citizen satisfaction measurement systems.',
    results: [
      'Achieved 4-star institutional excellence rating',
      'Citizen satisfaction improved from 58% to 84%',
      'Service delivery time reduced by an average of 52%',
      'Employee engagement scores increased from 61% to 89%',
    ],
    testimonial: 'The transformation was remarkable. Citizens can feel the difference in every service interaction.',
  },
  {
    id: 6, sector: 'Hospitality', icon: UtensilsCrossed, color: 'from-purple-500 to-violet-600',
    industry: 'Hotel Chain', location: 'UAE', duration: '8 months',
    challenge: '12-property hotel chain needed to standardize quality across all locations while achieving sustainability certification and improving food safety compliance.',
    solution: 'Implemented unified QMS across all 12 properties. Deployed ISO 22000 for F&B operations. Launched Green Key sustainability program with staff training and guest engagement initiatives.',
    results: [
      'All 12 properties achieved Green Key certification',
      'Guest satisfaction score increased from 4.1 to 4.7 out of 5',
      'Food safety violations eliminated (zero findings in inspection)',
      'Energy consumption reduced by 18% across the portfolio',
    ],
    testimonial: 'Standardizing quality across 12 properties seemed impossible. Pioneers made it happen with their systematic approach.',
  },
];

export default function CaseStudies() {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-offwhite">
      <SEO title="Case Studies | Pioneers International" description="Proven results across Healthcare, Manufacturing, Education, Banking, Government, and Hospitality. Real transformation stories with measurable outcomes." />

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy via-[#0a3560] to-[#0d4a3a] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-caption uppercase tracking-[0.15em] text-emerald font-medium">Proven Results</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mt-3">Case Studies</h1>
            <h2 className="text-2xl font-bold text-emerald mt-2" dir="rtl">دراسات الحالة</h2>
            <p className="text-slate-300 mt-4 max-w-2xl">
              Real transformation stories from organizations across MENA. Every case study demonstrates measurable outcomes and sustainable improvement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '500+', label: 'Projects Delivered' },
              { value: '98%', label: 'Client Satisfaction' },
              { value: '100%', label: 'Certification Success' },
              { value: '30+', label: 'Years Experience' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-navy">{stat.value}</div>
                <div className="text-xs text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="space-y-6">
          {caseStudies.map((cs, i) => (
            <motion.div key={cs.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all">
              {/* Header */}
              <div className={`h-1 bg-gradient-to-r ${cs.color}`} />
              <div className="p-6 cursor-pointer" onClick={() => setExpandedId(expandedId === cs.id ? null : cs.id)}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cs.color} flex items-center justify-center shrink-0`}>
                      <cs.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-emerald/10 text-emerald text-xs font-bold rounded-full">{cs.sector}</span>
                        <span className="text-xs text-slate-400">{cs.industry} · {cs.location}</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-800">{cs.results[0]}</h3>
                      <p className="text-sm text-slate-500 mt-1">{cs.challenge.substring(0, 120)}...</p>
                    </div>
                  </div>
                  {expandedId === cs.id ? <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
                </div>
              </div>

              {/* Expanded Content */}
              {expandedId === cs.id && (
                <div className="px-6 pb-6 border-t border-slate-100 pt-4">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Challenge</p>
                      <p className="text-sm text-slate-600">{cs.challenge}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1"><Award className="w-3 h-3" /> Solution</p>
                      <p className="text-sm text-slate-600">{cs.solution}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-emerald mb-2 flex items-center gap-1"><BarChart3 className="w-3 h-3" /> Results</p>
                      <ul className="space-y-2">
                        {cs.results.map((r, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-slate-700">
                            <CheckCircle className="w-4 h-4 text-emerald shrink-0 mt-0.5" />{r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {cs.testimonial && (
                    <blockquote className="mt-6 bg-slate-50 border-l-4 border-emerald rounded-r-lg p-4 italic text-slate-600 text-sm">
                      "{cs.testimonial}"
                    </blockquote>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-16 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">Want Similar Results?</h2>
        <p className="text-slate-300 mb-6">Every organization is unique. Let us discuss how we can help you achieve your goals.</p>
        <button onClick={() => navigate('/contact')} className="inline-flex items-center gap-2 px-8 py-4 bg-emerald text-white rounded-full font-semibold hover:bg-emerald-dark transition-all">
          <ArrowRight className="w-5 h-5" /> Start Your Transformation
        </button>
      </section>
    </div>
  );
}
