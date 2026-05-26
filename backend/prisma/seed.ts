import { PrismaClient, CertificateStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed certificates
  const certs = [
    { certificateId: 'PI-ISO-2025-001', clientName: 'ABC Healthcare Corporation', clientEmail: 'info@abc-health.com', certificateType: 'ISO_9001' as const, issueDate: new Date('2025-01-15'), expiryDate: new Date('2028-01-14'), status: 'ACTIVE' as CertificateStatus, referenceNumber: 'PI-ISO-2024-089' },
    { certificateId: 'PI-ISO-2024-089', clientName: 'Jordan Manufacturing Ltd.', clientEmail: 'contact@jml.com', certificateType: 'ISO_14001' as const, issueDate: new Date('2024-03-10'), expiryDate: new Date('2025-03-09'), status: 'EXPIRED' as CertificateStatus, referenceNumber: 'REF-2024-042' },
    { certificateId: 'PI-ISO-2024-156', clientName: 'GCC Educational Institute', clientEmail: 'admin@gcc-edu.edu', certificateType: 'ISO_21001' as const, issueDate: new Date('2024-06-20'), expiryDate: new Date('2027-06-19'), status: 'ACTIVE' as CertificateStatus, referenceNumber: 'REF-2024-156' },
    { certificateId: 'PI-ISO-2024-203', clientName: 'Middle East Logistics Co.', clientEmail: 'ops@melc.com', certificateType: 'ISO_45001' as const, issueDate: new Date('2024-09-01'), expiryDate: new Date('2027-08-31'), status: 'ACTIVE' as CertificateStatus, referenceNumber: 'REF-2024-203' },
    { certificateId: 'PI-REVOKED-001', clientName: 'Sample Company Ltd.', clientEmail: 'test@sample.com', certificateType: 'ISO_9001' as const, issueDate: new Date('2024-06-01'), expiryDate: new Date('2027-05-31'), status: 'REVOKED' as CertificateStatus, referenceNumber: 'REF-2024-100' },
  ];

  for (const cert of certs) {
    await prisma.certificate.upsert({
      where: { certificateId: cert.certificateId },
      update: cert,
      create: cert,
    });
  }

  // Seed sample courses
  const courses = [
    { title: 'ISO 9001:2015 Fundamentals', titleAr: 'أساسيات ISO 9001:2015', description: 'Learn the fundamentals of ISO 9001 quality management systems.', descriptionAr: 'تعلم أساسيات أنظمة إدارة الجودة ISO 9001.', category: 'ISO' as const, level: 'BEGINNER' as const, isFree: true, isPublished: true, hasCertificate: true, slug: 'iso-9001-fundamentals', thumbnail: '/assets/images/service-iso.jpg' },
    { title: 'ESG Strategy Development', titleAr: 'تطوير استراتيجية ESG', description: 'Master ESG framework development and sustainability reporting.', descriptionAr: 'أتقن تطوير إطار ESG والإبلاغ عن الاستدامة.', category: 'ESG' as const, level: 'INTERMEDIATE' as const, isFree: false, isPublished: true, hasCertificate: true, slug: 'esg-strategy', thumbnail: '/assets/images/service-esg.jpg', price: 49.99 },
    { title: 'Corporate Governance Essentials', titleAr: 'أساسيات الحوكمة الشركاتية', description: 'Understanding governance frameworks for modern organizations.', descriptionAr: 'فهم أطر الحوكمة للمؤسسات الحديثة.', category: 'GOVERNANCE' as const, level: 'BEGINNER' as const, isFree: true, isPublished: true, hasCertificate: true, slug: 'governance-essentials', thumbnail: '/assets/images/service-governance.jpg' },
    { title: 'ISO 14001 Environmental Management', titleAr: 'إدارة البيئة ISO 14001', description: 'Implement environmental management systems effectively.', descriptionAr: 'تنفيذ أنظمة إدارة البيئة بفعالية.', category: 'ISO' as const, level: 'INTERMEDIATE' as const, isFree: false, isPublished: true, hasCertificate: true, slug: 'iso-14001', thumbnail: '/assets/images/service-iso.jpg', price: 59.99 },
  ];

  for (const course of courses) {
    await prisma.course.upsert({
      where: { slug: course.slug },
      update: course,
      create: course,
    });
  }

  // Seed sample articles
  const articles = [
    { title: 'ISO 9001:2015 Implementation Guide for MENA Organizations', slug: 'iso-9001-implementation-mena', excerpt: 'A comprehensive guide to implementing ISO 9001 in the Middle East and North Africa region.', content: '<h2>Introduction</h2><p>ISO 9001:2015 is the world\'s most recognized quality management standard. For organizations in the MENA region, implementation requires careful consideration of local regulatory frameworks and cultural contexts.</p><h2>Key Steps</h2><p>1. Leadership commitment<br>2. Context analysis<br>3. Risk assessment<br>4. Process documentation<br>5. Internal audits</p>', category: 'ISO_STANDARDS' as const, contentCluster: 'ISO_9001_CLUSTER' as const, authorName: 'Dr. Ahmad Hassan', status: 'PUBLISHED' as const, publishedAt: new Date('2025-05-15'), readTime: 8, keywords: ['ISO 9001', 'MENA', 'Quality Management'], metaTitle: 'ISO 9001 Implementation Guide | Pioneers International', metaDescription: 'Comprehensive ISO 9001 implementation guide for MENA organizations.', featuredImage: '/assets/images/insight-1.jpg' },
    { title: 'ESG Strategy Development: A Framework for Sustainable Growth', slug: 'esg-strategy-framework', excerpt: 'Developing an effective ESG strategy that aligns with business objectives.', content: '<h2>What is ESG?</h2><p>Environmental, Social, and Governance (ESG) criteria are a set of standards for a company\'s operations that socially conscious investors use to screen potential investments.</p><h2>Building Your ESG Strategy</h2><p>1. Materiality assessment<br>2. Stakeholder engagement<br>3. Goal setting<br>4. Implementation roadmap</p>', category: 'ESG_SUSTAINABILITY' as const, contentCluster: 'ESG_CLUSTER' as const, authorName: 'Sarah Al-Rashid', status: 'PUBLISHED' as const, publishedAt: new Date('2025-05-10'), readTime: 6, keywords: ['ESG', 'Sustainability', 'Strategy'], metaTitle: 'ESG Strategy Development | Pioneers International', metaDescription: 'Learn how to develop an effective ESG strategy for sustainable business growth.', featuredImage: '/assets/images/insight-2.jpg' },
    { title: 'Corporate Governance Best Practices in the GCC', slug: 'corporate-governance-gcc', excerpt: 'Key governance frameworks and practices for GCC-based organizations.', content: '<h2>Governance in the GCC</h2><p>The Gulf Cooperation Council region has unique governance requirements that blend international standards with local regulatory frameworks.</p><h2>Best Practices</h2><p>1. Board independence<br>2. Audit committees<br>3. Risk management<br>4. Disclosure requirements</p>', category: 'GOVERNANCE' as const, contentCluster: 'GOVERNANCE_CLUSTER' as const, authorName: 'Mohammed Al-Farsi', status: 'PUBLISHED' as const, publishedAt: new Date('2025-05-05'), readTime: 7, keywords: ['Governance', 'GCC', 'Best Practices'], metaTitle: 'Corporate Governance GCC | Pioneers International', metaDescription: 'Governance best practices for organizations in the GCC region.', featuredImage: '/assets/images/insight-3.jpg' },
  ];

  for (const article of articles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: article,
      create: article,
    });
  }

  console.log('Seed completed successfully');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
