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

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLang] = useState<Language>('en');
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [direction, language]);

  const toggleLanguage = useCallback(() => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLang(newLang);
    i18n.changeLanguage(newLang);
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLang(lang);
    i18n.changeLanguage(lang);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, direction, toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
