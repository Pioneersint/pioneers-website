import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Building2, ArrowLeft, Check, Lock, Globe, ShieldCheck, ShoppingCart, Loader2, AlertCircle, FileText, GraduationCap, Trash2 } from 'lucide-react';
import { pdfMaterials } from '@/pages/PDFStore';
import { useCart } from '@/hooks/useCart';
import { allCoursesData } from '@/pages/LMS';
import { isValidEmail, getEmailError, getPhoneError, getNameError } from '@/lib/validation';
import CountryDropdown from '@/components/shared/CountryDropdown';
import OTPVerification from '@/components/shared/OTPVerification';
import { trpc } from '@/providers/trpc';

interface CheckoutState {
  items?: string[];
  bundle?: string;
  type?: string;
  amount?: number;
  event?: string;
  eventTitle?: string;
  plan?: string;
  period?: string;
  description?: string;
}

function useCheckoutState(): CheckoutState {
  const location = useLocation();
  const navState = (location.state as CheckoutState) || {};
  const params = new URLSearchParams(location.search);
  const queryState: CheckoutState = {};

  if (params.get('type')) queryState.type = params.get('type') || undefined;
  if (params.get('amount')) queryState.amount = Number(params.get('amount')) || undefined;
  if (params.get('plan')) queryState.plan = params.get('plan') || undefined;
  if (params.get('period')) queryState.period = params.get('period') || undefined;
  if (params.get('bundle')) queryState.bundle = params.get('bundle') || undefined;
  if (params.get('event')) queryState.event = params.get('event') || undefined;
  if (params.get('eventTitle')) queryState.eventTitle = params.get('eventTitle') || undefined;
  if (params.get('description')) queryState.description = params.get('description') || undefined;
  const itemsParam = params.get('items');
  if (itemsParam) queryState.items = itemsParam.split(',').filter(Boolean);

  return { ...queryState, ...navState };
}

// ── Field error type ──
type FieldErrors = {
  name?: string;
  email?: string;
  emailVerified?: string;
  phone?: string;
  country?: string;
  paymentMethod?: string;
};

export default function Checkout() {
  const navigate = useNavigate();
  const state = useCheckoutState();
  const { items, removeItem, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'paytabs' | 'paypal' | 'bank' | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', country: '', company: '' });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const bankDetails = {
    currency: 'USD', accountType: 'Current Account',
    companyName: 'Pioneers International Thought for Business Consulting',
    bankName: 'Safwa Islamic Bank', bankAddress: 'Amman-Jordan, Jabal Amman branch',
    swiftCode: 'JDIBJOAMXXX', accountNumber: '403619',
    iban: 'JO17 JDIB 2020 0040 3619 0023 0000 00',
  };

  // ── Validate all fields ──
  const validateAll = (): boolean => {
    const newErrors: FieldErrors = {};
    newErrors.name = getNameError(formData.name);
    newErrors.email = getEmailError(formData.email);
    if (!emailVerified && formData.email && isValidEmail(formData.email)) {
      newErrors.emailVerified = 'Please verify your email with the OTP code before proceeding.';
    }
    newErrors.phone = getPhoneError(formData.phone);
    newErrors.country = !formData.country ? 'Please select your country' : '';
    if (!paymentMethod) newErrors.paymentMethod = 'Please select a payment method';

    // Remove empty errors
    (Object.keys(newErrors) as Array<keyof FieldErrors>).forEach(k => {
      if (!newErrors[k]) delete newErrors[k];
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── Live validation ──
  const validateField = (field: string, value: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(prev => {
      const next = { ...prev };
      switch (field) {
        case 'name':
          next.name = getNameError(value) || undefined;
          break;
        case 'email':
          next.email = getEmailError(value) || undefined;
          if (emailVerified) next.emailVerified = undefined;
          break;
        case 'phone':
          next.phone = getPhoneError(value) || undefined;
          break;
        case 'country':
          next.country = !value ? 'Please select your country' : undefined;
          break;
      }
      if (!next[field as keyof FieldErrors]) delete next[field as keyof FieldErrors];
      return next;
    });
  };

  // ── Calculate total ──
  const { totalAmount, orderItems, orderDescription } = useMemo(() => {
    if (items.length > 0 && !state.type && !state.bundle && !state.items) {
      const cartTotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      return {
        totalAmount: cartTotal,
        orderItems: items.map(i => ({ name: i.title, detail: i.type === 'course' ? (allCoursesData.find(c => c.id === i.id)?.instructor || 'Online Course') : 'Product', price: i.price * i.quantity })),
        orderDescription: `Cart (${items.length} items)`,
      };
    }
    if (state.bundle === 'complete') {
      return { totalAmount: 999, orderItems: [{ name: 'Complete Lead Auditor Bundle', detail: '16 PDFs + 16 PPTs (EN + AR)', price: 999 }], orderDescription: 'Complete Lead Auditor Bundle (16 PDFs + 16 PPTs)' };
    }
    if (state.type === 'training' && state.amount) {
      return { totalAmount: state.amount, orderItems: [{ name: state.eventTitle || 'Lead Auditor Training Course', detail: `Event #${state.event || 'N/A'}`, price: state.amount }], orderDescription: `Lead Auditor Training Course - ${state.eventTitle || 'Training Event'}` };
    }
    if (state.items && state.items.length > 0) {
      const matItems = state.items.map((id: string) => pdfMaterials.find(m => m.id === id)).filter(Boolean) as typeof pdfMaterials;
      const total = matItems.reduce((sum, item) => sum + (item.discountPrice || item.price), 0);
      return { totalAmount: Math.round(total * 100) / 100, orderItems: matItems.map(item => ({ name: item.title, detail: `${item.standardShort} | ${item.pages} pages | ${item.language === 'ar' ? 'Arabic' : 'English'}`, price: item.discountPrice || item.price })), orderDescription: `Training Materials (${matItems.length} items)` };
    }
    return { totalAmount: 0, orderItems: [] as { name: string; detail: string; price: number }[], orderDescription: 'Pioneers International Order' };
  }, [state, items]);

  // ── tRPC mutation for PayTabs ──
  const paytabsMutation = trpc.paytabs.createPayment.useMutation({
    onSuccess: (data) => {
      clearCart();
      localStorage.setItem('pendingOrder', JSON.stringify({ cartId: data.tranRef, amount: totalAmount, method: 'paytabs', items: orderItems.map(i => i.name), timestamp: Date.now() }));
      window.location.href = data.redirectUrl;
    },
    onError: (err) => {
      setLoading(false);
      setGeneralError(err.message || 'Could not connect to PayTabs payment gateway. Please try PayPal or Bank Transfer as an alternative.');
    },
  });

  // ── Handle PayTabs checkout ──
  const handlePayTabsCheckout = async () => {
    if (!validateAll()) return;
    if (totalAmount <= 0) { setGeneralError('Invalid order amount. Please return to the store and select items.'); return; }

    setLoading(true);
    setGeneralError('');

    const cartId = `PI-${Date.now()}`;
    const returnUrl = `${window.location.origin}/#/checkout/success`;

    paytabsMutation.mutate({
      amount: totalAmount,
      cartId,
      description: orderDescription,
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      customerCountry: formData.country || 'JO',
      returnUrl,
    });
  };

  // ── PayPal ──
  const handlePayPalCheckout = () => {
    if (!validateAll()) return;
    const paypalUrl = `https://www.paypal.com/paypalme/pioneersint/${totalAmount}USD`;
    window.open(paypalUrl, '_blank');
    clearCart();
    setSubmitted(true);
  };

  // ── Bank Transfer ──
  const handleBankTransfer = () => {
    if (!validateAll()) return;
    clearCart();
    setSubmitted(true);
  };

  // ── Success state ──
  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl border border-slate-200 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-light flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-emerald" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Order Received!</h2>
          <p className="text-slate-600 mb-6">
            {paymentMethod === 'paytabs' ? 'You will be redirected to PayTabs secure payment page. After completing payment, you will receive an email with download instructions within 24 hours.'
              : paymentMethod === 'paypal' ? 'Thank you for your PayPal payment. You will receive an email with download instructions within 24 hours.'
              : 'Thank you for your order. Please complete the bank transfer and send the receipt to info@pioneersint.com. You will receive your materials within 24 hours of confirmation.'}
          </p>
          {paymentMethod === 'bank' && (
            <div className="bg-slate-50 rounded-xl p-4 text-left mb-6 text-sm">
              <p className="font-semibold text-slate-800 mb-2">Bank Transfer Details:</p>
              <div className="space-y-1 text-slate-600">
                <p><span className="font-medium">Bank:</span> {bankDetails.bankName}</p>
                <p><span className="font-medium">IBAN:</span> {bankDetails.iban}</p>
                <p><span className="font-medium">SWIFT:</span> {bankDetails.swiftCode}</p>
                <p><span className="font-medium">Account #:</span> {bankDetails.accountNumber}</p>
              </div>
            </div>
          )}
          <button onClick={() => navigate('/store')} className="w-full py-3 bg-navy text-white rounded-xl font-medium hover:bg-navy-light transition-colors">Back to Store</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-slate-500 hover:text-emerald transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <img src="/assets/images/logo.png" alt="Pioneers" className="h-8 w-auto" />
            <h1 className="font-semibold text-slate-800">Checkout</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Main Form */}
          <div className="md:col-span-3 space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-emerald" /> Contact Information
              </h2>
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                  <input value={formData.name}
                    onChange={e => { setFormData({ ...formData, name: e.target.value }); validateField('name', e.target.value); setGeneralError(''); }}
                    onBlur={e => validateField('name', e.target.value)}
                    className={`w-full h-11 px-4 bg-slate-50 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald/30 transition-all ${errors.name && touched.name ? 'border-red-300 bg-red-50' : 'border-slate-200'}`}
                    placeholder="Your full name" />
                  {errors.name && touched.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email <span className="text-red-500">*</span></label>
                  <input type="email" value={formData.email}
                    onChange={e => { setFormData({ ...formData, email: e.target.value }); setEmailVerified(false); validateField('email', e.target.value); setGeneralError(''); }}
                    onBlur={e => validateField('email', e.target.value)}
                    className={`w-full h-11 px-4 bg-slate-50 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald/30 transition-all ${errors.email && touched.email ? 'border-red-300 bg-red-50' : 'border-slate-200'}`}
                    placeholder="your@email.com" />
                  {errors.email && touched.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                {/* OTP Verification */}
                {formData.email && isValidEmail(formData.email) && !emailVerified && (
                  <OTPVerification email={formData.email} onVerified={setEmailVerified} isVerified={emailVerified} />
                )}
                {emailVerified && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-emerald text-sm">
                    <Check className="w-4 h-4" /> Email verified successfully
                  </motion.div>
                )}

                {/* Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone <span className="text-red-500">*</span></label>
                    <input type="tel" value={formData.phone}
                      onChange={e => { setFormData({ ...formData, phone: e.target.value }); validateField('phone', e.target.value); setGeneralError(''); }}
                      onBlur={e => validateField('phone', e.target.value)}
                      className={`w-full h-11 px-4 bg-slate-50 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald/30 transition-all ${errors.phone && touched.phone ? 'border-red-300 bg-red-50' : 'border-slate-200'}`}
                      placeholder="+962 7X XXX XXXX" />
                    {errors.phone && touched.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                  </div>

                  {/* Country Dropdown */}
                  <CountryDropdown value={formData.country}
                    onChange={(val) => { setFormData({ ...formData, country: val }); validateField('country', val); setGeneralError(''); }}
                    error={touched.country ? errors.country : ''} required />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Company (Optional)</label>
                  <input value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })}
                    className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald/30"
                    placeholder="Your company name" />
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald" /> Payment Method
              </h2>
              <div className="space-y-3">
                {/* PayTabs */}
                <button onClick={() => { setPaymentMethod('paytabs'); setGeneralError(''); setErrors(prev => { const n = { ...prev }; delete n.paymentMethod; return n; }); }}
                  className={`w-full flex items-center gap-4 p-4 border-2 rounded-xl text-left transition-all ${paymentMethod === 'paytabs' ? 'border-emerald bg-emerald-light' : 'border-slate-200 hover:border-slate-300'}`}>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#003087] to-[#009CDE] flex items-center justify-center shrink-0">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800">MEPS / PayTabs <span className="text-xs bg-emerald text-white px-2 py-0.5 rounded-full ml-2">RECOMMENDED</span></p>
                    <p className="text-xs text-slate-500">Secure card payment (Visa, Mastercard, Mada). PCI DSS certified.</p>
                  </div>
                  {paymentMethod === 'paytabs' && <Check className="w-5 h-5 text-emerald" />}
                </button>

                {/* PayPal */}
                <button onClick={() => { setPaymentMethod('paypal'); setGeneralError(''); setErrors(prev => { const n = { ...prev }; delete n.paymentMethod; return n; }); }}
                  className={`w-full flex items-center gap-4 p-4 border-2 rounded-xl text-left transition-all ${paymentMethod === 'paypal' ? 'border-emerald bg-emerald-light' : 'border-slate-200 hover:border-slate-300'}`}>
                  <div className="w-12 h-12 rounded-lg bg-[#003087] flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-sm">Pay<span className="text-[#009CDE]">Pal</span></span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800">PayPal</p>
                    <p className="text-xs text-slate-500">International payments. Account: info@pioneersint.com</p>
                  </div>
                  {paymentMethod === 'paypal' && <Check className="w-5 h-5 text-emerald" />}
                </button>

                {/* Bank */}
                <button onClick={() => { setPaymentMethod('bank'); setGeneralError(''); setErrors(prev => { const n = { ...prev }; delete n.paymentMethod; return n; }); }}
                  className={`w-full flex items-center gap-4 p-4 border-2 rounded-xl text-left transition-all ${paymentMethod === 'bank' ? 'border-emerald bg-emerald-light' : 'border-slate-200 hover:border-slate-300'}`}>
                  <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    <Building2 className="w-6 h-6 text-slate-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800">Bank Transfer</p>
                    <p className="text-xs text-slate-500">Safwa Islamic Bank, Amman, Jordan. 2-3 business days.</p>
                  </div>
                  {paymentMethod === 'bank' && <Check className="w-5 h-5 text-emerald" />}
                </button>
              </div>

              {errors.paymentMethod && (
                <p className="text-xs text-red-500 mt-2 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.paymentMethod}</p>
              )}

              {/* General Error */}
              <AnimatePresence>
                {generalError && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-600">{generalError}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bank Details */}
              {paymentMethod === 'bank' && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 bg-navy rounded-xl p-6 text-white">
                  <h3 className="font-semibold mb-4 flex items-center gap-2"><Building2 className="w-5 h-5" /> Bank Transfer Details</h3>
                  <div className="space-y-3 text-sm font-mono">
                    {Object.entries({ Currency: bankDetails.currency, 'Account Type': bankDetails.accountType, Company: bankDetails.companyName, Bank: bankDetails.bankName, SWIFT: bankDetails.swiftCode, 'Account #': bankDetails.accountNumber, IBAN: bankDetails.iban }).map(([k, v]) => (
                      <div key={k} className="flex justify-between border-b border-white/10 pb-2 last:border-0">
                        <span className="text-slate-300">{k}</span><span className="font-medium">{v}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* PayTabs Action */}
              {paymentMethod === 'paytabs' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
                  <div className="bg-blue-50 rounded-xl p-4 mb-4 border border-blue-100">
                    <p className="text-sm text-slate-600 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                      You will be redirected to PayTabs secure checkout page.
                    </p>
                  </div>
                  <button onClick={handlePayTabsCheckout} disabled={loading}
                    className="w-full py-3.5 bg-gradient-to-r from-[#003087] to-[#009CDE] text-white rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50">
                    {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</> : <><CreditCard className="w-5 h-5" /> Pay ${totalAmount} with MEPS</>}
                  </button>
                </motion.div>
              )}

              {/* PayPal Action */}
              {paymentMethod === 'paypal' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
                  <button onClick={handlePayPalCheckout}
                    className="w-full py-3.5 bg-[#003087] text-white rounded-xl font-semibold hover:bg-[#002266] transition-colors flex items-center justify-center gap-2">
                    <Globe className="w-5 h-5" /> Pay ${totalAmount} with PayPal
                  </button>
                </motion.div>
              )}

              {/* Bank Action */}
              {paymentMethod === 'bank' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
                  <button onClick={handleBankTransfer}
                    className="w-full py-3.5 bg-emerald text-white rounded-xl font-semibold hover:bg-emerald-dark transition-colors flex items-center justify-center gap-2">
                    <Lock className="w-5 h-5" /> Confirm Bank Transfer Order
                  </button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl border border-slate-200 p-6 sticky top-6">
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-emerald" /> Order Summary
              </h3>
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {orderItems.length > 0 ? orderItems.map((item, i) => (
                  <div key={i} className="flex items-start justify-between py-2 border-b border-slate-100 group">
                    <div className="flex items-start gap-2 flex-1 min-w-0">
                      {state.type === 'training' ? <GraduationCap className="w-4 h-4 text-emerald mt-0.5 shrink-0" /> : <FileText className="w-4 h-4 text-emerald mt-0.5 shrink-0" />}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-700 truncate">{item.name}</p>
                        <p className="text-xs text-slate-400">{item.detail}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span className="font-semibold text-slate-800">${item.price}</span>
                      {items.length > 0 && !state.type && !state.bundle && !state.items && (
                        <button onClick={() => { const c = items[i]; if (c) removeItem(c.id); }} className="p-1 rounded hover:bg-red-50 text-slate-300 hover:text-red-500 transition-colors" title="Remove"><Trash2 className="w-3 h-3" /></button>
                      )}
                    </div>
                  </div>
                )) : (
                  <div className="text-sm text-red-500 py-2 border-b border-slate-100 flex items-center gap-2"><AlertCircle className="w-4 h-4" /> No items selected. Return to store.</div>
                )}
                <div className="flex items-center justify-between py-2"><span className="text-sm text-slate-500">Subtotal</span><span className="font-medium text-slate-700">${totalAmount.toFixed(2)}</span></div>
                <div className="flex items-center justify-between py-2"><span className="text-sm text-slate-500">Processing Fee</span><span className="font-medium text-emerald">FREE</span></div>
                <div className="flex items-center justify-between py-3 border-t border-slate-200"><span className="font-semibold text-slate-800">Total (USD)</span><span className="text-2xl font-bold text-emerald">${totalAmount.toFixed(2)}</span></div>
                {items.length > 0 && !state.type && !state.bundle && !state.items && (
                  <button onClick={clearCart} className="w-full text-center text-xs text-red-500 hover:text-red-600 py-1 transition-colors">Clear Cart</button>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-500"><ShieldCheck className="w-4 h-4 text-emerald" /> PCI DSS Level 1 Certified</div>
                <div className="flex items-center gap-2 text-xs text-slate-500"><Lock className="w-4 h-4 text-emerald" /> 256-bit SSL Encryption</div>
                <div className="flex items-center gap-2 text-xs text-slate-500"><Globe className="w-4 h-4 text-emerald" /> 3D Secure Authentication</div>
                <div className="flex items-center gap-2 text-xs text-slate-500"><CreditCard className="w-4 h-4 text-emerald" /> 24-hour Delivery</div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-center gap-3">
                <div className="text-center">
                  <div className="text-xs text-slate-400 mb-1">Powered by</div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-gradient-to-br from-[#003087] to-[#009CDE] flex items-center justify-center"><CreditCard className="w-4 h-4 text-white" /></div>
                    <span className="text-sm font-semibold text-[#003087]">PayTabs</span>
                  </div>
                </div>
                <div className="w-px h-8 bg-slate-200" />
                <div className="text-center">
                  <div className="text-xs text-slate-400 mb-1">Bank</div>
                  <div className="text-sm font-semibold text-slate-700">Safwa Islamic</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
