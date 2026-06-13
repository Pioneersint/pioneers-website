import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Briefcase, LineChart, Shield, Users2, ArrowRight, Globe2, FileText, Phone, CheckCircle2 } from 'lucide-react';
import SEO from '@/components/SEO';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function ConsultingSite() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    { icon: Shield, title: 'ISO Certification', titleAr: 'شهادات الأيزو', desc: 'Full ISO 9001, 14001, 45001, 27001 certification support from gap analysis to final audit.', descAr: 'دعم كامل لشهادات الأيزو 9001، 14001، 45001، 27001 من تحليل الفجوات إلى التدقيق النهائي.' },
    { icon: LineChart, title: 'ESG Advisory', titleAr: 'استشارات الاستدامة', desc: 'Environmental, Social & Governance strategy development and sustainability reporting.', descAr: 'تطوير استراتيجية الحوكمة البيئية والاجتماعية وإعداد تقارير الاستدامة.' },
    { icon: Users2, title: 'Corporate Governance', titleAr: 'الحوكمة المؤسسية', desc: 'Board effectiveness reviews, policy frameworks, and compliance structuring.', descAr: 'مراجعات فعالية مجالس الإدارة، أطر السياسات، وهيكلة الامتثال.' },
    { icon: Globe2, title: 'Business Transformation', titleAr: 'تحول الأعمال', desc: 'Digital transformation roadmaps, process optimization, and change management.', descAr: 'خارطة طريق التحول الرقمي، تحسين العمليات، وإدارة التغيير.' },
  ];

  const process = [
    { step: '01', title: 'Discovery', titleAr: 'الاكتشاف', desc: 'We analyze your current state and identify improvement opportunities.', descAr: 'نحلل وضعك الحالي ونحدد فرص التحسن.' },
    { step: '02', title: 'Strategy', titleAr: 'الاستراتيجية', desc: 'Custom roadmap designed for your industry and organizational goals.', descAr: 'خارطة طريق مخصصة مصممة لصناعتك وأهداف مؤسستك.' },
    { step: '03', title: 'Implementation', titleAr: 'التنفيذ', desc: 'Hands-on support through every step of the implementation journey.', descAr: 'دعم عملي في كل خطوة من رحلة التنفيذ.' },
    { step: '04', title: 'Certification', titleAr: 'الشهادة', desc: 'Complete audit preparation and certification body coordination.', descAr: 'التحضير الكامل للتدقيق وتنسيق جهة الاعتماد.' },
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#1A1A2E] via-[#16213E] to-[#0F3460] text-white ${isRTL ? 'font-arabic' : ''}`}>
      <SEO 
        title="Consulting | Pioneers International"
        description="Executive consulting services in ISO certification, ESG advisory, corporate governance, and business transformation across the MENA region."
        noindex={false}
      />
      
      {/* Header */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
              <Briefcase className="w-10 h-10 text-[#E94560]" />
              <div>
                <h1 className="text-xl font-bold">Pioneers Consulting</h1>
                <p className="text-xs text-white/60">{isRTL ? 'استشارات الرواد الدولية' : 'Pioneers International Consulting'}</p>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://pioneersint.com" className="text-sm text-white/70 hover:text-white transition-colors">
              {isRTL ? '← العودة للموقع الرئيسي' : 'Back to Main Site →'}
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#E94560]/20 text-[#E94560] px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Globe2 className="w-4 h-4" />
                {isRTL ? 'خدمات استشارية رائدة في منطقة الشرق الأوسط' : 'MENA Region Leading Consulting Services'}
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {isRTL ? 'حلول استشارية' : 'Strategic Consulting'}
                <br />
                <span className="text-[#E94560]">{isRTL ? 'لتحقيق التميز المؤسسي' : 'for Organizational Excellence'}</span>
              </h2>
              <p className="text-lg text-white/80 mb-8">
                {isRTL 
                  ? 'أكثر من 30 عاماً من الخبرة في الاستشارات المؤسسية. نساعد المؤسسات على تحقيق الامتثال، والحوكمة، والنمو المستدام.'
                  : '30+ years of trusted institutional consulting. We help organizations achieve compliance, governance, and sustainable growth.'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:+962781595846" className="inline-flex items-center gap-2 bg-[#E94560] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#d63d56] transition-all hover:scale-105">
                  <Phone className="w-5 h-5" />
                  {isRTL ? 'احجز استشارة' : 'Book a Consultation'}
                </a>
                <Link to="/services" className="inline-flex items-center gap-2 border-2 border-white/30 px-8 py-4 rounded-lg font-medium hover:bg-white/10 transition-all">
                  <FileText className="w-5 h-5" />
                  {isRTL ? 'خدماتنا' : 'Our Services'}
                </Link>
              </div>
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {[
                { value: '500+', label: 'Clients', labelAr: 'عميل' },
                { value: '30+', label: 'Years Experience', labelAr: 'سنة خبرة' },
                { value: '8', label: 'Countries', labelAr: 'دول' },
                { value: '95%', label: 'Success Rate', labelAr: 'نسبة النجاح' },
              ].map((stat, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
                  <div className="text-3xl font-bold text-[#E94560]">{stat.value}</div>
                  <div className="text-sm text-white/70 mt-1">{isRTL ? stat.labelAr : stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-4">
            {isRTL ? 'مجالات الاستشارة' : 'Consulting Practice Areas'}
          </h3>
          <p className="text-center text-white/60 mb-12 max-w-2xl mx-auto">
            {isRTL 
              ? 'نقدم خدمات استشارية متكاملة تغطي جميع جوانب التميز المؤسسي.'
              : 'We provide comprehensive consulting services covering all aspects of organizational excellence.'
            }
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[#E94560]/50 transition-all group">
                <div className="flex items-start gap-4">
                  <div className="bg-[#E94560]/20 p-3 rounded-lg shrink-0">
                    <s.icon className="w-8 h-8 text-[#E94560] group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{isRTL ? s.titleAr : s.title}</h4>
                    <p className="text-white/70">{isRTL ? s.descAr : s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">
            {isRTL ? 'منهجيتنا' : 'Our Methodology'}
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {process.map((p, i) => (
              <div key={i} className="relative">
                <div className="text-5xl font-bold text-white/10 mb-4">{p.step}</div>
                <h4 className="text-lg font-bold mb-2">{isRTL ? p.titleAr : p.title}</h4>
                <p className="text-sm text-white/70">{isRTL ? p.descAr : p.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 right-0 translate-x-1/2 text-white/20">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#E94560]/20 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">
            {isRTL ? 'جاهز لتحقيق التميز المؤسسي؟' : 'Ready to Achieve Excellence?'}
          </h3>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            {isRTL 
              ? 'فريق استشاريينا جاهز لمساعدتك في كل خطوة. اتصل بنا اليوم لتحليل مجاني.'
              : 'Our consulting team is ready to help you every step of the way. Contact us today for a free assessment.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+962781595846" className="inline-flex items-center gap-2 bg-[#E94560] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#d63d56] transition-all hover:scale-105">
              <Phone className="w-5 h-5" />
              {isRTL ? 'اتصل الآن' : 'Call Now'}
            </a>
            <Link to="/gap-analysis" className="inline-flex items-center gap-2 border-2 border-white/30 px-8 py-4 rounded-lg font-medium hover:bg-white/10 transition-all">
              <CheckCircle2 className="w-5 h-5" />
              {isRTL ? 'تحليل الفجوات المجاني' : 'Free Gap Analysis'}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4 text-center text-white/50 text-sm">
        <p>© 2026 Pioneers International. {isRTL ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>
        <p className="mt-1">{isRTL ? 'استشارات الرواد الدولية - شريكك في التميز المؤسسي' : 'Pioneers International Consulting - Your Partner in Excellence'}</p>
      </footer>

      <WhatsAppButton />
    </div>
  );
}
