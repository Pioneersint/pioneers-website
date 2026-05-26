import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';

interface StatCardProps {
  number: string;
  label: string;
  icon?: LucideIcon;
  delay?: number;
}

export default function StatCard({ number, label, icon: Icon, delay = 0 }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);
  const numericValue = parseInt(number.replace(/[^0-9]/g, ''));
  const suffix = number.replace(/[0-9]/g, '');

  useEffect(() => {
    if (isInView) {
      const duration = 1200;
      const steps = 30;
      const increment = numericValue / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, numericValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="text-center"
    >
      {Icon && <Icon className="w-8 h-8 text-emerald mx-auto mb-3 opacity-50" />}
      <div className="text-stat text-white">
        {isInView ? count : 0}{suffix}
      </div>
      <div className="text-caption uppercase tracking-wider text-slate-300 mt-2">
        {label}
      </div>
    </motion.div>
  );
}
