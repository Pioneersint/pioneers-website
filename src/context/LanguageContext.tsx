import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import i18n from '@/lib/i18n';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  direction: 'ltr' | 'rtl';
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  direction: 'ltr',
  toggleLanguage: () => {},
  setLanguage: () => {},
});

const STORAGE_KEY = 'pioneers-language';

function getSavedLanguage(): Language {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'ar' || saved === 'en') return saved;
  } catch { /* localStorage not available */ }
  return 'en';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLang] = useState<Language>(getSavedLanguage);
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  // Sync document direction and lang attribute whenever language changes
  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [direction, language]);

  // Listen to i18n language changes (from external sources) to keep context in sync
  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      if (lng === 'en' || lng === 'ar') {
        setLang(lng as Language);
      }
    };
    i18n.on('languageChanged', handleLanguageChanged);
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, []);

  const toggleLanguage = useCallback(() => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLang(newLang);
    i18n.changeLanguage(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch { /* localStorage not available */ }
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLang(lang);
    i18n.changeLanguage(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch { /* localStorage not available */ }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, direction, toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
