import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { CartProvider } from '@/hooks/useCart';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEO, { organizationSchema, serviceSchema } from '@/components/SEO';
import WhatsAppButton from '@/components/WhatsAppButton';
import { getSubdomainType } from '@/lib/subdomain';
import ChatbotAI from '@/components/ChatbotAI';
import StickyMobileCTA from '@/components/StickyMobileCTA';

// Public pages
import Home from '@/pages/Home';
import About from '@/pages/About';
import Services from '@/pages/Services';
import CertificateVerify from '@/pages/CertificateVerify';
import Insights from '@/pages/Insights';
import Contact from '@/pages/Contact';
import Blog from '@/pages/Blog';
import LMS from '@/pages/LMS';
import CourseDetail from '@/pages/CourseDetail';
import LMSSubscription from '@/pages/LMSSubscription';
import PDFStore from '@/pages/PDFStore';
import Checkout from '@/pages/Checkout';
import PaymentPolicy from '@/pages/PaymentPolicy';
import PayTabsIntegration from '@/pages/PayTabsIntegration';
import CheckoutSuccess from '@/pages/CheckoutSuccess';
import GapAnalysis from '@/pages/GapAnalysis';
import TrainingCalendar from '@/pages/TrainingCalendar';
import ClientPortal from '@/pages/ClientPortal';
import Gallery from '@/pages/Gallery';
import Careers from '@/pages/Careers';
import BrandIndex from '@/pages/BrandIndex';
import CompanyProfile from '@/pages/CompanyProfile';
import Sectors from '@/pages/Sectors';
import SectorDetail from '@/pages/SectorDetail';
import CaseStudies from '@/pages/CaseStudies';
import ThoughtLeadership from '@/pages/ThoughtLeadership';
import NotFound from '@/pages/NotFound';
import Login from '@/pages/Login';
import Register from '@/pages/Register';

// Client Dashboard
import Dashboard from '@/pages/Dashboard';
import DashboardCourses from '@/pages/DashboardCourses';
import DashboardAI from '@/pages/DashboardAI';
import DashboardCertificates from '@/pages/DashboardCertificates';
import DashboardBilling from '@/pages/DashboardBilling';
import DashboardSettings from '@/pages/DashboardSettings';

// Admin Dashboard
import AdminLogin from '@/pages/AdminLogin';
import AdminDashboard from '@/pages/AdminDashboard';
import AdminArticles from '@/pages/AdminArticles';
import AdminUsers from '@/pages/AdminUsers';
import AdminCertificates from '@/pages/AdminCertificates';
import AdminCourses from '@/pages/AdminCourses';

// Subdomain sites
import NJPIMacsSite from '@/pages/subdomains/NJPIMacsSite';
import ConsultingSite from '@/pages/subdomains/ConsultingSite';
import HCCSSite from '@/pages/subdomains/HCCSSite';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SEO schema={organizationSchema} />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}

function SubdomainRouter() {
  const subdomain = getSubdomainType();

  if (subdomain === 'njpi-macs') return <NJPIMacsSite />;
  if (subdomain === 'consulting') return <ConsultingSite />;
  if (subdomain === 'hccs') return <HCCSSite />;

  return null; // Not a subdomain, render main site
}

export default function App() {
  const [subdomain, setSubdomain] = useState<string | null>(null);

  useEffect(() => {
    setSubdomain(getSubdomainType());
  }, []);

  // If we're on a subdomain, render the subdomain site directly
  if (subdomain) {
    return (
      <LanguageProvider>
        <AuthProvider>
          <CartProvider>
            <SubdomainRouter />
          </CartProvider>
        </AuthProvider>
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
        <ScrollToTop />
        <WhatsAppButton />
        <ChatbotAI />
        <StickyMobileCTA />
        <Routes>
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/company-profile" element={<PublicLayout><CompanyProfile /></PublicLayout>} />
          <Route path="/services" element={<><SEO title="Our Services | Pioneers International" description="Comprehensive consulting solutions in ISO certification, ESG advisory, corporate governance, and business transformation across the MENA region." schema={serviceSchema} /><PublicLayout><Services /></PublicLayout></>} />
          <Route path="/verify-certificate" element={<PublicLayout><CertificateVerify /></PublicLayout>} />
          <Route path="/insights" element={<PublicLayout><Insights /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
          <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
          <Route path="/lms" element={<PublicLayout><LMS /></PublicLayout>} />
          <Route path="/lms/course/:courseId" element={<PublicLayout><CourseDetail /></PublicLayout>} />
          <Route path="/lms/subscription" element={<PublicLayout><LMSSubscription /></PublicLayout>} />
          <Route path="/store" element={<PublicLayout><PDFStore /></PublicLayout>} />
          <Route path="/checkout" element={<PublicLayout><Checkout /></PublicLayout>} />
          <Route path="/payment-policy" element={<PublicLayout><PaymentPolicy /></PublicLayout>} />
          <Route path="/meps-integration" element={<PublicLayout><PayTabsIntegration /></PublicLayout>} />
          <Route path="/checkout/success" element={<PublicLayout><CheckoutSuccess /></PublicLayout>} />
          <Route path="/gap-analysis" element={<PublicLayout><GapAnalysis /></PublicLayout>} />
          <Route path="/training-calendar" element={<PublicLayout><TrainingCalendar /></PublicLayout>} />
          <Route path="/client-portal" element={<PublicLayout><ClientPortal /></PublicLayout>} />
          <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
          <Route path="/careers" element={<PublicLayout><Careers /></PublicLayout>} />
          <Route path="/brand-index" element={<PublicLayout><BrandIndex /></PublicLayout>} />
          <Route path="/sectors" element={<PublicLayout><Sectors /></PublicLayout>} />
          <Route path="/sectors/:sectorId" element={<PublicLayout><SectorDetail /></PublicLayout>} />
          <Route path="/case-studies" element={<PublicLayout><CaseStudies /></PublicLayout>} />
          <Route path="/thought-leadership" element={<PublicLayout><ThoughtLeadership /></PublicLayout>} />
          <Route path="/login" element={<><SEO title="Sign In | Pioneers International" noindex /><Login /></>} />
          <Route path="/register" element={<><SEO title="Create Account | Pioneers International" noindex /><Register /></>} />
          <Route path="/dashboard" element={<><SEO title="Dashboard | Pioneers International" noindex /><Dashboard /></>} />
          <Route path="/dashboard/courses" element={<><SEO title="My Courses | Pioneers International" noindex /><DashboardCourses /></>} />
          <Route path="/dashboard/ai-agent" element={<><SEO title="AI Assistant | Pioneers International" noindex /><DashboardAI /></>} />
          <Route path="/dashboard/certificates" element={<><SEO title="My Certificates | Pioneers International" noindex /><DashboardCertificates /></>} />
          <Route path="/dashboard/billing" element={<><SEO title="Billing | Pioneers International" noindex /><DashboardBilling /></>} />
          <Route path="/dashboard/settings" element={<><SEO title="Settings | Pioneers International" noindex /><DashboardSettings /></>} />
          <Route path="/admin-login" element={<><SEO title="Admin Login | Pioneers International" noindex /><AdminLogin /></>} />
          <Route path="/admin" element={<><SEO title="Admin Dashboard | Pioneers International" noindex /><AdminDashboard /></>} />
          <Route path="/admin/users" element={<><SEO title="Users | Admin | Pioneers International" noindex /><AdminUsers /></>} />
          <Route path="/admin/articles" element={<><SEO title="Articles | Admin | Pioneers International" noindex /><AdminArticles /></>} />
          <Route path="/admin/courses" element={<><SEO title="Courses | Admin | Pioneers International" noindex /><AdminCourses /></>} />
          <Route path="/admin/certificates" element={<><SEO title="Certificates | Admin | Pioneers International" noindex /><AdminCertificates /></>} />
          <Route path="*" element={<><SEO title="Page Not Found | Pioneers International" noindex /><NotFound /></>} />
        </Routes>
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
