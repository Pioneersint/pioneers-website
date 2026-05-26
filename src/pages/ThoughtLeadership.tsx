import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Brain, Globe, Landmark, TrendingUp, Lightbulb,
  BarChart3, Cpu, ArrowRight, Calendar
} from 'lucide-react';
import SEO from '@/components/SEO';

const reports = [
  {
    id: 1, year: '2026-2027', category: 'Market Predictions', icon: TrendingUp, color: 'bg-emerald/10 text-emerald',
    title: 'MENA Consulting Market Forecast 2026-2027',
    titleAr: 'توقعات سوق الاستشارات في منطقة الشرق الأوسط وشمال أفريقيا 2026-2027',
    points: [
      'Management consulting market projected to reach $12.8B by 2027 (8.5% CAGR)',
      'Digital transformation consulting segment growing at 15% annually',
      'Healthcare consulting driven by privatization and accreditation demands',
      'ESG advisory services emerging as fastest-growing segment at 22% CAGR',
      'Saudi Vision 2030 and Qatar National Vision 2030 driving major consulting spend',
    ],
  },
  {
    id: 2, year: '2026', category: 'AI in the Arab World', icon: Brain, color: 'bg-violet-100 text-violet-600',
    title: 'The Future of AI in the Arab World: 2026 Report',
    titleAr: 'مستقبل الذكاء الاصطناعي في العالم العربي: تقرير 2026',
    points: [
      'AI investment in the Arab world exceeded $3.2 billion in 2025',
      'UAE leads with National AI Strategy 2031; Saudi Arabia follows with $20B AI investment plan',
      'Healthcare, finance, and government sectors showing highest AI adoption rates',
      'Key challenge: 68% of organizations lack adequate AI governance frameworks',
      'Opportunity: AI could add $320 billion to MENA GDP by 2030 (PwC estimate)',
      'Jordan positioning as regional AI hub with Sahab AI initiatives',
    ],
  },
  {
    id: 3, year: '2026', category: 'Government Transformation', icon: Landmark, color: 'bg-navy/10 text-navy',
    title: 'Digital Government Transformation: MENA Progress Report',
    titleAr: 'التحول الحكومي الرقمي: تقرير التقدم في منطقة الشرق الأوسط وشمال أفريقيا',
    points: [
      'UAE ranks 1st globally in UN E-Government Development Index (2024)',
      'Saudi Arabia achieved 97% government service digitalization under Vision 2030',
      'Jordan: 78% service digitalization with e-payment across 94% of entities',
      'Key trend: AI-powered government services (chatbots, predictive analytics)',
      'Cybersecurity spending in government increased 45% across MENA',
      'Open data initiatives expanding in UAE, Jordan, and Egypt',
    ],
  },
  {
    id: 4, year: '2026-2027', category: 'Digital Economy', icon: Cpu, color: 'bg-blue-100 text-blue-600',
    title: 'The Digital Economy in MENA: A $500 Billion Opportunity',
    titleAr: 'الاقتصاد الرقمي في منطقة الشرق الأوسط وشمال أفريقيا: فرصة 500 مليار دولار',
    points: [
      'Digital economy to contribute $500B to MENA GDP by 2030 (up from $180B in 2024)',
      'Fintech leading with $8.5B in investment across 380+ startups',
      'E-commerce growth: 35% CAGR, driven by mobile penetration (72% in MENA)',
      'Digital payments volume increased 48% year-over-year in 2025',
      'Cloud adoption in government and enterprise reaching 65%',
      'Key barrier: Digital skills gap affecting 58% of organizations',
    ],
  },
];

const upcoming = [
  { date: 'Q2 2026', title: 'ISO Standards Evolution: What\'s New in 2026' },
  { date: 'Q2 2026', title: 'Green Economy Transition in Jordan' },
  { date: 'Q3 2026', title: 'ESG Compliance: MENA Regulatory Update' },
  { date: 'Q3 2026', title: 'Healthcare 4.0: Smart Hospitals in the Middle East' },
  { date: 'Q4 2026', title: 'Cybersecurity Trends for 2027' },
  { date: 'Q4 2026', title: 'Saudi Vision 2030: Mid-point Progress Assessment' },
];

export default function ThoughtLeadership() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-offwhite">
      <SEO title="Thought Leadership | Pioneers International" description="Market predictions, AI research, government transformation reports, and digital economy analysis from Pioneers International." />

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy via-[#0a3560] to-[#0d4a3a] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <Lightbulb className="w-4 h-4 text-emerald" />
              <span className="text-sm text-white/90">Thought Leadership</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white">Strategic Perspectives</h1>
            <h2 className="text-2xl font-bold text-emerald mt-2" dir="rtl">وجهات نظر استراتيجية</h2>
            <p className="text-slate-300 mt-4 max-w-2xl">
              Forward-looking analysis on market trends, AI transformation, government digitalization, and the evolving digital economy across MENA.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Reports */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {reports.map((report, i) => (
            <motion.div key={report.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl ${report.color} flex items-center justify-center`}>
                    <report.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-slate-400">{report.category} · {report.year}</span>
                    <h3 className="text-xl font-bold text-slate-800">{report.title}</h3>
                    <h4 className="text-sm text-navy font-medium" dir="rtl">{report.titleAr}</h4>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 mt-6">
                  {report.points.map((point, j) => (
                    <div key={j} className="flex items-start gap-2 bg-slate-50 rounded-lg p-3">
                      <BarChart3 className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-600">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Upcoming */}
      <section className="bg-navy py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <Calendar className="w-6 h-6 text-emerald" /> Upcoming Research
          </h2>
          <div className="space-y-3">
            {upcoming.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4">
                <span className="px-3 py-1 bg-emerald/20 text-emerald text-xs font-bold rounded-full shrink-0">{item.date}</span>
                <span className="text-white text-sm">{item.title}</span>
                <ArrowRight className="w-4 h-4 text-slate-400 ml-auto shrink-0" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <Globe className="w-12 h-12 text-navy mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-800 mb-3">Stay Ahead of the Curve</h2>
        <p className="text-slate-500 mb-6 max-w-xl mx-auto">
          Our research team continuously monitors market developments across MENA. Contact us for bespoke research and strategic advisory.
        </p>
        <button onClick={() => navigate('/contact')} className="inline-flex items-center gap-2 px-8 py-4 bg-emerald text-white rounded-full font-semibold hover:bg-emerald-dark transition-all">
          <ArrowRight className="w-5 h-5" /> Request Custom Research
        </button>
      </section>
    </div>
  );
}
