import { motion } from 'framer-motion';
import { CreditCard, ShieldCheck, RefreshCw, Lock, Globe, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PaymentPolicy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-slate-500 hover:text-emerald transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-semibold text-slate-800">Payment Policy & Terms</h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12">

          {/* Title */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-full bg-emerald-light flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-emerald" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Payment Policy</h2>
            <p className="text-slate-500">Pioneers International Thought for Business Consulting</p>
          </div>

          {/* Intro */}
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-600 leading-relaxed mb-8">
              At Pioneers International, we are committed to providing secure, transparent, and convenient payment options for all our consulting services, training programs, and digital products. This Payment Policy outlines the accepted payment methods, billing procedures, refund policy, and security measures implemented to protect our clients.
            </p>

            {/* Section 1 */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald" /> Accepted Payment Methods
              </h3>
              <div className="bg-slate-50 rounded-xl p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                    <span className="font-bold text-blue-600 text-sm">MEPS</span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">MEPS / PayTabs Payment Gateway</p>
                    <p className="text-sm text-slate-500">Secure online payment processing for all major credit and debit cards (Visa, Mastercard, American Express). Processed through our MEPS merchant account with full PCI DSS compliance.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#003087]/10 flex items-center justify-center shrink-0">
                    <span className="font-bold text-[#003087] text-xs">PayPal</span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">PayPal</p>
                    <p className="text-sm text-slate-500">International payments accepted through PayPal Business account (info@pioneersint.com). Supports all PayPal-supported currencies and buyer protection.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-emerald" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">Bank Transfer / Wire Transfer</p>
                    <p className="text-sm text-slate-500">Direct bank transfer to our corporate account at Safwa Islamic Bank, Jordan. Available for corporate clients and large transactions. Please allow 2-3 business days for processing.</p>
                    <div className="mt-2 bg-navy rounded-lg p-3 text-white text-sm font-mono">
                      <p><span className="text-slate-400">Bank:</span> Safwa Islamic Bank</p>
                      <p><span className="text-slate-400">Branch:</span> Jabal Amman, Amman-Jordan</p>
                      <p><span className="text-slate-400">Account:</span> 403619 (Current Account - USD)</p>
                      <p><span className="text-slate-400">SWIFT:</span> JDIBJOAMXXX</p>
                      <p><span className="text-slate-400">IBAN:</span> JO17 JDIB 2020 0040 3619 0023 0000 00</p>
                      <p><span className="text-slate-400">Company:</span> Pioneers International Thought for Business Consulting</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-amber/10 flex items-center justify-center shrink-0">
                    <Globe className="w-5 h-5 text-amber" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">Cash / In-Person Payment</p>
                    <p className="text-sm text-slate-500">Available at our office in Wadi Saqra, Kalbouneh Complex, Floor 4, Amman, Jordan. By appointment only.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-emerald" /> Security & Compliance
              </h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald shrink-0 mt-0.5" />
                  All online transactions are processed through MEPS (PayTabs) which is PCI DSS Level 1 certified.
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald shrink-0 mt-0.5" />
                  SSL/TLS 256-bit encryption is enforced across all payment pages and checkout processes.
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald shrink-0 mt-0.5" />
                  Two-Factor Authentication (2FA) is enabled on all merchant dashboards and admin accounts.
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald shrink-0 mt-0.5" />
                  Client payment data is never stored on our servers. All card details are tokenized by the payment gateway.
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald shrink-0 mt-0.5" />
                  Fraud detection and 3D Secure authentication are active for all card transactions.
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-emerald" /> Refund & Cancellation Policy
              </h3>
              <div className="space-y-4 text-slate-600">
                <div className="bg-emerald-light rounded-xl p-5 border border-emerald/20">
                  <p className="font-medium text-emerald mb-2">30-Day Money-Back Guarantee</p>
                  <p>For all digital training materials (PDF manuals, PowerPoint presentations), we offer a full refund within 30 days of purchase if you are not satisfied. The refund will be processed to the original payment method within 5-10 business days.</p>
                </div>
                <p><strong>Consulting Services:</strong> For consulting engagements, the refund policy is outlined in the signed Service Agreement. Typically, a 50% deposit is required to commence work, which is non-refundable after the project kickoff meeting.</p>
                <p><strong>Lead Auditor Training Courses:</strong> Course fees are refundable up to 7 days before the scheduled training date. Cancellations within 7 days are subject to a 25% administrative fee. No-shows are not eligible for refund but may reschedule once at no additional cost.</p>
                <p><strong>LMS Subscriptions:</strong> Monthly subscriptions can be cancelled at any time. The current billing period will not be refunded, but future billing will stop immediately. Annual subscriptions can be cancelled within 14 days of purchase for a full refund.</p>
              </div>
            </div>

            {/* Section 4 */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald" /> Billing & Invoicing
              </h3>
              <ul className="space-y-2 text-slate-600 list-disc list-inside">
                <li>All prices are listed in USD unless otherwise specified.</li>
                <li>Corporate clients may request invoicing with NET-15 or NET-30 terms subject to credit approval.</li>
                <li>VAT/GST is not applicable for services delivered outside Jordan. Jordan-based clients will be charged 16% VAT as per local regulations.</li>
                <li>Detailed invoices are sent to the registered email address within 24 hours of payment.</li>
                <li>Proforma invoices are available upon request for bank transfer payments.</li>
              </ul>
            </div>

            {/* Section 5 */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald" /> Dispute Resolution
              </h3>
              <p className="text-slate-600 leading-relaxed">
                In the event of a payment dispute or chargeback, we request that clients first contact our billing department at <strong>info@pioneersint.com</strong> or via WhatsApp <strong>+962 7 8159 5846</strong> to resolve the issue amicably. We aim to respond to all billing inquiries within 24 hours. If a chargeback is initiated without prior contact, we reserve the right to suspend access to digital products and services until the dispute is resolved.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-3">Billing Contact</h3>
              <div className="text-sm text-slate-600 space-y-1">
                <p><strong>Email:</strong> info@pioneersint.com / info@pioneersint.com</p>
                <p><strong>Phone:</strong> +962 7 8159 5846</p>
                <p><strong>Address:</strong> Wadi Saqra, Kalbouneh Complex, Floor 4, Amman, Jordan</p>
                <p><strong>Business Hours:</strong> Sunday - Thursday, 9:00 AM - 5:00 PM (GMT+3)</p>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-slate-400 mt-10 pt-6 border-t border-slate-200">
              <p>Last updated: May 18, 2026</p>
              <p>Pioneers International Thought for Business Consulting - All rights reserved</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
