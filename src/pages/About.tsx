import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Target, Globe, Users, Leaf, Eye, TrendingUp, HeartPulse, GraduationCap, Landmark, Factory, Building2, Hotel, HandHeart, Home, Truck, Quote } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import AnimatedSection from '@/components/shared/AnimatedSection';

export default function About() {
  const { t } = useTranslation();

  const methodologySteps = [
    { number: 1, title: t('aboutPage.methodology.steps.step1.title', { defaultValue: 'Assessment & Analysis' }), desc: t('aboutPage.methodology.steps.step1.desc', { defaultValue: 'Comprehensive evaluation of current state, processes, and organizational readiness using industry benchmarks and diagnostic tools.' }) },
    { number: 2, title: t('aboutPage.methodology.steps.step2.title', { defaultValue: 'Gap Identification' }), desc: t('aboutPage.methodology.steps.step2.desc', { defaultValue: 'Identify gaps between current performance and international standards, prioritizing improvement areas with the highest impact.' }) },
    { number: 3, title: t('aboutPage.methodology.steps.step3.title', { defaultValue: 'Solution Design' }), desc: t('aboutPage.methodology.steps.step3.desc', { defaultValue: 'Craft tailored, practical solutions aligned with global best practices, ISO standards, and your organization\'s unique context.' }) },
    { number: 4, title: t('aboutPage.methodology.steps.step4.title', { defaultValue: 'Implementation & Monitoring' }), desc: t('aboutPage.methodology.steps.step4.desc', { defaultValue: 'Execute with precision, track milestones through KPI dashboards, and ensure stakeholder engagement at every level.' }) },
    { number: 5, title: t('aboutPage.methodology.steps.step5.title', { defaultValue: 'Continuous Improvement' }), desc: t('aboutPage.methodology.steps.step5.desc', { defaultValue: 'Measure performance against targets, refine processes based on data, and sustain excellence through ongoing support.' }) },
  ];

  const industries = t('aboutPage.industries.sectors', { returnObjects: true }) as Array<{ name: string; standards: string }>;

  return (
    <div>
      {/* ====== HERO ====== */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/assets/images/about-hero.jpg" alt="About Pioneers" className="w-full h-full object-cover" />
          <div className="absolute inset-0 glass-overlay" />
        </div>
        <div className="relative z-10 content-container text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-display text-white"
          >
            {t('aboutPage.heroTitle')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-h2 text-slate-200 mt-4 font-normal"
          >
            {t('aboutPage.heroSubtitle')}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-body-lg text-slate-300 mt-6 max-w-2xl mx-auto"
          >
            {t('aboutPage.heroDesc')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              to="/services"
              className="inline-block mt-8 px-8 py-3 border border-white/40 text-white rounded-full font-medium hover:bg-white hover:text-navy transition-all"
            >
              Explore Our Services
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ====== COMPANY STORY ====== */}
      <section className="bg-white section-padding">
        <div className="content-container">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3">
              <SectionHeading
                eyebrow={t('aboutPage.story.eyebrow')}
                heading={t('aboutPage.story.heading')}
              />
              <div className="mt-8 space-y-5">
                <p className="text-body text-slate-600 leading-relaxed">{t('aboutPage.story.p1')}</p>
                <p className="text-body text-slate-600 leading-relaxed">{t('aboutPage.story.p2')}</p>
                <div className="border-l-4 border-emerald pl-6">
                  <p className="text-body text-slate-700 leading-relaxed italic">{t('aboutPage.story.p3')}</p>
                </div>
              </div>
            </div>
            <AnimatedSection className="lg:col-span-2">
              <img
                src="/assets/images/about-team.jpg"
                alt="Our Team"
                className="rounded-2xl shadow-xl w-full"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ====== VISION & MISSION ====== */}
      <section className="gradient-navy section-padding">
        <div className="content-container">
          <SectionHeading
            eyebrow={t('aboutPage.vision.eyebrow')}
            heading={t('aboutPage.vision.heading')}
            light
            centered
          />
          <div className="grid md:grid-cols-2 gap-8 mt-14">
            <motion.div
              whileHover={{ boxShadow: '0 0 30px rgba(16, 185, 129, 0.2)' }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8"
            >
              <Eye className="w-10 h-10 text-emerald mb-4" />
              <h3 className="text-h3 text-white mb-2">{t('aboutPage.vision.visionTitle')}</h3>
              <p className="text-body-lg text-slate-200 mb-4">{t('aboutPage.vision.visionText')}</p>
              <p className="text-h4 text-slate-300 font-normal">{t('aboutPage.vision.visionAr')}</p>
            </motion.div>
            <motion.div
              whileHover={{ boxShadow: '0 0 30px rgba(16, 185, 129, 0.2)' }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8"
            >
              <Target className="w-10 h-10 text-emerald mb-4" />
              <h3 className="text-h3 text-white mb-2">{t('aboutPage.vision.missionTitle')}</h3>
              <p className="text-body-lg text-slate-200 mb-4">{t('aboutPage.vision.missionText')}</p>
              <p className="text-h4 text-slate-300 font-normal">{t('aboutPage.vision.missionAr')}</p>
            </motion.div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {[
              { icon: TrendingUp, title: t('aboutPage.vision.principles.p1.title'), ar: t('aboutPage.vision.principles.p1.ar') },
              { icon: Globe, title: t('aboutPage.vision.principles.p2.title'), ar: t('aboutPage.vision.principles.p2.ar') },
              { icon: Users, title: t('aboutPage.vision.principles.p3.title'), ar: t('aboutPage.vision.principles.p3.ar') },
              { icon: Leaf, title: t('aboutPage.vision.principles.p4.title'), ar: t('aboutPage.vision.principles.p4.ar') },
            ].map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-6"
              >
                <p.icon className="w-8 h-8 text-emerald mb-3" />
                <h4 className="text-white font-semibold mb-1">{p.title}</h4>
                <p className="text-slate-300 text-sm">{p.ar}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== METHODOLOGY ====== */}
      <section className="bg-offwhite section-padding">
        <div className="content-container">
          <SectionHeading
            eyebrow={t('aboutPage.methodology.eyebrow')}
            heading={t('aboutPage.methodology.heading')}
            description={t('aboutPage.methodology.description')}
            centered
          />
          <div className="mt-14 space-y-10">
            {methodologySteps.map((step, i) => (
              <AnimatedSection key={step.number} delay={i * 0.1}>
                <div className={`flex flex-col md:flex-row gap-6 items-start ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="md:w-1/2">
                    <span className="text-6xl font-bold text-emerald/20">0{step.number}</span>
                    <h3 className="text-h3 text-slate-800 mt-2">{step.title}</h3>
                    <p className="text-body text-slate-600 mt-3">{step.desc}</p>
                  </div>
                  <div className="md:w-1/2" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ====== INDUSTRIES ====== */}
      <section className="bg-white section-padding">
        <div className="content-container">
          <SectionHeading
            eyebrow={t('aboutPage.industries.eyebrow')}
            heading={t('aboutPage.industries.heading')}
            centered
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-14">
            {industries.map((industry, i) => {
              const icons = [HeartPulse, GraduationCap, Landmark, Factory, Building2, Hotel, HandHeart, Home, Truck];
              const Icon = icons[i] || Building2;
              return (
                <motion.div
                  key={industry.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="bg-offwhite border border-slate-200 rounded-xl p-6 hover:border-emerald/50 transition-colors"
                >
                  <Icon className="w-10 h-10 text-emerald mb-3" />
                  <h4 className="text-h4 text-slate-800 mb-1">{industry.name}</h4>
                  <span className="text-caption text-slate-400">{industry.standards}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====== LEADERSHIP ====== */}
      <section className="gradient-navy section-padding">
        <div className="content-container max-w-3xl text-center">
          <AnimatedSection>
            <Quote className="w-16 h-16 text-emerald/30 mx-auto mb-6" />
            <p className="text-body-lg text-white leading-relaxed italic mb-6">
              "{t('aboutPage.leadership.quote')}"
            </p>
            <p className="text-h4 text-slate-300 font-normal mb-8">
              {t('aboutPage.leadership.quoteAr')}
            </p>
            <span className="text-caption text-emerald uppercase tracking-wider">
              {t('aboutPage.leadership.attribution')}
            </span>
          </AnimatedSection>
        </div>
      </section>

      {/* ====== PARTNERSHIPS ====== */}
      <section className="bg-offwhite section-padding">
        <div className="content-container">
          <SectionHeading
            eyebrow={t('aboutPage.partnerships.eyebrow')}
            heading={t('aboutPage.partnerships.heading')}
            centered
          />
          <div className="grid md:grid-cols-3 gap-8 mt-14">
            {[
              { key: 'aaa', logo: '/assets/images/partner-aaa.png' },
              { key: 'exemplar', logo: '/assets/images/partner-exemplar.png' },
              { key: 'aeba', logo: '/assets/images/partner-aeba.png' },
            ].map((partner, i) => (
              <motion.div
                key={partner.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -4 }}
                className="bg-white border border-slate-200 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow"
              >
                <img src={partner.logo} alt={t(`aboutPage.partnerships.partners.${partner.key}.name`)} className="h-14 object-contain mx-auto mb-4" />
                <h4 className="text-h4 text-slate-800 mb-3">
                  {t(`aboutPage.partnerships.partners.${partner.key}.name`)}
                </h4>
                <p className="text-body-sm text-slate-500">
                  {t(`aboutPage.partnerships.partners.${partner.key}.desc`)}
                </p>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-body text-slate-500 mt-8">
            {t('aboutPage.partnerships.note')}
          </p>
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section className="bg-emerald section-padding">
        <div className="content-container text-center">
          <AnimatedSection>
            <h2 className="text-h2 text-white mb-4">{t('aboutPage.cta.heading')}</h2>
            <p className="text-body-lg text-white/85 max-w-2xl mx-auto mb-8">
              {t('aboutPage.cta.desc')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="px-8 py-3 bg-navy text-white rounded-full font-semibold hover:bg-navy-light transition-colors"
              >
                {t('aboutPage.cta.btn1')}
              </Link>
              <Link
                to="/services"
                className="px-8 py-3 bg-white text-navy rounded-full font-semibold hover:bg-white/90 transition-colors"
              >
                {t('aboutPage.cta.btn2')}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
