import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Award, Target, Eye, BookOpen, TrendingUp, Building2,
  Stethoscope, GraduationCap, Landmark, Factory, Briefcase,
  UtensilsCrossed, HeartHandshake, Home, Truck, ArrowLeft,
  Download, Users, CheckCircle, Globe, Lightbulb,
  ChevronRight, MessageSquare, Mail, Phone, MapPin
} from "lucide-react";
import SEO from "@/components/SEO";

const services = [
  {
    title: "Quality & Management Systems",
    titleAr: "أنظمة الجودة والإدارة",
    icon: Award,
    items: ["ISO Certification & Quality Audits", "KPI Framework Development", "Corporate Governance", "Strategic Planning", "Excellence Models", "Risk Management"],
    color: "from-navy to-navy-light",
  },
  {
    title: "Institutional Excellence & Transformation",
    titleAr: "التميز المؤسسي والتحول",
    icon: Building2,
    items: ["Organizational Transformation", "Operational Process Enhancement", "Operational Excellence", "Business Model Development", "Institutional Compliance", "Digital Readiness Assessment"],
    color: "from-emerald to-emerald-dark",
  },
  {
    title: "Project Management & Governance",
    titleAr: "إدارة المشاريع والحوكمة",
    icon: Briefcase,
    items: ["PMO Setup & Management", "Project Delivery Frameworks", "Milestone Tracking Systems", "Stakeholder Engagement", "Change Management", "Performance Monitoring"],
    color: "from-[#E8913A] to-[#c97a2a]",
  },
  {
    title: "Feasibility & Strategic Advisory",
    titleAr: "الدراسات والاستشارات الاستراتيجية",
    icon: Lightbulb,
    items: ["Feasibility Studies", "Market Analysis", "Investment Assessment", "Sector Benchmarking", "Strategic Roadmaps", "Business Intelligence"],
    color: "from-[#7B68EE] to-[#5e4dbd]",
  },
];

const industries = [
  { name: "Healthcare", nameAr: "القطاع الصحي", icon: Stethoscope, standards: "ISO 13485, Patient Safety, JCI/CBAHI Readiness" },
  { name: "Education", nameAr: "قطاع التعليم", icon: GraduationCap, standards: "ISO 21001, Academic Quality, Governance Frameworks" },
  { name: "Banking & Finance", nameAr: "البنوك والخدمات المالية", icon: Landmark, standards: "ISO 31000, Risk Management, AML Compliance" },
  { name: "Manufacturing", nameAr: "الصناعة", icon: Factory, standards: "ISO 9001, ISO 14001, Lean Six Sigma" },
  { name: "Government", nameAr: "القطاع الحكومي", icon: Building2, standards: "Institutional Excellence, Strategic Transformation" },
  { name: "Hospitality & Tourism", nameAr: "الضيافة والسياحة", icon: UtensilsCrossed, standards: "ISO 22000, HSE Frameworks, Guest Experience" },
  { name: "NGOs & Non-Profits", nameAr: "المؤسسات غير الربحية", icon: HeartHandshake, standards: "Governance, Impact Measurement, Compliance" },
  { name: "Real Estate", nameAr: "القطاع العقاري", icon: Home, standards: "Project Management, Quality Systems" },
  { name: "Logistics", nameAr: "الخدمات اللوجستية", icon: Truck, standards: "ISO 28000, Supply Chain Optimization" },
];

const methodologySteps = [
  { step: "01", title: "Assessment & Analysis", titleAr: "التقييم والتحليل", desc: "Comprehensive organizational assessment against international benchmarks and current state analysis." },
  { step: "02", title: "Gap Identification", titleAr: "تحديد الفجوات", desc: "Identify gaps and prioritize improvement areas with measurable targets." },
  { step: "03", title: "Solution Design", titleAr: "تصميم الحلول", desc: "Craft tailored, practical solutions aligned with global best practices and standards." },
  { step: "04", title: "Implementation", titleAr: "التنفيذ", desc: "Execute with precision, track milestones, and ensure stakeholder engagement." },
  { step: "05", title: "Continuous Improvement", titleAr: "التحسين المستمر", desc: "Monitor outcomes, refine systems, and drive sustainable excellence cycles." },
];

const caseStudies = [
  {
    sector: "Healthcare",
    location: "Saudi Arabia",
    challenge: "Need to develop operational quality systems and improve accreditation readiness.",
    solution: "Developed an integrated quality management system and enhanced operational processes.",
    impact: ["Improved operational compliance", "Enhanced process efficiency", "Increased accreditation readiness"],
  },
  {
    sector: "Manufacturing",
    location: "Jordan",
    challenge: "Operational inefficiencies and process waste affecting productivity.",
    solution: "Implemented operational excellence programs and KPI frameworks.",
    impact: ["Improved operational efficiency", "Reduced process waste", "Enhanced institutional performance"],
  },
  {
    sector: "Education",
    location: "GCC Region",
    challenge: "Need for academic and administrative quality enhancement systems.",
    solution: "Developed education management systems aligned with international standards.",
    impact: ["Improved educational systems", "Enhanced administrative quality", "Increased accreditation readiness"],
  },
];

const partnerships = [
  { name: "AAA", role: "Registered Training Provider", desc: "International recognition ensuring training aligns with global standards." },
  { name: "Exemplar Global", role: "Professional Affiliation", desc: "Global certification body partnership for management system auditors." },
  { name: "AEBA", role: "Exclusive MENA Agent", desc: "American Education Business Association — educational and business certification programs." },
];

const whyChoose = [
  { title: "30+ Years Experience", desc: "Decades of consulting expertise across MENA", icon: Users },
  { title: "Executive Expertise", desc: "Senior consultants with C-level experience", icon: Award },
  { title: "Deep Regional Knowledge", desc: "Understanding of MENA market dynamics", icon: Globe },
  { title: "Practical Solutions", desc: "Implementation-focused, not just advice", icon: Lightbulb },
  { title: "KPI-Driven", desc: "Measurable outcomes and accountability", icon: Target },
  { title: "Global Standards", desc: "ISO frameworks and international best practices", icon: BookOpen },
];

export default function CompanyProfile() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-offwhite">
      <SEO
        title="Company Profile | Pioneers International"
        description="Download Pioneers International company profile. 30+ years of consulting excellence in ISO certification, ESG, governance, and healthcare compliance across MENA."
      />

      {/* ═══════ HERO ═══════ */}
      <section className="bg-gradient-to-br from-navy via-[#0a3560] to-[#0d4a3a] py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <BookOpen className="w-4 h-4 text-emerald" />
              <span className="text-sm text-white/90">Company Profile</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
              Pioneers International
            </h1>
            <h2 className="text-2xl sm:text-3xl font-bold text-emerald mt-2" dir="rtl">
              رواد الفكر الدولية لاستشارات الأعمال
            </h2>
            <p className="text-xl text-slate-300 mt-4">
              Empowering Sustainable Organizational Excellence
            </p>
            <p className="text-lg text-slate-400 mt-2" dir="rtl">
              استشارات استراتيجية · أنظمة الجودة · الحوكمة · التحول المؤسسي
            </p>

            {/* Download CTA */}
            <div className="flex flex-wrap gap-3 mt-8">
              <a
                href="/assets/files/Pioneers-International-Company-Profile.pdf"
                download
                className="flex items-center gap-2 px-6 py-3 bg-emerald hover:bg-emerald-dark text-white rounded-full text-sm font-semibold transition-all shadow-lg"
              >
                <Download className="w-4 h-4" /> Download PDF Profile
              </a>
              <a href="#contact" className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-semibold border border-white/20 transition-all">
                <MessageSquare className="w-4 h-4" /> Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ ABOUT / EXECUTIVE SUMMARY ═══════ */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { value: "30+", label: "Years of Experience", labelAr: "سنوات من الخبرة" },
              { value: "9+", label: "Industry Sectors", labelAr: "قطاعات صناعية" },
              { value: "4", label: "Service Centers", labelAr: "مراكز خدمية" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 bg-slate-50 rounded-2xl border border-slate-200"
              >
                <div className="text-4xl font-bold text-navy">{stat.value}</div>
                <div className="text-sm font-medium text-slate-600 mt-1">{stat.label}</div>
                <div className="text-xs text-slate-400 mt-0.5" dir="rtl">{stat.labelAr}</div>
              </motion.div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <span className="text-caption uppercase tracking-[0.15em] text-emerald font-medium">About Us</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-3" dir="rtl">من نحن</h2>
            <p className="text-slate-600 mt-6 leading-relaxed text-lg">
              Pioneers International was established to deliver a modern consulting model that combines
              executive expertise with internationally recognized best practices. Our team brings extensive
              experience in management consulting, quality systems, governance, project management, and
              institutional compliance, supported by a deep understanding of regional market dynamics.
            </p>
            <p className="text-slate-500 mt-4 leading-relaxed text-base" dir="rtl">
              تأسست رواد الفكر الدولية لتقديم نموذج استشاري حديث يجمع الخبرة التنفيذية مع أفضل الممارسات
              المعترف بها دولياً. فريقنا يتمتع بخبرة واسعة في الاستشارات الإدارية وأنظمة الجودة
              والحوكمة وإدارة المشاريع والامتثال المؤسسي.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════ VISION & MISSION ═══════ */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-navy text-white rounded-2xl p-8"
            >
              <Eye className="w-10 h-10 text-emerald mb-4" />
              <h3 className="text-xl font-bold">Our Vision</h3>
              <h4 className="text-lg font-bold text-emerald mt-1" dir="rtl">رؤيتنا</h4>
              <p className="text-slate-300 mt-4 leading-relaxed">
                To become the preferred strategic partner for organizations across Jordan and the
                MENA region in quality, governance, sustainability, and operational transformation.
              </p>
              <p className="text-slate-400 mt-3 text-sm" dir="rtl">
                أن نكون الشريك الاستراتيجي المفضل للمؤسسات في الأردن ومنطقة الشرق الأوسط وشمال أفريقيا
                في مجال الجودة والحوكمة والاستدامة والتحول التشغيلي.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-emerald text-white rounded-2xl p-8"
            >
              <Target className="w-10 h-10 text-white mb-4" />
              <h3 className="text-xl font-bold">Our Mission</h3>
              <h4 className="text-lg font-bold text-white/80 mt-1" dir="rtl">رسالتنا</h4>
              <p className="text-white/90 mt-4 leading-relaxed">
                To empower organizations to achieve higher efficiency, sustainability, and readiness
                through innovative consulting aligned with global best practices.
              </p>
              <p className="text-white/80 mt-3 text-sm" dir="rtl">
                تمكين المؤسسات لتحقيق كفاءة واستدامة وجاهزية أعلى من خلال استشارات مبتكرة
                تتماشى مع أفضل الممارسات العالمية.
              </p>
            </motion.div>
          </div>

          {/* Core Principles */}
          <div className="mt-12">
            <h3 className="text-center text-lg font-bold text-slate-800 mb-6">Core Principles — المبادئ الأساسية</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { en: "Results-Driven", ar: "قيادة بالنتائج", icon: TrendingUp },
                { en: "Global Standards", ar: "معايير عالمية", icon: Globe },
                { en: "Client-Centric", ar: "تركيز على العميل", icon: Users },
                { en: "Sustainable Impact", ar: "تأثير مستدام", icon: HeartHandshake },
              ].map((p, i) => (
                <motion.div
                  key={p.en}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white border border-slate-200 rounded-xl p-4 text-center"
                >
                  <p.icon className="w-6 h-6 text-navy mx-auto mb-2" />
                  <div className="text-sm font-semibold text-slate-700">{p.en}</div>
                  <div className="text-xs text-slate-500" dir="rtl">{p.ar}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ SERVICES ═══════ */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-caption uppercase tracking-[0.15em] text-emerald font-medium">Our Services</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-3" dir="rtl">خدماتنا</h2>
            <p className="text-slate-500 mt-3 max-w-2xl mx-auto">
              Pioneers International delivers advisory solutions across four core service lines,
              each designed to address specific organizational challenges.
            </p>
            <p className="text-slate-400 mt-2 text-sm" dir="rtl">
              تقدم رواد الفكر الدولية حلولاً استشارية عبر أربعة خطوط خدمة رئيسية،
              كل منها مصمم لمعالجة تحديات مؤسسية محددة.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-gradient-to-br ${service.color} rounded-2xl p-8 text-white`}
              >
                <service.icon className="w-10 h-10 mb-4 opacity-80" />
                <h3 className="text-xl font-bold">{service.title}</h3>
                <h4 className="text-sm font-medium text-white/80 mt-1" dir="rtl">{service.titleAr}</h4>
                <ul className="mt-4 space-y-2">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-white/90">
                      <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 opacity-70" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ METHODOLOGY ═══════ */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-caption uppercase tracking-[0.15em] text-emerald font-medium">Methodology</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-3" dir="rtl">منهجية العمل</h2>
            <p className="text-slate-500 mt-3 max-w-2xl mx-auto">
              An integrated execution-driven approach: assessment, gap analysis, solution design,
              implementation, and continuous improvement.
            </p>
            <p className="text-slate-400 mt-2 text-sm" dir="rtl">
              نهج تنفيذي متكامل: التقييم، تحليل الفجوات، تصميم الحلول، التنفيذ، والتحسين المستمر.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {methodologySteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center hover:shadow-md transition-shadow h-full">
                  <div className="text-4xl font-black text-navy/10 mb-2">{step.step}</div>
                  <h3 className="text-sm font-bold text-slate-800">{step.title}</h3>
                  <p className="text-xs text-emerald font-semibold mt-1" dir="rtl">{step.titleAr}</p>
                  <p className="text-xs text-slate-400 mt-3 leading-relaxed">{step.desc}</p>
                </div>
                {i < methodologySteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 z-10">
                    <ChevronRight className="w-5 h-5 text-emerald" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ INDUSTRIES ═══════ */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-caption uppercase tracking-[0.15em] text-emerald font-medium">Industries</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-3" dir="rtl">القطاعات التي نخدمها</h2>
            <p className="text-slate-500 mt-3">Industries We Serve</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {industries.map((ind, i) => (
              <motion.div
                key={ind.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-4 bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-emerald/30 hover:shadow-sm transition-all"
              >
                <div className="w-12 h-12 bg-navy/10 rounded-xl flex items-center justify-center shrink-0">
                  <ind.icon className="w-6 h-6 text-navy" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 text-sm">{ind.name}</h3>
                  <p className="text-xs text-navy font-medium" dir="rtl">{ind.nameAr}</p>
                  <p className="text-xs text-slate-400 mt-1">{ind.standards}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CASE STUDIES ═══════ */}
      <section className="py-16 bg-gradient-to-br from-navy via-[#0a3560] to-[#0d4a3a]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-caption uppercase tracking-[0.15em] text-emerald font-medium">Case Studies</span>
            <h2 className="text-3xl font-bold text-white mt-3" dir="rtl">دراسات الحالة</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.map((cs, i) => (
              <motion.div
                key={cs.sector}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-1 bg-emerald/20 text-emerald text-xs font-bold rounded-full">{cs.sector}</span>
                  <span className="text-xs text-slate-400">{cs.location}</span>
                </div>
                <div className="mb-4">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">Challenge</p>
                  <p className="text-sm text-slate-300">{cs.challenge}</p>
                </div>
                <div className="mb-4">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">Solution</p>
                  <p className="text-sm text-slate-300">{cs.solution}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-emerald mb-1">Impact</p>
                  {cs.impact.map((imp) => (
                    <div key={imp} className="flex items-center gap-1.5 text-xs text-white/80">
                      <CheckCircle className="w-3 h-3 text-emerald" /> {imp}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PARTNERSHIPS ═══════ */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-caption uppercase tracking-[0.15em] text-emerald font-medium">Partnerships</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-3" dir="rtl">شراكاتنا واعتماداتنا</h2>
            <p className="text-slate-500 mt-3">Partnerships & Accreditations</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {partnerships.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center hover:border-emerald/30 transition-all"
              >
                <div className="w-16 h-16 bg-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-navy" />
                </div>
                <h3 className="text-lg font-bold text-navy">{p.name}</h3>
                <p className="text-xs font-medium text-emerald mt-1">{p.role}</p>
                <p className="text-sm text-slate-500 mt-3">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ WHY PIONEERS ═══════ */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-caption uppercase tracking-[0.15em] text-emerald font-medium">Why Choose Us</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-3" dir="rtl">لماذا رواد الفكر الدولية؟</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChoose.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-all"
              >
                <item.icon className="w-8 h-8 text-emerald mb-4" />
                <h3 className="font-semibold text-slate-800">{item.title}</h3>
                <p className="text-sm text-slate-500 mt-2">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ LEADERSHIP MESSAGE ═══════ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <MessageSquare className="w-10 h-10 text-navy mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-slate-900">Leadership Message</h2>
          <h3 className="text-lg text-slate-500 mt-1" dir="rtl">رسالة القيادة</h3>
          <blockquote className="mt-8 text-lg text-slate-600 leading-relaxed italic border-l-4 border-emerald pl-6 text-left">
            "At Pioneers International, we believe that true institutional excellence begins with effective
            systems, governance, quality culture, and continuous improvement. Our mission is to become a
            trusted strategic partner for organizations seeking sustainable growth and future readiness
            through practical, measurable, and high-impact solutions."
          </blockquote>
          <p className="mt-4 text-sm font-semibold text-navy">— Pioneers International Leadership</p>
        </div>
      </section>

      {/* ═══════ DOWNLOAD CTA ═══════ */}
      <section className="py-16 bg-navy">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Download className="w-12 h-12 text-emerald mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white">Download Our Full Profile</h2>
          <p className="text-slate-300 mt-3" dir="rtl">
            احصل على الملف الكامل لرواد الفكر الدولية بصيغة PDF
          </p>
          <a
            href="/assets/files/Pioneers-International-Company-Profile.pdf"
            download
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald hover:bg-emerald-dark text-white rounded-full text-sm font-semibold transition-all mt-6 shadow-lg hover:scale-[1.02]"
          >
            <Download className="w-5 h-5" /> Download Company Profile (PDF)
          </a>
        </div>
      </section>

      {/* ═══════ CONTACT ═══════ */}
      <section id="contact" className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Contact Us — تواصل معنا</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: MapPin, label: "Address", labelAr: "العنوان", value: "Wadi Saqra, Kalbouneh Complex, Floor #4, Amman — Jordan" },
              { icon: Phone, label: "Phone", labelAr: "الهاتف", value: "+962 7815 95846" },
              { icon: Globe, label: "Website", labelAr: "الموقع", value: "www.pioneersint.com" },
              { icon: Mail, label: "Email", labelAr: "البريد", value: "info@pioneersint.com" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-slate-200 rounded-xl p-5 text-center"
              >
                <item.icon className="w-6 h-6 text-navy mx-auto mb-3" />
                <p className="text-xs text-slate-400 uppercase">{item.label}</p>
                <p className="text-xs text-navy font-medium" dir="rtl">{item.labelAr}</p>
                <p className="text-sm font-medium text-slate-700 mt-1">{item.value}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-lg font-bold text-navy mt-8">
            Together Towards Sustainable Institutional Excellence
          </p>
          <p className="text-sm text-slate-500 mt-1" dir="rtl">
            معاً نحو التميز المؤسسي المستدام
          </p>
        </div>
      </section>
    </div>
  );
}
