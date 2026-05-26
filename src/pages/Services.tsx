import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ShieldCheck, Leaf, Building2, GraduationCap, Search, Check, ChevronDown, BookOpen, Users, Award, Star, Clock, ArrowRight, RefreshCw, Zap, TrendingUp, Cpu, ChevronLeft } from 'lucide-react';
import SEO from '@/components/SEO';
import SectionHeading from '@/components/shared/SectionHeading';


const serviceDetails = [
  {
    id: 'iso-systems', icon: ShieldCheck, title: 'ISO Management Systems', titleAr: 'أنظمة إدارة الأيزو',
    desc: 'End-to-end ISO certification support from gap analysis through to audit success. We help organizations achieve and maintain compliance with international management system standards.',
    features: ['ISO 9001 (Quality)', 'ISO 14001 (Environment)', 'ISO 45001 (Safety)', 'ISO 27001 (Security)', 'ISO 31000 (Risk)', 'ISO 21001 (Education)', 'ISO 22000 (Food Safety)', 'ISO 37301 (Compliance)'],
    process: ['Initial Assessment', 'Gap Analysis', 'Documentation', 'Implementation', 'Internal Audit', 'Certification Audit'],
    image: '/assets/images/service-iso.jpg',
    color: 'emerald',
  },
  {
    id: 'esg-advisory', icon: Leaf, title: 'ESG & Sustainability', titleAr: 'استشارات الاستدامة',
    desc: 'Comprehensive Environmental, Social, and Governance advisory services to help organizations build sustainable business models and meet stakeholder expectations.',
    features: ['ESG Strategy', 'Sustainability Reporting (GRI/SASB)', 'Carbon Footprint', 'Materiality Assessment', 'Stakeholder Engagement', 'Green Financing Advisory'],
    process: ['ESG Maturity Assessment', 'Strategy Development', 'Framework Selection', 'Data Collection', 'Report Preparation', 'Continuous Improvement'],
    image: '/assets/images/service-esg.jpg',
    color: 'emerald',
  },
  {
    id: 'corporate-governance', icon: Building2, title: 'Corporate Governance', titleAr: 'الحوكمة المؤسسية',
    desc: 'Build robust governance frameworks that ensure transparency, accountability, and sustainable organizational performance aligned with international best practices.',
    features: ['Board Effectiveness', 'Governance Frameworks', 'Compliance Management', 'Risk Governance', 'Policy Development', 'Ethics & Code of Conduct'],
    process: ['Governance Review', 'Framework Design', 'Policy Development', 'Board Training', 'Implementation', 'Monitoring & Review'],
    image: '/assets/images/service-governance.jpg',
    color: 'emerald',
  },
  {
    id: 'training-lms', icon: GraduationCap, title: 'Training & LMS', titleAr: 'التدريب والمنصة التعليمية',
    desc: 'Professional training programs delivered through our advanced Learning Management System with certified courses, progress tracking, and competency assessment.',
    features: ['ISO Lead Auditor Courses', 'Internal Auditor Training', 'Management Training', 'Custom Corporate Programs', 'Online LMS Platform', 'Competency Certification'],
    process: ['Needs Assessment', 'Course Design', 'Content Development', 'Delivery', 'Assessment', 'Certification'],
    image: '/assets/images/iso-training.jpg',
    color: 'emerald',
  },
  {
    id: 'certificate-verification', icon: Search, title: 'Certificate Verification', titleAr: 'التحقق من الشهادات',
    desc: 'Instant, secure verification of all certificates issued by Pioneers International. Real-time validation with comprehensive audit trail and API integration capabilities.',
    features: ['Instant Online Verification', 'QR Code Verification', 'Bulk Verification', 'API Integration', 'Audit Trail', 'Blockchain-Ready'],
    process: ['Enter Certificate ID', 'System Validation', 'Result Display', 'PDF Generation', 'Audit Logging', 'API Response'],
    image: '/assets/images/certificate-sample.jpg',
    color: 'emerald',
  },
  {
    id: 'institutional-transformation', icon: RefreshCw, title: 'Institutional Transformation', titleAr: 'التحول المؤسسي',
    desc: 'Comprehensive organizational transformation programs that restructure operations, redefine strategic direction, and build institutional resilience. We guide organizations through large-scale change from vision to execution.',
    features: ['Change Management Strategy', 'Organizational Restructuring', 'Merger & Acquisition Integration', 'Cultural Transformation', 'Digital-First Operating Models', 'Performance Frameworks'],
    process: ['Assessment & Diagnosis', 'Vision & Roadmap', 'Stakeholder Alignment', 'Pilot Programs', 'Full-Scale Rollout', 'Continuous Optimization'],
    image: '/assets/images/service-governance.jpg',
    color: 'emerald',
  },
  {
    id: 'operational-efficiency', icon: Zap, title: 'Operational Efficiency', titleAr: 'تحسين الكفاءة التشغيلية',
    desc: 'End-to-end operational excellence programs that streamline processes, reduce waste, and maximize resource utilization. We help organizations achieve lean operations while maintaining quality and compliance.',
    features: ['Process Mapping & Optimization', 'Lean Six Sigma Implementation', 'Supply Chain Optimization', 'Cost Reduction Programs', 'Automation Strategy', 'Quality Assurance Systems'],
    process: ['Current State Analysis', 'Bottleneck Identification', 'Process Redesign', 'Implementation', 'Monitoring & KPI Tracking', 'Continuous Improvement'],
    image: '/assets/images/service-iso.jpg',
    color: 'emerald',
  },
  {
    id: 'growth-strategy', icon: TrendingUp, title: 'Growth Strategy', titleAr: 'استراتيجيات النمو',
    desc: 'Data-driven strategic planning and market expansion advisory to accelerate revenue growth, enter new markets, and build sustainable competitive advantages in the MENA region.',
    features: ['Market Entry Strategy', 'M&A Advisory', 'Revenue Growth Planning', 'Competitive Intelligence', 'Business Model Innovation', 'Strategic Partnerships'],
    process: ['Market Analysis', 'Opportunity Identification', 'Strategy Development', 'Business Case Creation', 'Implementation Roadmap', 'Growth Monitoring'],
    image: '/assets/images/esg-premium.jpg',
    color: 'emerald',
  },
  {
    id: 'digital-ai', icon: Cpu, title: 'Digital & AI Transformation', titleAr: 'التحول الرقمي والذكاء الاصطناعي',
    desc: 'Accelerate your digital transformation with AI-powered solutions, smart automation, and data analytics. We help organizations leverage emerging technologies to drive innovation and operational intelligence.',
    features: ['AI Strategy & Roadmap', 'Intelligent Process Automation', 'Data Analytics & BI', 'Cloud Migration', 'Cybersecurity Frameworks', 'Smart Governance Platforms'],
    process: ['Digital Maturity Assessment', 'Technology Roadmap', 'Pilot Implementation', 'Integration & Deployment', 'Training & Change Management', 'Scaling & Optimization'],
    image: '/assets/images/hero-bg-1.jpg',
    color: 'emerald',
  },
];

const lmsCourses = [
  { id: 'iso9001-fund', code: 'ISO 9001', title: 'ISO 9001:2015 Fundamentals', duration: '12 hours', modules: 8, level: 'Beginner', students: 245, rating: 4.9, image: '/assets/images/service-iso.jpg', lessons: ['Introduction to QMS', 'Context of the Organization', 'Leadership & Commitment', 'Planning', 'Support', 'Operation', 'Performance Evaluation', 'Improvement'] },
  { id: 'iso9001-auditor', code: 'ISO 9001', title: 'ISO 9001 Lead Auditor', duration: '40 hours', modules: 12, level: 'Advanced', students: 189, rating: 4.8, image: '/assets/images/service-iso.jpg', lessons: ['Audit Principles', 'Audit Planning', 'Opening Meeting', 'Document Review', 'On-site Audit', 'Finding Classification', 'Closing Meeting', 'Audit Report', 'Follow-up Audit', 'Competence Requirements', 'Exam Preparation', 'Final Certification Exam'] },
  { id: 'iso14001-env', code: 'ISO 14001', title: 'ISO 14001 Environmental Management', duration: '16 hours', modules: 10, level: 'Intermediate', students: 156, rating: 4.7, image: '/assets/images/service-esg.jpg', lessons: ['Environmental Context', 'Legal Requirements', 'Aspects & Impacts', 'Objectives & Programs', 'Operational Control', 'Emergency Preparedness', 'Monitoring', 'Management Review'] },
  { id: 'iso45001-hse', code: 'ISO 45001', title: 'ISO 45001 Occupational Health & Safety', duration: '20 hours', modules: 10, level: 'Intermediate', students: 134, rating: 4.8, image: '/assets/images/hero-bg-1.jpg', lessons: ['OH&S Management Principles', 'Worker Participation', 'Hazard Identification', 'Risk Assessment', 'Legal Compliance', 'Incident Investigation', 'Emergency Response', 'Performance Monitoring'] },
  { id: 'esg-strategy', code: 'ESG', title: 'ESG Strategy & Reporting', duration: '18 hours', modules: 8, level: 'Intermediate', students: 112, rating: 4.9, image: '/assets/images/esg-premium.jpg', lessons: ['ESG Fundamentals', 'Materiality Assessment', 'GRI Standards', 'SASB Framework', 'TCFD Recommendations', 'Sustainability Reporting', 'Stakeholder Engagement', 'ESG Data Management'] },
  { id: 'governance-best', code: 'GOV', title: 'Corporate Governance Best Practices', duration: '14 hours', modules: 6, level: 'Advanced', students: 98, rating: 4.7, image: '/assets/images/service-governance.jpg', lessons: ['Governance Principles', 'Board Structures', 'Committee Functions', 'Risk Oversight', 'Compliance Programs', 'Ethics & Culture'] },
];

export default function Services() {
  const { t } = useTranslation();
  const [activeService, setActiveService] = useState(0);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [activeLMS, setActiveLMS] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);

  const scrollTabs = (dir: 'left' | 'right') => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
    }
  };

  const currentService = serviceDetails[activeService];

  return (
    <div className="overflow-hidden">
      <SEO title="Our Services | Pioneers International" description="ISO certification, ESG advisory, corporate governance, training & LMS, and certificate verification services across the MENA region." />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center gradient-navy">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-display text-white">{t('services.sectionTitle')}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-body-lg text-slate-300 mt-4 max-w-2xl mx-auto">{t('services.sectionDesc')}</motion.p>
        </div>
      </section>

      {/* Service Tabs - Scrollable with Arrows */}
      <section className="bg-white py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3">
            {/* Left Arrow */}
            <button onClick={() => scrollTabs('left')} className="hidden md:flex shrink-0 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 items-center justify-center transition-colors">
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>

            {/* Scrollable Tabs */}
            <div ref={tabsRef} className="flex overflow-x-auto gap-2 pb-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-emerald/30" style={{ scrollbarWidth: 'thin' }}>
              {serviceDetails.map((s, i) => (
                <button key={s.id} onClick={() => { setActiveService(i); setActiveLMS(false); }}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${activeService === i && !activeLMS ? 'bg-emerald text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>
                  <s.icon className="w-4 h-4" />{s.title}
                </button>
              ))}
              <button onClick={() => setActiveLMS(!activeLMS)} className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${activeLMS ? 'bg-navy text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>
                <BookOpen className="w-4 h-4" />Training & LMS
              </button>
            </div>

            {/* Right Arrow */}
            <button onClick={() => scrollTabs('right')} className="hidden md:flex shrink-0 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 items-center justify-center transition-colors">
              <ArrowRight className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      </section>

      {/* Service Detail */}
      {!activeLMS && (
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <AnimatePresence mode="wait">
              <motion.div key={currentService.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 rounded-xl bg-emerald-light flex items-center justify-center">
                        <currentService.icon className="w-7 h-7 text-emerald" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-slate-800">{currentService.title}</h2>
                        <p className="text-sm text-slate-500">{currentService.titleAr}</p>
                      </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed mb-8">{currentService.desc}</p>

                    <h4 className="font-semibold text-slate-800 mb-4">Key Services</h4>
                    <div className="grid sm:grid-cols-2 gap-3 mb-8">
                      {currentService.features.map(f => (
                        <div key={f} className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-4 py-3 rounded-lg">
                          <Check className="w-4 h-4 text-emerald flex-shrink-0" />{f}
                        </div>
                      ))}
                    </div>

                    <h4 className="font-semibold text-slate-800 mb-4">Our Process</h4>
                    <div className="space-y-3">
                      {currentService.process.map((step, i) => (
                        <div key={step} className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-emerald text-white flex items-center justify-center text-sm font-bold flex-shrink-0">{i + 1}</div>
                          <span className="text-slate-700 font-medium">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <img src={currentService.image} alt={currentService.title} className="rounded-2xl shadow-lg w-full object-cover aspect-video" />
                    <div className="bg-navy rounded-2xl p-6 text-white">
                      <h4 className="font-semibold mb-2">Ready to get started?</h4>
                      <p className="text-sm text-slate-300 mb-4">Contact our team for a free consultation about {currentService.title.toLowerCase()}.</p>
                      <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald text-white rounded-full text-sm font-semibold hover:bg-emerald-dark transition-colors">
                        Book Consultation <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      )}

      {/* LMS / Training Platform */}
      {activeLMS && (
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-caption uppercase tracking-wider text-emerald font-medium">LEARNING MANAGEMENT SYSTEM</span>
              <h2 className="text-3xl font-bold text-slate-800 mt-2">Professional Training Courses</h2>
              <p className="text-slate-500 mt-2 max-w-2xl mx-auto">Certified courses in ISO standards, ESG, governance, and management systems. Learn at your own pace with expert instructors.</p>
            </div>

            {/* Featured Course */}
            <div className="gradient-navy rounded-2xl p-8 mb-10">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="inline-flex items-center gap-1 bg-emerald text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                    <Star className="w-3 h-3" /> MOST POPULAR
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2">ISO 9001:2015 Lead Auditor Certification</h3>
                  <p className="text-slate-300 mb-4">Become a certified ISO 9001 Lead Auditor. 40-hour comprehensive program with live sessions, case studies, and certification exam.</p>
                  <div className="flex flex-wrap gap-4 mb-6">
                    {[{ icon: Clock, text: '40 Hours' }, { icon: Users, text: '245 Students' }, { icon: Star, text: '4.9 Rating' }, { icon: Award, text: 'Certificate' }].map(s => (
                      <span key={s.text} className="flex items-center gap-1.5 text-sm text-slate-300"><s.icon className="w-4 h-4 text-emerald" />{s.text}</span>
                    ))}
                  </div>
                  <Link to="/register" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald text-white rounded-full font-semibold hover:bg-emerald-dark transition-colors">Enroll Now - $299</Link>
                </div>
                <img src="/assets/images/iso-training.jpg" alt="ISO Training" className="rounded-xl shadow-lg aspect-video object-cover" />
              </div>
            </div>

            {/* Course Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lmsCourses.map((course, i) => (
                <motion.div key={course.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                  <img src={course.image} alt={course.title} className="w-full h-40 object-cover" />
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold bg-emerald-light text-emerald px-2 py-0.5 rounded">{course.code}</span>
                      <span className="text-xs text-slate-400">{course.level}</span>
                    </div>
                    <h4 className="font-semibold text-slate-800 mb-2">{course.title}</h4>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{course.duration}</span>
                      <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />{course.modules} modules</span>
                      <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber" />{course.rating}</span>
                    </div>

                    {/* Expandable Lessons */}
                    <button onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                      className="flex items-center gap-1 text-sm text-emerald font-medium mb-3">
                      {expandedCourse === course.id ? 'Hide' : 'View'} Curriculum <ChevronDown className={`w-4 h-4 transition-transform ${expandedCourse === course.id ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {expandedCourse === course.id && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <div className="space-y-1 mb-4 bg-slate-50 rounded-lg p-3">
                            {course.lessons.map((lesson, li) => (
                              <div key={li} className="flex items-center gap-2 text-sm text-slate-600 py-1">
                                <span className="w-5 h-5 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[10px] font-medium">{li + 1}</span>
                                <span>{lesson}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-800">$299</span>
                      <Link to="/register" className="px-4 py-2 bg-emerald text-white rounded-full text-sm font-medium hover:bg-emerald-dark transition-colors">Enroll</Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Payment Gateway Info */}
      <section className="bg-offwhite py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <SectionHeading eyebrow="PAYMENT" heading="Secure Payment Options" description="We support multiple payment methods for your convenience" centered />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {[{ name: 'Visa', icon: '💳' }, { name: 'Mastercard', icon: '💳' }, { name: 'PayPal', icon: '🅿️' }, { name: 'Bank Transfer', icon: '🏦' }].map(p => (
              <div key={p.name} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-2">{p.icon}</div>
                <div className="font-semibold text-slate-800 text-sm">{p.name}</div>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-500 mt-6">All payments are processed through secure, encrypted channels. We never store your card details. For MEPS or regional payment methods, please <Link to="/contact" className="text-emerald hover:underline">contact us</Link>.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Not Sure Which Service You Need?</h2>
          <p className="text-white/85 mb-8">Our experts will help you identify the right solutions for your organization. Free initial consultation.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-navy text-white rounded-full font-semibold hover:bg-navy-light transition-colors">
            Book Free Consultation <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
