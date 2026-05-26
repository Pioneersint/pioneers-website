import { motion } from 'framer-motion';
import { Award, Users, Globe, Clock, Target, Handshake } from 'lucide-react';

const differentiators = [
  {
    icon: Clock,
    number: '30+',
    label: 'Years of Excellence',
    desc: 'Three decades of trusted consulting across MENA, delivering measurable results for organizations of every scale.',
  },
  {
    icon: Globe,
    number: '8',
    label: 'Countries Covered',
    desc: 'Deep regional expertise spanning Jordan, Saudi Arabia, UAE, Kuwait, Bahrain, Qatar, Egypt, and Oman.',
  },
  {
    icon: Award,
    number: '100%',
    label: 'Certification Success',
    desc: 'Every client who followed our methodology achieved their target certification on the first attempt.',
  },
  {
    icon: Users,
    number: '50+',
    label: 'Expert Consultants',
    desc: 'A multidisciplinary team of certified lead auditors, ESG specialists, and governance advisors.',
  },
  {
    icon: Target,
    number: '98%',
    label: 'Certification Success Rate',
    desc: 'Nearly all our clients achieve their target certification on the first attempt with our methodology.',
  },
  {
    icon: Handshake,
    number: '500+',
    label: 'Satisfied Clients',
    desc: 'From healthcare giants to educational institutions, our clients span 15+ industries.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-caption uppercase tracking-[0.15em] text-emerald font-medium">WHY PIONEERS</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-3">Why Organizations Choose Us</h2>
          <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
            Not all consultants are created equal. Here is what sets Pioneers International apart from the rest.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentiators.map((d, i) => (
            <motion.div
              key={d.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-slate-50 rounded-2xl p-8 hover:bg-navy hover:shadow-xl transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-emerald/10 group-hover:bg-emerald/20 flex items-center justify-center mb-5 transition-colors">
                <d.icon className="w-7 h-7 text-emerald" />
              </div>
              <div className="text-3xl font-bold text-navy group-hover:text-white transition-colors mb-1">
                {d.number}
              </div>
              <h4 className="text-lg font-semibold text-slate-800 group-hover:text-white transition-colors mb-2">
                {d.label}
              </h4>
              <p className="text-sm text-slate-500 group-hover:text-slate-300 transition-colors leading-relaxed">
                {d.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
