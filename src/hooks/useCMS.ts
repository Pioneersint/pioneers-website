import { useState, useEffect, useCallback } from 'react';
import { loadCollection, loadContent, loadSettings, getLocalized } from '@/lib/cms';

interface CmsItem {
  [key: string]: unknown;
}

interface UseCMSCollectionResult {
  items: CmsItem[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

interface UseCMSItemResult {
  item: CmsItem | null;
  loading: boolean;
  error: string | null;
}

interface UseCMSSettingsResult {
  settings: CmsItem | null;
  loading: boolean;
  error: string | null;
}

/**
 * Hook to load a CMS collection (courses, posts, testimonials, etc.)
 */
export function useCMSCollection(collection: string): UseCMSCollectionResult {
  const [items, setItems] = useState<CmsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(() => {
    setLoading(true);
    setError(null);
    loadCollection(collection)
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Failed to load content');
        setLoading(false);
      });
  }, [collection]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
}

/**
 * Hook to load a single CMS item
 */
export function useCMSItem(collection: string, slug: string): UseCMSItemResult {
  const [item, setItem] = useState<CmsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadContent(collection, slug)
      .then(data => {
        setItem(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Failed to load item');
        setLoading(false);
      });
  }, [collection, slug]);

  return { item, loading, error };
}

/**
 * Hook to load CMS settings
 */
export function useCMSSettings(section: string): UseCMSSettingsResult {
  const [settings, setSettings] = useState<CmsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSettings(section)
      .then(data => {
        setSettings(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Failed to load settings');
        setLoading(false);
      });
  }, [section]);

  return { settings, loading, error };
}

/**
 * Helper to get localized field from CMS item
 */
export function useLocalizedField(item: CmsItem | null, field: string, lang: string) {
  return getLocalized(item, field, lang);
}
