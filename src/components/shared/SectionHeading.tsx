import { motion } from 'framer-motion';

interface SectionHeadingProps {
  eyebrow: string;
  heading: string;
  description?: string;
  light?: boolean;
  centered?: boolean;
}

export default function SectionHeading({ eyebrow, heading, description, light = false, centered = false }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={centered ? 'text-center' : ''}
    >
      <span className="text-caption uppercase tracking-[0.08em] text-emerald font-medium">
        {eyebrow}
      </span>
      <h2 className={`text-h2 mt-3 ${light ? 'text-white' : 'text-slate-800'}`}>
        {heading}
      </h2>
      {description && (
        <p className={`text-body-lg mt-4 max-w-2xl ${centered ? 'mx-auto' : ''} ${light ? 'text-slate-300' : 'text-slate-500'}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
