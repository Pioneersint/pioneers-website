import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function NewsletterForm() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto"
    >
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('newsletter.placeholder')}
          required
          className="flex-1 h-14 px-6 rounded-full bg-white text-slate-800 placeholder:text-slate-400 border-0 focus:ring-2 focus:ring-white/30 outline-none"
        />
        <button
          type="submit"
          className="h-14 px-8 rounded-full bg-navy text-white font-semibold hover:bg-navy-light transition-colors shadow-lg"
        >
          {isSubmitted ? '✓ Subscribed!' : t('newsletter.submit')}
        </button>
      </div>
      <p className="text-center text-white/60 text-caption mt-4">
        {t('newsletter.note')}
      </p>
    </motion.form>
  );
}
