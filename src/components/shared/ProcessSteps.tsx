import { motion } from 'framer-motion';

interface Step {
  number: number;
  title: string;
  desc: string;
}

interface ProcessStepsProps {
  steps: Step[];
  light?: boolean;
}

export default function ProcessSteps({ steps, light = false }: ProcessStepsProps) {
  return (
    <div className="relative">
      {/* Connecting Line - Desktop */}
      <div className="hidden lg:block absolute top-6 left-0 right-0 h-0.5 bg-slate-200" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative text-center"
          >
            {/* Number Circle */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.2, type: 'spring', stiffness: 200 }}
              className="w-12 h-12 rounded-full bg-emerald text-white font-bold text-lg flex items-center justify-center mx-auto mb-4 relative z-10"
            >
              {step.number}
            </motion.div>
            
            {/* Content */}
            <h4 className={`text-h4 mb-2 ${light ? 'text-white' : 'text-slate-800'}`}>
              {step.title}
            </h4>
            <p className={`text-body-sm ${light ? 'text-slate-300' : 'text-slate-500'}`}>
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
