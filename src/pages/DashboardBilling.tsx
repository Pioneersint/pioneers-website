import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Download } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const plans = [
  { name: 'Free', price: 0, period: '', current: false, features: ['3 basic courses', 'Limited AI queries', 'Certificate verification', 'Email support'], cta: 'Current Plan' },
  { name: 'Pro', price: 99, period: '/month', current: true, popular: true, features: ['Full course library', 'Unlimited AI assistant', 'Digital certificates', 'Progress tracking', 'Priority support'], cta: 'Current Plan' },
  { name: 'Enterprise', price: 299, period: '/month', current: false, features: ['Everything in Pro', 'Custom consulting', 'Team management', 'Advanced analytics', 'Dedicated manager'], cta: 'Upgrade' },
];

const invoices = [
  { id: 'INV-2025-001', date: 'May 1, 2025', amount: 99, status: 'Paid' },
  { id: 'INV-2025-002', date: 'Apr 1, 2025', amount: 99, status: 'Paid' },
  { id: 'INV-2025-003', date: 'Mar 1, 2025', amount: 99, status: 'Paid' },
];

export default function DashboardBilling() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <DashboardLayout>
      {/* Current Plan */}
      <div className="bg-emerald-light rounded-xl p-6 mb-8 border border-emerald/20">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <span className="text-emerald text-sm font-medium">Current Plan</span>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">Pro Plan</h3>
            <p className="text-slate-500 text-sm mt-1">$99/month • Renews on June 1, 2025</p>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-2 bg-white text-slate-700 rounded-lg text-sm font-medium border border-slate-200 hover:bg-slate-50">Cancel Plan</button>
            <button className="px-5 py-2 bg-emerald text-white rounded-lg text-sm font-medium hover:bg-emerald-dark">Upgrade</button>
          </div>
        </div>
      </div>

      {/* Plans */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <button onClick={() => setBillingCycle('monthly')} className={`px-4 py-2 rounded-full text-sm font-medium ${billingCycle === 'monthly' ? 'bg-emerald text-white' : 'bg-white text-slate-600 border border-slate-200'}`}>Monthly</button>
        <button onClick={() => setBillingCycle('yearly')} className={`px-4 py-2 rounded-full text-sm font-medium ${billingCycle === 'yearly' ? 'bg-emerald text-white' : 'bg-white text-slate-600 border border-slate-200'}`}>Yearly <span className="text-xs opacity-70">-20%</span></button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {plans.map((plan, i) => (
          <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className={`bg-white rounded-xl border p-6 ${plan.popular ? 'border-emerald ring-2 ring-emerald/10' : 'border-slate-200'}`}>
            {plan.popular && <span className="text-xs font-medium bg-emerald text-white px-2 py-1 rounded-full">Most Popular</span>}
            <h4 className="text-lg font-semibold text-slate-800 mt-2">{plan.name}</h4>
            <div className="flex items-baseline gap-1 mt-2 mb-4">
              <span className="text-3xl font-bold text-slate-800">${billingCycle === 'yearly' ? Math.round(plan.price * 0.8 * 12) : plan.price}</span>
              {plan.price > 0 && <span className="text-slate-500 text-sm">/{billingCycle === 'yearly' ? 'year' : 'month'}</span>}
            </div>
            <ul className="space-y-2 mb-6">
              {plan.features.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                  <Check className="w-4 h-4 text-emerald flex-shrink-0" />{f}
                </li>
              ))}
            </ul>
            <button disabled={plan.current} className={`w-full py-2.5 rounded-lg text-sm font-medium transition-all ${plan.current ? 'bg-slate-100 text-slate-400 cursor-default' : 'bg-emerald text-white hover:bg-emerald-dark'}`}>
              {plan.cta}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Invoices */}
      <h4 className="text-lg font-semibold text-slate-800 mb-4">Invoice History</h4>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left px-4 py-3 text-slate-500 font-medium">Invoice</th>
              <th className="text-left px-4 py-3 text-slate-500 font-medium">Date</th>
              <th className="text-left px-4 py-3 text-slate-500 font-medium">Amount</th>
              <th className="text-left px-4 py-3 text-slate-500 font-medium">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(inv => (
              <tr key={inv.id} className="border-t border-slate-100">
                <td className="px-4 py-3 font-medium text-slate-700">{inv.id}</td>
                <td className="px-4 py-3 text-slate-500">{inv.date}</td>
                <td className="px-4 py-3 text-slate-700">${inv.amount}</td>
                <td className="px-4 py-3"><span className="text-xs font-medium bg-emerald-light text-emerald px-2 py-0.5 rounded-full">{inv.status}</span></td>
                <td className="px-4 py-3"><button className="text-slate-400 hover:text-emerald"><Download className="w-4 h-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
