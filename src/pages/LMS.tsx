import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Search, Clock, BookOpen, Star, Users, Play, Filter, ChevronRight, Sparkles, Award, ShieldCheck, Leaf, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import SEO from '@/components/SEO';

export const allCoursesData = [
  {
    id: 'iso-9001-la', title: 'ISO 9001:2015 Lead Auditor (Exemplar Global Certified)', category: 'iso', level: 'advanced', duration: 2400, lessons: 40, students: 1250, rating: 4.9, price: 299, isFree: false,
    installment: { amount: 149.5, description: '50% now, 50% after 30 days' },
    image: '/assets/images/service-iso.jpg', instructor: 'Wael S. Alkhatib', instructorTitle: 'Exemplar Global Certified Lead Auditor & Managing Director',
    description: 'Complete 40-hour Exemplar Global certified Lead Auditor course for ISO 9001:2015 QMS. Covers audit principles, planning, conducting, reporting, and follow-up. Includes 2026 revision updates. Certificate valid for 10 years.',
    video: '/assets/videos/iso-9001-course.mp4',
    curriculum: [
      { title: 'Module 1: Introduction to ISO 9001 & Quality Principles', duration: 60, video: '/assets/videos/courses/iso9001/m01-intro.mp4', free: true },
      { title: 'Module 2: The Seven Quality Management Principles', duration: 60, video: '/assets/videos/courses/iso9001/m02-principles.mp4', free: true },
      { title: 'Module 3: Annex SL High Level Structure (HLS)', duration: 60, video: '/assets/videos/courses/iso9001/m03-annexsl.mp4', free: false },
      { title: 'Module 4: Context of the Organization (Clause 4)', duration: 60, video: '/assets/videos/courses/iso9001/m04-context.mp4', free: false },
      { title: 'Module 5: Leadership & Commitment (Clause 5)', duration: 60, video: '/assets/videos/courses/iso9001/m05-leadership.mp4', free: false },
      { title: 'Module 6: Planning for the QMS (Clause 6)', duration: 60, video: '/assets/videos/courses/iso9001/m06-planning.mp4', free: false },
      { title: 'Module 7: Support & Resources (Clause 7)', duration: 60, video: '/assets/videos/courses/iso9001/m07-support.mp4', free: false },
      { title: 'Module 8: Operational Planning & Control (Clause 8)', duration: 60, video: '/assets/videos/courses/iso9001/m08-operations.mp4', free: false },
      { title: 'Module 9: Performance Evaluation (Clause 9)', duration: 60, video: '/assets/videos/courses/iso9001/m09-evaluation.mp4', free: false },
      { title: 'Module 10: Improvement (Clause 10)', duration: 60, video: '/assets/videos/courses/iso9001/m10-improvement.mp4', free: false },
      { title: 'Module 11: Auditing Principles & Types of Audits', duration: 60, video: '/assets/videos/courses/iso9001/m11-auditing.mp4', free: false },
      { title: 'Module 12: Audit Planning & Preparation', duration: 60, video: '/assets/videos/courses/iso9001/m12-planning.mp4', free: false },
      { title: 'Module 13: Conducting the Opening Meeting', duration: 60, video: '/assets/videos/courses/iso9001/m13-opening.mp4', free: false },
      { title: 'Module 14: Gathering Evidence & Interview Techniques', duration: 60, video: '/assets/videos/courses/iso9001/m14-evidence.mp4', free: false },
      { title: 'Module 15: Audit Findings & Nonconformities', duration: 60, video: '/assets/videos/courses/iso9001/m15-nonconformities.mp4', free: false },
      { title: 'Module 16: Audit Report Writing', duration: 60, video: '/assets/videos/courses/iso9001/m16-closing.mp4', free: false },
      { title: 'Module 17: Closing Meeting & Follow-up', duration: 60, video: '', free: false },
      { title: 'Module 18: ISO 9001:2026 Revision Updates', duration: 60, video: '', free: false },
      { title: 'Module 19: Case Study: Manufacturing Audit', duration: 60, video: '', free: false },
      { title: 'Module 20: Case Study: Service Organization Audit', duration: 60, video: '', free: false },
      { title: 'Final Examination (15 Questions, 80% to Pass)', duration: 120, video: '', free: false },
    ]
  },
  {
    id: 'iso-14001-la', title: 'ISO 14001:2015 Lead Auditor (Exemplar Global Certified)', category: 'iso', level: 'advanced', duration: 2400, lessons: 40, students: 890, rating: 4.8, price: 299, isFree: false,
    installment: { amount: 149.5, description: '50% now, 50% after 30 days' },
    image: '/assets/images/service-esg.jpg', instructor: 'Wael S. Alkhatib', instructorTitle: 'Exemplar Global Certified Lead Auditor',
    description: 'Complete 40-hour Exemplar Global certified Lead Auditor course for ISO 14001:2015 EMS. Covers environmental aspects, impacts, life cycle perspective, legal compliance, and the upcoming 2026 revision.',
    video: '/assets/videos/iso-14001-course.mp4',
    curriculum: [
      { title: 'Module 1: Introduction to Environmental Management', duration: 60, video: '/assets/videos/courses/iso14001/m01-intro.mp4', free: true },
      { title: 'Module 2: ISO 14001 Requirements Overview', duration: 60, video: '/assets/videos/courses/iso14001/m02-aspects.mp4', free: true },
      { title: 'Module 3: Environmental Aspects & Impacts', duration: 60, video: '/assets/videos/courses/iso14001/m03-lifecycle.mp4', free: false },
      { title: 'Module 4: Life Cycle Perspective (LCP)', duration: 60, video: '/assets/videos/courses/iso14001/m04-compliance.mp4', free: false },
      { title: 'Module 5: Legal & Compliance Obligations', duration: 60, video: '/assets/videos/courses/iso14001/m05-auditing.mp4', free: false },
      { title: 'Module 6: EMS Implementation Planning', duration: 60, video: '', free: false },
      { title: 'Module 7: Operational Controls', duration: 60, video: '', free: false },
      { title: 'Module 8: Emergency Preparedness & Response', duration: 60, video: '', free: false },
      { title: 'Module 9: Environmental Audit Principles', duration: 60, video: '', free: false },
      { title: 'Module 10: Audit Planning & Checklists', duration: 60, video: '', free: false },
      { title: 'Module 11: On-site Audit Techniques', duration: 60, video: '', free: false },
      { title: 'Module 12: Environmental Nonconformities', duration: 60, video: '', free: false },
      { title: 'Module 13: Audit Reporting for EMS', duration: 60, video: '', free: false },
      { title: 'Module 14: ISO 14001:2026 Revision Preview', duration: 60, video: '', free: false },
      { title: 'Module 15: Case Study: Industrial Facility EMS Audit', duration: 60, video: '', free: false },
      { title: 'Module 16: Case Study: Construction Site EMS Audit', duration: 60, video: '', free: false },
      { title: 'Final Examination (15 Questions, 80% to Pass)', duration: 120, video: '', free: false },
    ]
  },
  {
    id: 'iso-45001-la', title: 'ISO 45001:2018 Lead Auditor (Exemplar Global Certified)', category: 'iso', level: 'advanced', duration: 2400, lessons: 40, students: 1100, rating: 4.9, price: 299, isFree: false,
    installment: { amount: 149.5, description: '50% now, 50% after 30 days' },
    image: '/assets/images/service-iso.jpg', instructor: 'Wael S. Alkhatib', instructorTitle: 'Exemplar Global Certified Lead Auditor',
    description: 'Complete 40-hour Exemplar Global certified Lead Auditor course for ISO 45001:2018 OH&S Management System. Covers hazard identification, risk assessment, hierarchy of controls, incident investigation, and worker participation.',
    video: '/assets/videos/iso-45001-intro.mp4',
    curriculum: [
      { title: 'Module 1: Introduction to OH&S Management', duration: 60, video: '/assets/videos/courses/iso45001/m01-intro.mp4', free: true },
      { title: 'Module 2: ISO 45001 Requirements Overview', duration: 60, video: '/assets/videos/courses/iso45001/m02-hazards.mp4', free: true },
      { title: 'Module 3: Hazard Identification & Risk Assessment', duration: 60, video: '/assets/videos/courses/iso45001/m03-auditing.mp4', free: false },
      { title: 'Module 4: Hierarchy of Controls', duration: 60, video: '', free: false },
      { title: 'Module 5: Legal & Regulatory Requirements', duration: 60, video: '', free: false },
      { title: 'Module 6: Worker Participation & Consultation', duration: 60, video: '', free: false },
      { title: 'Module 7: Incident Investigation & Reporting', duration: 60, video: '', free: false },
      { title: 'Module 8: Management of Change', duration: 60, video: '', free: false },
      { title: 'Module 9: OH&S Audit Principles', duration: 60, video: '', free: false },
      { title: 'Module 10: Audit Planning & Documentation', duration: 60, video: '', free: false },
      { title: 'Module 11: On-site OH&S Audit Techniques', duration: 60, video: '', free: false },
      { title: 'Module 12: OH&S Nonconformities & Corrective Action', duration: 60, video: '', free: false },
      { title: 'Module 13: Case Study: Manufacturing OH&S Audit', duration: 60, video: '', free: false },
      { title: 'Module 14: Case Study: Construction Site OH&S Audit', duration: 60, video: '', free: false },
      { title: 'Module 15: Transition from OHSAS 18001 to ISO 45001', duration: 60, video: '', free: false },
      { title: 'Final Examination (15 Questions, 80% to Pass)', duration: 120, video: '', free: false },
    ]
  },
  {
    id: 'iso-22000-la', title: 'ISO 22000:2018 + HACCP Lead Auditor (Exemplar Global Certified)', category: 'iso', level: 'advanced', duration: 2400, lessons: 40, students: 720, rating: 4.8, price: 299, isFree: false,
    installment: { amount: 149.5, description: '50% now, 50% after 30 days' },
    image: '/assets/certificates/GHAITH22000.jpg', instructor: 'Wael S. Alkhatib', instructorTitle: 'Exemplar Global Certified Lead Auditor',
    description: 'Complete 40-hour Exemplar Global certified Lead Auditor course for ISO 22000:2018 Food Safety Management System including HACCP principles. Covers prerequisite programs, CCP identification, traceability, and withdrawal/recall.',
    video: '/assets/videos/iso-22000-intro.mp4',
    curriculum: [
      { title: 'Module 1: Introduction to Food Safety Management', duration: 60, video: '/assets/videos/courses/iso22000/m01-intro.mp4', free: true },
      { title: 'Module 2: ISO 22000:2018 Requirements Overview', duration: 60, video: '/assets/videos/courses/iso22000/m02-haccp.mp4', free: true },
      { title: 'Module 3: The Seven HACCP Principles', duration: 60, video: '', free: false },
      { title: 'Module 4: Prerequisite Programs (PRPs)', duration: 60, video: '', free: false },
      { title: 'Module 5: Hazard Analysis & CCP Identification', duration: 60, video: '', free: false },
      { title: 'Module 6: Critical Limits & Monitoring', duration: 60, video: '', free: false },
      { title: 'Module 7: Corrective Actions & Verification', duration: 60, video: '', free: false },
      { title: 'Module 8: Traceability & Withdrawal/Recall', duration: 60, video: '', free: false },
      { title: 'Module 9: Operational PRPs & oPRP Management', duration: 60, video: '', free: false },
      { title: 'Module 10: Food Safety Audit Principles', duration: 60, video: '', free: false },
      { title: 'Module 11: Audit Planning for FSMS', duration: 60, video: '', free: false },
      { title: 'Module 12: On-site Food Safety Audit Techniques', duration: 60, video: '', free: false },
      { title: 'Module 13: Case Study: Restaurant Chain FSMS Audit', duration: 60, video: '', free: false },
      { title: 'Module 14: Case Study: Food Manufacturing FSMS Audit', duration: 60, video: '', free: false },
      { title: 'Module 15: FSSC 22000 Alignment', duration: 60, video: '', free: false },
      { title: 'Final Examination (15 Questions, 80% to Pass)', duration: 120, video: '', free: false },
    ]
  },
  {
    id: 'iso-27001-la', title: 'ISO 27001:2022 Lead Auditor (Exemplar Global Certified)', category: 'iso', level: 'advanced', duration: 2400, lessons: 40, students: 680, rating: 4.9, price: 299, isFree: false,
    installment: { amount: 149.5, description: '50% now, 50% after 30 days' },
    image: '/assets/images/dashboard-preview.jpg', instructor: 'Wael S. Alkhatib', instructorTitle: 'Exemplar Global Certified Lead Auditor',
    description: 'Complete 40-hour Exemplar Global certified Lead Auditor course for ISO 27001:2022 ISMS. Covers information security risk assessment, Annex A controls (93 controls), the CIA triad, risk treatment, and audit techniques.',
    video: '/assets/videos/iso-27001-intro.mp4',
    curriculum: [
      { title: 'Module 1: Introduction to Information Security', duration: 60, video: '/assets/videos/courses/iso27001/m01-intro.mp4', free: true },
      { title: 'Module 2: ISO 27001:2022 Requirements Overview', duration: 60, video: '/assets/videos/courses/iso27001/m02-controls.mp4', free: true },
      { title: 'Module 3: The CIA Triad & Information Security Principles', duration: 60, video: '', free: false },
      { title: 'Module 4: Information Security Risk Assessment', duration: 60, video: '', free: false },
      { title: 'Module 5: Risk Treatment & Statement of Applicability', duration: 60, video: '', free: false },
      { title: 'Module 6: Annex A Controls - Organizational (5-8)', duration: 60, video: '', free: false },
      { title: 'Module 7: Annex A Controls - People (6)', duration: 60, video: '', free: false },
      { title: 'Module 8: Annex A Controls - Physical (7)', duration: 60, video: '', free: false },
      { title: 'Module 9: Annex A Controls - Technological (8)', duration: 60, video: '', free: false },
      { title: 'Module 10: Access Control & Cryptography', duration: 60, video: '', free: false },
      { title: 'Module 11: Supplier Relationships & Cloud Security', duration: 60, video: '', free: false },
      { title: 'Module 12: ISMS Audit Planning & Techniques', duration: 60, video: '', free: false },
      { title: 'Module 13: On-site ISMS Audit', duration: 60, video: '', free: false },
      { title: 'Module 14: Case Study: IT Company ISMS Audit', duration: 60, video: '', free: false },
      { title: 'Module 15: Case Study: Financial Institution ISMS Audit', duration: 60, video: '', free: false },
      { title: 'Final Examination (15 Questions, 80% to Pass)', duration: 120, video: '', free: false },
    ]
  },
  {
    id: 'ims-la', title: 'IMS Lead Auditor - ISO 9001+14001+45001 (Exemplar Global Certified)', category: 'iso', level: 'advanced', duration: 2400, lessons: 40, students: 540, rating: 4.9, price: 399, isFree: false,
    installment: { amount: 199.5, description: '50% now, 50% after 30 days' },
    image: '/assets/certificates/MAJDI-IMS.jpg', instructor: 'Wael S. Alkhatib', instructorTitle: 'Exemplar Global Certified Lead Auditor',
    description: 'Complete 40-hour Exemplar Global certified Integrated Management Systems Lead Auditor course. Covers the combined implementation and auditing of ISO 9001, ISO 14001, and ISO 45001 as a unified system.',
    video: '/assets/videos/iso-ims-intro.mp4',
    curriculum: [
      { title: 'Module 1: Introduction to Integrated Management Systems', duration: 60, video: '/assets/videos/courses/ims/m01-intro.mp4', free: true },
      { title: 'Module 2: Annex SL HLS & Common Structure', duration: 60, video: '', free: true },
      { title: 'Module 3: ISO 9001 Requirements in IMS Context', duration: 60, video: '', free: false },
      { title: 'Module 4: ISO 14001 Requirements in IMS Context', duration: 60, video: '', free: false },
      { title: 'Module 5: ISO 45001 Requirements in IMS Context', duration: 60, video: '', free: false },
      { title: 'Module 6: Shared Processes in IMS', duration: 60, video: '', free: false },
      { title: 'Module 7: Risk-Based Thinking Across All Standards', duration: 60, video: '', free: false },
      { title: 'Module 8: Unified Documentation System', duration: 60, video: '', free: false },
      { title: 'Module 9: Combined Audit Planning', duration: 60, video: '', free: false },
      { title: 'Module 10: Conducting Combined IMS Audits', duration: 60, video: '', free: false },
      { title: 'Module 11: Integrated Audit Reporting', duration: 60, video: '', free: false },
      { title: 'Module 12: Exemplar Global Competency: TL Management Systems', duration: 60, video: '', free: false },
      { title: 'Module 13: Case Study: IMS Audit in Manufacturing', duration: 60, video: '', free: false },
      { title: 'Module 14: Case Study: IMS Audit in Construction', duration: 60, video: '', free: false },
      { title: 'Final Examination (15 Questions, 80% to Pass)', duration: 120, video: '', free: false },
    ]
  },
  {
    id: 'iso-21001-la', title: 'ISO 21001:2018 Lead Auditor - Educational Organizations', category: 'iso', level: 'advanced', duration: 2400, lessons: 35, students: 350, rating: 4.7, price: 249, isFree: false,
    installment: { amount: 124.5, description: '50% now, 50% after 30 days' },
    image: '/assets/images/case-education.jpg', instructor: 'Dr. Leila Karim', instructorTitle: 'Education Quality Expert & Lead Auditor',
    description: '40-hour Lead Auditor course for ISO 21001:2018 Educational Organizations Management System (EOMS). Covers learner-centric approach, curriculum development, and educational quality assurance.',
    video: '/assets/videos/iso-21001-intro.mp4',
    curriculum: [
      { title: 'Module 1: Introduction to ISO 21001:2018', duration: 60, video: '/assets/videos/courses/iso21001/m01-intro.mp4', free: true },
      { title: 'Module 2: EOMS Requirements Overview', duration: 60, video: '', free: true },
      { title: 'Module 3: Learner-Centric Approach', duration: 60, video: '', free: false },
      { title: 'Module 4: Curriculum Development & Learning Outcomes', duration: 60, video: '', free: false },
      { title: 'Module 5: Educational Quality Assurance', duration: 60, video: '', free: false },
      { title: 'Module 6: EOMS Audit Principles', duration: 60, video: '', free: false },
      { title: 'Module 7: Planning & Conducting EOMS Audits', duration: 60, video: '', free: false },
      { title: 'Module 8: Case Study: University EOMS Audit', duration: 60, video: '', free: false },
      { title: 'Module 9: Case Study: School System EOMS Audit', duration: 60, video: '', free: false },
      { title: 'Final Examination (15 Questions, 80% to Pass)', duration: 120, video: '', free: false },
    ]
  },
  {
    id: 'iso-50001-la', title: 'ISO 50001:2018 Lead Auditor - Energy Management', category: 'iso', level: 'advanced', duration: 2400, lessons: 35, students: 280, rating: 4.6, price: 249, isFree: false,
    installment: { amount: 124.5, description: '50% now, 50% after 30 days' },
    image: '/assets/images/service-esg.jpg', instructor: 'Wael S. Alkhatib', instructorTitle: 'Exemplar Global Certified Lead Auditor',
    description: '40-hour Lead Auditor course for ISO 50001:2018 Energy Management System (EnMS). Covers energy planning, performance indicators, legal compliance, and audit techniques for energy efficiency.',
    video: '/assets/videos/iso-50001-intro.mp4',
    curriculum: [
      { title: 'Module 1: Introduction to Energy Management', duration: 60, video: '/assets/videos/courses/iso50001/m01-intro.mp4', free: true },
      { title: 'Module 2: ISO 50001:2018 Requirements', duration: 60, video: '', free: true },
      { title: 'Module 3: Energy Planning & Baselines', duration: 60, video: '', free: false },
      { title: 'Module 4: Energy Performance Indicators (EnPIs)', duration: 60, video: '', free: false },
      { title: 'Module 5: Legal & Regulatory Requirements', duration: 60, video: '', free: false },
      { title: 'Module 6: EnMS Audit Principles', duration: 60, video: '', free: false },
      { title: 'Module 7: Planning & Conducting EnMS Audits', duration: 60, video: '', free: false },
      { title: 'Module 8: Case Study: Industrial Energy Audit', duration: 60, video: '', free: false },
      { title: 'Module 9: Case Study: Commercial Building EnMS Audit', duration: 60, video: '', free: false },
      { title: 'Final Examination (15 Questions, 80% to Pass)', duration: 120, video: '', free: false },
    ]
  },
  {
    id: 'esg-strategy', title: 'ESG Strategy & Sustainability Reporting', category: 'esg', level: 'intermediate', duration: 1200, lessons: 20, students: 720, rating: 4.9, price: 199, isFree: false,
    installment: { amount: 99.5, description: '50% now, 50% after 30 days' },
    image: '/assets/images/insight-2.jpg', instructor: 'Sarah Al-Rashid', instructorTitle: 'ESG Strategy Director',
    description: 'Comprehensive ESG strategy course covering GRI Standards, SASB, TCFD, materiality assessment, sustainability reporting, and stakeholder engagement. Certificate of completion included.',
    video: '/assets/videos/course-esg-lesson1.mp4',
    curriculum: [
      { title: 'Introduction to ESG Frameworks', duration: 60, video: '', free: true },
      { title: 'Materiality Assessment Deep Dive', duration: 60, video: '', free: true },
      { title: 'GRI Standards Reporting', duration: 60, video: '', free: false },
      { title: 'SASB & TCFD Alignment', duration: 60, video: '', free: false },
      { title: 'Stakeholder Engagement', duration: 60, video: '', free: false },
      { title: 'Carbon Footprint Measurement', duration: 60, video: '', free: false },
      { title: 'ESG Data Collection & Analysis', duration: 60, video: '', free: false },
      { title: 'Sustainability Report Writing', duration: 60, video: '', free: false },
      { title: 'SDGs Alignment & Mapping', duration: 60, video: '', free: false },
      { title: 'Case Studies: ESG in MENA Region', duration: 60, video: '', free: false },
      { title: 'Final Examination (10 Questions, 75% to Pass)', duration: 120, video: '', free: false },
    ]
  },
  {
    id: 'ai-compliance', title: 'AI-Powered Compliance Management', category: 'ai', level: 'intermediate', duration: 600, lessons: 12, students: 320, rating: 4.9, price: 0, isFree: true,
    image: '/assets/images/dashboard-preview.jpg', instructor: 'Pioneers AI Team', instructorTitle: 'AI & Compliance Specialists',
    description: 'Free course on how artificial intelligence is revolutionizing compliance management with automated monitoring and predictive analytics.',
    video: '',
    curriculum: [
      { title: 'AI in Compliance Overview', duration: 30, video: '', free: true },
      { title: 'Automated Monitoring Systems', duration: 30, video: '', free: true },
      { title: 'Predictive Risk Analytics', duration: 30, video: '', free: true },
      { title: 'Intelligent Reporting Tools', duration: 30, video: '', free: true },
    ]
  },
];

export default function LMS() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { items, addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLevel, setActiveLevel] = useState('all');
  const cartIds = items.map(i => i.id);

  const categories = [
    { key: 'all', label: t('lms.allCategories', { defaultValue: 'All Categories' }), icon: Filter },
    { key: 'iso', label: 'ISO Standards', icon: ShieldCheck },
    { key: 'esg', label: 'ESG', icon: Leaf },
    { key: 'ai', label: 'AI & Technology', icon: Sparkles },
  ];

  const levels = ['all', 'beginner', 'intermediate', 'advanced'];

  const filtered = allCoursesData.filter(c => {
    const catMatch = activeCategory === 'all' || c.category === activeCategory;
    const levelMatch = activeLevel === 'all' || c.level === activeLevel;
    const searchMatch = !searchQuery || c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return catMatch && levelMatch && searchMatch;
  });

  return (
    <div>
      <SEO title="Learning Management System | Pioneers International" description="Master ISO standards with expert-led Lead Auditor video courses. Exemplar Global certified training." />

      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-center justify-center gradient-navy">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.1) 39px, rgba(255,255,255,0.1) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.1) 39px, rgba(255,255,255,0.1) 40px)` }} />
        <div className="relative z-10 content-container text-center px-4">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-emerald/20 flex items-center justify-center mx-auto mb-6">
            <Award className="w-10 h-10 text-emerald" />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-h1 text-white">Exemplar Global Certified Lead Auditor Courses</motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-body-lg text-slate-300 mt-4 max-w-2xl mx-auto">Master ISO 9001, 14001, 45001, 22000, 27001, 21001, 50001 & HACCP with 40-hour certified Lead Auditor training programs. Certificates valid for 10 years.</motion.p>

          {/* Search */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="max-w-xl mx-auto mt-8 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search Lead Auditor courses..."
              className="w-full h-14 pl-12 pr-4 bg-white/10 border border-white/20 rounded-full text-white placeholder:text-slate-400 focus:border-emerald focus:ring-2 focus:ring-emerald/20 outline-none backdrop-blur-sm" />
          </motion.div>
        </div>
      </section>

      {/* Filters & Courses */}
      <section className="bg-white section-padding">
        <div className="content-container">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
            <div className="flex gap-2 flex-wrap">
              {categories.map(cat => (
                <button key={cat.key} onClick={() => setActiveCategory(cat.key)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat.key ? 'bg-emerald text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                  <cat.icon className="w-3.5 h-3.5" /> {cat.label}
                </button>
              ))}
            </div>
            <div className="flex gap-2 ml-auto">
              {levels.map(l => (
                <button key={l} onClick={() => setActiveLevel(l)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeLevel === l ? 'bg-navy text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                  {l === 'all' ? 'All Levels' : l.charAt(0).toUpperCase() + l.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Course Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course, i) => (
              <motion.div key={course.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                whileHover={{ y: -6 }}
                onClick={() => navigate(`/lms/course/${course.id}`)}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all group">
                <div className="relative h-44 overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {course.video && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 text-navy ml-0.5" />
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2 bg-navy/80 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
                    {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                  </div>
                  {course.isFree ? (
                    <div className="absolute top-2 right-2 bg-emerald text-white text-xs font-bold px-2.5 py-1 rounded-full">Free</div>
                  ) : (
                    <div className="absolute top-2 right-2 bg-navy text-white text-xs font-bold px-2.5 py-1 rounded-full">${course.price}</div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium bg-emerald-light text-emerald px-2 py-0.5 rounded-full uppercase">{course.category}</span>
                    <span className="text-xs text-slate-400 flex items-center gap-1"><Star className="w-3 h-3 fill-amber text-amber" />{course.rating}</span>
                    {course.id.includes('-la') && (
                      <span className="text-xs bg-amber-light text-amber font-medium px-2 py-0.5 rounded-full flex items-center gap-1"><Award className="w-3 h-3" />Lead Auditor</span>
                    )}
                  </div>
                  <h3 className="font-semibold text-slate-800 text-sm mb-2 line-clamp-2 group-hover:text-emerald transition-colors">{course.title}</h3>
                  <p className="text-xs text-slate-500 mb-3">{course.instructor}</p>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{course.lessons} lessons</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{Math.round(course.duration / 60)}h</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" />{course.students.toLocaleString()}</span>
                  </div>
                  {!course.isFree && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!cartIds.includes(course.id)) {
                          addItem({ id: course.id, type: 'course', title: course.title, price: course.price, image: course.image });
                        }
                      }}
                      className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                        cartIds.includes(course.id)
                          ? 'bg-emerald/10 text-emerald border border-emerald/20'
                          : 'bg-emerald text-white hover:bg-emerald-dark'
                      }`}>
                      {cartIds.includes(course.id) ? <><Check className="w-3.5 h-3.5" /> In Cart</> : <><ShoppingCart className="w-3.5 h-3.5" /> Add to Cart</>}
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 text-lg">No courses found matching your criteria.</p>
              <button onClick={() => { setActiveCategory('all'); setActiveLevel('all'); setSearchQuery(''); }} className="mt-4 text-emerald font-medium hover:underline">Clear Filters</button>
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-slate-50 section-padding">
        <div className="content-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Award, label: 'Lead Auditor Courses', value: '8' },
              { icon: Users, label: 'Certified Students', value: '6,530+' },
              { icon: ShieldCheck, label: 'Exemplar Global Certified', value: '100%' },
              { icon: Clock, label: 'Hours of Content', value: '320+' },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center p-6 bg-white rounded-2xl border border-slate-200">
                <stat.icon className="w-8 h-8 text-emerald mx-auto mb-3" />
                <div className="text-2xl font-bold text-navy">{stat.value}</div>
                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription CTA */}
      <section className="gradient-navy section-padding">
        <div className="content-container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-h2 text-white mb-4">Get Group Discounts for Your Team</h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-8">Register 3+ participants and receive up to 25% discount. All courses include Exemplar Global certification valid for 10 years.</p>
            <button onClick={() => navigate('/lms/subscription')}
              className="inline-flex items-center gap-2 px-8 py-3 bg-emerald text-white rounded-full font-semibold hover:bg-emerald-dark transition-colors">
              View Group Plans <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
