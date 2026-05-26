import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface CaseStudyCardProps {
  image: string;
  industry: string;
  location: string;
  title: string;
  description: string;
  impacts: string[];
  delay?: number;
}

export default function CaseStudyCard({ image, industry, location, title, description, impacts, delay = 0 }: CaseStudyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay * 0.15, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="group bg-white border border-slate-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
    >
      <div className="relative overflow-hidden aspect-video">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="bg-emerald-light text-emerald text-caption px-3 py-1 rounded-full font-medium">
            {industry}
          </span>
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-1 text-white text-caption bg-navy/60 px-2 py-1 rounded-full">
          <MapPin className="w-3 h-3" />
          <span>{location}</span>
        </div>
      </div>
      <div className="p-6">
        <h4 className="text-h4 text-slate-800 mb-2">{title}</h4>
        <p className="text-body-sm text-slate-500 mb-4">{description}</p>
        <ul className="space-y-2">
          {impacts.map((impact, i) => (
            <li key={i} className="flex items-start gap-2 text-body-sm text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald mt-2 flex-shrink-0" />
              {impact}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
