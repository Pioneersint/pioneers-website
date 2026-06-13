/**
 * CMS Content Loader
 * Loads content from JSON files managed by Netlify CMS
 */

interface CmsContent {
  [key: string]: unknown;
}

// Cache for loaded content
const contentCache: Map<string, CmsContent> = new Map();

/**
 * Load a single content file
 */
export async function loadContent(collection: string, slug: string): Promise<CmsContent | null> {
  const cacheKey = `${collection}/${slug}`;
  
  if (contentCache.has(cacheKey)) {
    return contentCache.get(cacheKey)!;
  }

  try {
    const response = await fetch(`/content/${collection}/${slug}.json`);
    if (!response.ok) throw new Error(`Failed to load ${cacheKey}`);
    const data = await response.json();
    contentCache.set(cacheKey, data);
    return data;
  } catch {
    console.warn(`CMS: Could not load ${cacheKey}`);
    return null;
  }
}

/**
 * Load all content files from a collection
 */
export async function loadCollection(collection: string): Promise<CmsContent[]> {
  // In production with Netlify CMS, we'd have an index file
  // For now, use predefined slugs that match our content files
  const collectionSlugs: Record<string, string[]> = {
    courses: ['iso-9001-lead-auditor', 'iso-14001-ems', 'esg-fundamentals', 'iso-45001-ohsms'],
    posts: ['iso-9001-2026-updates', 'esg-reporting-gcc'],
    testimonials: ['testimonial-1', 'testimonial-2', 'testimonial-3'],
    team: ['dr-tariq-al-sharif', 'eng-sarah-al-masri', 'dr-rania-hussein'],
    faq: ['what-is-iso', 'how-long-certification', 'what-is-esg'],
    services: ['iso-certification', 'esg-advisory'],
    clients: ['ministry-of-health-jordan', 'king-faisal-specialist-hospital', 'abu-dhabi-health-services', 'saudi-aramco'],
  };

  const slugs = collectionSlugs[collection] || [];
  const results: CmsContent[] = [];

  for (const slug of slugs) {
    const item = await loadContent(collection, slug);
    if (item) results.push(item);
  }

  return results;
}

/**
 * Load settings
 */
export async function loadSettings(section: string): Promise<CmsContent | null> {
  return loadContent('settings', section);
}

/**
 * Get localized field value
 */
export function getLocalized(content: CmsContent | null, field: string, lang: string): unknown {
  if (!content) return null;
  
  // Try language-specific field first
  const langField = `${field}_${lang}`;
  if (content[langField]) return content[langField];
  
  // Fall back to default field
  return content[field] || null;
}

/**
 * Get string value with fallback
 */
export function getString(content: CmsContent | null, field: string, lang: string, fallback: string = ''): string {
  const value = getLocalized(content, field, lang);
  return typeof value === 'string' ? value : fallback;
}

/**
 * Get array value with fallback
 */
export function getArray(content: CmsContent | null, field: string, lang: string, fallback: unknown[] = []): unknown[] {
  const value = getLocalized(content, field, lang);
  return Array.isArray(value) ? value : fallback;
}

/**
 * Clear content cache (useful after CMS updates)
 */
export function clearCache(): void {
  contentCache.clear();
}
