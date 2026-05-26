import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, ArrowRight, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-offwhite">
      <div className="max-w-lg w-full mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 404 Visual */}
          <div className="relative mb-8">
            <div className="text-[120px] sm:text-[160px] font-black text-navy/5 leading-none select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-[#C0392B]/10 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-10 h-10 text-[#C0392B]" />
              </div>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
            Page Not Found
          </h1>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">
            The page you are looking for does not exist or has been moved.
            Let us help you find what you need.
          </p>

          {/* Quick Links */}
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            <Link
              to="/"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald text-white rounded-xl font-semibold hover:bg-emerald-dark transition-all"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
            <Link
              to="/services"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-navy text-white rounded-xl font-semibold hover:bg-navy-light transition-all"
            >
              <Search className="w-4 h-4" />
              Our Services
            </Link>
          </div>

          <div className="border-t border-slate-200 pt-6">
            <p className="text-sm text-slate-400 mb-3">Popular destinations:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { label: 'ISO Services', path: '/services' },
                { label: 'Verify Certificate', path: '/verify-certificate' },
                { label: 'Contact Us', path: '/contact' },
                { label: 'Training LMS', path: '/lms' },
                { label: 'About Us', path: '/about' },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-sm text-slate-600 hover:border-emerald hover:text-emerald transition-all"
                >
                  {link.label} <ArrowRight className="w-3 h-3" />
                </Link>
              ))}
            </div>
          </div>

          <p className="text-xs text-slate-400 mt-8">
            Pioneers International — Executive Solutions for Institutional Excellence
          </p>
        </motion.div>
      </div>
    </div>
  );
}
