import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  noindex?: boolean;
  schema?: object;
}

const defaultSEO = {
  title: 'Pioneers International | Executive Solutions for Institutional Excellence',
  description: 'Pioneers International delivers advisory solutions in quality management, institutional excellence, governance, ESG, and operational transformation across Jordan and the MENA region. ISO certification, training, and consulting services.',
  keywords: 'ISO certification, ESG consulting, corporate governance, quality management, business transformation, MENA consulting, Jordan consulting, ISO 9001, ISO 14001, sustainability',
  ogImage: '/assets/images/hero-bg-1.jpg',
};

export default function SEO({
  title = defaultSEO.title,
  description = defaultSEO.description,
  keywords = defaultSEO.keywords,
  ogImage = defaultSEO.ogImage,
  ogType = 'website',
  canonical,
  noindex = false,
  schema,
}: SEOProps) {
  useEffect(() => {
    document.title = title;
    const setMeta = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('keywords', keywords);
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:type', ogType, 'property');
    setMeta('og:image', ogImage, 'property');
    setMeta('twitter:card', 'summary_large_image', 'property');
    setMeta('twitter:title', title, 'property');
    setMeta('twitter:description', description, 'property');
    setMeta('twitter:image', ogImage, 'property');
    setMeta('robots', noindex ? 'noindex,nofollow' : 'index,follow');

    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) { link = document.createElement('link'); link.setAttribute('rel', 'canonical'); document.head.appendChild(link); }
      link.setAttribute('href', canonical);
    }

    // Schema.org structured data
    if (schema) {
      const scriptId = 'schema-jsonld';
      let script = document.getElementById(scriptId);
      if (!script) { script = document.createElement('script'); script.id = scriptId; script.setAttribute('type', 'application/ld+json'); document.head.appendChild(script); }
      script.textContent = JSON.stringify(schema);
    }

    return () => {
      const script = document.getElementById('schema-jsonld');
      if (script) script.remove();
    };
  }, [title, description, keywords, ogImage, ogType, canonical, noindex, schema]);

  return null;
}

// Pre-defined schemas
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Pioneers International',
  alternateName: 'رواد الفكر الدولية لاستشارات الأعمال',
  url: 'https://pioneersint.com',
  logo: 'https://pioneersint.com/logo.png',
  description: 'Executive solutions for institutional excellence, quality management, and operational transformation.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Wadi Saqra, Kalbouneh Complex, Floor 4',
    addressLocality: 'Amman',
    addressCountry: 'JO',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+962-7-8159-5846',
    contactType: 'customer service',
    email: 'info@pioneersint.com',
  },
  sameAs: [
    'https://www.facebook.com/share/15qktAZ7QgM/',
    'https://www.linkedin.com/in/pioneers-international-thought-for-business-consulting',
    'https://www.instagram.com/p/C0ZDZW4MEtf/',
  ],
};

export const articleSchema = (article: { title: string; excerpt: string; author: string; date: string; image?: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.title,
  description: article.excerpt,
  author: { '@type': 'Organization', name: article.author },
  publisher: { '@type': 'Organization', name: 'Pioneers International' },
  datePublished: article.date,
  dateModified: article.date,
  image: article.image,
});

export const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Pioneers International',
  description: 'Management consulting services including ISO certification, ESG advisory, corporate governance, and business transformation.',
  url: 'https://pioneersint.com/services',
  provider: { '@type': 'Organization', name: 'Pioneers International' },
  areaServed: { '@type': 'Place', name: 'MENA Region' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Consulting Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'ISO Certification Consulting' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'ESG & Sustainability Advisory' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Corporate Governance' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Training & LMS' } },
    ],
  },
};
