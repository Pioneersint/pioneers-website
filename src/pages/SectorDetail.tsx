import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, AlertTriangle, CheckCircle, Lightbulb, BarChart3,
  TrendingUp, Target
} from 'lucide-react';
import SEO from '@/components/SEO';

const sectorData: Record<string, {
  name: string; nameAr: string; color: string; colorBg: string;
  description: string; descriptionAr: string;
  challenges: string[]; challengesAr: string[];
  solutions: { title: string; desc: string }[];
  caseStudy: { client: string; challenge: string; solution: string; result: string };
  insights: string[];
}> = {
  healthcare: {
    name: 'Healthcare', nameAr: 'القطاع الصحي', color: 'from-rose-500 to-pink-600', colorBg: 'bg-rose-50',
    description: 'Comprehensive quality and compliance solutions for hospitals, clinics, and healthcare networks. We help healthcare providers achieve international accreditation while improving patient safety and operational efficiency.',
    descriptionAr: 'حلول جودة وامتثال شاملة للمستشفيات والعيادات وشبكات الرعاية الصحية. نساعد مقدمي الرعاية الصحية على تحقيق الاعتماد الدولي مع تحسين سلامة المرضى والكفاءة التشغيلية.',
    challenges: ['Accreditation readiness (JCI, CBAHI, HCAC)', 'Patient safety & quality gaps', 'Regulatory compliance complexity', 'Staff competency & training gaps', 'Infection control standardization', 'Medical equipment safety protocols'],
    challengesAr: ['جاهزية الاعتماد (JCI, CBAHI, HCAC)', 'فجوات سلامة المرضى والجودة', 'تعقيد الامتثال التنظيمي', 'فجوات الكفاءة والتدريب للموظفين', 'توحيد مكافحة العدوى', 'بروتوكولات سلامة المعدات الطبية'],
    solutions: [
      { title: 'Accreditation Gap Analysis', desc: 'Comprehensive assessment against JCI, CBAHI, HCAC, and HAAD standards with actionable improvement roadmaps.' },
      { title: 'Quality Management Systems', desc: 'Implementation of ISO 15189, ISO 9001, and patient safety frameworks tailored to healthcare environments.' },
      { title: 'Staff Competency Frameworks', desc: 'Structured training programs, competency assessments, and continuous professional development systems.' },
      { title: 'Infection Control Programs', desc: 'Evidence-based infection prevention protocols aligned with CDC and WHO guidelines.' },
    ],
    caseStudy: { client: 'Major Hospital Group (KSA)', challenge: 'Needed JCI accreditation within 18 months with significant gaps in patient safety protocols.', solution: 'Implemented comprehensive quality management system with 127 JCI standards, trained 450+ staff, and established continuous monitoring.', result: 'Achieved JCI accreditation in 14 months. Patient safety incidents reduced by 62%.' },
    insights: ['Healthcare accreditation market in MENA growing at 12% annually', 'Digital health transformation is the #1 priority for 78% of healthcare CEOs', 'Post-COVID emphasis on infection control creating new compliance requirements'],
  },
  education: {
    name: 'Education', nameAr: 'قطاع التعليم', color: 'from-blue-500 to-indigo-600', colorBg: 'bg-blue-50',
    description: 'Institutional excellence frameworks for universities, schools, and training centers. We enable educational institutions to achieve accreditation, enhance quality, and build sustainable governance structures.',
    descriptionAr: 'أطر التميز المؤسسي للجامعات والمدارس ومراكز التدريب. نمكّن المؤسسات التعليمية من تحقيق الاعتماد وتعزيز الجودة وبناء هياكل حوكمة مستدامة.',
    challenges: ['Academic accreditation compliance', 'Administrative efficiency gaps', 'Quality assurance framework gaps', 'Digital learning readiness', 'Governance structure weaknesses', 'Curriculum alignment with market needs'],
    challengesAr: ['الامتثال للاعتماد الأكاديمي', 'فجوات الكفاءة الإدارية', 'فجوات إطار ضمان الجودة', 'جاهزية التعلم الرقمي', 'ضعف هياكل الحوكمة', 'مواءمة المناهج مع احتياجات السوق'],
    solutions: [
      { title: 'ISO 21001 Implementation', desc: 'Full implementation of educational organization management systems with focus on learning outcomes.' },
      { title: 'Academic Quality Audits', desc: 'Systematic review of teaching, research, and administrative processes against international benchmarks.' },
      { title: 'Strategic Planning', desc: 'Development of 5-year strategic plans aligned with national education visions and market demands.' },
      { title: 'Digital Readiness Assessment', desc: 'Evaluation and roadmap for digital transformation in teaching and administration.' },
    ],
    caseStudy: { client: 'University (GCC)', challenge: 'Required international accreditation to attract foreign students and research funding.', solution: 'Developed comprehensive quality assurance framework, restructured governance, and implemented ISO 21001.', result: 'Achieved international accreditation. Foreign student enrollment increased by 40%.' },
    insights: ['EdTech investment in MENA reached $2.5B in 2024', '72% of universities are undergoing digital transformation', 'Quality assurance is becoming mandatory for government funding'],
  },
  banking: {
    name: 'Banking & Finance', nameAr: 'البنوك والمالية', color: 'from-emerald-500 to-teal-600', colorBg: 'bg-emerald-50',
    description: 'Risk management, compliance, and governance solutions for banks, insurance companies, and financial institutions navigating complex regulatory environments.',
    descriptionAr: 'حلول إدارة المخاطر والامتثال والحوكمة للبنوك وشركات التأمين والمؤسسات المالية التي تتنقل في بيئات تنظيمية معقدة.',
    challenges: ['Central bank regulatory compliance', 'AML/CFT framework requirements', 'Enterprise risk management (ISO 31000)', 'Corporate governance standards', 'Digital banking security', 'Basel III/IV implementation'],
    challengesAr: ['الامتثال التنظيمي للبنك المركزي', 'متطلبات إطار مكافحة غسل الأموال', 'إدارة المخاطر المؤسسية (ISO 31000)', 'معايير الحوكمة الشركاتية', 'أمان الخدمات المصرفية الرقمية', 'تطبيق بازل III/IV'],
    solutions: [
      { title: 'ISO 31000 Risk Management', desc: 'Enterprise-wide risk identification, assessment, and mitigation frameworks.' },
      { title: 'AML Compliance Programs', desc: 'End-to-end anti-money laundering frameworks with transaction monitoring and reporting.' },
      { title: 'Governance Frameworks', desc: 'Board effectiveness, committee structures, and policy development.' },
      { title: 'Strategic Transformation', desc: 'Digital transformation roadmaps for banking 4.0 readiness.' },
    ],
    caseStudy: { client: 'Regional Bank', challenge: 'Needed to comply with new central bank regulations while modernizing risk management.', solution: 'Implemented ISO 31000 risk framework, redesigned governance structure, and deployed AML compliance system.', result: 'Full regulatory compliance achieved. Risk incidents reduced by 45%.' },
    insights: ['Open banking regulations expanding across MENA', 'Cybersecurity spending in banking up 35% YoY', 'ESG compliance becoming mandatory for listed banks'],
  },
  manufacturing: {
    name: 'Manufacturing', nameAr: 'الصناعة', color: 'from-orange-500 to-amber-600', colorBg: 'bg-orange-50',
    description: 'Operational excellence, quality systems, and lean manufacturing solutions for industrial facilities seeking efficiency and sustainability.',
    descriptionAr: 'التميز التشغيلي وأنظمة الجودة وحلول التصنيع الرشيق للمنشآت الصناعية التي تسعى للكفاءة والاستدامة.',
    challenges: ['ISO 9001/14001/45001 compliance', 'Operational efficiency bottlenecks', 'Supply chain optimization', 'Environmental sustainability goals', 'Workplace safety standards', 'Industry 4.0 readiness'],
    challengesAr: ['الامتثال ISO 9001/14001/45001', 'اختناقات الكفاءة التشغيلية', 'تحسين سلسلة التوريد', 'أهداف الاستدامة البيئية', 'معايير سلامة مكان العمل', 'جاهزية الثورة الصناعية 4.0'],
    solutions: [
      { title: 'Integrated Management Systems', desc: 'Unified QMS, EMS, and OHSMS implementation with streamlined processes.' },
      { title: 'Lean Six Sigma Programs', desc: 'Process optimization with measurable waste reduction and efficiency gains.' },
      { title: 'Environmental Compliance', desc: 'Carbon footprint reduction, waste management, and ISO 14001 implementation.' },
      { title: 'Safety Management Systems', desc: 'ISO 45001 implementation with behavioral safety programs.' },
    ],
    caseStudy: { client: 'Manufacturing Plant (Jordan)', challenge: 'High defect rates and energy costs impacting competitiveness.', solution: 'Implemented Lean Six Sigma, ISO 9001, and energy management system with staff training.', result: 'Defect rate reduced by 58%. Energy costs decreased by 23%.' },
    insights: ['Manufacturing sector in Jordan contributes 19% of GDP', 'Green manufacturing incentives increasing across MENA', 'Industry 4.0 adoption accelerating post-pandemic'],
  },
  government: {
    name: 'Government', nameAr: 'القطاع الحكومي', color: 'from-navy to-blue-700', colorBg: 'bg-navy/5',
    description: 'Institutional transformation and excellence frameworks for government ministries and public sector organizations driving national development agendas.',
    descriptionAr: 'التحول المؤسسي وأطر التميز للوزارات الحكومية والمؤسسات العامة التي تقود أجندات التنمية الوطنية.',
    challenges: ['Institutional excellence standards', 'Digital government readiness', 'Performance management systems', 'Regulatory compliance', 'Strategic transformation', 'Public service quality'],
    challengesAr: ['معايير التميز المؤسسي', 'جاهزية الحكومة الرقمية', 'أنظمة إدارة الأداء', 'الامتثال التنظيمي', 'التحول الاستراتيجي', 'جودة الخدمة العامة'],
    solutions: [
      { title: 'Institutional Excellence Programs', desc: 'EFQM and excellence model implementation for public sector entities.' },
      { title: 'Digital Transformation Roadmaps', desc: 'Strategic planning for e-government and digital service delivery.' },
      { title: 'KPI Frameworks', desc: 'Performance measurement systems aligned with national development goals.' },
      { title: 'Compliance Management', desc: 'Regulatory compliance frameworks for government operations.' },
    ],
    caseStudy: { client: 'Government Ministry', challenge: 'Needed to improve service delivery and achieve institutional excellence certification.', solution: 'Implemented EFQM excellence model, redesigned 120+ processes, and established KPI dashboards.', result: 'Achieved 4-star excellence rating. Citizen satisfaction improved by 38%.' },
    insights: ['Government digital transformation spending in MENA exceeded $15B in 2024', 'Institutional excellence becoming mandatory for government entities', 'AI adoption in public sector growing at 25% annually'],
  },
  hospitality: {
    name: 'Hospitality & Tourism', nameAr: 'الضيافة والسياحة', color: 'from-purple-500 to-violet-600', colorBg: 'bg-purple-50',
    description: 'Quality, safety, and guest experience solutions for hotels, restaurants, and tourism operators in one of the worlds most competitive markets.',
    descriptionAr: 'حلول الجودة والسلامة وتجربة الضيف للفنادق والمطاعم ومشغلي السياحة في واحدة من أكثر الأسواق تنافسية في العالم.',
    challenges: ['Food safety (ISO 22000/HACCP)', 'Guest experience consistency', 'HSE compliance', 'Staff training & service quality', 'Sustainability certification', 'Post-pandemic operational changes'],
    challengesAr: ['سلامة الغذاء (ISO 22000/HACCP)', 'اتساق تجربة الضيف', 'الامتثال HSE', 'تدريب الموظفين وجودة الخدمة', 'شهادة الاستدامة', 'التغييرات التشغيلية ما بعد الجائحة'],
    solutions: [
      { title: 'ISO 22000 Implementation', desc: 'Complete food safety management systems from procurement to service.' },
      { title: 'HSE Management Systems', desc: 'Health, safety, and environmental compliance for hospitality operations.' },
      { title: 'Service Quality Frameworks', desc: 'Guest journey optimization and service standard development.' },
      { title: 'Green Certification Support', desc: 'Sustainability programs for Green Key and EarthCheck certifications.' },
    ],
    caseStudy: { client: 'Hotel Chain (UAE)', challenge: 'Needed to standardize quality across 12 properties while achieving sustainability certification.', solution: 'Implemented unified QMS, ISO 22000 for F&B, and Green Key sustainability program.', result: 'All 12 properties achieved Green Key certification. Guest satisfaction score increased to 4.7/5.' },
    insights: ['Tourism recovery in MENA exceeding pre-pandemic levels', 'Sustainable tourism becoming a key differentiator', 'Technology integration in hospitality accelerating rapidly'],
  },
};

export default function SectorDetail() {
  const { sectorId } = useParams<{ sectorId: string }>();
  const navigate = useNavigate();
  const sector = sectorId ? sectorData[sectorId] : null;

  if (!sector) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-offwhite">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Sector Not Found</h1>
          <button onClick={() => navigate('/sectors')} className="px-6 py-3 bg-navy text-white rounded-xl text-sm font-semibold">
            View All Sectors
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-offwhite">
      <SEO title={`${sector.name} | Industry Solutions | Pioneers International`} description={sector.description} />

      {/* Hero */}
      <section className={`bg-gradient-to-br ${sector.color} py-20`}>
        <div className="max-w-5xl mx-auto px-4">
          <button onClick={() => navigate('/sectors')} className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> All Sectors
          </button>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl sm:text-5xl font-bold text-white">{sector.name}</h1>
            <h2 className="text-2xl font-bold text-white/80 mt-2" dir="rtl">{sector.nameAr}</h2>
            <p className="text-white/90 mt-4 max-w-2xl">{sector.description}</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
        {/* Challenges */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-6 h-6 text-amber-500" />
            <h2 className="text-2xl font-bold text-slate-800">Key Challenges</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {sector.challenges.map((c, i) => (
              <div key={i} className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl p-4">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700">{c}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Solutions */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="w-6 h-6 text-emerald" />
            <h2 className="text-2xl font-bold text-slate-800">Our Solutions</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {sector.solutions.map((s, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-all">
                <h3 className="font-semibold text-navy mb-2">{s.title}</h3>
                <p className="text-sm text-slate-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Case Study */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-navy rounded-2xl p-8 text-white">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-6 h-6 text-emerald" />
            <h2 className="text-2xl font-bold">Success Story</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Client</p>
              <p className="font-semibold">{sector.caseStudy.client}</p>
              <p className="text-sm text-slate-300 mt-3">{sector.caseStudy.challenge}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Solution</p>
              <p className="text-sm text-slate-300">{sector.caseStudy.solution}</p>
            </div>
            <div>
              <p className="text-xs text-emerald uppercase tracking-wider mb-2">Result</p>
              <p className="text-emerald font-semibold">{sector.caseStudy.result}</p>
            </div>
          </div>
        </motion.section>

        {/* Insights */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="w-6 h-6 text-navy" />
            <h2 className="text-2xl font-bold text-slate-800">Market Insights</h2>
          </div>
          <div className="space-y-3">
            {sector.insights.map((insight, i) => (
              <div key={i} className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl p-4">
                <TrendingUp className="w-5 h-5 text-emerald shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700">{insight}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <section className="text-center py-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Ready to Transform Your {sector.name} Organization?</h2>
          <button onClick={() => navigate('/contact')} className="inline-flex items-center gap-2 px-8 py-4 bg-emerald text-white rounded-full font-semibold hover:bg-emerald-dark transition-all">
            <Target className="w-5 h-5" /> Book a Free Consultation
          </button>
        </section>
      </div>
    </div>
  );
}
