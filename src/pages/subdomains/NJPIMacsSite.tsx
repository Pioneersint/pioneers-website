import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { BookOpen, Award, Users, Globe, ArrowRight, GraduationCap, ClipboardCheck, TrendingUp, FileCheck, Phone } from 'lucide-react';
import SEO from '@/components/SEO';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function NJPIMacsSite() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    { icon: BookOpen, title: 'Interactive Courses', titleAr: 'دورات تفاعلية', desc: 'Self-paced learning modules with video lectures, quizzes, and downloadable resources.', descAr: 'وحدات تعلم ذاتية السرعة مع محاضرات فيديو واختبارات وموارد قابلة للتحميل.' },
    { icon: Award, title: 'Certification Exams', titleAr: 'اختبارات معتمدة', desc: 'Industry-recognized certification examinations aligned with international standards.', descAr: 'اختبارات شهادات معترف بها صناعياً ومتسقة مع المعايير الدولية.' },
    { icon: Users, title: 'Expert Instructors', titleAr: 'مدربون خبراء', desc: 'Learn from certified professionals with 15+ years of real-world consulting experience.', descAr: 'تعلم من محترفين معتمدين يمتلكون أكثر من 15 عاماً من الخبرة الاستشارية.' },
    { icon: Globe, title: 'Multi-Language', titleAr: 'متعدد اللغات', desc: 'Course content available in English and Arabic to serve MENA region learners.', descAr: 'محتوى الدورات متاح بالإنجليزية والعربية لخدمة المتعلمين في منطقة الشرق الأوسط.' },
  ];

  const programs = [
    { icon: GraduationCap, title: 'ISO 9001 Lead Auditor', titleAr: 'مدقق رئيسي ISO 9001', level: 'Advanced', levelAr: 'متقدم', duration: '40 Hours', durationAr: '40 ساعة' },
    { icon: ClipboardCheck, title: 'ISO 14001 EMS', titleAr: 'نظام إدارة البيئة ISO 14001', level: 'Intermediate', levelAr: 'متوسط', duration: '32 Hours', durationAr: '32 ساعة' },
    { icon: TrendingUp, title: 'ISO 45001 OHSMS', titleAr: 'نظام السلامة ISO 45001', level: 'Advanced', levelAr: 'متقدم', duration: '40 Hours', durationAr: '40 ساعة' },
    { icon: FileCheck, title: 'ESG Fundamentals', titleAr: 'أساسيات الاستدامة ESG', level: 'Beginner', levelAr: 'مبتدئ', duration: '24 Hours', durationAr: '24 ساعة' },
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#0F2B4C] via-[#0F4C81] to-[#1A5A9E] text-white ${isRTL ? 'font-arabic' : ''}`}>
      <SEO 
        title="NJPI-MACS | Pioneers International Learning Platform"
        description="NJPI-MACS: Pioneers International's premier learning management system for ISO certification, ESG training, and professional development across the MENA region."
        noindex={false}
      />
      
      {/* Header */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
              <GraduationCap className="w-10 h-10 text-[#E8AF3E]" />
              <div>
                <h1 className="text-xl font-bold">NJPI-MACS</h1>
                <p className="text-xs text-white/60">{isRTL ? 'منصة الرواد للتعلم' : 'Pioneers Learning Platform'}</p>
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
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#E8AF3E]/20 text-[#E8AF3E] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Award className="w-4 h-4" />
            {isRTL ? 'منصة التعلم الرئيسية للرواد الدولية' : 'Pioneers International Premier Learning Platform'}
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {isRTL ? 'طور مهاراتك مع' : 'Elevate Your Skills With'}
            <br />
            <span className="text-[#E8AF3E]">NJPI-MACS</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-10">
            {isRTL 
              ? 'منصة تعليمية متكاملة للشهادات المهنية، معايير ISO، والتنمية المستدامة. أكثر من 50 دورة تدريبية معتمدة.'
              : 'A comprehensive learning platform for professional certifications, ISO standards, and sustainability. 50+ accredited training courses.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/lms" className="inline-flex items-center gap-2 bg-[#E8AF3E] text-[#0F2B4C] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#d49d35] transition-all hover:scale-105">
              <BookOpen className="w-5 h-5" />
              {isRTL ? 'تصفح الدورات' : 'Browse Courses'}
            </Link>
            <a href="tel:+962781595846" className="inline-flex items-center gap-2 border-2 border-white/30 px-8 py-4 rounded-lg font-medium hover:bg-white/10 transition-all">
              <Phone className="w-5 h-5" />
              {isRTL ? 'اتصل بنا' : 'Contact Us'}
            </a>
          </div>
          
          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { value: '50+', label: 'Courses', labelAr: 'دورة' },
              { value: '5,000+', label: 'Graduates', labelAr: 'خريج' },
              { value: '98%', label: 'Pass Rate', labelAr: 'نسبة النجاح' },
              { value: '15+', label: 'Expert Trainers', labelAr: 'مدرب خبير' },
            ].map((stat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-3xl font-bold text-[#E8AF3E]">{stat.value}</div>
                <div className="text-sm text-white/70 mt-1">{isRTL ? stat.labelAr : stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">
            {isRTL ? 'لماذا تختار NJPI-MACS؟' : 'Why Choose NJPI-MACS?'}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[#E8AF3E]/50 transition-all group">
                <f.icon className="w-10 h-10 text-[#E8AF3E] mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-lg font-bold mb-2">{isRTL ? f.titleAr : f.title}</h4>
                <p className="text-sm text-white/70">{isRTL ? f.descAr : f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold">
              {isRTL ? 'البرامج المميزة' : 'Featured Programs'}
            </h3>
            <Link to="/lms" className="text-[#E8AF3E] hover:underline flex items-center gap-1">
              {isRTL ? 'عرض الكل' : 'View All'} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {programs.map((p, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[#E8AF3E]/50 transition-all group cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="bg-[#E8AF3E]/20 p-3 rounded-lg">
                    <p.icon className="w-8 h-8 text-[#E8AF3E]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold mb-1">{isRTL ? p.titleAr : p.title}</h4>
                    <div className="flex items-center gap-3 text-sm text-white/60 mt-2">
                      <span className="bg-white/10 px-2 py-1 rounded">{isRTL ? p.levelAr : p.level}</span>
                      <span className="bg-white/10 px-2 py-1 rounded">{isRTL ? p.durationAr : p.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#E8AF3E]/20 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">
            {isRTL ? 'ابدأ رحلتك التعليمية اليوم' : 'Start Your Learning Journey Today'}
          </h3>
          <p className="text-white/70 mb-8">
            {isRTL 
              ? 'انضم إلى آلاف المتعلمين في منطقة الشرق الأوسط وشمال أفريقيا. سجل الآن واحصل على خصم 20% على أول دورة.'
              : 'Join thousands of learners across the MENA region. Register now and get 20% off your first course.'
            }
          </p>
          <Link to="/register" className="inline-flex items-center gap-2 bg-[#E8AF3E] text-[#0F2B4C] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#d49d35] transition-all hover:scale-105">
            <GraduationCap className="w-5 h-5" />
            {isRTL ? 'سجل مجاناً' : 'Register for Free'}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4 text-center text-white/50 text-sm">
        <p>© 2026 Pioneers International. {isRTL ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>
        <p className="mt-1">NJPI-MACS — {isRTL ? 'منصة الرواد للتعلم والشهادات المهنية' : 'Pioneers Learning & Certification Platform'}</p>
      </footer>

      <WhatsAppButton />
    </div>
  );
}
