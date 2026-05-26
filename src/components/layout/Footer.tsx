import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Linkedin, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/pioneers-international-thought-for-business-consulting', label: 'LinkedIn', target: '_blank' },
    { icon: Facebook, href: 'https://www.facebook.com/share/15qktAZ7QgM/', label: 'Facebook', target: '_blank' },
    { icon: Instagram, href: 'https://www.instagram.com/p/C0ZDZW4MEtf/', label: 'Instagram', target: '_blank' },
  ];

  const serviceLinks = t('footer.services.links', { returnObjects: true }) as string[];
  const companyLinks = t('footer.company.links', { returnObjects: true }) as string[];

  return (
    <footer className="bg-navy text-white">
      <div className="content-container pt-20 pb-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="text-xl font-bold text-white">
                PIONEERS<span className="text-emerald">.</span>
              </span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-slate-600 flex items-center justify-center text-white/70 hover:bg-emerald hover:border-emerald hover:text-white transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.services.title')}</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link}>
                  <Link
                    to="/services"
                    className="text-slate-300 text-sm hover:text-emerald transition-colors duration-150"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.company.title')}</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link}>
                  <Link
                    to={link === 'About Us' ? '/about' : link === 'Insights' ? '/insights' : '#'}
                    className="text-slate-300 text-sm hover:text-emerald transition-colors duration-150"
                  >
                    {link}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/payment-policy" className="text-slate-300 text-sm hover:text-emerald transition-colors duration-150">
                  Payment Policy
                </Link>
              </li>
              <li>
                <Link to="/meps-integration" className="text-slate-300 text-sm hover:text-emerald transition-colors duration-150">
                  MEPS Integration
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.contact.title')}</h4>
            <div className="space-y-3 text-sm text-slate-300">
              <p>{t('footer.contact.address')}</p>
              <p>{t('footer.contact.phone')}</p>
              <p>{t('footer.contact.email')}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            {t('footer.copyright')}
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="#" className="text-slate-400 hover:text-emerald transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link to="#" className="text-slate-400 hover:text-emerald transition-colors">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
