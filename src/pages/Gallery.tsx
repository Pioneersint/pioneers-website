import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Camera, Award, Building2, Users, FolderOpen } from 'lucide-react';
import SEO from '@/components/SEO';

type Category = 'all' | 'training' | 'certifications' | 'projects' | 'office';

interface GalleryImage {
  src: string;
  title: string;
  category: Category;
}

const galleryImages: GalleryImage[] = [
  // Training Events
  { src: '/assets/images/gallery/training-01.jpg', title: 'ISO Lead Auditor Training Session', category: 'training' },
  { src: '/assets/images/gallery/training-02.jpg', title: 'Interactive Training Workshop', category: 'training' },
  { src: '/assets/images/gallery/training-03.jpg', title: 'Group Discussion & Case Studies', category: 'training' },
  { src: '/assets/images/gallery/training-04.jpg', title: 'Audit Simulation Exercise', category: 'training' },
  { src: '/assets/images/gallery/training-05.jpg', title: 'ISO 9001 Training Course', category: 'training' },
  { src: '/assets/images/gallery/training-06.jpg', title: 'Lead Auditor Certification Prep', category: 'training' },
  { src: '/assets/images/gallery/training-07.jpg', title: 'Practical Audit Techniques', category: 'training' },
  { src: '/assets/images/gallery/training-08.jpg', title: 'Team Training Workshop', category: 'training' },
  { src: '/assets/images/gallery/training-09.jpg', title: 'Professional Development Session', category: 'training' },
  { src: '/assets/images/gallery/training-10.jpg', title: 'ISO Standards Deep Dive', category: 'training' },
  { src: '/assets/images/gallery/training-11.jpg', title: 'Management Systems Training', category: 'training' },
  { src: '/assets/images/gallery/training-12.jpg', title: 'Consulting Best Practices', category: 'training' },
  { src: '/assets/images/gallery/training-13.jpg', title: 'Client Training Program', category: 'training' },
  { src: '/assets/images/gallery/training-14.jpg', title: 'Advanced Audit Techniques', category: 'training' },
  { src: '/assets/images/gallery/training-15.jpg', title: 'Quality Management Training', category: 'training' },
  { src: '/assets/images/gallery/training-16.jpg', title: 'Final Assessment & Review', category: 'training' },
  // Certifications
  { src: '/assets/images/gallery/cert-aaa-01.jpg', title: 'AAA Certification - Quality Standards', category: 'certifications' },
  { src: '/assets/images/gallery/cert-aaa-02.jpg', title: 'AAA Advanced Certification', category: 'certifications' },
  { src: '/assets/images/gallery/cert-aeba.jpg', title: 'American Education Business Association', category: 'certifications' },
  { src: '/assets/images/gallery/cert-vut.jpg', title: 'VUT International Accreditation', category: 'certifications' },
  // Client Projects
  { src: '/assets/images/gallery/project-01.jpg', title: 'Cooperation Agreement Signing', category: 'projects' },
  { src: '/assets/images/gallery/project-02.jpg', title: 'Partnership Agreement Event', category: 'projects' },
  { src: '/assets/images/gallery/project-03.jpg', title: 'Strategic Cooperation Ceremony', category: 'projects' },
  { src: '/assets/images/gallery/project-04.jpg', title: 'Production Association Visit', category: 'projects' },
  { src: '/assets/images/gallery/project-05.jpg', title: 'Association Partnership Meeting', category: 'projects' },
  { src: '/assets/images/gallery/project-06.jpg', title: 'Sareyah Buses - Consulting Project', category: 'projects' },
  { src: '/assets/images/gallery/project-07.jpg', title: 'Agricultural Project Consulting', category: 'projects' },
  { src: '/assets/images/gallery/project-08.jpg', title: 'Mashaer Project', category: 'projects' },
  { src: '/assets/images/gallery/project-09.jpg', title: 'Drilling Equipment Company', category: 'projects' },
  { src: '/assets/images/gallery/project-10.jpg', title: 'Client Meeting - Session 1', category: 'projects' },
  { src: '/assets/images/gallery/project-11.jpg', title: 'Client Consultation - Session 2', category: 'projects' },
  { src: '/assets/images/gallery/project-12.jpg', title: 'On-Site Assessment Visit', category: 'projects' },
  { src: '/assets/images/gallery/project-13.jpg', title: 'Client Engagement Workshop', category: 'projects' },
  { src: '/assets/images/gallery/project-14.jpg', title: 'Business Consulting Session', category: 'projects' },
  { src: '/assets/images/gallery/project-15.jpg', title: 'Strategic Planning Meeting', category: 'projects' },
  // Office & Team
  { src: '/assets/images/gallery/office-01.jpg', title: 'Pioneers International Headquarters', category: 'office' },
  { src: '/assets/images/gallery/office-02.jpg', title: 'Kalboneh Commercial Center Office', category: 'office' },
  { src: '/assets/images/gallery/office-03.jpg', title: 'Consulting Team at Work', category: 'office' },
  { src: '/assets/images/gallery/office-04.jpg', title: 'Team Collaboration Session', category: 'office' },
];

const categories: { key: Category; label: string; labelAr: string; icon: React.ElementType; count: number }[] = [
  { key: 'all', label: 'All Photos', labelAr: 'جميع الصور', icon: Camera, count: galleryImages.length },
  { key: 'training', label: 'Training Events', labelAr: 'الفعاليات التدريبية', icon: Users, count: galleryImages.filter(i => i.category === 'training').length },
  { key: 'certifications', label: 'Certifications', labelAr: 'الشهادات والاعتمادات', icon: Award, count: galleryImages.filter(i => i.category === 'certifications').length },
  { key: 'projects', label: 'Client Projects', labelAr: 'مشاريع العملاء', icon: FolderOpen, count: galleryImages.filter(i => i.category === 'projects').length },
  { key: 'office', label: 'Office & Team', labelAr: 'المكتب والفريق', icon: Building2, count: galleryImages.filter(i => i.category === 'office').length },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filtered.length);
    }
  };

  const goPrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
    }
  };

  return (
    <div>
      <SEO
        title="Photo Gallery | Pioneers International"
        description="Browse our photo gallery featuring training events, certifications, client projects, and our team in action. Pioneers International - Business Consulting."
      />

      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center justify-center gradient-navy">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.1) 39px, rgba(255,255,255,0.1) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.1) 39px, rgba(255,255,255,0.1) 40px)`
        }} />
        <div className="relative z-10 content-container text-center px-4">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 rounded-full bg-emerald/20 flex items-center justify-center mx-auto mb-6">
            <Camera className="w-10 h-10 text-emerald" />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-h1 text-white">Photo Gallery</motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-body-lg text-slate-300 mt-4 max-w-2xl mx-auto">
            A visual journey through our training events, certifications, client projects, and team moments.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-6 mt-8">
            {categories.filter(c => c.key !== 'all').map(cat => (
              <span key={cat.key} className="flex items-center gap-1.5 text-sm text-slate-400">
                <cat.icon className="w-4 h-4 text-emerald" /> {cat.count} {cat.label}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b border-slate-200 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.key
                    ? 'bg-navy text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.label}
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  activeCategory === cat.key ? 'bg-white/20' : 'bg-slate-200 text-slate-500'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="bg-slate-50 section-padding">
        <div className="content-container">
          <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((img, i) => (
                <motion.div
                  key={img.src}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className="mb-4 break-inside-avoid group cursor-pointer"
                  onClick={() => openLightbox(i)}
                >
                  <div className="relative rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300">
                    <img
                      src={img.src}
                      alt={img.title}
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 w-full">
                        <p className="text-white font-medium text-sm">{img.title}</p>
                        <span className="text-emerald text-xs mt-1 inline-flex items-center gap-1">
                          <Camera className="w-3 h-3" /> Click to view
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <Camera className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 text-lg">No photos in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-navy/95 z-[60] flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/10 px-4 py-2 rounded-full text-white text-sm">
              {lightboxIndex + 1} / {filtered.length}
            </div>

            {/* Navigation */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <motion.img
              key={filtered[lightboxIndex].src}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              src={filtered[lightboxIndex].src}
              alt={filtered[lightboxIndex].title}
              className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Caption */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
              <p className="text-white font-medium text-lg">{filtered[lightboxIndex].title}</p>
              <span className="text-slate-400 text-sm capitalize">{filtered[lightboxIndex].category}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
