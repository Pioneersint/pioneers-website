import { useState, useEffect } from 'react';
import { MessageSquare, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsVisible(false);
        return;
      }
      const scrolled = window.scrollY > 400;
      setIsVisible(scrolled);
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check, { passive: true });
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, []);

  if (!isMobile || !isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3 flex items-center gap-3 md:hidden">
      <a
        href="tel:+962781595846"
        className="flex items-center justify-center gap-2 px-4 py-3 bg-navy text-white rounded-full font-semibold text-sm flex-1 active:scale-[0.98] transition-transform"
      >
        <Phone className="w-4 h-4" />
        Call Now
      </a>
      <Link
        to="/contact"
        className="flex items-center justify-center gap-2 px-4 py-3 bg-emerald text-white rounded-full font-semibold text-sm flex-1 active:scale-[0.98] transition-transform"
      >
        <MessageSquare className="w-4 h-4" />
        Book Free Consultation
      </Link>
    </div>
  );
}
