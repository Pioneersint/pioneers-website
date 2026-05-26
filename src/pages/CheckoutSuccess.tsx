import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, AlertTriangle, ArrowLeft, Download, Clock, Mail, RefreshCw } from 'lucide-react';
import { parsePaymentResult } from '@/lib/paytabs';

export default function CheckoutSuccess() {
  const navigate = useNavigate();
  const [result, setResult] = useState<ReturnType<typeof parsePaymentResult>>({
    status: 'pending',
    tranRef: '',
    amount: 0,
    message: 'Verifying your payment...',
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const paymentResult = parsePaymentResult(searchParams);
    setResult(paymentResult);

    // Store transaction in localStorage
    if (paymentResult.tranRef) {
      const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
      transactions.push({
        tranRef: paymentResult.tranRef,
        amount: paymentResult.amount,
        status: paymentResult.status,
        date: new Date().toISOString(),
      });
      localStorage.setItem('transactions', JSON.stringify(transactions));
    }
  }, []);

  const statusConfig = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-emerald-light',
      borderColor: 'border-emerald',
      iconColor: 'text-emerald',
      title: 'Payment Successful!',
      buttonText: 'Download Your Materials',
      buttonAction: () => navigate('/store'),
    },
    pending: {
      icon: Clock,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconColor: 'text-blue-600',
      title: 'Payment Pending',
      buttonText: 'Check Status',
      buttonAction: () => window.location.reload(),
    },
    failed: {
      icon: XCircle,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      iconColor: 'text-red-500',
      title: 'Payment Failed',
      buttonText: 'Try Again',
      buttonAction: () => navigate('/checkout'),
    },
    cancelled: {
      icon: AlertTriangle,
      bgColor: 'bg-amber-light',
      borderColor: 'border-amber',
      iconColor: 'text-amber',
      title: 'Payment Cancelled',
      buttonText: 'Back to Checkout',
      buttonAction: () => navigate('/checkout'),
    },
  };

  const config = statusConfig[result.status];
  const StatusIcon = config.icon;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-slate-200 p-8 max-w-lg w-full text-center">
        {/* Status Icon */}
        <div className={`w-20 h-20 rounded-full ${config.bgColor} flex items-center justify-center mx-auto mb-6`}>
          <StatusIcon className={`w-10 h-10 ${config.iconColor}`} />
        </div>

        {/* Title */}
        <h2 className={`text-2xl font-bold mb-2 ${
          result.status === 'success' ? 'text-emerald' :
          result.status === 'pending' ? 'text-blue-600' :
          result.status === 'failed' ? 'text-red-500' : 'text-amber'
        }`}>
          {config.title}
        </h2>

        {/* Message */}
        <p className="text-slate-600 mb-4">{result.message}</p>

        {/* Transaction Details */}
        {result.tranRef && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className={`${config.bgColor} border ${config.borderColor} rounded-xl p-5 mb-6 text-left`}>
            <h4 className="font-semibold text-slate-800 mb-3">Transaction Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Transaction Reference</span>
                <span className="font-mono font-medium text-slate-700">{result.tranRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Amount</span>
                <span className="font-medium text-slate-700">${result.amount.toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status</span>
                <span className={`font-medium capitalize ${
                  result.status === 'success' ? 'text-emerald' :
                  result.status === 'pending' ? 'text-blue-600' :
                  result.status === 'failed' ? 'text-red-500' : 'text-amber'
                }`}>{result.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date</span>
                <span className="text-slate-700">{new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Gateway</span>
                <span className="text-slate-700">MEPS / PayTabs</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Next Steps */}
        {result.status === 'success' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="space-y-3 mb-6">
            <div className="flex items-center gap-3 bg-blue-50 rounded-lg p-3 text-left">
              <Mail className="w-5 h-5 text-blue-600 shrink-0" />
              <p className="text-sm text-slate-600">A confirmation email with download links has been sent to your email address.</p>
            </div>
            <div className="flex items-center gap-3 bg-amber-light rounded-lg p-3 text-left">
              <Download className="w-5 h-5 text-amber shrink-0" />
              <p className="text-sm text-slate-600">Your training materials (PDF + PPT) will be available within 24 hours with Pioneers International watermark.</p>
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button onClick={config.buttonAction}
            className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors ${
              result.status === 'success'
                ? 'bg-emerald text-white hover:bg-emerald-dark'
                : result.status === 'pending'
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-navy text-white hover:bg-navy-light'
            }`}>
            {result.status === 'success' && <Download className="w-5 h-5" />}
            {result.status === 'pending' && <RefreshCw className="w-5 h-5" />}
            {config.buttonText}
          </button>
          <button onClick={() => navigate('/store')}
            className="w-full py-3 border-2 border-slate-200 text-slate-600 rounded-xl font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Store
          </button>
        </div>

        {/* Support */}
        <div className="mt-6 pt-6 border-t border-slate-200 text-sm text-slate-500">
          <p>Need help? Contact us:</p>
          <p className="mt-1">
            <strong>Email:</strong> info@pioneersint.com |
            <strong> WhatsApp:</strong> +962 7 8159 5846
          </p>
        </div>
      </motion.div>
    </div>
  );
}
