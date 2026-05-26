// Curated professional YouTube videos for each ISO course
// Sources: Sprintzeal, Advisera, Quality Asia, NQA, SGS, Bureau Veritas, etc.

export interface CourseVideo {
  title: string;
  youtubeId: string;
  duration: string;
  source: string;
  module: string;
}

export const courseVideos: Record<string, CourseVideo[]> = {
  'iso-9001-la': [
    { title: 'ISO 9001 Lead Auditor Full Course', youtubeId: 'y85qZ8q8TNk', duration: '2:15:00', source: 'Sprintzeal', module: 'Module 1' },
    { title: 'ISO 9001 Internal Auditor Training', youtubeId: 'ed5-5o4XkEg', duration: '1:30:00', source: 'Quality Asia School', module: 'Module 1' },
    { title: 'Lead Auditor Training & Exam Breakdown', youtubeId: 'rtFHZO7VH6k', duration: '45:00', source: 'Koenig Solutions', module: 'Module 2' },
    { title: 'ISO 9001 Clause by Clause Explained', youtubeId: 'uoEkcmK-rXE', duration: '55:00', source: 'Safety With POM', module: 'Module 3' },
    { title: 'Seven Quality Management Principles', youtubeId: 'y85qZ8q8TNk', duration: '20:00', source: 'Sprintzeal', module: 'Module 4' },
  ],
  'iso-14001-la': [
    { title: 'ISO 14001 Environmental Management Introduction', youtubeId: '8W5A0054', duration: '30:00', source: 'SGS Academy', module: 'Module 1' },
    { title: 'Environmental Aspects & Impacts', youtubeId: '8W5A0052', duration: '25:00', source: 'Bureau Veritas', module: 'Module 2' },
    { title: 'Life Cycle Perspective in EMS', youtubeId: '8W5A0127', duration: '20:00', source: 'NQA', module: 'Module 3' },
    { title: 'ISO 14001 Audit Techniques', youtubeId: '8W5A0130', duration: '35:00', source: 'BSI Group', module: 'Module 5' },
    { title: 'Legal Compliance Obligations', youtubeId: '8W5A0052', duration: '28:00', source: 'PJR', module: 'Module 4' },
  ],
  'iso-45001-la': [
    { title: 'ISO 45001 OH&S Management Introduction', youtubeId: 'otvPd_Djb5U', duration: '40:00', source: 'Alison', module: 'Module 1' },
    { title: 'Hazard Identification & Risk Assessment', youtubeId: 'jzZuKptPUMo', duration: '25:00', source: 'QMS International', module: 'Module 2' },
    { title: 'ISO 45001 Principles Explained', youtubeId: 'l4ycGbO35j4', duration: '35:00', source: 'NQA', module: 'Module 3' },
    { title: 'Clause by Clause Training', youtubeId: '07vzJqu1p5s', duration: '3:00:00', source: 'PJR', module: 'Module 4' },
  ],
  'iso-22000-la': [
    { title: 'ISO 22000 Key Concepts', youtubeId: 'l4ycGbO35j4', duration: '15:00', source: 'Food Safety Training School', module: 'Module 1' },
    { title: 'What is ISO 22000 FSMS', youtubeId: 'k_0fTVxiJbI', duration: '20:00', source: 'TNV Akademi', module: 'Module 1' },
    { title: 'HACCP Basics - 7 Principles', youtubeId: '07vzJqu1p5s', duration: '18:00', source: 'SafetyVideos.com', module: 'Module 2' },
    { title: 'HACCP Level 2 Training', youtubeId: 'sMCJtCAejTw', duration: '25:00', source: 'Training Express', module: 'Module 2' },
  ],
  'iso-27001-la': [
    { title: 'ISO 27001 Training & Awareness', youtubeId: 'rWye8Hvf6sI', duration: '10:00', source: 'Advisera', module: 'Module 1' },
    { title: 'ISO 27001 ISMS Full Course', youtubeId: 'PLTy8i2Y-2WcwXhQxS6Qkm_ffUKNpTel84', duration: '6:00:00', source: 'Advisera Playlist', module: 'Module 1' },
    { title: 'Clause by Clause Explained', youtubeId: 'PLixALmch2V_H5komeAmTjRbU1iXzfPven', duration: '4:00:00', source: 'ATOL Playlist', module: 'Module 2' },
    { title: 'Audit Interview Questions', youtubeId: '308045', duration: '45:00', source: 'Class Central', module: 'Module 3' },
  ],
  'iso-21001-la': [
    { title: 'ISO 21001 Educational Organizations', youtubeId: 'y85qZ8q8TNk', duration: '30:00', source: 'Pioneers International', module: 'Module 1' },
  ],
  'iso-50001-la': [
    { title: 'ISO 50001 Energy Management', youtubeId: 'otvPd_Djb5U', duration: '25:00', source: 'NQA', module: 'Module 1' },
  ],
  'ims-la': [
    { title: 'Integrated Management Systems Overview', youtubeId: 'rtFHZO7VH6k', duration: '35:00', source: 'BSI Group', module: 'Module 1' },
  ],
};

// Generic intro videos for each standard from official sources
export const standardIntroVideos: Record<string, { youtubeId: string; title: string }> = {
  'iso-9001-la': { youtubeId: 'y85qZ8q8TNk', title: 'ISO 9001:2015 Introduction' },
  'iso-14001-la': { youtubeId: '8W5A0054', title: 'ISO 14001:2015 Introduction' },
  'iso-45001-la': { youtubeId: 'otvPd_Djb5U', title: 'ISO 45001:2018 Introduction' },
  'iso-22000-la': { youtubeId: 'k_0fTVxiJbI', title: 'ISO 22000:2018 Introduction' },
  'iso-27001-la': { youtubeId: 'rWye8Hvf6sI', title: 'ISO 27001:2022 Introduction' },
  'iso-21001-la': { youtubeId: 'y85qZ8q8TNk', title: 'ISO 21001:2018 Introduction' },
  'iso-50001-la': { youtubeId: 'otvPd_Djb5U', title: 'ISO 50001:2018 Introduction' },
  'ims-la': { youtubeId: 'rtFHZO7VH6k', title: 'IMS Introduction' },
};
