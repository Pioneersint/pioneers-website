import { motion } from 'framer-motion';
import { ArrowRight, type LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export default function ServiceCard({ icon: Icon, title, description, delay = 0 }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay * 0.15, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="group bg-white border border-slate-200 rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="w-14 h-14 rounded-full bg-emerald-light flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-7 h-7 text-emerald" />
      </div>
      <h4 className="text-h4 text-slate-800 mb-3">{title}</h4>
      <p className="text-body-sm text-slate-500 mb-4 leading-relaxed">{description}</p>
      <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald group-hover:gap-2 transition-all duration-200">
        Learn More <ArrowRight className="w-4 h-4" />
      </span>
    </motion.div>
  );
}
