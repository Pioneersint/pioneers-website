import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, XCircle, SearchX, Download, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export type CertificateStatus = 'ACTIVE' | 'EXPIRED' | 'REVOKED' | 'NOT_FOUND';

interface CertificateData {
  certificateId: string;
  clientName: string;
  certificateType: string;
  issueDate: string;
  expiryDate?: string;
  referenceNumber?: string;
  status: CertificateStatus;
}

interface CertificateResultProps {
  data: CertificateData | null;
  status: CertificateStatus;
  onVerifyAnother: () => void;
}

export default function CertificateResult({ data, status, onVerifyAnother }: CertificateResultProps) {
  const { t } = useTranslation();

  const config = {
    ACTIVE: { color: 'text-emerald', badge: 'bg-emerald', icon: CheckCircle, statusLabel: t('certificate.status.active') },
    EXPIRED: { color: 'text-amber', badge: 'bg-amber', icon: AlertTriangle, statusLabel: t('certificate.status.expired') },
    REVOKED: { color: 'text-red-500', badge: 'bg-red-500', icon: XCircle, statusLabel: t('certificate.status.revoked') },
    NOT_FOUND: { color: 'text-slate-400', badge: 'bg-slate-200 text-slate-600', icon: SearchX, statusLabel: t('certificate.status.notFound') },
  }[status];

  const StatusIcon = config.icon;

  const borderColor = {
    ACTIVE: 'border-t-emerald',
    EXPIRED: 'border-t-amber',
    REVOKED: 'border-t-red-500',
    NOT_FOUND: 'border-t-slate-300',
  }[status];

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`bg-white rounded-2xl shadow-lg border-t-4 ${borderColor} p-8`}>
      {/* Status Header */}
      <div className="text-center mb-8">
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}
          className="inline-flex items-center gap-2 mb-3">
          <StatusIcon className={`w-8 h-8 ${config.color}`} />
          <span className={`${config.badge} text-white text-caption uppercase tracking-wider px-4 py-1.5 rounded-full font-medium`}>
            {config.statusLabel}
          </span>
        </motion.div>
        <p className="text-slate-500">
          {status === 'ACTIVE' ? 'This certificate is valid and active.' : status === 'EXPIRED' ? 'This certificate has expired.' : status === 'REVOKED' ? 'This certificate has been revoked.' : 'No certificate found with this ID.'}
        </p>
      </div>

      {/* Details Grid */}
      {status !== 'NOT_FOUND' && data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {[
            { label: t('certificate.resultLabels.certificateId'), value: data.certificateId },
            { label: t('certificate.resultLabels.holder'), value: data.clientName },
            { label: t('certificate.resultLabels.type'), value: data.certificateType },
            { label: t('certificate.resultLabels.issued'), value: data.issueDate },
            ...(data.expiryDate ? [{ label: t('certificate.resultLabels.expires'), value: data.expiryDate }] : []),
            ...(data.referenceNumber ? [{ label: t('certificate.resultLabels.reference'), value: data.referenceNumber }] : []),
            { label: t('certificate.resultLabels.statusLabel'), value: config.statusLabel },
          ].map((item, i) => (
            <motion.div key={item.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="border-b border-slate-100 pb-3">
              <span className="text-caption uppercase text-slate-400 block mb-1">{item.label}</span>
              <span className="text-slate-800 font-semibold">{item.value}</span>
            </motion.div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        {status === 'ACTIVE' && (
          <button className="flex items-center gap-2 px-5 py-2.5 border-2 border-navy text-navy rounded-full text-sm font-medium hover:bg-navy hover:text-white transition-all">
            <Download className="w-4 h-4" /> Download PDF
          </button>
        )}
        <button onClick={onVerifyAnother} className="flex items-center gap-2 text-emerald font-medium hover:underline text-sm">
          <RefreshCw className="w-4 h-4" /> {t('certificate.resultLabels.verifyAnother')}
        </button>
      </div>
    </motion.div>
  );
}
