import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Menu, X, ChevronDown, Globe, Phone,
  Award, Building2, BookOpen, BarChart3, Users,
  Briefcase, Lightbulb, TrendingUp,
  GraduationCap, FileText, ShoppingCart,
  ShieldCheck, Leaf, Search, RefreshCw, Zap, Cpu
} from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useLanguage } from '@/context/LanguageContext';

const navItems = [
  {
    label: 'nav.home',
    labelAr: 'الرئيسية',
    path: '/',
    icon: null,
  },
  {
    label: 'nav.about',
    labelAr: 'من نحن',
    path: '/about',
    icon: Building2,
    children: [
      { path: '/about', label: 'About Us', labelAr: 'نبذة عنا', icon: Building2 },
      { path: '/company-profile', label: 'Company Profile', labelAr: 'الملف التعريفي', icon: FileText },
      { path: '/brand-index', label: 'Brand Index', labelAr: 'مؤشر العلامة', icon: BarChart3 },
    ],
  },
  {
    label: 'nav.services',
    labelAr: 'الخدمات',
    path: '/services',
    icon: Award,
    children: [
      { path: '/services', label: 'All Services', labelAr: 'جميع الخدمات', icon: Award },
      { path: '/services#iso-systems', label: 'ISO Management Systems', labelAr: 'أنظمة إدارة الأيزو', icon: ShieldCheck },
      { path: '/services#esg-advisory', label: 'ESG & Sustainability', labelAr: 'استشارات الاستدامة', icon: Leaf },
      { path: '/services#corporate-governance', label: 'Corporate Governance', labelAr: 'الحوكمة المؤسسية', icon: Building2 },
      { path: '/services#institutional-transformation', label: 'Institutional Transformation', labelAr: 'التحول المؤسسي', icon: RefreshCw },
      { path: '/services#operational-efficiency', label: 'Operational Efficiency', labelAr: 'تحسين الكفاءة التشغيلية', icon: Zap },
      { path: '/services#growth-strategy', label: 'Growth Strategy', labelAr: 'استراتيجيات النمو', icon: TrendingUp },
      { path: '/services#digital-ai', label: 'Digital & AI', labelAr: 'التحول الرقمي والذكاء الاصطناعي', icon: Cpu },
    ],
  },
  {
    label: 'Sectors',
    labelAr: 'القطاعات',
    path: '/sectors',
    icon: Briefcase,
    children: [
      { path: '/sectors/healthcare', label: 'Healthcare', labelAr: 'الصحة', icon: Award },
      { path: '/sectors/education', label: 'Education', labelAr: 'التعليم', icon: GraduationCap },
      { path: '/sectors/banking', label: 'Banking & Finance', labelAr: 'المالية', icon: Building2 },
      { path: '/sectors/manufacturing', label: 'Manufacturing', labelAr: 'الصناعة', icon: Award },
      { path: '/sectors/government', label: 'Government', labelAr: 'الحكومي', icon: Building2 },
      { path: '/sectors', label: 'All Sectors', labelAr: 'جميع القطاعات', icon: Briefcase },
    ],
  },
  {
    label: 'Academy',
    labelAr: 'الأكاديمية',
    path: '/lms',
    icon: GraduationCap,
    children: [
      { path: '/lms', label: 'Courses', labelAr: 'الدورات', icon: BookOpen },
      { path: '/training-calendar', label: 'Training Calendar', labelAr: 'التقويم التدريبي', icon: Award },
      { path: '/verify-certificate', label: 'Certificate Verification', labelAr: 'التحقق من الشهادات', icon: Search },
      { path: '/store', label: 'Resources', labelAr: 'الموارد', icon: FileText },
    ],
  },
  {
    label: 'Insights',
    labelAr: 'الرؤى',
    path: '/insights',
    icon: Lightbulb,
  },
  {
    label: 'Case Studies',
    labelAr: 'دراسات الحالة',
    path: '/case-studies',
    icon: BarChart3,
  },
  {
    label: 'Careers',
    labelAr: 'الوظائف',
    path: '/careers',
    icon: Users,
  },
  {
    label: 'nav.contact',
    labelAr: 'تواصل معنا',
    path: '/contact',
    icon: null,
  },
];

/* ── Cart Button ── */
function CartButton() {
  const { items } = useCart();
  const count = items.length;
  return (
    <Link to="/checkout" className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
      <ShoppingCart className="w-4 h-4" />
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  );
}

export default function Header() {
  const { t } = useTranslation();
  const { language, toggleLanguage } = useLanguage();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const isAr = language === 'ar';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setOpenDropdown(null); }, [location.pathname]);

  const handleToggleLang = () => {
    toggleLanguage();
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100' : 'bg-white border-b border-slate-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="shrink-0">
            <img
              src="/assets/images/logo.png"
              alt="Pioneers International"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => (
              <div
                key={item.path}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  to={item.path}
                  className={`flex items-center gap-1 px-2.5 py-2 rounded-lg text-xs font-medium transition-all ${
                    location.pathname === item.path || (item.children?.some(c => location.pathname.startsWith(c.path)) ?? false)
                      ? 'text-navy bg-navy/5'
                      : 'text-slate-600 hover:text-navy hover:bg-slate-50'
                  }`}
                >
                  {item.icon && <item.icon className="w-3.5 h-3.5" />}
                  <span>{isAr ? item.labelAr : (t(item.label, item.label))}</span>
                  {item.children && <ChevronDown className="w-3 h-3" />}
                </Link>

                {/* Dropdown */}
                {item.children && openDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-600 hover:text-navy hover:bg-slate-50 transition-colors"
                      >
                        <child.icon className="w-4 h-4 text-slate-400" />
                        <span>{isAr ? child.labelAr : child.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <CartButton />

            {/* CTA Button */}
            <Link
              to="/contact"
              className="hidden md:flex items-center gap-1.5 px-4 py-2 bg-emerald text-white rounded-full text-xs font-semibold hover:bg-emerald-dark transition-colors shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              {isAr ? 'احجز استشارة' : 'Book Consultation'}
            </Link>

            {/* Language - shows current language, click to toggle */}
            <button
              onClick={handleToggleLang}
              className={`flex items-center gap-1 px-2.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
                isAr
                  ? 'text-emerald bg-emerald/10 hover:bg-emerald/20'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
              title={isAr ? 'Click to switch to English' : 'Click to switch to Arabic / انقر للتبديل إلى العربية'}
            >
              <Globe className="w-4 h-4" />
              <span>{isAr ? 'AR' : 'EN'}</span>
            </button>

            {/* Mobile menu */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-50">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <div key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium ${
                    location.pathname === item.path ? 'text-navy bg-navy/5' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  {isAr ? item.labelAr : (t(item.label, item.label))}
                </Link>
                {item.children && (
                  <div className="ml-6 space-y-0.5">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-500 hover:text-navy hover:bg-slate-50"
                      >
                        <child.icon className="w-3.5 h-3.5" />
                        {isAr ? child.labelAr : child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              to="/contact"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-emerald text-white rounded-xl text-sm font-semibold mt-3"
            >
              <Phone className="w-4 h-4" />
              {isAr ? 'احجز استشارة مجانية' : 'Book Free Consultation'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
