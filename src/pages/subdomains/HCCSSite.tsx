import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { HeartPulse, ShieldCheck, Stethoscope, ClipboardList, Phone, Activity, Lock, FileCheck, ArrowRight, Building2 } from 'lucide-react';
import SEO from '@/components/SEO';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function HCCSSite() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const modules = [
    { icon: ShieldCheck, title: 'JCI Accreditation', titleAr: 'اعتماد JCI', desc: 'Full Joint Commission International accreditation preparation and compliance management.', descAr: 'التحضير الكامل للاعتماد الدولي من اللجنة المشتركة وإدارة الامتثال.' },
    { icon: ClipboardList, title: 'CBAHI Standards', titleAr: 'معايير CBAHI', desc: 'Saudi Central Board for Accreditation of Healthcare Institutions compliance support.', descAr: 'دعم الامتثال لمعايير الهيئة المركزية السعودية لاعتماد المؤسسات الصحية.' },
    { icon: HeartPulse, title: 'Patient Safety', titleAr: 'سلامة المرضى', desc: 'NPSG implementation, incident reporting systems, and quality improvement programs.', descAr: 'تطبيق أهداف السلامة الوطنية، أنظمة الإبلاغ عن الحوادث، وبرامج تحسين الجودة.' },
    { icon: Lock, title: 'HIPAA Compliance', titleAr: 'امتثال HIPAA', desc: 'Healthcare data privacy, security protocols, and regulatory compliance frameworks.', descAr: 'خصوصية البيانات الصحية، بروتوكولات الأمان، وأطر الامتثال التنظيمي.' },
  ];

  const standards = [
    { code: 'JCI', name: 'Joint Commission International', nameAr: 'اللجنة المشتركة الدولية', description: 'Gold standard for healthcare quality and patient safety.', descriptionAr: 'المعيار الذهبي لجودة الرعاية الصحية وسلامة المرضى.' },
    { code: 'CBAHI', name: 'Saudi Central Board', nameAr: 'الهيئة المركزية السعودية', description: 'Essential accreditation for all healthcare facilities in KSA.', descriptionAr: 'الاعتماد الأساسي لجميع المنشآت الصحية في المملكة العربية السعودية.' },
    { code: 'AHSA', name: 'Abu Dhabi Healthcare', nameAr: 'صحة أبوظبي', description: 'Department of Health Abu Dhabi quality standards compliance.', descriptionAr: 'الامتثال لمعايير جودة دائرة الصحة في أبوظبي.' },
    { code: 'MOH', name: 'Ministry of Health', nameAr: 'وزارة الصحة', description: 'Compliance with MOH standards across GCC countries.', descriptionAr: 'الامتثال لمعايير وزارة الصحة في دول مجلس التعاون الخليجي.' },
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#0D1F2D] via-[#1B3A4B] to-[#2C5364] text-white ${isRTL ? 'font-arabic' : ''}`}>
      <SEO 
        title="HCCS | Healthcare Compliance System | Pioneers International"
        description="HCCS: Healthcare Compliance System for JCI, CBAHI, and MOH accreditation. Comprehensive healthcare quality management and patient safety solutions."
        noindex={false}
      />
      
      {/* Header */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
              <HeartPulse className="w-10 h-10 text-[#06D6A0]" />
              <div>
                <h1 className="text-xl font-bold">HCCS</h1>
                <p className="text-xs text-white/60">{isRTL ? 'نظام الامتثال الصحي' : 'Healthcare Compliance System'}</p>
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
          <div className="inline-flex items-center gap-2 bg-[#06D6A0]/20 text-[#06D6A0] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <HeartPulse className="w-4 h-4" />
            {isRTL ? 'حلول الامتثال الصحي الرائدة في الشرق الأوسط' : 'MENA Leading Healthcare Compliance Solution'}
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {isRTL ? 'نظام الامتثال الصحي' : 'Healthcare Compliance'}
            <br />
            <span className="text-[#06D6A0]">HCCS</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-10">
            {isRTL 
              ? 'منصة متكاملة لإدارة الامتثال الصحي، الاعتمادات، وسلامة المرضى. مصممة لمؤسسات الرعاية الصحية في منطقة الشرق الأوسط.'
              : 'An integrated platform for healthcare compliance, accreditation, and patient safety. Designed for healthcare institutions across the Middle East.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+962781595846" className="inline-flex items-center gap-2 bg-[#06D6A0] text-[#0D1F2D] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#05b98a] transition-all hover:scale-105">
              <Phone className="w-5 h-5" />
              {isRTL ? 'اطلب عرض توضيحي' : 'Request a Demo'}
            </a>
            <Link to="/gap-analysis" className="inline-flex items-center gap-2 border-2 border-white/30 px-8 py-4 rounded-lg font-medium hover:bg-white/10 transition-all">
              <ClipboardList className="w-5 h-5" />
              {isRTL ? 'تقييم مجاني' : 'Free Assessment'}
            </Link>
          </div>
          
          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { value: '120+', label: 'Healthcare Clients', labelAr: 'عميل صحي' },
              { value: '50+', label: 'Accreditations', labelAr: 'اعتماد' },
              { value: '99.2%', label: 'Success Rate', labelAr: 'نسبة النجاح' },
              { value: '4', label: 'GCC Countries', labelAr: 'دول خليجية' },
            ].map((stat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-3xl font-bold text-[#06D6A0]">{stat.value}</div>
                <div className="text-sm text-white/70 mt-1">{isRTL ? stat.labelAr : stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="py-16 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-4">
            {isRTL ? 'وحدات النظام' : 'HCCS Modules'}
          </h3>
          <p className="text-center text-white/60 mb-12 max-w-2xl mx-auto">
            {isRTL 
              ? 'منصة متكاملة تغطي جميع جوانب الامتثال الصحي والجودة.'
              : 'A comprehensive platform covering all aspects of healthcare compliance and quality.'
            }
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {modules.map((m, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[#06D6A0]/50 transition-all group">
                <div className="flex items-start gap-4">
                  <div className="bg-[#06D6A0]/20 p-3 rounded-lg shrink-0">
                    <m.icon className="w-8 h-8 text-[#06D6A0] group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{isRTL ? m.titleAr : m.title}</h4>
                    <p className="text-white/70">{isRTL ? m.descAr : m.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditation Standards */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">
            {isRTL ? 'معايير الاعتماد المدعومة' : 'Supported Accreditation Standards'}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {standards.map((s, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center hover:border-[#06D6A0]/50 transition-all">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#06D6A0]/20 rounded-full mb-4">
                  <span className="text-xl font-bold text-[#06D6A0]">{s.code}</span>
                </div>
                <h4 className="font-bold mb-2">{isRTL ? s.nameAr : s.name}</h4>
                <p className="text-sm text-white/70">{isRTL ? s.descriptionAr : s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Activity, title: 'Real-time Dashboards', titleAr: 'لوحات تحكم فورية', desc: 'Monitor compliance metrics, KPIs, and quality indicators in real-time across all departments.', descAr: 'راقب مقاييس الامتثال والمؤشرات الرئيسية فورياً في جميع الأقسام.' },
              { icon: FileCheck, title: 'Document Control', titleAr: 'التحكم بالمستندات', desc: 'Centralized document management with version control, approval workflows, and audit trails.', descAr: 'إدارة مركزية للمستندات مع التحكم بالإصدارات وسير العمل والسجلات.' },
              { icon: Building2, title: 'Multi-site Management', titleAr: 'إدارة مواقع متعددة', desc: 'Manage compliance across hospital networks, clinics, and healthcare facilities from one platform.', descAr: 'أدر الامتثال عبر شبكات المستشفيات والعيادات من منصة واحدة.' },
            ].map((f, i) => (
              <div key={i} className="text-center">
                <f.icon className="w-12 h-12 text-[#06D6A0] mx-auto mb-4" />
                <h4 className="text-lg font-bold mb-2">{isRTL ? f.titleAr : f.title}</h4>
                <p className="text-sm text-white/70">{isRTL ? f.descAr : f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#06D6A0]/20 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">
            {isRTL ? 'حوّل امتثال مؤسستك الصحية' : 'Transform Your Healthcare Compliance'}
          </h3>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            {isRTL 
              ? 'انضم إلى أكثر من 120 مؤسسة صحية تثق بنظام HCCS. اطلب عرضاً توضيحياً مجانياً اليوم.'
              : 'Join 120+ healthcare institutions that trust HCCS. Request a free demo today.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+962781595846" className="inline-flex items-center gap-2 bg-[#06D6A0] text-[#0D1F2D] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#05b98a] transition-all hover:scale-105">
              <Phone className="w-5 h-5" />
              {isRTL ? 'اتصل بنا' : 'Contact Us'}
            </a>
            <Link to="/client-portal" className="inline-flex items-center gap-2 border-2 border-white/30 px-8 py-4 rounded-lg font-medium hover:bg-white/10 transition-all">
              <Stethoscope className="w-5 h-5" />
              {isRTL ? 'بوابة العملاء' : 'Client Portal'}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4 text-center text-white/50 text-sm">
        <p>© 2026 Pioneers International. {isRTL ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>
        <p className="mt-1">HCCS — {isRTL ? 'نظام الامتثال الصحي للرواد الدولية' : 'Pioneers International Healthcare Compliance System'}</p>
      </footer>

      <WhatsAppButton />
    </div>
  );
}
