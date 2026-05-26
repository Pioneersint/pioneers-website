import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Check, Sparkles, Zap, Crown, ArrowRight, CreditCard, ShieldCheck, Lock } from 'lucide-react';

export default function LMSSubscription() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      key: 'basic',
      name: t('lms.subscription.basic.name'),
      desc: t('lms.subscription.basic.desc'),
      monthlyPrice: 9.99,
      yearlyPrice: 83.99,
      icon: Zap,
      color: 'bg-slate-100 text-slate-600',
      features: t('lms.subscription.basic.features', { returnObjects: true }) as string[],
      cta: 'Start Free Trial',
    },
    {
      key: 'pro',
      name: t('lms.subscription.pro.name'),
      desc: t('lms.subscription.pro.desc'),
      monthlyPrice: 29.99,
      yearlyPrice: 251.99,
      icon: Crown,
      color: 'bg-emerald text-white',
      popular: true,
      features: t('lms.subscription.pro.features', { returnObjects: true }) as string[],
      cta: 'Get Professional',
    },
    {
      key: 'enterprise',
      name: t('lms.subscription.enterprise.name'),
      desc: t('lms.subscription.enterprise.desc'),
      monthlyPrice: 0,
      yearlyPrice: 0,
      icon: Sparkles,
      color: 'bg-navy text-white',
      isCustom: true,
      features: t('lms.subscription.enterprise.features', { returnObjects: true }) as string[],
      cta: 'Contact Sales',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-8 text-center">
          <button onClick={() => navigate('/lms')} className="text-sm text-slate-400 hover:text-emerald transition-colors mb-4">
            Back to Courses
          </button>
          <h1 className="text-3xl font-bold text-slate-800">{t('lms.subscription.title')}</h1>

          {/* Monthly/Yearly Toggle */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className={`text-sm font-medium ${!isYearly ? 'text-slate-800' : 'text-slate-400'}`}>{t('lms.subscription.monthly')}</span>
            <button onClick={() => setIsYearly(!isYearly)}
              className={`relative w-14 h-7 rounded-full transition-colors ${isYearly ? 'bg-emerald' : 'bg-slate-300'}`}>
              <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${isYearly ? 'translate-x-7' : 'translate-x-0.5'}`} />
            </button>
            <span className={`text-sm font-medium ${isYearly ? 'text-slate-800' : 'text-slate-400'}`}>{t('lms.subscription.yearly')}</span>
            {isYearly && <span className="text-xs font-bold text-emerald bg-emerald-light px-2 py-1 rounded-full">{t('lms.subscription.save')}</span>}
          </div>
        </div>
      </div>

      {/* Plans */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div key={plan.key} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className={`bg-white rounded-2xl border ${plan.popular ? 'border-emerald shadow-xl' : 'border-slate-200'} overflow-hidden relative`}>
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-emerald text-white text-xs font-bold text-center py-1.5">
                  MOST POPULAR
                </div>
              )}
              <div className={`p-6 ${plan.popular ? 'pt-10' : ''}`}>
                <div className={`w-12 h-12 rounded-xl ${plan.color} flex items-center justify-center mb-4`}>
                  <plan.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">{plan.name}</h3>
                <p className="text-sm text-slate-500 mt-1">{plan.desc}</p>

                <div className="mt-4 mb-6">
                  {plan.isCustom ? (
                    <span className="text-3xl font-bold text-slate-800">{t('pricing.enterprise.price')}</span>
                  ) : (
                    <>
                      <span className="text-3xl font-bold text-slate-800">${isYearly ? plan.yearlyPrice : plan.monthlyPrice}</span>
                      <span className="text-slate-400 text-sm">{isYearly ? `/${t('lms.subscription.perYear')}` : `/${t('lms.subscription.perMonth')}`}</span>
                      {isYearly && <p className="text-xs text-emerald mt-1">Save ${(plan.monthlyPrice * 12 - plan.yearlyPrice).toFixed(0)}/year</p>}
                    </>
                  )}
                </div>

                <button
                  onClick={() => plan.isCustom ? navigate('/contact') : navigate('/dashboard')}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2 ${plan.popular ? 'bg-emerald text-white hover:bg-emerald-dark' : plan.key === 'enterprise' ? 'bg-navy text-white hover:bg-navy-light' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                  {plan.cta} <ArrowRight className="w-4 h-4" />
                </button>

                <div className="mt-6 space-y-3">
                  {plan.features.map((feature: string, j: number) => (
                    <div key={j} className="flex items-start gap-2 text-sm text-slate-600">
                      <Check className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-6 mt-10 text-sm text-slate-400">
          <span className="flex items-center gap-1.5"><CreditCard className="w-4 h-4" /> Secure Payment</span>
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4" /> 30-Day Money Back</span>
          <span className="flex items-center gap-1.5"><Lock className="w-4 h-4" /> SSL Encrypted</span>
        </div>
      </div>
    </div>
  );
}
