import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Mail, Loader2, Check, AlertCircle, Send, Eye, EyeOff } from 'lucide-react';

interface OTPVerificationProps {
  email: string;
  onVerified: (verified: boolean) => void;
  isVerified: boolean;
}

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function simulateSendOTP(_email: string): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => {
      const otp = generateOTP();
      resolve(otp);
    }, 1500);
  });
}

export default function OTPVerification({ email, onVerified, isVerified }: OTPVerificationProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleSendOTP = async () => {
    setError('');
    setSending(true);
    setShowOtp(false);
    try {
      const otpCode = await simulateSendOTP(email);
      setGeneratedOTP(otpCode);
      setOtpSent(true);
      setTimer(60);
      setOtp(['', '', '', '', '', '']);
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
      // Auto-show OTP after 2 seconds for demo
      setTimeout(() => setShowOtp(true), 2000);
    } catch {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
    if (index === 5 && value) {
      verifyOtp([...newOtp.slice(0, 5), value].join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) inputRefs.current[index - 1]?.focus();
  };

  const verifyOtp = (fullOtp: string) => {
    setLoading(true);
    setTimeout(() => {
      if (fullOtp === generatedOTP) {
        setError('');
        onVerified(true);
      } else {
        setError('Invalid OTP. Please check and try again.');
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
      setLoading(false);
    }, 800);
  };

  const handleVerify = () => {
    const fullOtp = otp.join('');
    if (fullOtp.length !== 6) { setError('Please enter all 6 digits'); return; }
    verifyOtp(fullOtp);
  };

  if (isVerified) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
          <Check className="w-5 h-5 text-emerald" />
        </div>
        <div>
          <p className="text-sm font-semibold text-emerald-800">Email Verified</p>
          <p className="text-xs text-emerald-600">{email} has been successfully verified.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-3">
      {!otpSent ? (
        <button type="button" onClick={handleSendOTP} disabled={sending}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-navy/5 border border-navy/20 text-navy rounded-lg text-sm font-medium hover:bg-navy/10 transition-all disabled:opacity-50">
          {sending ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending verification code...</>
            : <><Mail className="w-4 h-4" /> Send Verification Code to {email}</>}
        </button>
      ) : (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
          {/* OTP Code Display - Demo Mode */}
          {showOtp && generatedOTP && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 text-center">
              <p className="text-xs text-amber-700 font-medium mb-1 uppercase tracking-wide">Your Verification Code</p>
              <div className="flex items-center justify-center gap-2">
                <p className="text-3xl font-bold text-amber-800 tracking-[0.3em] font-mono">{generatedOTP}</p>
                <button type="button" onClick={() => setShowOtp(!showOtp)} className="text-amber-500 hover:text-amber-700">
                  {showOtp ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[10px] text-amber-600 mt-1">Enter this code below to verify your email</p>
            </motion.div>
          )}

          {/* OTP Input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Enter 6-digit verification code</label>
            <div className="flex items-center gap-2 justify-center">
              {otp.map((digit, i) => (
                <input key={i} ref={el => { inputRefs.current[i] = el; }} type="text" inputMode="numeric" maxLength={1} value={digit}
                  onChange={e => handleOtpChange(i, e.target.value)} onKeyDown={e => handleKeyDown(i, e)}
                  className={`w-11 h-12 text-center text-lg font-bold border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    error ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-slate-200 focus:border-emerald focus:ring-emerald/20'
                  }`} />
              ))}
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-red-500 text-xs">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-3">
            <button type="button" onClick={handleVerify} disabled={loading || otp.join('').length !== 6}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald text-white rounded-lg text-sm font-semibold hover:bg-emerald-dark transition-all disabled:opacity-50">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
              Verify Code
            </button>
            {timer > 0 ? <span className="text-xs text-slate-400">Resend in {timer}s</span>
              : <button type="button" onClick={handleSendOTP} disabled={sending}
                className="flex items-center gap-1 text-xs text-navy font-medium hover:underline disabled:opacity-50">
                <Send className="w-3 h-3" /> Resend Code
              </button>}
          </div>

          <p className="text-[10px] text-slate-400">
            A 6-digit code has been sent to <strong>{email}</strong>. Check your inbox (and spam folder).
          </p>
        </motion.div>
      )}
    </div>
  );
}
