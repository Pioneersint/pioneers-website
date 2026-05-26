import { motion } from 'framer-motion';
import { CreditCard, Lock, Globe, ArrowLeft, AlertTriangle, CheckCircle, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function PayTabsIntegration() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const merchantEmail = 'ceo@pioneersint.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(merchantEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-slate-500 hover:text-emerald transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-semibold text-slate-800">MEPS / PayTabs Integration</h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12">

          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">MEPS Payment Gateway</h2>
            <p className="text-slate-500">Integration guide for PayTabs merchant account</p>
          </div>

          {/* Status */}
          <div className="bg-emerald-light border border-emerald/20 rounded-xl p-5 mb-8 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-emerald">Account Status: LIVE</p>
              <p className="text-sm text-slate-600 mt-1">
                Your MEPS/PayTabs merchant account is active and ready for integration. 
                Account email: <strong>{merchantEmail}</strong>
              </p>
            </div>
          </div>

          {/* Step 1 */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-navy text-white text-sm font-bold flex items-center justify-center">1</span>
              Access Merchant Dashboard
            </h3>
            <div className="bg-slate-50 rounded-xl p-5 space-y-3">
              <p className="text-slate-600">Login to your PayTabs merchant dashboard using your credentials:</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm font-mono text-slate-700">
                  {merchantEmail}
                </div>
                <button onClick={copyEmail}
                  className="px-4 py-2 bg-emerald text-white rounded-lg text-sm font-medium hover:bg-emerald-dark transition-colors flex items-center gap-2">
                  {copied ? <><CheckCircle className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy</>}
                </button>
              </div>
              <p className="text-sm text-slate-500">
                Dashboard URL: <a href="https://merchant.paytabs.com" target="_blank" rel="noopener noreferrer" className="text-emerald hover:underline">https://merchant.paytabs.com</a>
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-navy text-white text-sm font-bold flex items-center justify-center">2</span>
              Enable Two-Factor Authentication (2FA)
            </h3>
            <div className="bg-slate-50 rounded-xl p-5">
              <p className="text-slate-600 mb-3">Secure your merchant account by enabling 2FA:</p>
              <ol className="space-y-2 text-sm text-slate-600 list-decimal list-inside">
                <li>Login to your Merchant Dashboard</li>
                <li>Navigate to <strong>Account Settings → Security</strong></li>
                <li>Click <strong>Enable Two-Factor Authentication</strong></li>
                <li>Download Google Authenticator or Authy app</li>
                <li>Scan the QR code displayed on screen</li>
                <li>Enter the 6-digit verification code to confirm</li>
                <li>Save your backup codes in a secure location</li>
              </ol>
              <div className="mt-4 bg-amber-light border border-amber/20 rounded-lg p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber shrink-0 mt-0.5" />
                <p className="text-sm text-amber-dark">
                  <strong>Important:</strong> 2FA is mandatory for live merchant accounts processing real transactions. 
                  Never share your 2FA codes or backup codes with anyone.
                </p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-navy text-white text-sm font-bold flex items-center justify-center">3</span>
              Generate API Keys
            </h3>
            <div className="bg-slate-50 rounded-xl p-5">
              <p className="text-slate-600 mb-3">To integrate MEPS with your website, you need your Server Key and Profile ID:</p>
              <ol className="space-y-2 text-sm text-slate-600 list-decimal list-inside">
                <li>Go to <strong>Developers → API Keys</strong> in your dashboard</li>
                <li>Copy your <strong>Server Key</strong> (keep this secret - never expose in frontend code)</li>
                <li>Copy your <strong>Profile ID</strong></li>
                <li>Note your <strong>Region</strong> (e.g., ARE, JOR, SAU)</li>
              </ol>
              <div className="mt-4 bg-navy rounded-lg p-4 text-white text-sm font-mono">
                <p className="text-slate-300 text-xs mb-2">// Example configuration (to be added to your backend .env file)</p>
                <p>PAYTABS_PROFILE_ID=your_profile_id_here</p>
                <p>PAYTABS_SERVER_KEY=your_server_key_here</p>
                <p>PAYTABS_REGION=JOR</p>
                <p>PAYTABS_MERCHANT_EMAIL=ceo@pioneersint.com</p>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-navy text-white text-sm font-bold flex items-center justify-center">4</span>
              Integration Method
            </h3>
            <div className="bg-slate-50 rounded-xl p-5">
              <p className="text-slate-600 mb-3">Recommended integration methods for Pioneers International:</p>

              <div className="space-y-4">
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <p className="font-medium text-slate-800 mb-2">Option A: Hosted Payment Page (Recommended)</p>
                  <p className="text-sm text-slate-500 mb-2">Redirect customers to PayTabs secure checkout page. Easiest to implement and fully PCI compliant.</p>
                  <ul className="text-sm text-slate-600 list-disc list-inside space-y-1">
                    <li>No sensitive data touches your servers</li>
                    <li>Pre-built UI with mobile optimization</li>
                    <li>Supports all payment methods (Cards, Apple Pay, Google Pay, Mada, STC Pay)</li>
                  </ul>
                </div>

                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <p className="font-medium text-slate-800 mb-2">Option B: iFrame Integration</p>
                  <p className="text-sm text-slate-500 mb-2">Embed the payment form directly in your checkout page.</p>
                  <ul className="text-sm text-slate-600 list-disc list-inside space-y-1">
                    <li>Seamless user experience</li>
                    <li>Still PCI compliant (data never touches your server)</li>
                    <li>Customizable styling to match your brand</li>
                  </ul>
                </div>

                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <p className="font-medium text-slate-800 mb-2">Option C: Mobile SDK</p>
                  <p className="text-sm text-slate-500">For future mobile app development (iOS/Android native SDKs available).</p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-navy text-white text-sm font-bold flex items-center justify-center">5</span>
              Webhook Configuration
            </h3>
            <div className="bg-slate-50 rounded-xl p-5">
              <p className="text-slate-600 mb-3">Set up webhooks to receive real-time payment notifications:</p>
              <div className="bg-white border border-slate-200 rounded-lg p-4 font-mono text-sm text-slate-700">
                <p className="text-slate-500 text-xs mb-2">// Webhook endpoint (to be configured in your backend)</p>
                <p>POST https://your-domain.com/api/paytabs/webhook</p>
                <p className="mt-2 text-slate-500 text-xs">// Required webhook events:</p>
                <p>- payment.success</p>
                <p>- payment.failed</p>
                <p>- payment.cancelled</p>
                <p>- refund.processed</p>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
            <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
              <Globe className="w-5 h-5" /> Need Help?
            </h4>
            <div className="text-sm text-slate-600 space-y-2">
              <p><strong>PayTabs Support Portal:</strong> <a href="https://support.paytabs.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">support.paytabs.com</a></p>
              <p><strong>Integration Guide:</strong> <a href="https://support.paytabs.com/en/support/solutions/folders/60000485621" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">How to Integrate</a></p>
              <p><strong>FAQ:</strong> <a href="https://support.paytabs.com/en/support/solutions/folders/60000485630" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Troubleshooting</a></p>
              <p><strong>Email:</strong> support@paytabs.com</p>
            </div>
          </div>

          {/* Action */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500 mb-4">
              To complete the integration, please provide your <strong>Server Key</strong> and <strong>Profile ID</strong> 
              so we can configure the payment gateway on your website.
            </p>
            <div className="bg-amber-light border border-amber/20 rounded-lg p-4 inline-block text-left">
              <p className="text-sm text-amber-dark">
                <Lock className="w-4 h-4 inline mr-1" />
                <strong>Security Notice:</strong> Never share your Server Key or 2FA backup codes in unsecured channels. 
                Please send credentials through WhatsApp or encrypted email.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
