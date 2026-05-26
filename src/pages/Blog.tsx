import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Clock, Tag, ArrowRight, BookOpen, Sparkles, TrendingUp, ShieldCheck, Leaf, Building2, Cpu, Filter } from 'lucide-react';
import SEO from '@/components/SEO';

const blogPosts = [
  {
    id: '1', title: 'ISO 9001:2015 Implementation Guide for MENA Organizations', excerpt: 'A comprehensive roadmap for implementing ISO 9001 quality management systems tailored for Middle Eastern organizations, covering gap analysis, documentation, and certification audit preparation.', content: 'ISO 9001:2015 is the world\'s most recognized quality management standard. For organizations in the MENA region, implementation requires careful adaptation to local business cultures while maintaining international standards. This guide covers the complete journey from initial assessment through certification...',
    category: 'iso', author: 'Dr. Ahmad Hassan', date: 'May 15, 2025', readTime: 8, image: '/assets/images/insight-1.jpg',
    tags: ['ISO 9001', 'Quality Management', 'MENA', 'Certification'], aiGenerated: true,
  },
  {
    id: '2', title: 'ESG Strategy Development: A Framework for Sustainable Growth', excerpt: 'Developing effective ESG strategies that align with business objectives and stakeholder expectations in the context of evolving regional and global sustainability regulations.',
    category: 'esg', author: 'Sarah Al-Rashid', date: 'May 12, 2025', readTime: 6, image: '/assets/images/insight-2.jpg',
    tags: ['ESG', 'Sustainability', 'Strategy', 'Reporting'], aiGenerated: true,
  },
  {
    id: '3', title: 'Corporate Governance Best Practices in the GCC Region', excerpt: 'Key governance frameworks and practices for organizations operating in the Gulf Cooperation Council, aligned with OECD principles and regional regulatory requirements.',
    category: 'governance', author: 'Mohammed Al-Farsi', date: 'May 10, 2025', readTime: 7, image: '/assets/images/insight-3.jpg',
    tags: ['Governance', 'GCC', 'Compliance', 'Board Effectiveness'], aiGenerated: true,
  },
  {
    id: '4', title: 'ISO 27001:2022 Information Security Management Update', excerpt: 'The latest updates to ISO 27001 and what they mean for your organization\'s information security management system. Key changes and transition requirements.',
    category: 'iso', author: 'Pioneers AI', date: 'May 8, 2025', readTime: 5, image: '/assets/images/service-iso.jpg',
    tags: ['ISO 27001', 'Information Security', 'Cybersecurity', '2022 Update'], aiGenerated: true,
  },
  {
    id: '5', title: 'Risk Management with ISO 31000: A Practical Approach', excerpt: 'How to implement enterprise risk management frameworks using ISO 31000 principles. Practical tools, templates, and case studies from MENA organizations.',
    category: 'risk', author: 'Dr. Khalid Al-Mansour', date: 'May 5, 2025', readTime: 9, image: '/assets/images/insight-1.jpg',
    tags: ['ISO 31000', 'Risk Management', 'Enterprise Risk', 'Framework'], aiGenerated: true,
  },
  {
    id: '6', title: 'AI-Powered Compliance: The Future of Regulatory Management', excerpt: 'How artificial intelligence is transforming compliance management, from automated monitoring to predictive risk analytics and intelligent reporting systems.',
    category: 'ai', author: 'Pioneers AI', date: 'May 3, 2025', readTime: 6, image: '/assets/images/dashboard-preview.jpg',
    tags: ['AI', 'Compliance', 'Technology', 'Automation'], aiGenerated: true,
  },
  {
    id: '7', title: 'ISO 14001 Environmental Management in Manufacturing', excerpt: 'Practical strategies for implementing environmental management systems in manufacturing facilities across Jordan and the broader MENA region.',
    category: 'esg', author: 'Fatima Al-Zahra', date: 'May 1, 2025', readTime: 7, image: '/assets/images/case-manufacturing.jpg',
    tags: ['ISO 14001', 'Environment', 'Manufacturing', 'Sustainability'], aiGenerated: true,
  },
  {
    id: '8', title: 'Building a Culture of Quality: Beyond Certification', excerpt: 'True organizational excellence comes from embedding quality principles into organizational culture, not just achieving certificates. Here\'s how to build that culture.',
    category: 'iso', author: 'Omar Hassan', date: 'Apr 28, 2025', readTime: 8, image: '/assets/images/about-team.jpg',
    tags: ['Quality Culture', 'Leadership', 'Continuous Improvement', 'Excellence'], aiGenerated: true,
  },
  {
    id: '9', title: 'Digital Transformation in ISO Auditing Processes', excerpt: 'How technology is revolutionizing the ISO auditing process, from digital checklists to AI-powered compliance analytics and remote audit capabilities.',
    category: 'ai', author: 'Pioneers AI', date: 'Apr 25, 2025', readTime: 5, image: '/assets/images/dashboard-preview.jpg',
    tags: ['Digital Transformation', 'ISO Auditing', 'Technology', 'Innovation'], aiGenerated: true,
  },
];

const categoryIcons: Record<string, React.ElementType> = { iso: ShieldCheck, esg: Leaf, governance: Building2, risk: TrendingUp, ai: Cpu };
const categoryColors: Record<string, string> = { iso: 'bg-emerald', esg: 'bg-green-600', governance: 'bg-navy', risk: 'bg-amber', ai: 'bg-sky' };

export default function Blog() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);

  const categories = ['all', 'iso', 'esg', 'governance', 'risk', 'ai'];
  const filtered = activeCategory === 'all' ? blogPosts : blogPosts.filter(p => p.category === activeCategory);

  const relatedPosts = selectedPost
    ? blogPosts.filter(p => p.id !== selectedPost.id && p.category === selectedPost.category).slice(0, 3)
    : [];

  if (selectedPost) {
    const CategoryIcon = categoryIcons[selectedPost.category] || BookOpen;
    return (
      <div>
        <SEO title={`${selectedPost.title} | Pioneers International Blog`} description={selectedPost.excerpt} />
        {/* Article Header */}
        <section className="relative min-h-[50vh] flex items-end gradient-navy pb-12">
          <div className="absolute inset-0 opacity-10">
            <img src={selectedPost.image} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10 content-container px-4">
            <button onClick={() => setSelectedPost(null)} className="text-emerald text-sm font-medium mb-4 hover:underline flex items-center gap-1">
              <ArrowRight className="w-4 h-4 rotate-180" /> Back to Blog
            </button>
            <div className={`inline-flex items-center gap-1.5 ${categoryColors[selectedPost.category]} text-white text-xs font-medium px-3 py-1 rounded-full mb-4`}>
              <CategoryIcon className="w-3.5 h-3.5" /> {t(`blog.categories.${selectedPost.category}`)}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white max-w-3xl">{selectedPost.title}</h1>
            <div className="flex items-center gap-4 mt-4 text-slate-300 text-sm">
              <span>{selectedPost.author}</span>
              <span>{selectedPost.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{selectedPost.readTime} {t('blog.readTime')}</span>
              {selectedPost.aiGenerated && <span className="flex items-center gap-1 text-emerald"><Sparkles className="w-3.5 h-3.5" />AI-Powered</span>}
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="bg-white section-padding">
          <div className="content-container max-w-3xl">
            <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-64 object-cover rounded-2xl mb-8" />
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-slate-600 leading-relaxed mb-6 font-medium">{selectedPost.excerpt}</p>
              <div className="text-slate-700 leading-relaxed space-y-4 whitespace-pre-line">{selectedPost.content}</div>
              <div className="mt-8 flex flex-wrap gap-2">
                {selectedPost.tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 bg-slate-100 text-slate-600 text-xs px-3 py-1.5 rounded-full">
                    <Tag className="w-3 h-3" />{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 bg-emerald rounded-2xl p-8 text-center">
              <h3 className="text-h3 text-white mb-2">{t('blog.ctaTitle')}</h3>
              <p className="text-white/85 mb-6">{t('blog.ctaDesc')}</p>
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white rounded-full font-medium hover:bg-navy-light transition-colors">
                {t('blog.ctaButton')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-12">
                <h3 className="text-h3 text-slate-800 mb-6">{t('blog.relatedPosts')}</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map(post => (
                    <motion.div key={post.id} whileHover={{ y: -4 }} onClick={() => setSelectedPost(post)}
                      className="bg-white border border-slate-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                      <img src={post.image} alt={post.title} className="w-full h-32 object-cover" />
                      <div className="p-4">
                        <h4 className="font-semibold text-slate-800 text-sm mb-2 line-clamp-2">{post.title}</h4>
                        <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime} {t('blog.readTime')}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <SEO title="AI-Powered Insights Blog | Pioneers International" description="Cutting-edge analysis on ISO standards, ESG trends, corporate governance, and business transformation powered by AI." />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center gradient-navy">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.1) 39px, rgba(255,255,255,0.1) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.1) 39px, rgba(255,255,255,0.1) 40px)` }} />
        <div className="relative z-10 content-container text-center px-4">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-emerald/20 flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-emerald" />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-h1 text-white">{t('blog.title')}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-body-lg text-slate-300 mt-4 max-w-2xl mx-auto">{t('blog.subtitle')}</motion.p>
        </div>
      </section>

      {/* Filter & Grid */}
      <section className="bg-white section-padding">
        <div className="content-container">
          {/* Category Filter */}
          <div className="flex items-center gap-2 mb-10 flex-wrap">
            <Filter className="w-4 h-4 text-slate-400 mr-2" />
            {categories.map(cat => {
              const CatIcon = categoryIcons[cat] || BookOpen;
              return (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat ? 'bg-emerald text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                  {cat !== 'all' && <CatIcon className="w-3.5 h-3.5" />}
                  {t(`blog.categories.${cat}`)}
                </button>
              );
            })}
          </div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => {
              const PostIcon = categoryIcons[post.category] || BookOpen;
              return (
                <motion.article key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -6 }}
                  onClick={() => setSelectedPost(post)}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all group">
                  <div className="relative h-48 overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className={`absolute top-3 left-3 ${categoryColors[post.category]} text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1`}>
                      <PostIcon className="w-3 h-3" /> {t(`blog.categories.${post.category}`)}
                    </div>
                    {post.aiGenerated && (
                      <div className="absolute top-3 right-3 bg-navy/80 backdrop-blur-sm text-emerald text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> AI
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                      <span>{post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime} {t('blog.readTime')}</span>
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2 group-hover:text-emerald transition-colors">{post.title}</h3>
                    <p className="text-sm text-slate-500 line-clamp-3 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">{post.author}</span>
                      <span className="text-emerald text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read More <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
