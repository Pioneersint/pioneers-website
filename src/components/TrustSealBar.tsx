import { ShieldCheck, Lock, Clock, Users, Award, Globe } from 'lucide-react';

const trustItems = [
  { icon: ShieldCheck, label: 'SSL Secured', sub: '256-bit encryption' },
  { icon: Clock, label: '30+ Years', sub: 'Industry experience' },
  { icon: Users, label: '500+ Clients', sub: 'Across MENA' },
  { icon: Award, label: 'ISO Certified', sub: 'Quality guaranteed' },
  { icon: Lock, label: 'GDPR Ready', sub: 'Data protection' },
  { icon: Globe, label: '8 Countries', sub: 'Regional coverage' },
];

export default function TrustSealBar() {
  return (
    <section className="bg-slate-50 border-y border-slate-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {trustItems.map((item) => (
            <div key={item.label} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-emerald/10 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald/20 transition-colors">
                <item.icon className="w-5 h-5 text-emerald" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700 leading-tight">{item.label}</p>
                <p className="text-xs text-slate-400">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
