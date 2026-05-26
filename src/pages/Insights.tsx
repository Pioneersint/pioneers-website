import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, FileText, BarChart3, Brain, ArrowLeft, Download,
  TrendingUp, Globe, Cpu, Landmark, Lightbulb,
  Calendar, Search, X, ArrowRight, Tag
} from 'lucide-react';
import SEO from '@/components/SEO';

const categories = ['All', 'Market Analysis', 'AI & Digital', 'Government', 'Economic', 'Industry Reports'];

const insights = [
  {
    id: 1, category: 'Market Analysis', title: 'MENA Consulting Market Outlook 2026-2027',
    titleAr: 'آفاق سوق الاستشارات في منطقة الشرق الأوسط وشمال أفريقيا 2026-2027',
    excerpt: 'The management consulting market in MENA is projected to reach $12.8 billion by 2027, driven by digital transformation, regulatory changes, and economic diversification efforts across the region.',
    date: '2026-01-15', readTime: '8 min', icon: TrendingUp, color: 'bg-emerald/10 text-emerald',
    reportFile: '/assets/reports/mena-digital-transformation-index-2026.pdf',
  },
  {
    id: 2, category: 'AI & Digital', title: 'AI Adoption in the Arab World: Opportunities and Challenges',
    titleAr: 'تبني الذكاء الاصطناعي في العالم العربي: الفرص والتحديات',
    excerpt: 'With AI investment in the Arab world exceeding $3.2 billion in 2025, organizations are racing to integrate AI into operations. This report examines the readiness, challenges, and opportunities across key sectors.',
    date: '2026-02-01', readTime: '12 min', icon: Brain, color: 'bg-violet-100 text-violet-600',
    reportFile: '/assets/reports/artificial-intelligence-arab-world.pdf',
  },
  {
    id: 3, category: 'Government', title: 'Digital Government Transformation in Jordan: 2026 Progress Report',
    titleAr: 'تحول الحكومة الرقمية في الأردن: تقرير التقدم 2026',
    excerpt: 'Jordans digital government initiative has achieved 78% service digitalization, with e-payment integration across 94% of government entities. This report analyzes progress, gaps, and recommendations.',
    date: '2026-01-20', readTime: '10 min', icon: Landmark, color: 'bg-navy/10 text-navy',
    reportFile: '/assets/reports/mena-digital-transformation-index-2026.pdf',
  },
  {
    id: 4, category: 'Economic', title: 'The Digital Economy in MENA: $500 Billion Opportunity by 2030',
    titleAr: 'الاقتصاد الرقمي في منطقة الشرق الأوسط وشمال أفريقيا: فرصة 500 مليار دولار بحلول 2030',
    excerpt: 'Digital economy contribution to MENA GDP is expected to reach $500 billion by 2030. This comprehensive analysis covers e-commerce, fintech, digital services, and the infrastructure needed to support this growth.',
    date: '2026-03-01', readTime: '15 min', icon: Globe, color: 'bg-blue-100 text-blue-600',
    reportFile: '/assets/reports/mena-digital-transformation-index-2026.pdf',
  },
  {
    id: 5, category: 'AI & Digital', title: 'The Future of AI in Healthcare Across the Middle East',
    titleAr: 'مستقبل الذكاء الاصطناعي في الرعاية الصحية عبر الشرق الأوسط',
    excerpt: 'AI healthcare market in the Middle East is growing at 34% CAGR. From diagnostic imaging to patient management systems, AI is revolutionizing healthcare delivery across the region.',
    date: '2026-02-15', readTime: '11 min', icon: Cpu, color: 'bg-rose-100 text-rose-600',
    reportFile: '/assets/reports/artificial-intelligence-arab-world.pdf',
  },
  {
    id: 6, category: 'Industry Reports', title: 'ISO Certification Trends 2026: What Organizations Need to Know',
    titleAr: 'اتجاهات شهادات ISO 2026: ما تحتاج المؤسسات لمعرفته',
    excerpt: 'With over 1.2 million ISO certificates issued globally in 2025, new standards are emerging in areas like AI governance (ISO/IEC 42001) and blockchain (ISO/TC 307). This report covers the trends.',
    date: '2026-01-28', readTime: '9 min', icon: FileText, color: 'bg-amber-100 text-amber-600',
    reportFile: '/assets/reports/iso-standards-compliance-guide-2026.pdf',
  },
  {
    id: 7, category: 'Market Analysis', title: 'ESG Reporting Requirements: MENA Regulatory Landscape 2026',
    titleAr: 'متطلبات تقارير ESG: المشهد التنظيمي في منطقة الشرق الأوسط وشمال أفريقيا 2026',
    excerpt: 'Saudi Arabia, UAE, and Jordan have introduced mandatory ESG reporting for listed companies. This analysis covers the regulatory requirements, implementation timelines, and best practices.',
    date: '2026-02-20', readTime: '10 min', icon: BarChart3, color: 'bg-emerald/10 text-emerald',
    reportFile: '/assets/reports/mena-digital-transformation-index-2026.pdf',
  },
  {
    id: 8, category: 'Economic', title: 'Green Economy Transition: Jordan Renewable Energy Sector Analysis',
    titleAr: 'التحول نحو الاقتصاد الأخضر: تحليل قطاع الطاقة المتجددة في الأردن',
    excerpt: 'Jordan has achieved 29% renewable energy capacity, targeting 50% by 2030. This report analyzes investment opportunities, regulatory framework, and sector challenges.',
    date: '2026-03-10', readTime: '13 min', icon: TrendingUp, color: 'bg-emerald/10 text-emerald',
    reportFile: '/assets/reports/healthcare-accreditation-market-analysis.pdf',
  },
];

const resources = [
  { type: 'PDF Report', title: 'MENA Digital Transformation Index 2026', downloads: 2340, size: '28 KB', file: '/assets/reports/mena-digital-transformation-index-2026.pdf' },
  { type: 'Market Study', title: 'Healthcare Accreditation Market Analysis', downloads: 1890, size: '27 KB', file: '/assets/reports/healthcare-accreditation-market-analysis.pdf' },
  { type: 'PDF Report', title: 'ISO Standards Compliance Guide 2026', downloads: 3120, size: '29 KB', file: '/assets/reports/iso-standards-compliance-guide-2026.pdf' },
  { type: 'AI Analysis', title: 'Artificial Intelligence in the Arab World', downloads: 2780, size: '31 KB', file: '/assets/reports/artificial-intelligence-arab-world.pdf' },
];

export default function Insights() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInsight, setSelectedInsight] = useState<typeof insights[0] | null>(null);

  const filtered = insights.filter((item) => {
    const matchCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchSearch = !searchQuery || item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-offwhite">
      <SEO title="Research & Insights | Pioneers International" description="Market analysis, AI research, industry reports, and strategic insights from Pioneers International consulting team." />

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy via-[#0a3560] to-[#0d4a3a] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <Lightbulb className="w-4 h-4 text-emerald" />
              <span className="text-sm text-white/90">Knowledge Hub</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white">Research & Insights</h1>
            <h2 className="text-2xl font-bold text-emerald mt-2" dir="rtl">الأبحاث والرؤى</h2>
            <p className="text-slate-300 mt-4 max-w-2xl">
              Strategic analysis, market research, and thought leadership from our consulting team across MENA.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search insights..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-navy" />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeCategory === cat ? 'bg-navy text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Insights Grid */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => setSelectedInsight(item)}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg ${item.color} flex items-center justify-center`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-medium text-slate-400">{item.category}</span>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Calendar className="w-3 h-3" />{item.date} · {item.readTime}
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-800 group-hover:text-navy transition-colors mb-2">{item.title}</h3>
              <h4 className="text-sm text-navy font-medium mb-3" dir="rtl">{item.titleAr}</h4>
              <p className="text-sm text-slate-500 mb-4 line-clamp-3">{item.excerpt}</p>
              <button onClick={(e) => { e.stopPropagation(); setSelectedInsight(item); }}
                className="flex items-center gap-1 text-emerald text-sm font-medium group-hover:gap-2 transition-all">
                Read More <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-lg">No insights match your search.</p>
          </div>
        )}
      </section>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedInsight && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setSelectedInsight(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-xl"
              onClick={(e) => e.stopPropagation()}>
              {/* Modal Header */}
              <div className={`${selectedInsight.color} p-6 rounded-t-2xl`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white/90 flex items-center justify-center shadow-sm">
                      <selectedInsight.icon className="w-6 h-6 text-slate-700" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wide opacity-70">{selectedInsight.category}</span>
                      <h3 className="text-lg font-bold text-slate-800">{selectedInsight.title}</h3>
                    </div>
                  </div>
                  <button onClick={() => setSelectedInsight(null)} className="p-1.5 rounded-full bg-white/50 hover:bg-white transition-colors">
                    <X className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
                <p className="text-sm text-slate-600 mt-2 font-medium" dir="rtl">{selectedInsight.titleAr}</p>
                <div className="flex items-center gap-3 mt-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{selectedInsight.date}</span>
                  <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />{selectedInsight.readTime} read</span>
                  <span className="flex items-center gap-1"><Tag className="w-3.5 h-3.5" />{selectedInsight.category}</span>
                </div>
              </div>
              {/* Modal Body */}
              <div className="p-6">
                <p className="text-slate-700 leading-relaxed mb-6">{selectedInsight.excerpt}</p>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6">
                  <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-emerald" /> Key Takeaways
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-slate-600">
                      <ArrowRight className="w-3.5 h-3.5 text-emerald shrink-0 mt-0.5" />
                      Strategic insights based on comprehensive market analysis and data-driven research.
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-600">
                      <ArrowRight className="w-3.5 h-3.5 text-emerald shrink-0 mt-0.5" />
                      Recommendations tailored for MENA organizations and decision-makers.
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-600">
                      <ArrowRight className="w-3.5 h-3.5 text-emerald shrink-0 mt-0.5" />
                      Updated with the latest 2026 data and regulatory developments.
                    </li>
                  </ul>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a href={selectedInsight?.reportFile || '#'} download
                    className="flex items-center gap-2 px-5 py-2.5 bg-navy text-white rounded-lg text-sm font-semibold hover:bg-navy-light transition-colors">
                    <Download className="w-4 h-4" /> Download Full Report
                  </a>
                  <button onClick={() => setSelectedInsight(null)}
                    className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                    Close
                  </button>
                </div>
                <p className="text-xs text-slate-400 mt-4" dir="rtl">
                  هل تريد معرفة المزيد؟ تواصل مع فريقنا للحصول على التقرير الكامل.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Downloadable Resources */}
      <section className="bg-navy py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-8">Downloadable Resources</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {resources.map((r, i) => (
              <motion.div key={r.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all">
                <FileText className="w-8 h-8 text-emerald mb-3" />
                <p className="text-[10px] text-emerald font-medium uppercase">{r.type}</p>
                <h4 className="text-white font-semibold text-sm mt-1 leading-snug">{r.title}</h4>
                <div className="flex items-center gap-3 mt-3 text-xs text-slate-400">
                  <span>{r.size}</span>
                  <span>{r.downloads.toLocaleString()} downloads</span>
                </div>
                <a href={r.file} download className="mt-3 flex items-center gap-1 text-emerald text-xs font-medium hover:underline">
                  <Download className="w-3.5 h-3.5" /> Download PDF
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
