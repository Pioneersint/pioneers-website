import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Leaf, Building2, GraduationCap, Search, Check, ArrowRight, ChevronRight, Star, Users, Globe, Award as AwardIcon, Play, Zap, Lock, Clock, BarChart3, RefreshCw, TrendingUp, Cpu } from 'lucide-react';
import SEO, { organizationSchema } from '@/components/SEO';
import SectionHeading from '@/components/shared/SectionHeading';

import InsightCard from '@/components/shared/InsightCard';
import CaseStudyCard from '@/components/shared/CaseStudyCard';
import TestimonialGrid from '@/components/home/TestimonialGrid';
import NewsletterForm from '@/components/shared/NewsletterForm';
import ProcessSteps from '@/components/shared/ProcessSteps';
import ClientsTicker from '@/components/ClientsTicker';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import TrustSealBar from '@/components/TrustSealBar';


export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activePricing, setActivePricing] = useState(1);

  const handlePricingCTA = (planName: string, planPrice: string) => {
    if (planPrice === 'Custom' || planPrice === 'مخصص') {
      navigate('/contact');
      return;
    }
    const priceNum = parseInt(planPrice.replace(/[^0-9]/g, ''), 10);
    navigate('/checkout', {
      state: {
        type: 'training',
        plan: planName,
        amount: priceNum,
        period: 'one-time',
        description: `Training Package - ${planName}`,
      },
    });
  };

  const stats = [
    { number: '30', suffix: '+', label: t('stats.years'), icon: Clock },
    { number: '500', suffix: '+', label: t('stats.clients'), icon: Users },
    { number: '15', suffix: '+', label: t('stats.industries'), icon: Globe },
    { number: '2,500', suffix: '+', label: t('stats.certifications'), icon: AwardIcon },
  ];

  const services = [
    { icon: ShieldCheck, title: t('services.iso.title'), desc: t('services.iso.desc'), slug: 'iso-systems', features: t('services.iso.features', { returnObjects: true }) as string[] },
    { icon: Leaf, title: t('services.esg.title'), desc: t('services.esg.desc'), slug: 'esg-advisory', features: t('services.esg.features', { returnObjects: true }) as string[] },
    { icon: Building2, title: t('services.governance.title'), desc: t('services.governance.desc'), slug: 'corporate-governance', features: t('services.governance.features', { returnObjects: true }) as string[] },
    { icon: GraduationCap, title: t('services.training.title'), desc: t('services.training.desc'), slug: 'training-lms', features: t('services.training.features', { returnObjects: true }) as string[] },
    { icon: Search, title: t('services.verification.title'), desc: t('services.verification.desc'), slug: 'certificate-verification', features: t('services.verification.features', { returnObjects: true }) as string[] },
    { icon: RefreshCw, title: 'Institutional Transformation', desc: 'Comprehensive organizational transformation programs that restructure operations, redefine strategic direction, and build institutional resilience.', slug: 'institutional-transformation', features: ['Change Management Strategy', 'Organizational Restructuring', 'Cultural Transformation', 'Digital-First Operating Models', 'Performance Frameworks'] },
    { icon: Zap, title: 'Operational Efficiency', desc: 'End-to-end operational excellence programs that streamline processes, reduce waste, and maximize resource utilization.', slug: 'operational-efficiency', features: ['Process Mapping & Optimization', 'Lean Six Sigma Implementation', 'Supply Chain Optimization', 'Cost Reduction Programs', 'Automation Strategy'] },
    { icon: TrendingUp, title: 'Growth Strategy', desc: 'Data-driven strategic planning and market expansion advisory to accelerate revenue growth and build competitive advantages.', slug: 'growth-strategy', features: ['Market Entry Strategy', 'M&A Advisory', 'Revenue Growth Planning', 'Competitive Intelligence', 'Business Model Innovation'] },
    { icon: Cpu, title: 'Digital & AI Transformation', desc: 'Accelerate your digital transformation with AI-powered solutions, smart automation, and data analytics.', slug: 'digital-ai', features: ['AI Strategy & Roadmap', 'Intelligent Process Automation', 'Data Analytics & BI', 'Cloud Migration', 'Cybersecurity Frameworks'] },
  ];

  const methodologySteps = [
    { number: 1, title: 'Assessment & Analysis', desc: 'Comprehensive evaluation of current state, processes, and organizational readiness using industry benchmarks.' },
    { number: 2, title: 'Gap Identification', desc: 'Identify gaps between current performance and international standards, prioritizing high-impact areas.' },
    { number: 3, title: 'Solution Design', desc: 'Craft tailored, practical solutions aligned with global best practices and your unique context.' },
    { number: 4, title: 'Implementation', desc: 'Execute with precision, track milestones through KPI dashboards, ensure stakeholder engagement.' },
    { number: 5, title: 'Continuous Improvement', desc: 'Measure performance against targets, refine processes based on data, sustain excellence.' },
  ];

  const pricingPlans = [
    { name: t('pricing.basic.name'), price: t('pricing.basic.price'), period: t('pricing.basic.period'), desc: t('pricing.basic.desc'), features: t('pricing.basic.features', { returnObjects: true }) as string[], cta: 'Get Started' },
    { name: t('pricing.professional.name'), price: t('pricing.professional.price'), period: t('pricing.professional.period'), desc: t('pricing.professional.desc'), popular: true, features: t('pricing.professional.features', { returnObjects: true }) as string[], cta: 'Start Pro' },
    { name: t('pricing.enterprise.name'), price: t('pricing.enterprise.price'), period: t('pricing.enterprise.period'), desc: t('pricing.enterprise.desc'), features: t('pricing.enterprise.features', { returnObjects: true }) as string[], cta: 'Contact Us' },
  ];

  const insights = [
    { image: '/assets/images/insight-1.jpg', category: 'ISO Standards', title: 'ISO 9001:2015 Implementation Guide for MENA Organizations', excerpt: 'A comprehensive guide to implementing ISO 9001 quality management systems tailored for Middle Eastern organizations.', author: 'Dr. Ahmad Hassan', date: 'May 15, 2025', readTime: 8 },
    { image: '/assets/images/insight-2.jpg', category: 'ESG & Sustainability', title: 'ESG Strategy Development: A Framework for Sustainable Growth', excerpt: 'Developing effective ESG strategies that align with business objectives and stakeholder expectations.', author: 'Sarah Al-Rashid', date: 'May 10, 2025', readTime: 6 },
    { image: '/assets/images/insight-3.jpg', category: 'Governance', title: 'Corporate Governance Best Practices in the GCC Region', excerpt: 'Key governance frameworks and practices for organizations operating in the Gulf Cooperation Council.', author: 'Mohammed Al-Farsi', date: 'May 5, 2025', readTime: 7 },
  ];

  const caseStudies = [
    { image: '/assets/images/case-healthcare.jpg', industry: 'Healthcare', location: 'Saudi Arabia', title: 'Healthcare Quality Transformation', description: 'Developed integrated quality management system, enhanced operational processes, improved accreditation readiness.', impacts: ['Improved compliance by 85%', 'Reduced audit findings by 70%', 'Achieved Joint Commission accreditation'] },
    { image: '/assets/images/case-manufacturing.jpg', industry: 'Manufacturing', location: 'Jordan', title: 'Manufacturing Excellence Program', description: 'Implemented operational excellence programs and KPI frameworks, reduced process waste, enhanced efficiency.', impacts: ['30% reduction in waste', '45% improvement in OEE', 'ISO 9001 certification achieved'] },
    { image: '/assets/images/case-education.jpg', industry: 'Education', location: 'GCC', title: 'Educational Standards Alignment', description: 'Developed education management systems aligned with international standards, improved administrative quality.', impacts: ['ISO 21001 certification', '95% student satisfaction', 'Improved accreditation scores'] },
  ];

  // Testimonials moved to TestimonialGrid component with expanded set

  const galleryImages = [
    '/assets/images/iso-training.jpg',
    '/assets/images/esg-premium.jpg',
    '/assets/images/about-hero.jpg',
    '/assets/images/hero-premium.jpg',
    '/assets/images/service-iso.jpg',
    '/assets/images/service-esg.jpg',
  ];

  return (
    <div className="overflow-hidden">
      <SEO
        title="Pioneers International | ISO Certification, ESG & Governance Consulting | MENA"
        description="30+ years of trusted consulting across MENA. ISO 9001/14001/45001 certification, ESG advisory, corporate governance, and institutional transformation. 500+ clients across 8 countries."
        keywords="ISO certification Jordan, ESG consulting Saudi Arabia, healthcare accreditation MENA, ISO 9001 certification, corporate governance consulting, quality management, business transformation, pioneers international, رواد الفكر الدولية"
        schema={organizationSchema}
      />

      {/* ====== HERO SECTION - Big Four Style ====== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/assets/images/hero-premium.jpg" alt="Corporate skyline" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/70" />
        </div>
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
                <Star className="w-4 h-4 text-emerald" />
                <span className="text-sm text-white/90">Trusted by 500+ organizations across MENA</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                {t('hero.headline')}
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="text-lg sm:text-xl text-slate-300 mt-6 max-w-xl leading-relaxed">
                {t('hero.subheadline')}
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="flex flex-wrap items-center gap-4 mt-10">
                <Link to="/contact" className="px-8 py-4 bg-emerald text-white rounded-full font-semibold hover:bg-emerald-dark hover:scale-[1.02] transition-all shadow-glow-emerald flex items-center gap-2">
                  {t('hero.ctaPrimary')} <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/services" className="px-8 py-4 border border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition-all flex items-center gap-2">
                  <Play className="w-4 h-4" /> {t('hero.ctaSecondary')}
                </Link>
              </motion.div>
            </div>

            {/* Right side - Stats */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
              className="hidden lg:grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div key={stat.label} className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 ${i === 0 ? 'col-span-2' : ''}`}>
                  <stat.icon className="w-6 h-6 text-emerald mb-3" />
                  <div className="text-3xl font-bold text-white">{stat.number}<span className="text-emerald">{stat.suffix}</span></div>
                  <div className="text-sm text-slate-300 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Trusted By Bar */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            className="mt-16 pt-8 border-t border-white/10">
            <p className="text-center text-sm text-slate-400 mb-6 uppercase tracking-wider">Trusted by leading organizations</p>
            <div className="flex items-center justify-center gap-12 flex-wrap opacity-50">
              {['/assets/images/partner-aaa.png', '/assets/images/partner-exemplar.png', '/assets/images/partner-aeba.png'].map(p => (
                <img key={p} src={p} alt="Partner" className="h-8 object-contain grayscale hover:grayscale-0 transition-all" />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====== TRUST SEAL BAR ====== */}
      <TrustSealBar />

      {/* ====== CLIENTS TICKER ====== */}
      <ClientsTicker />

      {/* ====== SERVICES SECTION ====== */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="WHAT WE DO" heading={t('services.sectionTitle')} description={t('services.sectionDesc')} centered />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {services.map((service, i) => (
              <motion.div key={service.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }} className="group bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-xl hover:border-emerald/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-emerald-light flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <service.icon className="w-7 h-7 text-emerald" />
                </div>
                <h4 className="text-xl font-semibold text-slate-800 mb-2">{service.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{service.desc}</p>
                <ul className="space-y-2 mb-5">
                  {service.features.slice(0, 3).map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-600"><Check className="w-4 h-4 text-emerald flex-shrink-0" />{f}</li>
                  ))}
                </ul>
                <Link to={`/services#${service.slug}`} className="inline-flex items-center gap-1 text-sm font-medium text-emerald group-hover:gap-2 transition-all">
                  Learn More <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== ISO STANDARDS GRID ====== */}
      <section className="bg-navy py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-caption uppercase tracking-[0.15em] text-emerald font-medium">ISO CERTIFICATIONS</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">International Standards We Cover</h2>
            <p className="text-slate-400 mt-4 max-w-2xl mx-auto">From quality management to information security, we provide comprehensive certification support across all major ISO standards.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { code: 'ISO 9001', name: 'Quality Management', icon: ShieldCheck },
              { code: 'ISO 14001', name: 'Environmental', icon: Leaf },
              { code: 'ISO 45001', name: 'Health & Safety', icon: ShieldCheck },
              { code: 'ISO 21001', name: 'Education', icon: GraduationCap },
              { code: 'ISO 22000', name: 'Food Safety', icon: ShieldCheck },
              { code: 'ISO 27001', name: 'Information Security', icon: Lock },
              { code: 'ISO 31000', name: 'Risk Management', icon: BarChart3 },
              { code: 'ISO 37301', name: 'Compliance', icon: ShieldCheck },
            ].map((iso, i) => (
              <motion.div key={iso.code} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-emerald/30 transition-all cursor-pointer group">
                <iso.icon className="w-6 h-6 text-emerald mb-3" />
                <div className="text-sm font-bold text-emerald">{iso.code}</div>
                <div className="text-sm text-slate-300 mt-0.5">{iso.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== METHODOLOGY ====== */}
      <section className="bg-offwhite py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="OUR APPROACH" heading="Proven 5-Step Methodology" description="An integrated execution-driven approach ensuring measurable outcomes at every stage." centered />
          <div className="mt-16">
            <ProcessSteps steps={methodologySteps} />
          </div>
        </div>
      </section>

      {/* ====== TRAINING PACKAGES / PRICING ====== */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="TRAINING PACKAGES" heading={t('pricing.title')} description={t('pricing.subtitle')} centered />
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {pricingPlans.map((plan, i) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                onMouseEnter={() => setActivePricing(i)}
                className={`relative rounded-2xl p-8 transition-all duration-300 ${plan.popular ? 'bg-navy text-white ring-2 ring-emerald shadow-2xl scale-105' : 'bg-white border border-slate-200 hover:shadow-lg'} ${activePricing === i && !plan.popular ? 'border-emerald ring-1 ring-emerald' : ''}`}>
                {plan.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald text-white text-xs font-bold px-4 py-1 rounded-full">MOST POPULAR</span>}
                <h4 className={`text-lg font-semibold ${plan.popular ? 'text-white' : 'text-slate-800'}`}>{plan.name}</h4>
                <div className="flex items-baseline gap-1 mt-3 mb-2">
                  <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-slate-800'}`}>${plan.price}</span>
                  {plan.period && <span className={`text-sm ${plan.popular ? 'text-slate-300' : 'text-slate-500'}`}>{plan.period}</span>}
                </div>
                <p className={`text-sm mb-6 ${plan.popular ? 'text-slate-300' : 'text-slate-500'}`}>{plan.desc}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className={`flex items-center gap-2 text-sm ${plan.popular ? 'text-slate-200' : 'text-slate-600'}`}>
                      <Check className={`w-4 h-4 ${plan.popular ? 'text-emerald' : 'text-emerald'}`} />{f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handlePricingCTA(plan.name, plan.price)}
                  className={`w-full py-3 rounded-full font-semibold text-sm transition-all ${plan.popular ? 'bg-emerald text-white hover:bg-emerald-dark' : 'bg-slate-100 text-slate-700 hover:bg-emerald hover:text-white'}`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-sm text-slate-400 mt-8">All prices in USD. Enterprise pricing available upon request. <Link to="/contact" className="text-emerald hover:underline">Contact us</Link> for custom packages.</p>
        </div>
      </section>

      {/* ====== CASE STUDIES ====== */}
      <section className="bg-offwhite py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="CASE STUDIES" heading="Proven Results Across Industries" description="Real transformation stories from organizations across the MENA region." />
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {caseStudies.map((s, i) => <CaseStudyCard key={s.title} {...s} delay={i} />)}
          </div>
        </div>
      </section>

      {/* ====== WHY CHOOSE US ====== */}
      <WhyChooseUs />

      {/* ====== CERTIFICATE VERIFICATION CTA ====== */}
      <section className="bg-white py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="w-20 h-20 rounded-full bg-emerald-light flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-10 h-10 text-emerald" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">{t('certificate.heading')}</h2>
            <p className="text-slate-500 mb-8">{t('certificate.description')}</p>
            <Link to="/verify-certificate" className="inline-flex items-center gap-3 bg-navy text-white px-8 py-4 rounded-full font-semibold hover:bg-navy-light transition-all">
              <Search className="w-5 h-5" /> Verify Now
            </Link>
            <div className="flex items-center justify-center gap-8 mt-8 text-sm text-slate-400">
              {[{ icon: ShieldCheck, text: t('certificate.trust1') }, { icon: Zap, text: t('certificate.trust2') }, { icon: Lock, text: t('certificate.trust3') }].map(item => (
                <span key={item.text} className="flex items-center gap-1.5"><item.icon className="w-4 h-4 text-emerald" />{item.text}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====== PHOTO GALLERY ====== */}
      <section className="bg-navy py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-caption uppercase tracking-[0.15em] text-emerald font-medium">GALLERY</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">Training & Consulting in Action</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`relative overflow-hidden rounded-xl group cursor-pointer ${i === 0 ? 'col-span-2 row-span-2' : ''}`}>
                <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/30 transition-all" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== INSIGHTS ====== */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="INSIGHTS" heading="Latest Industry Insights" description="Stay ahead with expert analysis on ISO standards, ESG trends, and governance best practices." />
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {insights.map((insight, i) => <InsightCard key={insight.title} {...insight} delay={i} />)}
          </div>
          <div className="text-center mt-10">
            <Link to="/insights" className="inline-flex items-center gap-2 text-emerald font-medium hover:underline">View All Insights <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      {/* ====== TESTIMONIALS ====== */}
      <TestimonialGrid />

      {/* ====== NEWSLETTER ====== */}
      <section className="bg-emerald py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">{t('newsletter.heading')}</h2>
          <p className="text-white/85 mb-8">{t('newsletter.description')}</p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
