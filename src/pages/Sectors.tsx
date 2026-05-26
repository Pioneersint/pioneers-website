import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Stethoscope, GraduationCap, Landmark, Factory, Building2,
  UtensilsCrossed, ChevronRight,
  ArrowRight, AlertTriangle, CheckCircle, Lightbulb, BarChart3
} from 'lucide-react';
import SEO from '@/components/SEO';

const sectors = [
  {
    id: 'healthcare',
    name: 'Healthcare',
    nameAr: 'القطاع الصحي',
    icon: Stethoscope,
    desc: 'Comprehensive quality and compliance solutions for hospitals, clinics, and healthcare networks across MENA.',
    descAr: 'حلول جودة وامتثال شاملة للمستشفيات والعيادات وشبكات الرعاية الصحية في منطقة الشرق الأوسط وشمال أفريقيا.',
    challenges: ['Accreditation readiness (JCI, CBAHI, HCAC)', 'Patient safety & quality gaps', 'Regulatory compliance', 'Staff competency & training', 'Infection control standards'],
    solutions: ['HCMS Pro compliance platform', 'Accreditation gap analysis', 'Quality management systems', 'Staff training & competency frameworks', 'Patient safety protocols'],
    stats: { clients: '45+', satisfaction: '98%', accreditation: '100%' },
    color: 'from-rose-500 to-pink-600',
  },
  {
    id: 'education',
    name: 'Education',
    nameAr: 'قطاع التعليم',
    icon: GraduationCap,
    desc: 'Institutional excellence frameworks for universities, schools, and training centers seeking accreditation and quality enhancement.',
    descAr: 'أطر التميز المؤسسي للجامعات والمدارس ومراكز التدريب التي تسعى للاعتماد وتعزيز الجودة.',
    challenges: ['Academic accreditation standards', 'Administrative efficiency', 'Quality assurance frameworks', 'Digital transformation', 'Governance compliance'],
    solutions: ['ISO 21001 implementation', 'Academic quality audits', 'Strategic planning', 'Digital readiness assessment', 'Governance frameworks'],
    stats: { clients: '30+', satisfaction: '97%', accreditation: '95%' },
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'banking',
    name: 'Banking & Finance',
    nameAr: 'البنوك والخدمات المالية',
    icon: Landmark,
    desc: 'Risk management, compliance, and governance solutions for banks, insurance companies, and financial institutions.',
    descAr: 'حلول إدارة المخاطر والامتثال والحوكمة للبنوك وشركات التأمين والمؤسسات المالية.',
    challenges: ['Regulatory compliance (CBI, CBJ)', 'AML/CFT frameworks', 'Risk management (ISO 31000)', 'Corporate governance', 'Digital banking transformation'],
    solutions: ['ISO 31000 risk management', 'AML compliance programs', 'Governance frameworks', 'Internal audit systems', 'Strategic transformation'],
    stats: { clients: '25+', satisfaction: '99%', accreditation: '100%' },
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    nameAr: 'الصناعة',
    icon: Factory,
    desc: 'Operational excellence, quality systems, and lean manufacturing solutions for industrial facilities.',
    descAr: 'التميز التشغيلي وأنظمة الجودة وحلول التصنيع الرشيق للمنشآت الصناعية.',
    challenges: ['ISO 9001/14001/45001 compliance', 'Operational efficiency', 'Supply chain optimization', 'Environmental sustainability', 'Workplace safety'],
    solutions: ['Integrated management systems', 'Lean Six Sigma programs', 'Environmental compliance', 'Safety management systems', 'Process optimization'],
    stats: { clients: '60+', satisfaction: '96%', accreditation: '98%' },
    color: 'from-orange-500 to-amber-600',
  },
  {
    id: 'government',
    name: 'Government',
    nameAr: 'القطاع الحكومي',
    icon: Building2,
    desc: 'Institutional transformation and excellence frameworks for government ministries and public sector organizations.',
    descAr: 'التحول المؤسسي وأطر التميز للوزارات الحكومية والمؤسسات العامة.',
    challenges: ['Institutional excellence standards', 'Digital government readiness', 'Performance management', 'Regulatory compliance', 'Strategic transformation'],
    solutions: ['Institutional excellence programs', 'Digital transformation roadmaps', 'KPI frameworks', 'Compliance management', 'Strategic planning'],
    stats: { clients: '20+', satisfaction: '98%', accreditation: '100%' },
    color: 'from-navy to-blue-700',
  },
  {
    id: 'hospitality',
    name: 'Hospitality & Tourism',
    nameAr: 'الضيافة والسياحة',
    icon: UtensilsCrossed,
    desc: 'Quality, safety, and guest experience solutions for hotels, restaurants, and tourism operators.',
    descAr: 'حلول الجودة والسلامة وتجربة الضيف للفنادق والمطاعم ومشغلي السياحة.',
    challenges: ['Food safety (ISO 22000/HACCP)', 'Guest experience standards', 'HSE compliance', 'Staff training & service quality', 'Sustainability certification'],
    solutions: ['ISO 22000 implementation', 'HSE management systems', 'Service quality frameworks', 'Staff competency programs', 'Green certification support'],
    stats: { clients: '35+', satisfaction: '97%', accreditation: '94%' },
    color: 'from-purple-500 to-violet-600',
  },
];

export default function Sectors() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-offwhite">
      <SEO title="Industry Sectors | Pioneers International" description="Specialized consulting solutions for Healthcare, Education, Banking, Manufacturing, Government, and Hospitality sectors across MENA." />

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy via-[#0a3560] to-[#0d4a3a] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors">
            <ArrowRight className="w-4 h-4" /> Back to Home
          </button>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-caption uppercase tracking-[0.15em] text-emerald font-medium">INDUSTRIES WE SERVE</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mt-3">Industry Sectors</h1>
            <h2 className="text-2xl font-bold text-emerald mt-2" dir="rtl">القطاعات التي نخدمها</h2>
            <p className="text-slate-300 mt-4 max-w-2xl">
              Tailored consulting solutions across 9+ industries, addressing unique challenges with proven methodologies and measurable outcomes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sectors Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sector, i) => (
            <motion.div
              key={sector.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all group cursor-pointer"
              onClick={() => navigate(`/sectors/${sector.id}`)}
            >
              <div className={`h-2 bg-gradient-to-r ${sector.color}`} />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${sector.color} flex items-center justify-center`}>
                    <sector.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">{sector.name}</h3>
                    <p className="text-sm text-navy font-medium" dir="rtl">{sector.nameAr}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-500 mb-4">{sector.desc}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-slate-50 rounded-lg p-2 text-center">
                    <div className="text-lg font-bold text-navy">{sector.stats.clients}</div>
                    <div className="text-[10px] text-slate-400">Clients</div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2 text-center">
                    <div className="text-lg font-bold text-emerald">{sector.stats.satisfaction}</div>
                    <div className="text-[10px] text-slate-400">Satisfaction</div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2 text-center">
                    <div className="text-lg font-bold text-navy">{sector.stats.accreditation}</div>
                    <div className="text-[10px] text-slate-400">Success</div>
                  </div>
                </div>

                {/* Challenges preview */}
                <div className="space-y-1 mb-4">
                  {sector.challenges.slice(0, 2).map((c) => (
                    <div key={c} className="flex items-center gap-2 text-xs text-slate-500">
                      <AlertTriangle className="w-3 h-3 text-amber-500" />
                      {c}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-1 text-emerald text-sm font-medium group-hover:gap-2 transition-all">
                  Explore Sector <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Sector-Specific */}
      <section className="bg-navy py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Lightbulb className="w-10 h-10 text-emerald mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white">Why Sector-Specific Consulting?</h2>
          <p className="text-slate-300 mt-3">
            Each industry has unique regulatory frameworks, operational challenges, and compliance requirements.
            Our sector-focused approach ensures solutions that are not just theoretically sound, but practically implementable
            within your specific industry context.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            {[
              { icon: CheckCircle, label: 'Industry Expertise', desc: 'Deep knowledge of sector-specific regulations and standards' },
              { icon: BarChart3, label: 'Proven Results', desc: 'Track record of successful implementations in each sector' },
              { icon: Lightbulb, label: 'Tailored Solutions', desc: 'Customized approaches, not one-size-fits-all templates' },
            ].map((item) => (
              <div key={item.label} className="bg-white/10 border border-white/10 rounded-xl p-5">
                <item.icon className="w-8 h-8 text-emerald mx-auto mb-3" />
                <h3 className="text-white font-semibold text-sm">{item.label}</h3>
                <p className="text-slate-400 text-xs mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
