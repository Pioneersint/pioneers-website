import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Search, ShieldCheck, Clock, Zap, BookOpen } from 'lucide-react';
import SEO from '@/components/SEO';
import { findCertificateById } from '@/lib/certificates/certificateDatabase';
import type { IssuedCertificate } from '@/lib/certificates/certificateDatabase';

export default function CertificateVerify() {
  const { t } = useTranslation();
  const [certId, setCertId] = useState('');
  const [result, setResult] = useState<IssuedCertificate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const handleVerify = () => {
    if (!certId.trim()) return;
    setLoading(true);
    setError(false);
    setResult(null);
    setShowImage(false);
    setTimeout(() => {
      const cert = findCertificateById(certId.trim());
      if (cert) {
        setResult(cert);
      } else {
        setError(true);
      }
      setLoading(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleVerify();
  };

  return (
    <div>
      <SEO title="Verify Certificate | Pioneers International"
        description="Instantly verify any ISO certification or training certificate issued by Pioneers International." />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center gradient-navy">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.1) 39px, rgba(255,255,255,0.1) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.1) 39px, rgba(255,255,255,0.1) 40px)` }} />
        <div className="relative z-10 content-container text-center px-4">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 rounded-full bg-emerald/20 flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-emerald" />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-h1 text-white">{t('certificate.heading')}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-body-lg text-slate-300 mt-4 max-w-xl mx-auto">{t('certificate.description')}</motion.p>

          {/* Search Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="max-w-xl mx-auto mt-8">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input type="text" value={certId} onChange={e => setCertId(e.target.value)} onKeyPress={handleKeyPress}
                placeholder={t('certificate.inputPlaceholder')}
                className="w-full h-14 pl-14 pr-36 bg-white/10 border border-white/20 rounded-full text-white placeholder:text-slate-400 focus:border-emerald focus:ring-2 focus:ring-emerald/20 outline-none backdrop-blur-sm" />
              <button onClick={handleVerify} disabled={loading}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-6 bg-emerald text-white rounded-full font-medium hover:bg-emerald-dark transition-colors disabled:opacity-50">
                {loading ? t('certificate.verifying') : t('certificate.verifyButton')}
              </button>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-6 mt-8 text-sm text-slate-400">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald" /> {t('certificate.trust1')}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-emerald" /> {t('certificate.trust2')}</span>
            <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-emerald" /> {t('certificate.trust3')}</span>
          </motion.div>
        </div>
      </section>

      {/* Result Section */}
      {result && (
        <section className="bg-white section-padding">
          <div className="content-container max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              className="bg-emerald-light border-2 border-emerald rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-emerald flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-emerald">Certificate Verified - Active</h3>
                  <p className="text-sm text-slate-600">This certificate is authentic and valid.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="border-b border-emerald/20 pb-3">
                  <span className="text-caption uppercase text-slate-500 block mb-1">{t('certificate.resultLabels.certificateId')}</span>
                  <span className="text-slate-800 font-bold">#{result.certificateId}</span>
                </div>
                <div className="border-b border-emerald/20 pb-3">
                  <span className="text-caption uppercase text-slate-500 block mb-1">{t('certificate.resultLabels.holder')}</span>
                  <span className="text-slate-800 font-semibold">{result.holderName}</span>
                </div>
                <div className="border-b border-emerald/20 pb-3">
                  <span className="text-caption uppercase text-slate-500 block mb-1">{t('certificate.resultLabels.type')}</span>
                  <span className="text-slate-800 font-semibold">{result.title}</span>
                </div>
                <div className="border-b border-emerald/20 pb-3">
                  <span className="text-caption uppercase text-slate-500 block mb-1">Standard</span>
                  <span className="text-slate-800 font-semibold">{result.standard}</span>
                </div>
                <div className="border-b border-emerald/20 pb-3">
                  <span className="text-caption uppercase text-slate-500 block mb-1">{t('certificate.resultLabels.issued')}</span>
                  <span className="text-slate-800 font-semibold">{result.issueDate}</span>
                </div>
                <div className="border-b border-emerald/20 pb-3">
                  <span className="text-caption uppercase text-slate-500 block mb-1">{t('certificate.resultLabels.expires')}</span>
                  <span className="text-slate-800 font-semibold">{result.expiryDate}</span>
                </div>
                <div className="border-b border-emerald/20 pb-3">
                  <span className="text-caption uppercase text-slate-500 block mb-1">Training Hours</span>
                  <span className="text-slate-800 font-semibold">{result.hours} Hours</span>
                </div>
                <div className="border-b border-emerald/20 pb-3">
                  <span className="text-caption uppercase text-slate-500 block mb-1">{t('certificate.resultLabels.statusLabel')}</span>
                  <span className="inline-flex items-center gap-1 bg-emerald text-white text-xs font-medium px-3 py-1 rounded-full">Active</span>
                </div>
              </div>

              {/* Certificate Image */}
              <button onClick={() => setShowImage(!showImage)}
                className="flex items-center gap-2 text-emerald font-medium hover:underline mb-4">
                <BookOpen className="w-4 h-4" /> {showImage ? 'Hide' : 'View'} Certificate Image
              </button>
              {showImage && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="overflow-hidden">
                  <img src={result.image} alt={`Certificate ${result.certificateId}`} className="w-full rounded-xl border border-emerald/20 shadow-lg" />
                </motion.div>
              )}

              <button onClick={() => { setResult(null); setCertId(''); setShowImage(false); }}
                className="mt-4 flex items-center gap-2 text-sm text-slate-500 hover:text-emerald transition-colors">
                {t('certificate.resultLabels.verifyAnother')}
              </button>
            </motion.div>
          </div>
        </section>
      )}

      {/* Error State */}
      {error && (
        <section className="bg-white section-padding">
          <div className="content-container max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="bg-red-light border-2 border-red/20 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-red/10 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-red" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Certificate Not Found</h3>
              <p className="text-slate-500 mb-4">No certificate was found with ID "{certId}". Please check the certificate number and try again.</p>
              <div className="bg-white rounded-xl p-4 text-left mb-4">
                <p className="text-sm font-medium text-slate-700 mb-2">Valid certificate ID formats:</p>
                <div className="flex flex-wrap gap-2">
                  {['ISOTQM002', 'ISOEMS002', 'ISOOHSM002', 'ISOFSM001', 'IMS-LA-003', 'ISOTQM009', 'ISOISMS001'].map(id => (
                    <button key={id} onClick={() => { setCertId(id); }}
                      className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full hover:bg-emerald-light hover:text-emerald transition-colors">{id}</button>
                  ))}
                </div>
              </div>
              <button onClick={() => { setError(false); setCertId(''); }}
                className="text-emerald font-medium hover:underline">{t('certificate.resultLabels.verifyAnother')}</button>
            </motion.div>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="bg-slate-50 section-padding">
        <div className="content-container">
          <div className="text-center mb-12">
            <span className="text-caption uppercase text-slate-500">{t('certificate.howItWorks')}</span>
            <h2 className="text-h2 text-slate-800 mt-2">{t('certificate.howTitle')}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {(t('certificate.steps', { returnObjects: true }) as unknown as { title: string; desc: string }[]).map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-emerald text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">{i + 1}</div>
                <h3 className="text-h4 text-slate-800 mb-2">{step.title}</h3>
                <p className="text-slate-600">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white section-padding">
        <div className="content-container max-w-3xl">
          <h2 className="text-h2 text-slate-800 text-center mb-12">{t('certificate.faq.title')}</h2>
          <div className="space-y-4">
            {Object.values(t('certificate.faq', { returnObjects: true }) as unknown as Record<string, { q: string; a: string }>).filter((v): v is { q: string; a: string } => typeof v === 'object' && v !== null && 'q' in v).map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="border border-slate-200 rounded-xl p-5">
                <h4 className="font-semibold text-slate-800 mb-2">{faq.q}</h4>
                <p className="text-slate-600 text-sm">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
