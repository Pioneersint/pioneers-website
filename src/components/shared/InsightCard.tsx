import { motion } from 'framer-motion';
import { Clock, User } from 'lucide-react';

interface InsightCardProps {
  image: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: number;
  delay?: number;
}

export default function InsightCard({ image, category, title, excerpt, author, date, readTime, delay = 0 }: InsightCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="group bg-white border border-slate-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
    >
      <div className="relative overflow-hidden aspect-video">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-4 left-4 bg-emerald-light text-emerald text-caption px-3 py-1 rounded-full font-medium">
          {category}
        </span>
      </div>
      <div className="p-6">
        <h4 className="text-h4 text-slate-800 mb-2 group-hover:text-emerald transition-colors line-clamp-2">
          {title}
        </h4>
        <p className="text-body-sm text-slate-500 mb-4 line-clamp-2">{excerpt}</p>
        <div className="flex items-center justify-between text-caption text-slate-400">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            <span>{author}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>{date}</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{readTime} min</span>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
