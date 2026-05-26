import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FileText, BookOpen, ShieldCheck, Leaf, HardHat, UtensilsCrossed, Lock as LockIcon, GraduationCap, Award, ShoppingCart, Star, Check, CreditCard, ArrowRight, Search, Eye, X, Lock } from 'lucide-react';
import SEO from '@/components/SEO';

export interface PDFMaterial {
  id: string;
  title: string;
  description: string;
  standard: string;
  standardShort: string;
  pages: number;
  price: number;
  discountPrice?: number;
  language: 'en' | 'ar' | 'both';
  format: string;
  icon: React.ElementType;
  category: string;
  color: string;
  inStock: boolean;
  features: string[];
  includesPowerPoint: boolean;
  previewPages: number;
  toc: string[];
  sampleContent: string[];
}

export const pdfMaterials: PDFMaterial[] = [
  {
    id: 'pdf-9001-en',
    title: 'ISO 9001:2015 Lead Auditor Training Manual (English)',
    description: 'Complete 200-page training manual covering all clauses of ISO 9001:2015 with audit checklists, case studies, and templates. Includes PowerPoint presentation with Pioneers International branding.',
    standard: 'ISO 9001:2015 Quality Management Systems',
    standardShort: 'ISO 9001',
    pages: 200,
    price: 149.99,
    discountPrice: 99.99,
    language: 'en',
    format: 'PDF + PPT',
    icon: ShieldCheck,
    category: 'iso',
    color: 'text-emerald',
    inStock: true,
    features: ['200 pages', 'Audit checklists', 'Case studies', 'Templates', 'PPT included', '2026 updates'],
    includesPowerPoint: true,
    previewPages: 5,
    toc: [
      'Cover Page & Copyright',
      'Table of Contents',
      'Introduction to ISO 9001:2015',
      'Clause 4: Context of the Organization',
      'Clause 5: Leadership',
      'Clause 6: Planning',
      'Clause 7: Support',
      'Clause 8: Operation',
      'Clause 9: Performance Evaluation',
      'Clause 10: Improvement',
      'Annex A: Audit Checklists',
      'Annex B: Case Studies',
      'Annex C: Templates & Forms',
      'PowerPoint Slides Index'
    ],
    sampleContent: [
      'INTRODUCTION TO ISO 9001:2015\n\nISO 9001:2015 sets out the criteria for a quality management system and is the only standard in the family that can be certified to (although this is not a requirement). It can be used by any organization, large or small, regardless of its field of activity. In fact, there are over one million companies and organizations in over 170 countries certified to ISO 9001.\n\nThis standard is based on a number of quality management principles including a strong customer focus, the motivation and implication of top management, the process approach and continual improvement.',
      'CLAUSE 4: CONTEXT OF THE ORGANIZATION (4.1-4.4)\n\n4.1 Understanding the organization and its context\n\nThe organization shall determine external and internal issues that are relevant to its purpose and its strategic direction and that affect its ability to achieve the intended result(s) of its quality management system.\n\nKey audit questions:\n- How does top management monitor external issues (market trends, regulations, technology)?\n- What internal issues are considered (culture, resources, knowledge)?\n- How are these issues reviewed during management review?',
      'ANNEX A: AUDIT CHECKLIST - CLAUSE 5: LEADERSHIP\n\nAuditor: _______________ Date: _______________\n\n5.1 Leadership and commitment (5.1.1 - 5.1.2)\n[ ] Evidence that top management takes accountability for QMS effectiveness\n[ ] Quality policy is established and communicated\n[ ] Quality objectives are established and integrated\n[ ] Resources for QMS are available\n\nFindings: _________________________________________________'
    ],
  },
  {
    id: 'pdf-9001-ar',
    title: 'دليل تدريب Lead Auditor ISO 9001:2015 (عربي)',
    description: 'دليل تدريب كامل 200 صفحة يغطي جميع بنود ISO 9001:2015 مع قوائم التدقيق ودراسات الحالة والقوالب. يتضمن عرض PowerPoint بعلامة Pioneers International التجارية.',
    standard: 'ISO 9001:2015 نظم إدارة الجودة',
    standardShort: 'ISO 9001',
    pages: 200,
    price: 149.99,
    discountPrice: 99.99,
    language: 'ar',
    format: 'PDF + PPT',
    icon: ShieldCheck,
    category: 'iso',
    color: 'text-emerald',
    inStock: true,
    features: ['200 صفحة', 'قوائم تدقيق', 'دراسات حالة', 'قوالب جاهزة', 'عرض PPT', 'تحديثات 2026'],
    includesPowerPoint: true,
    previewPages: 5,
    toc: [
      'الصفحة الأولى وحقوق النشر',
      'جدول المحتويات',
      'مقدمة في ISO 9001:2015',
      'البند 4: سياق المنظمة',
      'البند 5: القيادة',
      'البند 6: التخطيط',
      'البند 7: الدعم',
      'البند 8: التشغيل',
      'البند 9: تقييم الأداء',
      'البند 10: التحسين',
      'الملحق أ: قوائم التدقيق',
      'الملحق ب: دراسات الحالة',
      'الملحق ج: النماذج والاستمارات',
      'فهرس شرائح PowerPoint'
    ],
    sampleContent: [
      'مقدمة في ISO 9001:2015\n\nيحدد معيار ISO 9001:2015 معايير نظام إدارة الجودة وهو المعيار الوحيد في المجموعة الذي يمكن الحصول على شهادة الالتزام به (على الرغم من أن ذلك ليس إلزامياً). يمكن استخدامه من قبل أي مؤسسة، كبيرة كانت أم صغيرة، بغض النظر عن مجال نشاطها. في الواقع، هناك أكثر من مليون شركة ومؤسسة في أكثر من 170 دولة حاصلة على شهادة ISO 9001.',
      'البند 4: سياق المنظمة (4.1-4.4)\n\n4.1 فهم المنظمة وسياقها\n\nيجب على المنظمة تحديد القضايا الخارجية والداخلية ذات الصلة بغرضها وتوجهها الاستراتيجي والتي تؤثر على قدرتها على تحقيق النتائج المرجوة لنظام إدارة الجودة.\n\nأسئلة التدقيق الرئيسية:\n- كيف يراقب الإدارة العليا القضايا الخارجية (اتجاهات السوق، اللوائح، التكنولوجيا)؟\n- ما هي القضايا الداخلية التي تم أخذها بعين الاعتبار (الثقافة، الموارد، المعرفة)؟',
      'الملحق أ: قائمة تدقيق - البند 5: القيادة\n\nالمُدقِّق: _______________ التاريخ: _______________\n\n5.1 القيادة والالتزام (5.1.1 - 5.1.2)\n[ ] دليل على أن الإدارة العليا تتحمل المسؤولية عن فعالية نظام إدارة الجودة\n[ ] تم إنشاء سياسة الجودة وتوصيلها\n[ ] تم تحديد أهداف الجودة ودمجها\n[ ] توجد موارد لنظام إدارة الجودة\n\nالملاحظات: _________________________________________________'
    ],
  },
  {
    id: 'pdf-14001-en',
    title: 'ISO 14001:2015 Lead Auditor Training Manual (English)',
    description: 'Comprehensive 180-page manual for environmental management system auditing. Includes life cycle perspective, legal compliance checklists, and environmental aspect assessment templates.',
    standard: 'ISO 14001:2015 Environmental Management',
    standardShort: 'ISO 14001',
    pages: 180,
    price: 149.99,
    discountPrice: 99.99,
    language: 'en',
    format: 'PDF + PPT',
    icon: Leaf,
    category: 'iso',
    color: 'text-green-600',
    inStock: true,
    features: ['180 pages', 'LCA templates', 'Legal compliance', 'Aspect assessment', 'PPT included', '2026 updates'],
    includesPowerPoint: true,
    previewPages: 5,
    toc: [
      'Cover & Copyright',
      'Table of Contents',
      'Introduction to ISO 14001:2015',
      'Clause 4: Context of the Organization',
      'Clause 5: Leadership',
      'Clause 6: Planning - Environmental Aspects',
      'Clause 7: Support',
      'Clause 8: Operation',
      'Clause 9: Performance Evaluation',
      'Clause 10: Improvement',
      'Life Cycle Perspective Guide',
      'Legal Compliance Register Template',
      'Environmental Audit Checklists'
    ],
    sampleContent: [
      'INTRODUCTION TO ISO 14001:2015\n\nISO 14001:2015 specifies the requirements for an environmental management system that an organization can use to enhance its environmental performance. The intended outcomes of an environmental management system include:\n\n1. Enhancement of environmental performance\n2. Fulfilment of compliance obligations\n3. Achievement of environmental objectives\n\nThis manual provides auditors with practical guidance for assessing each clause of the standard against real-world organizational contexts.',
      'CLAUSE 6: PLANNING (6.1 - 6.2)\n\n6.1.2 Environmental aspects\n\nWithin the defined scope of the environmental management system, the organization shall determine the environmental aspects of its activities, products and services that it can control and those that it can influence, and their associated environmental impacts, considering a life cycle perspective.\n\nAudit verification:\n- Are environmental aspects identified for all operational processes?\n- Is a life cycle perspective applied (raw material extraction to end-of-life)?',
      'LIFE CYCLE PERSPECTIVE GUIDE\n\nStage 1: Raw Material Acquisition\n- Identify suppliers and their environmental practices\n- Assess transportation impacts\n\nStage 2: Manufacturing/Production\n- Energy consumption per unit output\n- Waste generation rates\n- Water usage and discharge quality\n\nStage 3: Distribution\n- Packaging material choices\n- Logistics carbon footprint\n\nStage 4: Use Phase\n- Product energy efficiency\n- Maintenance requirements\n\nStage 5: End-of-Life\n- Recyclability assessment\n- Disposal method impacts'
    ],
  },
  {
    id: 'pdf-14001-ar',
    title: 'دليل تدريب Lead Auditor ISO 14001:2015 (عربي)',
    description: 'دليل شامل 180 صفحة لتدقيق نظم الإدارة البيئية. يتضمن منظور دورة الحياة، قوائم الامتثال القانوني، وقوالب تقييم الجوانب البيئية.',
    standard: 'ISO 14001:2015 الإدارة البيئية',
    standardShort: 'ISO 14001',
    pages: 180,
    price: 149.99,
    discountPrice: 99.99,
    language: 'ar',
    format: 'PDF + PPT',
    icon: Leaf,
    category: 'iso',
    color: 'text-green-600',
    inStock: true,
    features: ['180 صفحة', 'قوالب دورة الحياة', 'امتثال قانوني', 'تقييم الجوانب', 'عرض PPT', 'تحديثات 2026'],
    includesPowerPoint: true,
    previewPages: 5,
    toc: [
      'الغلاف وحقوق النشر',
      'جدول المحتويات',
      'مقدمة في ISO 14001:2015',
      'البند 4: سياق المنظمة',
      'البند 5: القيادة',
      'البند 6: التخطيط - الجوانب البيئية',
      'البند 7: الدعم',
      'البند 8: التشغيل',
      'البند 9: تقييم الأداء',
      'البند 10: التحسين',
      'دليل منظور دورة الحياة',
      'نموذج سجل الامتثال القانوني',
      'قوائم تدقيق بيئية'
    ],
    sampleContent: [
      'مقدمة في ISO 14001:2015\n\nيحدد معيار ISO 14001:2015 متطلبات نظام الإدارة البيئية الذي يمكن للمؤسسة استخدامه لتعزيز أدائها البيئي. تشمل النتائج المرجوة لنظام الإدارة البيئية:\n\n1. تعزيز الأداء البيئي\n2. الوفاء بالتزامات الامتثال\n3. تحقيق الأهداف البيئية\n\nيوفر هذا الدليل للمُدقِّقين إرشادات عملية لتقييم كل بند من المعيار في سياقات المنظمات الواقعية.',
      'البند 6: التخطيط (6.1 - 6.2)\n\n6.1.2 الجوانب البيئية\n\nيجب على المنظمة ضمن النطاق المحدد لنظام الإدارة البيئية تحديد الجوانب البيئية لأنشطتها ومنتجاتها وخدماتها التي يمكنها التحكم فيها وتلك التي يمكنها التأثير فيها، والآثار البيئية المرتبطة بها، مع مراعاة منظور دورة الحياة.',
      'دليل منظور دورة الحياة\n\nالمرحلة 1: الحصول على المواد الأولية\n- تحديد الموردين وممارساتهم البيئية\n- تقييم آثار النقل\n\nالمرحلة 2: التصنيع/الإنتاج\n- استهلاك الطاقة لكل وحدة إنتاج\n- معدلات توليد النفايات\n- استخدام المياه وجودة التصريف'
    ],
  },
  {
    id: 'pdf-45001-en',
    title: 'ISO 45001:2018 Lead Auditor Training Manual (English)',
    description: '180-page OH&S management system auditing manual with hazard identification frameworks, risk matrices, incident investigation templates, and worker participation guides.',
    standard: 'ISO 45001:2018 OH&S Management',
    standardShort: 'ISO 45001',
    pages: 180,
    price: 149.99,
    discountPrice: 99.99,
    language: 'en',
    format: 'PDF + PPT',
    icon: HardHat,
    category: 'iso',
    color: 'text-orange-500',
    inStock: true,
    features: ['180 pages', 'Hazard frameworks', 'Risk matrices', 'Incident templates', 'PPT included', 'Worker participation'],
    includesPowerPoint: true,
    previewPages: 5,
    toc: [
      'Cover & Copyright',
      'Table of Contents',
      'Introduction to ISO 45001:2018',
      'Clause 4: Context of the Organization',
      'Clause 5: Leadership & Worker Participation',
      'Clause 6: Planning - Hazard Identification',
      'Clause 7: Support',
      'Clause 8: Operation',
      'Clause 9: Performance Evaluation',
      'Clause 10: Improvement',
      'Risk Assessment Matrix Template',
      'Incident Investigation Guide',
      'OH&S Audit Checklists'
    ],
    sampleContent: [
      'INTRODUCTION TO ISO 45001:2018\n\nISO 45001:2018 specifies requirements for an occupational health and safety (OH&S) management system, and gives guidance for its use, to enable organizations to provide safe and healthy workplaces by preventing work-related injury and ill health, as well as by proactively improving its OH&S performance.',
      'CLAUSE 6: PLANNING - HAZARD IDENTIFICATION (6.1.2)\n\nWhen determining hazards and assessing OH&S risks, the organization shall consider:\n- How work is organized, managed and carried out\n- Past incidents, internal or external to the organization\n- Human factors including ergonomics and mental health\n- New or changed hazards from proposed changes\n- Situations not controlled by the organization (visitors, contractors)',
      'RISK ASSESSMENT MATRIX\n\n                Likelihood\n         Low    Med    High\nSeverity\nLow      1      2      3\nMed      2      3      4\nHigh     3      4      5\n\nRisk Score Actions:\n1-2: No immediate action required\n3: Monitor and review\n4-5: Immediate corrective action required'
    ],
  },
  {
    id: 'pdf-45001-ar',
    title: 'دليل تدريب Lead Auditor ISO 45001:2018 (عربي)',
    description: 'دليل 180 صفحة لتدقيق نظم إدارة السلامة والصحة المهنية. يتضمن أطر تحديد المخاطر، مصفوفات المخاطر، قوالب التحقيق في الحوادث، وأدلة مشاركة العمال.',
    standard: 'ISO 45001:2018 السلامة والصحة المهنية',
    standardShort: 'ISO 45001',
    pages: 180,
    price: 149.99,
    discountPrice: 99.99,
    language: 'ar',
    format: 'PDF + PPT',
    icon: HardHat,
    category: 'iso',
    color: 'text-orange-500',
    inStock: true,
    features: ['180 صفحة', 'أطر المخاطر', 'مصفوفات المخاطر', 'قوالب الحوادث', 'عرض PPT', 'مشاركة العمال'],
    includesPowerPoint: true,
    previewPages: 5,
    toc: [
      'الغلاف وحقوق النشر',
      'جدول المحتويات',
      'مقدمة في ISO 45001:2018',
      'البند 4: سياق المنظمة',
      'البند 5: القيادة ومشاركة العمال',
      'البند 6: التخطيط - تحديد المخاطر',
      'البند 7: الدعم',
      'البند 8: التشغيل',
      'البند 9: تقييم الأداء',
      'البند 10: التحسين',
      'نموذج مصفوفة تقييم المخاطر',
      'دليل التحقيق في الحوادث',
      'قوائم تدقيق السلامة والصحة المهنية'
    ],
    sampleContent: [
      'مقدمة في ISO 45001:2018\n\nيحدد معيار ISO 45001:2018 متطلبات نظام إدارة السلامة والصحة المهنية، ويوفر إرشادات لاستخدامه، لتمكين المنظمات من توفير أماكن عمل آمنة وصحية من خلال منع الإصابات والأمراض المهنية، بالإضافة إلى تحسين أدائها في السلامة والصحة المهنية بشكل استباقي.',
      'البند 6: التخطيط - تحديد المخاطر (6.1.2)\n\nعند تحديد المخاطر وتقييم مخاطر السلامة والصحة المهنية، يجب على المنظمة مراعاة:\n- كيفية تنظيم العمل وإدارته وتنفيذه\n- الحوادث السابقة، داخل المنظمة أو خارجها\n- العوامل البشرية بما في ذلك علم الميكانيكا الحيوية والصحة العقلية\n- المخاطر الجديدة أو المتغيرة من التغييرات المقترحة',
      'مصفوفة تقييم المخاطر\n\n                الاحتمالية\n         منخفض  متوسط  مرتفع\nالخطورة\nمنخفضة   1      2      3\nمتوسطة    2      3      4\nمرتفعة    3      4      5\n\nإجراءات درجة الخطورة:\n1-2: لا يتطلب إجراء فوري\n3: مراقبة ومراجعة\n4-5: يتطلب إجراء تصحيحي فوري'
    ],
  },
  {
    id: 'pdf-22000-en',
    title: 'ISO 22000:2018 + HACCP Lead Auditor Training Manual (English)',
    description: '200-page food safety management manual with HACCP principles, prerequisite programs, CCP decision trees, traceability frameworks, and withdrawal/recall procedures.',
    standard: 'ISO 22000:2018 Food Safety + HACCP',
    standardShort: 'ISO 22000',
    pages: 200,
    price: 179.99,
    discountPrice: 129.99,
    language: 'en',
    format: 'PDF + PPT',
    icon: UtensilsCrossed,
    category: 'iso',
    color: 'text-red-500',
    inStock: true,
    features: ['200 pages', 'HACCP principles', 'CCP trees', 'Traceability', 'PPT included', 'FSSC alignment'],
    includesPowerPoint: true,
    previewPages: 5,
    toc: [
      'Cover & Copyright',
      'Table of Contents',
      'Introduction to ISO 22000:2018 + HACCP',
      'Clause 4: Context of the Organization',
      'Clause 5: Leadership',
      'Clause 6: Planning - HACCP Principles',
      'Clause 7: Support',
      'Clause 8: Operation - PRPs',
      'Clause 9: Performance Evaluation',
      'Clause 10: Improvement',
      'CCP Decision Tree Template',
      'Traceability Framework',
      'Food Safety Audit Checklists'
    ],
    sampleContent: [
      'INTRODUCTION TO ISO 22000:2018\n\nISO 22000:2018 sets out the requirements for a food safety management system (FSMS) and can be certified to. It maps out what an organization needs to do to demonstrate its ability to control food safety hazards in order to ensure that food is safe.\n\nThe standard combines the key elements of interactive communication, system management, prerequisite programs (PRPs) and the principles of HACCP.',
      'HACCP PRINCIPLE 1: HAZARD ANALYSIS (Clause 8.5.4)\n\nThe food safety team shall conduct a hazard analysis to determine which hazards need to be controlled, the degree of control required, and which combination of control measures is required.\n\nBiological Hazards:\n- Pathogenic bacteria (Salmonella, Listeria, E.coli)\n- Viruses (Hepatitis A, Norovirus)\n- Parasites (Trichinella, Cryptosporidium)',
      'CCP DECISION TREE\n\nQ1: Does this step have a hazard that must be controlled?\n   NO -> Not a CCP\n   YES -> Go to Q2\n\nQ2: Is control at this step necessary for safety?\n   NO -> Not a CCP, modify step/process/product\n   YES -> Go to Q3\n\nQ3: Will a subsequent step eliminate or reduce the hazard?\n   YES -> Not a CCP, identify subsequent step\n   NO -> This is a CCP -> Establish critical limits'
    ],
  },
  {
    id: 'pdf-22000-ar',
    title: 'دليل تدريب Lead Auditor ISO 22000 + HACCP (عربي)',
    description: 'دليل 200 صفحة لإدارة سلامة الغذاء مع مبادئ HACCP، البرامج المسبقة، أشجار CCP، أطر التتبع، وإجراءات السحب/الاستدعاء.',
    standard: 'ISO 22000:2018 سلامة الغذاء + HACCP',
    standardShort: 'ISO 22000',
    pages: 200,
    price: 179.99,
    discountPrice: 129.99,
    language: 'ar',
    format: 'PDF + PPT',
    icon: UtensilsCrossed,
    category: 'iso',
    color: 'text-red-500',
    inStock: true,
    features: ['200 صفحة', 'مبادئ HACCP', 'أشجار CCP', 'التتبع', 'عرض PPT', 'محاذاة FSSC'],
    includesPowerPoint: true,
    previewPages: 5,
    toc: [
      'الغلاف وحقوق النشر',
      'جدول المحتويات',
      'مقدمة في ISO 22000:2018 + HACCP',
      'البند 4: سياق المنظمة',
      'البند 5: القيادة',
      'البند 6: التخطيط - مبادئ HACCP',
      'البند 7: الدعم',
      'البند 8: التشغيل - البرامج المسبقة',
      'البند 9: تقييم الأداء',
      'البند 10: التحسين',
      'نموذج شجرة قرار CCP',
      'إطار التتبع',
      'قوائم تدقيق سلامة الغذاء'
    ],
    sampleContent: [
      'مقدمة في ISO 22000:2018\n\nيحدد معيار ISO 22000:2018 متطلبات نظام إدارة سلامة الغذاء (FSMS) ويمكن الحصول على شهادة الالتزام به. يوضح ما يجب على المنظمة فعله لإثبات قدرتها على التحكم في مخاطر سلامة الغذاء لضمان أن الغذاء آمناً.\n\nيجمع المعيار بين العناصر الرئيسية للتواصل التفاعلي، وإدارة النظام، والبرامج المسبقة (PRPs)، ومبادئ HACCP.',
      'مبدأ HACCP 1: تحليل المخاطر (البند 8.5.4)\n\nيجب على فريق سلامة الغذاء إجراء تحليل للمخاطر لتحديد المخاطر التي يجب التحكم فيها، ودرجة التحكم المطلوبة، والمزيج المطلوب من تدابير التحكم.\n\nالمخاطر البيولوجية:\n- البكتيريا المرضية (Salmonella, Listeria, E.coli)\n- الفيروسات (التهاب الكبد A، Norovirus)\n- الطفيليات (Trichinella, Cryptosporidium)',
      'شجرة قرار CCP\n\nس1: هل توجد مخاطر في هذه الخطوة يجب التحكم فيها؟\n   لا -> ليست CCP\n   نعم -> انتقل إلى س2\n\nس2: هل التحكم في هذه الخطوة ضروري للسلامة؟\n   لا -> ليست CCP، عدّل الخطوة/العملية/المنتج\n   نعم -> انتقل إلى س3\n\nس3: هل ستقضي خطوة لاحقة على المخاطر أو تقللها؟\n   نعم -> ليست CCP، حدد الخطوة اللاحقة\n   لا -> هذه CCP -> حدد الحدود الحرجة'
    ],
  },
  {
    id: 'pdf-27001-en',
    title: 'ISO 27001:2022 Lead Auditor Training Manual (English)',
    description: '220-page information security management manual covering Annex A controls (93 controls), risk treatment, SoA development, and cybersecurity audit techniques.',
    standard: 'ISO 27001:2022 Information Security',
    standardShort: 'ISO 27001',
    pages: 220,
    price: 179.99,
    discountPrice: 129.99,
    language: 'en',
    format: 'PDF + PPT',
    icon: LockIcon,
    category: 'iso',
    color: 'text-indigo-600',
    inStock: true,
    features: ['220 pages', 'Annex A controls', 'SoA development', 'Cybersecurity', 'PPT included', 'CIA triad'],
    includesPowerPoint: true,
    previewPages: 5,
    toc: [
      'Cover & Copyright',
      'Table of Contents',
      'Introduction to ISO 27001:2022',
      'Clause 4: Context of the Organization',
      'Clause 5: Leadership',
      'Clause 6: Planning - Risk Assessment',
      'Clause 7: Support',
      'Clause 8: Operation - Annex A Controls',
      'Clause 9: Performance Evaluation',
      'Clause 10: Improvement',
      'Annex A: 93 Security Controls',
      'SoA (Statement of Applicability) Template',
      'Information Security Audit Guide'
    ],
    sampleContent: [
      'INTRODUCTION TO ISO 27001:2022\n\nISO/IEC 27001:2022 specifies the requirements for establishing, implementing, maintaining and continually improving an information security management system within the context of the organization.\n\nThe 2022 revision introduced significant changes including:\n- Restructured Annex A with 93 controls (reduced from 114)\n- Alignment with ISO 27002:2022\n- New control categories: Organizational, People, Physical, Technological',
      'CLAUSE 6: PLANNING - INFORMATION SECURITY RISK ASSESSMENT (6.1.2)\n\nThe organization shall define and apply an information security risk assessment process that:\n- Establishes and maintains criteria for risk acceptance\n- Identifies information security risks and their owners\n- Analyzes the potential consequences and realistic likelihood\n- Evaluates risks against acceptance criteria and prioritizes them\n\nCIA Triad considerations:\nConfidentiality | Integrity | Availability',
      'ANNEX A: ORGANIZATIONAL CONTROLS (A.5 - A.7)\n\nA.5.1 Policies for information security\n- Management direction and support for information security shall be demonstrated in accordance with business requirements, relevant laws and regulations.\n\nA.5.2 Information security roles and responsibilities\n- Information security roles and responsibilities shall be defined and allocated in accordance with the organizational needs.\n\nA.5.3 Segregation of duties\n- Conflicting duties and conflicting areas of responsibility shall be segregated to reduce opportunities for unauthorized modification or misuse.'
    ],
  },
  {
    id: 'pdf-27001-ar',
    title: 'دليل تدريب Lead Auditor ISO 27001:2022 (عربي)',
    description: 'دليل 220 صفحة لإدارة أمن المعلومات يغطي ضوابط الملحق أ (93 ضابطة)، معالجة المخاطر، تطوير SoA، وتقنيات تدقيق الأمن السيبراني.',
    standard: 'ISO 27001:2022 أمن المعلومات',
    standardShort: 'ISO 27001',
    pages: 220,
    price: 179.99,
    discountPrice: 129.99,
    language: 'ar',
    format: 'PDF + PPT',
    icon: LockIcon,
    category: 'iso',
    color: 'text-indigo-600',
    inStock: true,
    features: ['220 صفحة', 'ضوابط الملحق أ', 'تطوير SoA', 'الأمن السيبراني', 'عرض PPT', 'مثلث CIA'],
    includesPowerPoint: true,
    previewPages: 5,
    toc: [
      'الغلاف وحقوق النشر',
      'جدول المحتويات',
      'مقدمة في ISO 27001:2022',
      'البند 4: سياق المنظمة',
      'البند 5: القيادة',
      'البند 6: التخطيط - تقييم المخاطر',
      'البند 7: الدعم',
      'البند 8: التشغيل - ضوابط الملحق أ',
      'البند 9: تقييم الأداء',
      'البند 10: التحسين',
      'الملحق أ: 93 ضابطة أمنية',
      'نموذج بيان القابلية للتطبيق (SoA)',
      'دليل تدقيق أمن المعلومات'
    ],
    sampleContent: [
      'مقدمة في ISO 27001:2022\n\nيحدد معيار ISO/IEC 27001:2022 متطلبات إنشاء وتنفيذ وصيانة وتحسين نظام إدارة أمن المعلومات بشكل مستمر ضمن سياق المنظمة.\n\nأدى التنقيح لعام 2022 إلى تغييرات كبيرة بما في ذلك:\n- إعادة هيكلة الملحق أ مع 93 ضابطة (مخفضة من 114)\n- محاذاة مع ISO 27002:2022\n- فئات ضوابط جديدة: تنظيمية، بشرية، مادية، تكنولوجية',
      'البند 6: التخطيط - تقييم مخاطر أمن المعلومات (6.1.2)\n\nيجب على المنظمة تحديد وتطبيق عملية تقييم مخاطر أمن المعلومات التي:\n- تُنشئ وتحافظ على معايير قبول المخاطر\n- تحدد مخاطر أمن المعلومات ومالكيها\n- تحلل العواقب المحتملة والاحتمالية الواقعية\n- تقيّم المخاطر مقابل معايير القبول وترتبها\n\nاعتبارات مثلث CIA:\nالسرية | النزاهة | التوفر',
      'الملحق أ: الضوابط التنظيمية (أ.5 - أ.7)\n\nأ.5.1 سياسات أمن المعلومات\n- يجب إثبات التوجيه والدعم الإداري لأمن المعلومات بما يتوافق مع متطلبات الأعمال والقوانين واللوائح المعمول بها.\n\nأ.5.2 أدوار ومسؤوليات أمن المعلومات\n- يجب تحديد وتخصيص أدوار ومسؤوليات أمن المعلومات بما يتوافق مع احتياجات المنظمة.\n\nأ.5.3 فصل المهام\n- يجب فصل المهام المتعارضة ومناطق المسؤولية المتعارضة لتقليل فرص التعديل أو الاستخدام غير المصرح به.'
    ],
  },
  {
    id: 'pdf-21001-en',
    title: 'ISO 21001:2018 Lead Auditor Training Manual (English)',
    description: '160-page educational organizations management manual with learner-centric approach templates, curriculum mapping tools, and educational quality assessment frameworks.',
    standard: 'ISO 21001:2018 Educational Organizations',
    standardShort: 'ISO 21001',
    pages: 160,
    price: 129.99,
    discountPrice: 89.99,
    language: 'en',
    format: 'PDF + PPT',
    icon: GraduationCap,
    category: 'iso',
    color: 'text-blue-600',
    inStock: true,
    features: ['160 pages', 'Learner-centric', 'Curriculum mapping', 'Quality assessment', 'PPT included'],
    includesPowerPoint: true,
    previewPages: 5,
    toc: [
      'Cover & Copyright',
      'Table of Contents',
      'Introduction to ISO 21001:2018',
      'Clause 4: Context of the Organization',
      'Clause 5: Leadership & Commitment',
      'Clause 6: Planning - Educational Objectives',
      'Clause 7: Support',
      'Clause 8: Operation - Curriculum Management',
      'Clause 9: Performance Evaluation',
      'Clause 10: Improvement',
      'Learner-Centric Approach Guide',
      'Curriculum Mapping Template',
      'Educational Audit Checklists'
    ],
    sampleContent: [
      'INTRODUCTION TO ISO 21001:2018\n\nISO 21001:2018 specifies requirements for a management system for educational organizations (EOMS). It provides a common management tool for organizations providing educational products and services capable of meeting learner and other beneficiary requirements and needs.',
      'CLAUSE 6: PLANNING - EDUCATIONAL OBJECTIVES (6.2)\n\nWhen planning how to achieve its educational objectives, the organization shall determine:\n- What will be done\n- What resources will be required\n- Who will be responsible\n- When it will be completed\n- How the results will be evaluated\n\nKey educational objectives may include:\n- Learner satisfaction rates\n- Completion/graduation rates\n- Employment outcomes for graduates',
      'LEARNER-CENTRIC APPROACH GUIDE\n\nPrinciple 1: Focus on the learner\n- Design curricula around learner needs and learning outcomes\n- Provide multiple pathways to achieve objectives\n- Consider diverse learning styles and accessibility needs\n\nPrinciple 2: Involve learners in decisions\n- Regular feedback mechanisms (surveys, focus groups)\n- Learner representation in governance bodies\n- Co-creation of learning materials where appropriate'
    ],
  },
  {
    id: 'pdf-21001-ar',
    title: 'دليل تدريب Lead Auditor ISO 21001:2018 (عربي)',
    description: 'دليل 160 صفحة لإدارة المؤسسات التعليمية مع قوالب منظور المتعلم، أدوات رسم الخرائط المنهجية، وأطر تقييم الجودة التعليمية.',
    standard: 'ISO 21001:2018 المؤسسات التعليمية',
    standardShort: 'ISO 21001',
    pages: 160,
    price: 129.99,
    discountPrice: 89.99,
    language: 'ar',
    format: 'PDF + PPT',
    icon: GraduationCap,
    category: 'iso',
    color: 'text-blue-600',
    inStock: true,
    features: ['160 صفحة', 'منظور المتعلم', 'رسم الخرائط', 'تقييم الجودة', 'عرض PPT'],
    includesPowerPoint: true,
    previewPages: 5,
    toc: [
      'الغلاف وحقوق النشر',
      'جدول المحتويات',
      'مقدمة في ISO 21001:2018',
      'البند 4: سياق المنظمة',
      'البند 5: القيادة والالتزام',
      'البند 6: التخطيط - الأهداف التعليمية',
      'البند 7: الدعم',
      'البند 8: التشغيل - إدارة المنهج',
      'البند 9: تقييم الأداء',
      'البند 10: التحسين',
      'دليل منظور المتعلم',
      'نموذج رسم الخرائط المنهجية',
      'قوائم تدقيق تعليمية'
    ],
    sampleContent: [
      'مقدمة في ISO 21001:2018\n\nيحدد معيار ISO 21001:2018 متطلبات نظام إدارة للمؤسسات التعليمية (EOMS). يوفر أداة إدارة مشتركة للمؤسسات التي تقدم منتجات وخدمات تعليمية قادرة على تلبية متطلبات واحتياجات المتعلمين والمستفيدين الآخرين.',
      'البند 6: التخطيط - الأهداف التعليمية (6.2)\n\nعند التخطيط لكيفية تحقيق أهدافها التعليمية، يجب على المنظمة تحديد:\n- ما سيتم القيام به\n- الموارد المطلوبة\n- المسؤول عن التنفيذ\n- موعد الإنجاز\n- كيفية تقييم النتائج\n\nقد تشمل الأهداف التعليمية الرئيسية:\n- معدلات رضا المتعلمين\n- معدلات الإكمال/التخرج\n- نتائج التوظيف للخريجين',
      'دليل منظور المتعلم\n\nالمبدأ 1: التركيز على المتعلم\n- تصميم المناهج حول احتياجات المتعلمين ومخرجات التعلم\n- توفير مسارات متعددة لتحقيق الأهداف\n- مراعاة أنماط التعلم المتنوعة ومتطلبات الوصول\n\nالمبدأ 2: إشراك المتعلمين في القرارات\n- آليات تغذية راجعة منتظمة (استبيانات، مجموعات تركيز)\n- تمثيل المتعلمين في هيئات الحوكمة\n- التشارك في إنشاء المواد التعليمية حيثما يكون ذلك مناسباً'
    ],
  },
  {
    id: 'pdf-50001-en',
    title: 'ISO 50001:2018 Lead Auditor Training Manual (English)',
    description: '170-page energy management manual with EnPI development guides, energy baseline templates, and performance indicator frameworks for sustainable energy auditing.',
    standard: 'ISO 50001:2018 Energy Management',
    standardShort: 'ISO 50001',
    pages: 170,
    price: 149.99,
    discountPrice: 99.99,
    language: 'en',
    format: 'PDF + PPT',
    icon: Award,
    category: 'iso',
    color: 'text-yellow-600',
    inStock: true,
    features: ['170 pages', 'EnPI guides', 'Baseline templates', 'Performance indicators', 'PPT included'],
    includesPowerPoint: true,
    previewPages: 5,
    toc: [
      'Cover & Copyright',
      'Table of Contents',
      'Introduction to ISO 50001:2018',
      'Clause 4: Context of the Organization',
      'Clause 5: Leadership',
      'Clause 6: Planning - Energy Review',
      'Clause 7: Support',
      'Clause 8: Operation',
      'Clause 9: Performance Evaluation',
      'Clause 10: Improvement',
      'EnPI (Energy Performance Indicators) Guide',
      'Energy Baseline Template',
      'Energy Audit Checklists'
    ],
    sampleContent: [
      'INTRODUCTION TO ISO 50001:2018\n\nISO 50001:2018 specifies requirements for establishing, implementing, maintaining and improving an energy management system (EnMS). The purpose is to enable an organization to follow a systematic approach in achieving continual improvement of energy performance, including energy efficiency, energy use and consumption.',
      'CLAUSE 6: PLANNING - ENERGY REVIEW (6.3)\n\nThe organization shall establish methodology(ies) and criteria for development and update of the energy review. The energy review shall include the following:\n- Analysis of energy use and consumption based on appropriate data\n- Identification of areas of significant energy use (SEUs)\n- Identification of applicable variables affecting SEUs\n- Determination of current energy performance of SEUs and personnel affecting them',
      'EnPI DEVELOPMENT GUIDE\n\nStep 1: Define boundaries\n- Facility-level vs. process-level EnPIs\n- Include all significant energy uses\n\nStep 2: Normalize for relevant variables\n- Production volume, weather conditions, operating hours\n- Use regression analysis where appropriate\n\nStep 3: Establish baseline period\n- Minimum 12 months of historical data\n- Representative of normal operations\n\nStep 4: Set targets\n- EnPI improvement targets aligned with energy objectives\n- Consider technology, operational changes, and behavioral factors'
    ],
  },
  {
    id: 'pdf-50001-ar',
    title: 'دليل تدريب Lead Auditor ISO 50001:2018 (عربي)',
    description: 'دليل 170 صفحة لإدارة الطاقة مع أدلة تطوير EnPI، قوالب خط الأساس للطاقة، وأطر مؤشرات الأداء للتدقيق المستدام في الطاقة.',
    standard: 'ISO 50001:2018 إدارة الطاقة',
    standardShort: 'ISO 50001',
    pages: 170,
    price: 149.99,
    discountPrice: 99.99,
    language: 'ar',
    format: 'PDF + PPT',
    icon: Award,
    category: 'iso',
    color: 'text-yellow-600',
    inStock: true,
    features: ['170 صفحة', 'أدلة EnPI', 'قوالب خط الأساس', 'مؤشرات الأداء', 'عرض PPT'],
    includesPowerPoint: true,
    previewPages: 5,
    toc: [
      'الغلاف وحقوق النشر',
      'جدول المحتويات',
      'مقدمة في ISO 50001:2018',
      'البند 4: سياق المنظمة',
      'البند 5: القيادة',
      'البند 6: التخطيط - مراجعة الطاقة',
      'البند 7: الدعم',
      'البند 8: التشغيل',
      'البند 9: تقييم الأداء',
      'البند 10: التحسين',
      'دليل مؤشرات أداء الطاقة (EnPI)',
      'نموذج خط أساس الطاقة',
      'قوائم تدقيق الطاقة'
    ],
    sampleContent: [
      'مقدمة في ISO 50001:2018\n\nيحدد معيار ISO 50001:2018 متطلبات إنشاء وتنفيذ وصيانة وتحسين نظام إدارة الطاقة (EnMS). الغرض هو تمكين المنظمة من اتباع نهج منهجي لتحقيق التحسين المستمر في أداء الطاقة، بما في ذلك كفاءة الطاقة واستخدام واستهلاك الطاقة.',
      'البند 6: التخطيط - مراجعة الطاقة (6.3)\n\nيجب على المنظمة إنشاء منهجية ومعايير لتطوير وتحديث مراجعة الطاقة. يجب أن تتضمن مراجعة الطاقة ما يلي:\n- تحليل استخدام واستهلاك الطاقة بناءً على البيانات المناسبة\n- تحديد مجالات الاستخدام المهم للطاقة (SEUs)\n- تحديد المتغيرات المطبقة التي تؤثر على SEUs\n- تحديد أداء الطاقة الحالي لـ SEUs والأشخاص المؤثرين فيها',
      'دليل تطوير مؤشرات أداء الطاقة (EnPI)\n\nالخطوة 1: تحديد الحدود\n- مؤشرات أداء الطاقة على مستوى المنشأة مقابل مستوى العملية\n- تضمين جميع استخدامات الطاقة المهمة\n\nالخطوة 2: توحيد المتغيرات ذات الصلة\n- حجم الإنتاج، الظروف الجوية، ساعات التشغيل\n- استخدام تحليل الانحدار حيثما يكون مناسباً\n\nالخطوة 3: تحديد فترة الأساس\n- 12 شهراً كحد أدنى من البيانات التاريخية\n- تمثيلية للعمليات العادية'
    ],
  },
  {
    id: 'pdf-ims-en',
    title: 'IMS Lead Auditor Training Manual - 9001+14001+45001 (English)',
    description: '250-page integrated management systems manual covering combined audits, shared documentation, and unified processes for quality, environment, and OH&S.',
    standard: 'Integrated Management Systems (IMS)',
    standardShort: 'IMS',
    pages: 250,
    price: 199.99,
    discountPrice: 149.99,
    language: 'en',
    format: 'PDF + PPT',
    icon: ShieldCheck,
    category: 'iso',
    color: 'text-emerald',
    inStock: true,
    features: ['250 pages', 'Combined audits', 'Shared docs', 'Unified processes', 'PPT included', 'Annex SL'],
    includesPowerPoint: true,
    previewPages: 5,
    toc: [
      'Cover & Copyright',
      'Table of Contents',
      'Introduction to IMS Auditing',
      'Annex SL: High Level Structure',
      'Clause 4-10: Integrated Requirements',
      'Combined Audit Planning',
      'Shared Documentation Strategy',
      'Unified Process Mapping',
      'Risk-Based Integrated Thinking',
      'Internal Audit Program Design',
      'Management Review Integration',
      'Certification Body Audit Preparation'
    ],
    sampleContent: [
      'INTRODUCTION TO INTEGRATED MANAGEMENT SYSTEMS (IMS) AUDITING\n\nAn Integrated Management System (IMS) combines multiple management systems (typically ISO 9001, ISO 14001, and ISO 45001) into one cohesive framework with shared processes, documentation, and resources.\n\nBenefits of integration include:\n- Reduced duplication and audit fatigue\n- Streamlined documentation and processes\n- Holistic view of organizational risks and opportunities\n- Optimized resource allocation across Q, E, and OH&S domains',
      'ANNEX SL: HIGH LEVEL STRUCTURE (HLS)\n\nAll ISO management system standards since 2012 follow the Annex SL High Level Structure:\n\nClause 4: Context of the organization\nClause 5: Leadership\nClause 6: Planning\nClause 7: Support\nClause 8: Operation\nClause 9: Performance evaluation\nClause 10: Improvement\n\nThis common structure enables integration by aligning the core requirements across all standards.',
      'COMBINED AUDIT PLANNING TEMPLATE\n\nAudit Scope: QMS (9001) + EMS (14001) + OH&SMS (45001)\nDuration: 5 days (vs. 3+3+3 = 9 days individual)\n\nDay 1: Opening meeting + Context & Leadership (Clauses 4-5)\nDay 2: Planning & Support (Clauses 6-7)\nDay 3: Operations - Core processes + Environmental controls + OH&S controls\nDay 4: Performance evaluation (Clause 9) + Sampling of records\nDay 5: Improvement (Clause 10) + Closing meeting'
    ],
  },
  {
    id: 'pdf-ims-ar',
    title: 'دليل تدريب IMS Lead Auditor - 9001+14001+45001 (عربي)',
    description: 'دليل 250 صفحة لأنظمة الإدارة المتكاملة يغطي عمليات التدقيق المشترك، الوثائق المشتركة، والعمليات الموحدة للجودة والبيئة والسلامة.',
    standard: 'أنظمة الإدارة المتكاملة (IMS)',
    standardShort: 'IMS',
    pages: 250,
    price: 199.99,
    discountPrice: 149.99,
    language: 'ar',
    format: 'PDF + PPT',
    icon: ShieldCheck,
    category: 'iso',
    color: 'text-emerald',
    inStock: true,
    features: ['250 صفحة', 'تدقيق مشترك', 'وثائق مشتركة', 'عمليات موحدة', 'عرض PPT', 'الملحق SL'],
    includesPowerPoint: true,
    previewPages: 5,
    toc: [
      'الغلاف وحقوق النشر',
      'جدول المحتويات',
      'مقدمة في تدقيق الأنظمة المتكاملة',
      'الملحق SL: الهيكل العالي المستوى',
      'البنود 4-10: المتطلبات المتكاملة',
      'تخطيط التدقيق المشترك',
      'استراتيجية الوثائق المشتركة',
      'رسم العمليات الموحد',
      'التفكير المتكامل القائم على المخاطر',
      'تصميم برنامج التدقيق الداخلي',
      'مراجعة الإدارة المتكاملة',
      'الاستعداد لتدقيق جهة الاعتماد'
    ],
    sampleContent: [
      'مقدمة في تدقيق الأنظمة المتكاملة (IMS)\n\nيجمع نظام الإدارة المتكامل (IMS) بين أنظمة إدارة متعددة (عادة ISO 9001 و ISO 14001 و ISO 45001) في إطار متماسك واحد مع عمليات ووثائق وموارد مشتركة.\n\nتشمل فوائد التكامل:\n- تقليل التكرار وإرهاق التدقيق\n- تبسيط الوثائق والعمليات\n- رؤية شاملة للمخاطر والفرص التنظيمية\n- تحسين توزيع الموارد عبر مجالات الجودة والبيئة والسلامة',
      'الملحق SL: الهيكل العالي المستوى (HLS)\n\nتتبع جميع معايير إدارة نظام ISO منذ عام 2012 الهيكل العالي المستوى للملحق SL:\n\nالبند 4: سياق المنظمة\nالبند 5: القيادة\nالبند 6: التخطيط\nالبند 7: الدعم\nالبند 8: التشغيل\nالبند 9: تقييم الأداء\nالبند 10: التحسين\n\nيتيح هذا الهيكل المشترك التكامل من خلال محاذاة المتطلبات الأساسية عبر جميع المعايير.',
      'نموذج تخطيط التدقيق المشترك\n\nنطاق التدقيق: QMS (9001) + EMS (14001) + OH&SMS (45001)\nالمدة: 5 أيام (مقابل 3+3+3 = 9 أيام منفصلة)\n\nاليوم 1: الاجتماع الافتتاحي + السياق والقيادة (البنود 4-5)\nاليوم 2: التخطيط والدعم (البنود 6-7)\nاليوم 3: التشغيل - العمليات الأساسية + الضوابط البيئية + ضوابط السلامة\nاليوم 4: تقييم الأداء (البند 9) + عينة من السجلات\nاليوم 5: التحسين (البند 10) + الاجتماع الختامي'
    ],
  },
];

export default function PDFStore() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [langFilter, setLangFilter] = useState<'all' | 'en' | 'ar'>('all');
  const [cart, setCart] = useState<string[]>([]);
  const [previewItem, setPreviewItem] = useState<PDFMaterial | null>(null);
  const [previewPage, setPreviewPage] = useState(0);

  const filtered = pdfMaterials.filter(m => {
    const matchSearch = !searchQuery || m.title.toLowerCase().includes(searchQuery.toLowerCase()) || m.standard.toLowerCase().includes(searchQuery.toLowerCase());
    const matchLang = langFilter === 'all' || m.language === langFilter || m.language === 'both';
    return matchSearch && matchLang;
  });

  const addToCart = (id: string) => {
    if (!cart.includes(id)) {
      setCart(prev => [...prev, id]);
    }
  };

  const cartTotal = cart.reduce((sum, id) => {
    const item = pdfMaterials.find(m => m.id === id);
    return sum + (item?.discountPrice || item?.price || 0);
  }, 0);

  return (
    <div>
      <SEO title="Training Materials Store | Pioneers International" description="Professional PDF training manuals and PowerPoint presentations for ISO Lead Auditor courses. Available in English and Arabic." />

      <section className="relative min-h-[45vh] flex items-center justify-center gradient-navy">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.1) 39px, rgba(255,255,255,0.1) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.1) 39px, rgba(255,255,255,0.1) 40px)` }} />
        <div className="relative z-10 content-container text-center px-4">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-emerald/20 flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-emerald" />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-h1 text-white">Training Materials Store</motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-body-lg text-slate-300 mt-4 max-w-2xl mx-auto">
            Professional PDF manuals and PowerPoint presentations for all ISO Lead Auditor courses. Protected by Pioneers International copyright.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="max-w-xl mx-auto mt-8 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search training materials..."
              className="w-full h-14 pl-12 pr-4 bg-white/10 border border-white/20 rounded-full text-white placeholder:text-slate-400 focus:border-emerald focus:ring-2 focus:ring-emerald/20 outline-none backdrop-blur-sm" />
          </motion.div>
        </div>
      </section>

      {cart.length > 0 && (
        <motion.div initial={{ y: -50 }} animate={{ y: 0 }}
          className="sticky top-0 z-50 bg-emerald border-b border-emerald-dark px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3 text-white">
              <ShoppingCart className="w-5 h-5" />
              <span className="font-semibold">{cart.length} item(s) in cart</span>
              <span className="opacity-80">|</span>
              <span className="font-bold">${cartTotal.toFixed(2)}</span>
            </div>
            <button onClick={() => navigate('/checkout', { state: { items: cart, type: 'pdf' } })}
              className="px-5 py-2 bg-white text-emerald rounded-full text-sm font-semibold hover:bg-slate-100 transition-colors flex items-center gap-2">
              Checkout <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
          <span className="text-sm text-slate-500 font-medium">Language:</span>
          {(['all', 'en', 'ar'] as const).map(l => (
            <button key={l} onClick={() => setLangFilter(l)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${langFilter === l ? 'bg-navy text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              {l === 'all' ? 'All Languages' : l === 'en' ? 'English' : 'Arabic'}
            </button>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 section-padding">
        <div className="content-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, i) => {
              const inCart = cart.includes(item.id);
              return (
                <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all group">
                  <div className={`h-2 ${item.color.replace('text-', 'bg-')}`} />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center ${item.color}`}>
                        <item.icon className="w-6 h-6" />
                      </div>
                      {item.includesPowerPoint && (
                        <span className="text-xs font-medium bg-blue-50 text-blue-600 px-2 py-1 rounded-full flex items-center gap-1">
                          <FileText className="w-3 h-3" /> +PPT
                        </span>
                      )}
                    </div>

                    <h3 className="font-semibold text-slate-800 text-lg mb-2 leading-snug">{item.title}</h3>
                    <p className="text-sm text-slate-500 mb-3 line-clamp-3">{item.description}</p>

                    <div className="flex items-center gap-2 mb-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${item.language === 'ar' ? 'bg-emerald-light text-emerald' : 'bg-blue-50 text-blue-600'}`}>
                        {item.language === 'ar' ? 'Arabic' : 'English'}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <BookOpen className="w-3 h-3" /> {item.pages} pages
                      </span>
                      <span className="text-xs text-slate-400">{item.format}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {item.features.map((f, j) => (
                        <span key={j} className="text-xs bg-slate-50 text-slate-500 px-2 py-1 rounded-md flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald" /> {f}
                        </span>
                      ))}
                    </div>

                    <div className="bg-amber-light border border-amber/20 rounded-lg p-3 mb-5">
                      <div className="flex items-center gap-2">
                        <LockIcon className="w-4 h-4 text-amber" />
                        <p className="text-xs text-amber-dark">
                          Protected by Pioneers International copyright. Watermarked with company logo and trainee name.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-slate-800">${item.discountPrice || item.price}</span>
                          {item.discountPrice && (
                            <span className="text-sm text-slate-400 line-through">${item.price}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 mt-0.5">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} className="w-3 h-3 fill-amber text-amber" />
                          ))}
                          <span className="text-xs text-slate-400 ml-1">4.9 (150+ reviews)</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => { setPreviewItem(item); setPreviewPage(0); }}
                          className="px-4 py-2.5 rounded-xl text-sm font-semibold border-2 border-slate-200 text-slate-600 hover:border-emerald hover:text-emerald transition-colors flex items-center gap-2">
                          <Eye className="w-4 h-4" /> Preview
                        </button>
                        <button onClick={() => addToCart(item.id)} disabled={inCart}
                          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 ${inCart ? 'bg-emerald text-white' : 'bg-navy text-white hover:bg-navy-light'}`}>
                          {inCart ? <><Check className="w-4 h-4" /> Added</> : <><ShoppingCart className="w-4 h-4" /> Add to Cart</>}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 text-lg">No materials found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-white section-padding">
        <div className="content-container">
          <div className="bg-gradient-to-br from-navy to-navy-light rounded-3xl p-8 md:p-12 text-center">
            <Award className="w-12 h-12 text-emerald mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-3">Complete Lead Auditor Bundle</h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-6">
              Get all 8 ISO standards training manuals in English + Arabic (16 PDFs + 16 PowerPoints) 
              with Pioneers International branding and copyright protection.
            </p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-4xl font-bold text-white">$999</span>
              <span className="text-xl text-slate-400 line-through">$2,399</span>
              <span className="text-sm font-medium bg-emerald text-white px-3 py-1 rounded-full">Save 58%</span>
            </div>
            <button onClick={() => navigate('/checkout', { state: { bundle: 'complete', type: 'pdf' } })}
              className="inline-flex items-center gap-2 px-8 py-3 bg-emerald text-white rounded-full font-semibold hover:bg-emerald-dark transition-colors">
              <CreditCard className="w-5 h-5" /> Get Complete Bundle
            </button>
          </div>
        </div>
      </section>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-navy/80 z-[60] flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setPreviewItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center ${previewItem.color}`}>
                    <previewItem.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 text-sm">{previewItem.title}</h3>
                    <p className="text-xs text-slate-500">{previewItem.standardShort} | {previewItem.pages} pages | Preview: {previewItem.previewPages} pages</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium bg-amber-light text-amber px-3 py-1 rounded-full flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Preview Mode
                  </span>
                  <button onClick={() => setPreviewItem(null)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Page Navigation */}
              <div className="flex items-center justify-center gap-2 px-6 py-3 border-b border-slate-100 bg-white">
                {['Cover', 'Contents', 'Page 1', 'Page 2', 'Page 3'].map((label, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPreviewPage(idx)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      previewPage === idx
                        ? 'bg-navy text-white'
                        : 'text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Preview Content */}
              <div className="flex-1 overflow-y-auto p-8 bg-slate-100">
                <div className="max-w-2xl mx-auto">
                  {/* Cover Page */}
                  {previewPage === 0 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center min-h-[600px] flex flex-col items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(0,0,0,0.1) 39px, rgba(0,0,0,0.1) 40px)` }} />
                      <div className={`w-20 h-20 rounded-2xl bg-slate-50 flex items-center justify-center mb-8 ${previewItem.color}`}>
                        <previewItem.icon className="w-10 h-10" />
                      </div>
                      <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-4">Pioneers International</div>
                      <h2 className="text-3xl font-bold text-navy mb-4 max-w-lg">{previewItem.title}</h2>
                      <p className="text-slate-500 mb-8 max-w-md">{previewItem.standard}</p>
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> {previewItem.pages} pages</span>
                        <span className="flex items-center gap-1"><FileText className="w-4 h-4" /> {previewItem.format}</span>
                      </div>
                      <div className="mt-12 pt-8 border-t border-slate-100">
                        <p className="text-xs text-slate-400">Training Manual &copy; 2026 Pioneers International</p>
                        <p className="text-xs text-slate-400 mt-1">All rights reserved. Unauthorized distribution prohibited.</p>
                      </div>
                    </motion.div>
                  )}

                  {/* Table of Contents */}
                  {previewPage === 1 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-xl shadow-sm border border-slate-200 p-10 min-h-[600px] relative overflow-hidden">
                      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(0,0,0,0.1) 39px, rgba(0,0,0,0.1) 40px)` }} />
                      <div className="relative z-10">
                        <h3 className="text-2xl font-bold text-navy mb-2">Table of Contents</h3>
                        <div className="w-16 h-1 bg-emerald mb-8" />
                        <div className="space-y-1">
                          {previewItem.toc.map((chapter, idx) => (
                            <div key={idx} className="flex items-center justify-between py-2.5 border-b border-slate-100">
                              <span className="text-sm text-slate-700">{chapter}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-400">{(idx + 1) * 3 + Math.floor(Math.random() * 5)}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Sample Content Pages */}
                  {[2, 3, 4].map((pageIdx) => (
                    previewPage === pageIdx && (
                      <motion.div key={pageIdx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl shadow-sm border border-slate-200 p-10 min-h-[600px] relative overflow-hidden">
                        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(0,0,0,0.1) 39px, rgba(0,0,0,0.1) 40px)` }} />
                        {/* Watermark */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                          <div className="transform -rotate-12 text-slate-100 text-6xl font-bold tracking-widest">PREVIEW</div>
                        </div>
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-6 text-xs text-slate-400">
                            <span>Pioneers International &copy; 2026</span>
                            <span>Page {pageIdx - 1} of {previewItem.pages}</span>
                          </div>
                          <div className="prose prose-slate max-w-none">
                            {previewItem.sampleContent[pageIdx - 2]?.split('\\n').map((line, i) => {
                              if (line.startsWith('CLAUSE') || line.startsWith('البند') || line.startsWith('ANNEX') || line.startsWith('الملحق') || line.startsWith('INTRODUCTION') || line.startsWith('مقدمة') || line.startsWith('RISK') || line.startsWith('EnPI') || line.startsWith('CCP') || line.startsWith('شجرة') || line.startsWith('مصفوفة') || line.startsWith('LEARNER') || line.startsWith('منظور') || line.startsWith('دليل')) {
                                return <h4 key={i} className="text-lg font-bold text-navy mt-6 mb-3">{line}</h4>;
                              }
                              if (line.startsWith('- ') || line.startsWith('[ ]')) {
                                return <li key={i} className="text-sm text-slate-600 ml-4 mb-1">{line.replace(/^- /, '').replace(/^\[ \]/, '')}</li>;
                              }
                              if (line.trim() === '') {
                                return <div key={i} className="h-3" />;
                              }
                              if (line.includes('Q1:') || line.includes('س1:') || line.includes('Step') || line.includes('الخطوة') || line.includes('Stage') || line.includes('المرحلة') || line.includes('Principle')) {
                                return <h5 key={i} className="text-sm font-semibold text-slate-700 mt-4 mb-2">{line}</h5>;
                              }
                              if (line.includes('Audit') || line.includes('المُدقِّق') || line.includes('Findings') || line.includes('الملاحظات')) {
                                return <p key={i} className="text-sm text-slate-500 mt-4 italic">{line}</p>;
                              }
                              return <p key={i} className="text-sm text-slate-600 leading-relaxed mb-2">{line}</p>;
                            }) || <p className="text-slate-400 italic">Sample content preview not available.</p>}
                          </div>
                          <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-center">
                            <span className="text-xs text-slate-400 flex items-center gap-1">
                              <Lock className="w-3 h-3" /> Complete content available after purchase
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-slate-800">${previewItem.discountPrice || previewItem.price}</span>
                  {previewItem.discountPrice && <span className="text-sm text-slate-400 line-through">${previewItem.price}</span>}
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setPreviewItem(null)} className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700 transition-colors">
                    Close
                  </button>
                  <button
                    onClick={() => { addToCart(previewItem.id); setPreviewItem(null); }}
                    disabled={cart.includes(previewItem.id)}
                    className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 ${
                      cart.includes(previewItem.id) ? 'bg-emerald text-white' : 'bg-navy text-white hover:bg-navy-light'
                    }`}
                  >
                    {cart.includes(previewItem.id) ? <><Check className="w-4 h-4" /> Added</> : <><ShoppingCart className="w-4 h-4" /> Add to Cart</>}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
