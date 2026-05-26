import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, MapPin, AlertTriangle, Award, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';

interface TrainingEvent {
  id: string;
  title: string;
  standard: string;
  date: string;
  duration: string;
  location: string;
  price: number;
  spots: number;
  spotsLeft: number;
  instructor: string;
  language: 'en' | 'ar';
}

const trainingEvents: TrainingEvent[] = [
  { id: 'e1', title: 'ISO 9001:2015 Lead Auditor (LA)', standard: 'ISO 9001', date: 'June 15-19, 2026', duration: '5 Days', location: 'Amman, Jordan', price: 299, spots: 20, spotsLeft: 12, instructor: 'Wael S. Alkhatib', language: 'en' },
  { id: 'e2', title: 'ISO 14001:2015 Lead Auditor (LA)', standard: 'ISO 14001', date: 'July 6-10, 2026', duration: '5 Days', location: 'Amman, Jordan', price: 299, spots: 20, spotsLeft: 15, instructor: 'Wael S. Alkhatib', language: 'en' },
  { id: 'e3', title: 'ISO 45001:2018 Lead Auditor (LA)', standard: 'ISO 45001', date: 'August 3-7, 2026', duration: '5 Days', location: 'Amman, Jordan', price: 299, spots: 20, spotsLeft: 18, instructor: 'Wael S. Alkhatib', language: 'en' },
  { id: 'e4', title: 'ISO 22000 + HACCP Lead Auditor (LA)', standard: 'ISO 22000', date: 'September 7-11, 2026', duration: '5 Days', location: 'Amman, Jordan', price: 349, spots: 15, spotsLeft: 10, instructor: 'Wael S. Alkhatib', language: 'en' },
  { id: 'e5', title: 'ISO 27001:2022 Lead Auditor (LA)', standard: 'ISO 27001', date: 'October 5-9, 2026', duration: '5 Days', location: 'Amman, Jordan', price: 349, spots: 20, spotsLeft: 16, instructor: 'Wael S. Alkhatib', language: 'en' },
  { id: 'e6', title: 'IMS Lead Auditor (9001+14001+45001)', standard: 'IMS', date: 'November 2-6, 2026', duration: '5 Days', location: 'Amman, Jordan', price: 399, spots: 15, spotsLeft: 11, instructor: 'Wael S. Alkhatib', language: 'en' },
  { id: 'e7', title: 'ISO 9001:2015 Lead Auditor (AR)', standard: 'ISO 9001', date: 'December 7-11, 2026', duration: '5 Days', location: 'Amman, Jordan', price: 299, spots: 20, spotsLeft: 19, instructor: 'Wael S. Alkhatib', language: 'ar' },
  { id: 'e8', title: 'ISO 14001:2015 Lead Auditor (AR)', standard: 'ISO 14001', date: 'January 11-15, 2027', duration: '5 Days', location: 'Amman, Jordan', price: 299, spots: 20, spotsLeft: 20, instructor: 'Wael S. Alkhatib', language: 'ar' },
];

export default function TrainingCalendar() {
  const navigate = useNavigate();
  const [filterStandard, setFilterStandard] = useState('all');

  const filtered = filterStandard === 'all' ? trainingEvents : trainingEvents.filter(e => e.standard === filterStandard);

  const standards = ['all', ...Array.from(new Set(trainingEvents.map(e => e.standard)))];

  const handleBook = (event: TrainingEvent) => {
    navigate('/checkout', { state: { event: event.id, type: 'training', amount: event.price, eventTitle: event.title } });
  };

  return (
    <div>
      <SEO title="Training Calendar 2026 | Pioneers International" description="Upcoming ISO Lead Auditor training courses in Amman, Jordan. Book your seat now." />

      {/* Hero */}
      <section className="relative min-h-[45vh] flex items-center justify-center gradient-navy">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.1) 39px, rgba(255,255,255,0.1) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.1) 39px, rgba(255,255,255,0.1) 40px)` }} />
        <div className="relative z-10 content-container text-center px-4">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 rounded-full bg-emerald/20 flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-10 h-10 text-emerald" />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-h1 text-white">Training Calendar 2026</motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-body-lg text-slate-300 mt-4 max-w-2xl mx-auto">
            Exemplar Global Certified Lead Auditor courses. Book early - limited seats available.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-6 mt-8 text-sm text-slate-400">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-emerald" /> {trainingEvents.length} Courses</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-emerald" /> Amman, Jordan</span>
            <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-emerald" /> Exemplar Global</span>
          </motion.div>
        </div>
      </section>

      {/* Calendar Content */}
      <section className="bg-white section-padding">
        <div className="content-container">
          {/* Filter */}
          <div className="flex items-center gap-2 mb-8 flex-wrap">
            <span className="text-sm text-slate-500 font-medium mr-2">Filter:</span>
            {standards.map(std => (
              <button key={std} onClick={() => setFilterStandard(std)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filterStandard === std ? 'bg-emerald text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                {std === 'all' ? 'All Standards' : std}
              </button>
            ))}
          </div>

          {/* Events Grid */}
          <div className="space-y-4">
            {filtered.map((event, i) => {
              const isFull = event.spotsLeft === 0;
              const isAlmostFull = event.spotsLeft <= 3;
              return (
                <motion.div key={event.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className={`bg-white border-2 rounded-2xl p-6 hover:shadow-lg transition-all ${isFull ? 'border-slate-200 opacity-50' : 'border-slate-200'}`}>
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    {/* Date Badge */}
                    <div className="flex-shrink-0 w-20 text-center">
                      <div className="bg-navy text-white rounded-xl p-3">
                        <div className="text-xs uppercase tracking-wider">{event.date.split(' ')[0]}</div>
                        <div className="text-2xl font-bold">{event.date.split(' ')[1]?.replace('-', '') || ''}</div>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${event.language === 'ar' ? 'bg-emerald-light text-emerald' : 'bg-blue-50 text-blue-600'}`}>
                          {event.language === 'ar' ? 'Arabic' : 'English'}
                        </span>
                        {isAlmostFull && !isFull && (
                          <span className="text-xs font-medium bg-red-50 text-red-500 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" /> {event.spotsLeft} spots left
                          </span>
                        )}
                        {isFull && (
                          <span className="text-xs font-medium bg-slate-200 text-slate-500 px-2 py-0.5 rounded-full">Fully Booked</span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800">{event.title}</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {event.duration}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {event.location}</span>
                        <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {event.spotsLeft}/{event.spots} seats</span>
                      </div>
                    </div>

                    {/* Price & Action */}
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-slate-800">${event.price}</div>
                        <div className="text-xs text-slate-400">per participant</div>
                      </div>
                      <button onClick={() => handleBook(event)} disabled={isFull}
                        className={`px-6 py-3 rounded-xl font-semibold text-sm transition-colors ${isFull ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-emerald text-white hover:bg-emerald-dark'}`}>
                        {isFull ? 'Full' : 'Book Now'}
                      </button>
                    </div>
                  </div>

                  {/* Spots Bar */}
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${isFull ? 'bg-slate-300' : isAlmostFull ? 'bg-red-400' : 'bg-emerald'}`}
                          style={{ width: `${((event.spots - event.spotsLeft) / event.spots) * 100}%` }} />
                      </div>
                      <span className="text-xs text-slate-400">{event.spotsLeft} seats remaining</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Banner */}
      <section className="gradient-navy section-padding">
        <div className="content-container text-center">
          <h2 className="text-h2 text-white mb-4">Need In-House Training?</h2>
          <p className="text-slate-300 max-w-xl mx-auto mb-6">
            We deliver customized on-site training at your premises across the MENA region. 
            Group discounts available for 5+ participants.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button onClick={() => navigate('/contact')}
              className="px-6 py-3 bg-emerald text-white rounded-full font-semibold hover:bg-emerald-dark transition-colors flex items-center gap-2">
              <Phone className="w-4 h-4" /> Request In-House Training
            </button>
            <a href="https://wa.me/962781595846" target="_blank" rel="noopener noreferrer"
              className="px-6 py-3 border border-white/30 text-white rounded-full font-medium hover:bg-white/10 transition-colors">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
