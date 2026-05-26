import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const allTestimonials = [
  {
    quote: 'Pioneers International transformed our quality management systems completely. Their ISO 9001 implementation expertise was exceptional and delivered results beyond our expectations. The team was professional, responsive, and deeply knowledgeable.',
    author: 'Dr. Khalid Al-Mansour',
    role: 'CEO',
    company: 'Riyadh Medical Group',
    rating: 5,
    country: 'Saudi Arabia',
  },
  {
    quote: 'The ESG framework developed by Pioneers helped us achieve our sustainability goals ahead of schedule. Their deep understanding of regional regulations was invaluable for our GCC operations.',
    author: 'Fatima Al-Zahra',
    role: 'Sustainability Director',
    company: 'Gulf Manufacturing Co.',
    rating: 5,
    country: 'UAE',
  },
  {
    quote: 'Their governance advisory services strengthened our board practices significantly. We now have robust compliance systems that meet both local and international standards. Highly recommended.',
    author: 'Omar Hassan',
    role: 'Board Secretary',
    company: 'Jordan Financial Group',
    rating: 5,
    country: 'Jordan',
  },
  {
    quote: 'Working with Pioneers International transformed our quality management systems. Their ISO 9001 implementation expertise was exceptional and delivered results beyond our expectations.',
    author: 'Dr. Amina Al-Rashid',
    role: 'Quality Director',
    company: 'Al-Noor Hospital Network',
    rating: 5,
    country: 'Kuwait',
  },
  {
    quote: 'From initial assessment to final certification, Pioneers guided us every step of the way. Their training programs are world-class and their consultants truly understand the MENA business environment.',
    author: 'Hassan Al-Farsi',
    role: 'Operations Manager',
    company: 'Petra Industrial Complex',
    rating: 5,
    country: 'Jordan',
  },
  {
    quote: 'The ISO 27001 implementation was seamless. Pioneers team identified gaps we did not even know existed and built a comprehensive information security management system that impressed our auditors.',
    author: 'Leila Benali',
    role: 'IT Director',
    company: 'Maghreb Data Solutions',
    rating: 5,
    country: 'Bahrain',
  },
];

export default function TestimonialGrid() {
  const [page, setPage] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(allTestimonials.length / perPage);
  const visible = allTestimonials.slice(page * perPage, page * perPage + perPage);

  const next = () => setPage((p) => Math.min(p + 1, totalPages - 1));
  const prev = () => setPage((p) => Math.max(p - 1, 0));

  return (
    <section className="bg-gradient-to-br from-[#0F4C81] to-[#0a3560] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-caption uppercase tracking-[0.15em] text-emerald font-medium">
            TESTIMONIALS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">
            Trusted by Leaders Across MENA
          </h2>
          <p className="text-slate-300 mt-4 max-w-2xl mx-auto">
            Hear from the organizations that have transformed their operations with Pioneers International.
          </p>
        </div>

        {/* Grid of 3 testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {visible.map((t, i) => (
            <motion.div
              key={t.author + page}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/15 transition-all"
            >
              <Quote className="w-8 h-8 text-emerald/40 mb-4" />
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-white/90 text-sm leading-relaxed mb-6">"{t.quote}"</p>
              <div className="border-t border-white/10 pt-4">
                <p className="text-white font-semibold text-sm">{t.author}</p>
                <p className="text-slate-400 text-xs">{t.role}, {t.company}</p>
                <span className="inline-block mt-2 text-[10px] bg-emerald/20 text-emerald px-2 py-0.5 rounded-full">
                  {t.country}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={prev}
            disabled={page === 0}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === page ? 'bg-emerald w-6' : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            disabled={page === totalPages - 1}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
